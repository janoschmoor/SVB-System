import * as functions from "firebase-functions";
import { ICourse, ICoursePreview, IPool, IUser, IUserPreview } from "./helper/interfaces";
import { SYSTEM_CALENDAR, SYSTEM_COURSEINSTRUCTIONS, SYSTEM_COURSETEMPLATES } from "../util/systemDefaultState";
import defaultUser, { getUserPreview } from "./helper/defaultUser";
import defaultPool, { getPoolPreview } from "./helper/defaultPool";
import defaultCourse, { getCoursePreview } from "./helper/defaultCourse";
import defaultInvoice from "./helper/defaultInvoice";

const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const firestore = admin.firestore();

export const InitializeDummy = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const batch = firestore.batch();

        const documents = [];

        for (let index = 0; index < 20; index++) {
            const newPool: IPool = defaultPool();
            const names = ["Wasserstelzen", "Niederholz", "Bläsi", "Münster"]
            newPool.id = `dummyId_${index}`;
            newPool.name = names[Math.floor(Math.random() * names.length)];
            newPool.location.lat = 47.366667 + Math.random() * 0.1;
            newPool.location.lng = 8.55 + Math.random() * 0.1;
            documents.push({data: newPool, path: '/pools/' + newPool.id});
        }

        for (let index = 0; index < 40; index++) {
            const newCourse: ICourse = defaultCourse();
            newCourse.id = `dummyId_${index}`;
            newCourse.code = `code_${index}`;
            newCourse.base_cost = Math.floor(Math.random() * 100);
            // var clientCount = Math.random()*12;
            // for (let j = 0; j < clientCount; j++) {
            //     var client = documents[Math.floor(Math.random() * 20)].data as unknown as IUser;
            //     newCourse.clients.push( getUserPreview(client) );
            // }
            // var clientCount = 1 + Math.floor(Math.random() * 2);
            // for (let j = 0; j < clientCount; j++) {
            //     var client = documents[Math.floor(Math.random() * 20)].data as unknown as IUser;
            //     newCourse.coaches.push( getUserPreview(client) );
            // }
            const poolIndex = Math.floor(Math.random() * 20);
            newCourse.pool = getPoolPreview(documents[poolIndex].data as unknown as IPool);
            const pool = documents[poolIndex].data as unknown as IPool;
            pool.courses.push( getCoursePreview(newCourse) as unknown as ICoursePreview );
            documents.push({data: newCourse, path: '/courses/' + newCourse.id});
        }
            

    
        for (let index = 0; index < 200; index++) {
            const newUser: IUser = defaultUser();
            const last_names = ["Moor", "Heyn", "Paganini", "Georgy", "Schwyzer", "Zihlmann", "Hamel", "Merkle", "Wittreck", "Blumenbach", "Greenleaf", "Miotto", "Lüthy", "Frederix", "Müller"]
            const first_names = ["Janosch", "René", "Micol", "Nicolas", "Fabian", "David", "Jacques", "Sinan", "Raphael", "Tanner", "Davide", "Jonas", "Victor"]
            const mailproviders = ["mail", "gmail", "yallo", "bluewin", "gmx", "jk"]  
            newUser.id = `dummyId_${index}`;
            newUser.auth_id = "";
            newUser.last_name = last_names[Math.floor(Math.random()*last_names.length)];
            newUser.first_name = first_names[Math.floor(Math.random()*first_names.length)];
            newUser.email = `${newUser.first_name.toLowerCase()}.${newUser.last_name.toLowerCase()}@${mailproviders[Math.floor(Math.random()*mailproviders.length)]}.com`;
            newUser.status = Math.random() < 0.5 ? "active" : "new";

            const courseIndex = Math.floor(Math.random() * 40) + 20;
            newUser.booked_courses.push( getCoursePreview(documents[courseIndex].data as unknown as ICourse) );
            newUser.booked_course_ids.push( documents[courseIndex].data.id );
            const course = documents[courseIndex].data as unknown as ICourse;
            course.clients.push( getUserPreview(newUser) as unknown as IUserPreview );

            const rand = Math.floor(Math.random() + 0.1);
            for (let j = 0; j < rand; j++) {
                const invoice = defaultInvoice();
                invoice.id = `dummyId_${index}_${j}`;
                invoice.sender_id = newUser.id;
                invoice.amount = course.base_cost;
                invoice.product_type = "course";
                invoice.product_id = course.id;
                batch.set(firestore.doc('/invoices/' + invoice.id), invoice);
            }

            documents.push({data: newUser, path: '/users/' + newUser.id});
        }

        batch.set(firestore.doc('/SYSTEM/calendar'), SYSTEM_CALENDAR);
        batch.set(firestore.doc('/SYSTEM/courseInstructions'), SYSTEM_COURSEINSTRUCTIONS);
        batch.set(firestore.doc('/SYSTEM/courseTemplates'), SYSTEM_COURSETEMPLATES);
  
        documents.forEach((doc) => {
            batch.set(firestore.doc(doc.path), doc.data);
        });

        batch.commit()
        .then(() => {
            const msg = {
                data: "Initialisation was successful",
            }
            response.send(msg);
        })
        .catch(() => {
            const msg = {
                data: "Initialisation failed",
            }
            response.send(msg)
        });
    })
  });
