import ICourse from "../interfaces/course/course";
import IUser from "../interfaces/user/user";

export const NewUser = (): IUser => {
    return {
        id: "",
        roles: ["client"],
        isAdmin: false,
        isCoach: false,
        isClient: true,
        access_level: 0,
        created_at_numeric: Date.now(),
        last_update_numeric: Date.now(),
        status: "created",
        isSelfConnected: false,
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
        phone_numbers: {default: ""},
        date_of_birth: "",
        date_of_birth_numeric: null,
        email: undefined,
        preffered_language: "d",
        parents: [],
        parentIds: [],
        children: [],
        new_messages: [],
        chatrooms: [],
        availability: "none",
        courses: [],
        invoice_delivery: "post",
        invoices: []
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
    duration: "",
    duration_numeric: 0,
    dates: [],
    year: "",
    absences: undefined,
    promotions: [],
    settings: {
        base_cost: "",
        max_clients: 0
    }
}