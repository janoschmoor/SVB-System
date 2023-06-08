import * as functions from "firebase-functions";
import ICourse from "../../../../interfaces/course/course";
import allowAccess from "../../../../util/auth";

const admin = require('firebase-admin');

const firestore = admin.firestore();

// Firebasefunction to Create Courses based on Instructions, Calendar, Templates, Period and Config

export const CreateCourses = functions.https.onCall((data, context) => {
    const access = allowAccess(context, ["admin", 2000])
    if (access.status) {

        const GENID = firestore.collection('_').doc().id;

        return new Promise(async (resolve, reject) => {

            const CalendarRef = await firestore.collection('SYSTEM').doc("calendar").get();
            const CourseInstructionsRef = await firestore.collection('SYSTEM').doc("courseInstructions").get();
            const CourseTemplatesRef = await firestore.collection('SYSTEM').doc("courseTemplates").get();
            
            var log: {courses: Array<any>, id: string, upload: null | any, genId: string, time: Date, hasSucceeded: boolean, period: any, msg: string, error: boolean, config: any} = {
                genId: GENID,
                id: GENID,
                time: new Date(),
                courses: [],
                hasSucceeded: true,
                period: data.period,
                config: data.config,
                error: false,
                msg: "",
                upload: null,
            }

            if (!CalendarRef.exists || !CourseInstructionsRef.exists || !CourseTemplatesRef.exists) {
                log.error = true;
                log.msg = "Calendar or CourseInstructions or CourseTemplates not found!";
                // upload log to firstore logs collection
                await firestore.collection('logs').doc(GENID).set(log);
                reject("logs/" + GENID);
                return;
            }

            const Calendar = CalendarRef.data();
            const CourseInstructions = CourseInstructionsRef.data();
            const CourseTemplates = CourseTemplatesRef.data();

            const newCourseInstructions = getActiveCourseInstructionsWithPeriod(CourseInstructions.instructions, Calendar, data.period);
            
            const existingCoursesByCodes = await getExistingCoursesByCodes(newCourseInstructions);
            
            // for each newCourseInstruction check if there is an existing course with the same code
            // if there is no existing course create a new course with the courseTemplate and the newCourseInstruction
            // if there is an existing course check if the existing course has the same period as the newCourseInstruction
            // if the existing course has the same period as the newCourseInstruction do nothing
            // if the existing course has a different period as the newCourseInstruction create a new course with the courseTemplate and the newCourseInstruction
            const newCourses: Array<any> = [];
            newCourseInstructions.forEach((courseInstruction: any) => {

                const logCourse = {
                    code: courseInstruction.code,
                    end: courseInstruction.end,
                    start: courseInstruction.start,
                    status: "init",
                    preexisting: false,
                }
                log.courses.push(logCourse);

                // filter out all courses with the same code as the courseInstruction
                const existingCourses = existingCoursesByCodes.filter((course: any) => course.code == courseInstruction.code);
                var intersectionExists: ICourse | null = null;
                existingCourses.forEach((course: any) => {
                    if (datesIntersect(courseInstruction, course, true)) {
                        intersectionExists = course as ICourse;
                        logCourse.preexisting = true;
                    }
                });
                // create a new course if there is no existing course with the same code or (existing course.status == "planned" and data.config.overwrite == true)
                if (intersectionExists && intersectionExists["status"] == "planned") {
                    if (data.config.overwrite) {
                        const newCourse = instanciateCourse(courseInstruction, CourseTemplates, Calendar, intersectionExists ? intersectionExists["id"]: null, GENID);
                        newCourses.push(newCourse);
                        logCourse.status = "CREATE:overwrite-planned-course";
                    } else {
                        logCourse.status = "SKIP:planned-course-exists-no-overwrite";
                    }
                } else if (existingCourses.length == 0) {
                    const newCourse = instanciateCourse(courseInstruction, CourseTemplates, Calendar, intersectionExists ? intersectionExists["id"]: null, GENID);
                    newCourses.push(newCourse);
                    logCourse.status = "CREATE:new-course";
                } else {
                    logCourse.status = "SKIP:active-course-exists";
                }
                
            })

            
            // upload new courses to firestore in batches of 500

            var batch = firestore.batch();
            var batchCount = 0;
            var batchPromises: Array<any> = [];
            newCourses.forEach((course: any) => {
                batch.set(firestore.collection('courses').doc(course.id), course);
                batchCount++;
                if (batchCount == 500) {
                    batchPromises.push(batch.commit());
                    batchCount = 0;
                    batch = firestore.batch();
                }
            })
            if (batchCount > 0) {
                batchPromises.push(batch.commit());
            }
            await Promise.all(batchPromises);

            // upload log to firstore logs collection
            await firestore.collection('logs').doc(GENID).set(log);

            resolve("logs/" + GENID);

        })
    } else {
        return access;
    }
});


const datesIntersect = (d1o: any, d2o: any, hard: boolean) => {
    // return false if .start or .end is not defined
    if (!d1o.start || !d1o.end || !d2o.start || !d2o.end) {
        return false;
    }

    // check if input .start and .end are firebase timestamps and convert them to Date otherwise create a new object with the same properties
    const d1 = {start: d1o.start.toDate ? d1o.start.toDate() : new Date(d1o.start), end: d1o.end.toDate ? d1o.end.toDate() : new Date(d1o.end)};
    const d2 = {start: d2o.start.toDate ? d2o.start.toDate() : new Date(d2o.start), end: d2o.end.toDate ? d2o.end.toDate() : new Date(d2o.end)};

    if (hard) {
        return  (d1.start <= d2.end && d1.start >= d2.start) || (d1.end <= d2.end && d1.end >= d2.start) ||
                (d2.start <= d1.end && d2.start >= d1.start) || (d2.end <= d1.end && d2.end >= d1.start);
    } else {
        return  (d1.start < d2.end && d1.start > d2.start) || (d1.end < d2.end && d1.end > d2.start) ||
                (d2.start < d1.end && d2.start > d1.start) || (d2.end < d1.end && d2.end > d1.start);
    }
}

const getActiveCourseInstructionsWithPeriod = (courseInstructions: any, calendar: any, period: any) => {
    // for each courseInstruction find all calendar.events where instruction.repeat == event.type and datesIntersect is true
    // for each found event create a new courseInstruction with the event as period
    // return all new courseInstructions as a list
    var newCourseInstructions: Array<any> = [];
    courseInstructions.forEach((courseInstruction: any) => {
        const events = calendar.events.filter((event: any) => event.type == courseInstruction.repeat);
        events.forEach((event: any) => {
            if (datesIntersect(event, period, true)) {
                const newCourseInstruction = {...courseInstruction};
                newCourseInstruction.start = event.start;
                newCourseInstruction.end = event.end;
                newCourseInstructions.push(newCourseInstruction);
            }
        })
    })
    return newCourseInstructions;
}

const getExistingCoursesByCodes = async (courseInstructions: any) => {
    // create an array of promises to get all courses if they match the courseInstruction.code
    // return once all promises are resolved one list of existing courses.data()
    var promises: Array<any> = [];
    courseInstructions.forEach((courseInstruction: any) => {
        promises.push(firestore.collection('courses').where('code', '==', courseInstruction.code).get());
    })
    const courses = await Promise.all(promises);
    var existingCourses: Array<any> = [];
    courses.forEach((course: any) => {
        course.forEach((c: any) => {
            existingCourses.push(c.data());
        })
    })
    return existingCourses;
}

const instanciateCourse = (courseInstruction: any, courseTemplates: any, calendar: any, id:string | null, genId: string) => {
    // find the courseTemplate with the same code as the courseInstruction
    // create a new course with the courseTemplate and the courseInstruction
    // return the new course
    const courseTemplate = courseTemplates.courses.find((template: any) => template.category == courseInstruction.category);
    const newCourse = courseTemplate ? {...courseTemplate} : {};
    Object.assign(newCourse, courseInstruction);
    newCourse.status = "planned";
    newCourse.created_by = genId;
    newCourse.id = id ? id : firestore.collection('_').doc().id;

    // generate all dates for the course
    // get all events that are holidays
    const holidays = calendar.events.filter((event: any) => event.type == "holiday");
    const holidaysInPeriod = holidays.filter((holiday: any) => datesIntersect(holiday, newCourse, true));

    var startingWeek = newCourse.start.toDate ? newCourse.start.toDate() : new Date(newCourse.start)
    var absoluteTime = Math.floor(startingWeek.getTime() / (1000 * 60 * 60 * 24 * 7)) * 1000 * 60 * 60 * 24 * 7 + 1000*60*60*24*4 + newCourse.start_day + newCourse.start_time;
    
    var iteration = 0;
    newCourse.dates = [];
    // loop until the end of the course is reached and add a date to the course for each iteration
    while ( absoluteTime < newCourse.end.toDate() && iteration < 30) {
        // check if the date is a holiday
        const isHoliday = holidaysInPeriod.some((holiday: any) => datesIntersect({start: absoluteTime, end: absoluteTime}, holiday, true));
        if (!isHoliday) {
            newCourse.dates.push({
                date: new Date(absoluteTime),
                absent: [],
                participants: [],
                status: "planned",
                coaches: [],
            });
        }
        absoluteTime += newCourse.training_intervall;
        iteration++;
    }

    if (newCourse.dates.length > 0) {
        newCourse.start = newCourse.dates[0].date;
        newCourse.end = newCourse.dates[newCourse.dates.length - 1].date;
    }

    return newCourse;
}