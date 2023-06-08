import ICourse from "../interfaces/course/course";
import IUser from "../interfaces/user/user";

export const NewUser = (): IUser => {
    return {
        id: "",
        roles: ["client"],
        is_admin: false,
        is_coach: false,
        is_client: true,
        sallary: "",
        access_level: 0,
        created_at: Date.now(),
        last_update: Date.now(),
        status: "created",
        linked: false,
        form_of_adress: "",
        first_name: "",
        last_name: "",
        street: "",
        house_number: "",
        postal_code: "",
        city: "",
        country_ISO2: "",
        country: "",
        portrait_url: null,
        phone_numbers: [],
        phone_number: "",
        date_of_birth: 0,
        email: undefined,
        preffered_language: "d",
        parents: [],
        parent_ids: [],
        children: [],
        new_messages: [],
        availability: "never",
        courses: [],
        invoice_delivery: "post",
    }
}
export const NewCourse: ICourse = {
    id: "",
    code: "",
    category: "",
    target_group: [],
    state: "active",
    pool: {
        id: "",
        name: "",
        location: {
            lat: "",
            lon: ""
        }
    },
    clients: [],
    coaches: [],
    duration: 0,
    dates: [],
    absences: undefined,
    promotions: [],

    start_day: 1,
    intervall: "weekly",
    time: 1000*60*18,

    base_cost: "",
    max_clients: 0

}