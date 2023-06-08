import { ICourse, ICoursePreview } from "./interfaces";

export default function defaultCourse(): ICourse {
    return {
        id: "",
        code: "",
        category: "",
        target_group: [],
        state: "planned",
        pool: {
            id: "",
            name: "",
            location: {
                lat: 0,
                lng: 0,
            },
        },
        clients: [],
        coaches: [],
        duration: 0,
        start_day: 0,
        intervall: "",
        time: 0,
        dates: [],
        absences: [],
        promotions: [],
        base_cost: 0,
        max_clients: 0,
    }
};

const getCoursePreview = (course: ICourse): ICoursePreview => {
    return {
        id: course.id,
        state: course.state,
        pool_id: course.pool.id,
        number_of_coaches: course.coaches.length,
    }
}

export {
    getCoursePreview,
};


