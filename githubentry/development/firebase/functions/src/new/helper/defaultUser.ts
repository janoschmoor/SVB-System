import { IUser, IUserPreview } from "./interfaces";

export default function defaultUser(): IUser {
    return {
        // admin level details
        id: "",
        auth_id: "",

        roles: [],
        is_admin: false,
        is_coach: false,
        is_client: false,
        access_level: 0,
        created_at: new Date(),
        last_update: new Date(),
        status: "blank",
        discount: null,
        special_pass_name: "",
        special_pass_valid_until: null,
        special_pass_reduction: "", // representing e.g. "15.00" CHF
        sallary: "",
        bio: "",

        // personal
        form_of_adress: "",
        first_name: "",
        last_name: "",
        street: "",
        house_number: "",
        postal_code: "",
        city: "",
        district: "",
        country_ISO2: "",
        country: "",
        photo_url: "",

        phone_number: "",
        date_of_birth: null,
        email: "",
        preferred_language: "d",

        //  LinkedAccounts
        parents: [],
        parent_ids: [],
        children: [],
        children_ids: [],
        
        // ChatRooms
        
        // Courses
        booked_courses: [],
        booked_course_ids: [],
        coached_courses: [],
        coached_course_ids: [],

        //  Invoices
        invoice_delivery: "email",
    }
};

const getUserPreview = (user: IUser): IUserPreview => {
    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        photo_url: user.photo_url,
        date_of_birth: user.date_of_birth,
        phone_number: user.phone_number,
    }
}

export {
    getUserPreview,
};