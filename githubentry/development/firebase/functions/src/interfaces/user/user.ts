import { IMessage, IChatRoomPreview } from "../chatroom/chatroom";
import { ICoursePreview } from "../course/course";
import { IInvoicePreview } from "../invoice/invoice";
import IPhoneNumbers from "../utility/phone";

export default interface IUser {
    // admin level details
    readonly id: string;
    roles: Array<"client" | "coach" | "admin">;
    access_level: number;
    created_at_numeric: number;
    status: "active" | "passive";
    discount?: number;
    special_pass?: string;
    special_pass_valid_until?: number;
    special_pass_reduction?: string; // representing e.g. "15.00" CHF 

    // personal
    form_of_adress: string;
    first_name: string;
    last_name: string;
    street: string;
    house_number: string;
    postal_code: string;
    city: string;
    country_ISO2: string;
    country: string;
    portrait_url: string | null;
    note?: string;

    phone_numbers: IPhoneNumbers;
    date_of_birth: string;
    date_of_birth_numeric: number | null;
    email: string | undefined;
    preffered_language: "d" | "f" | "e";

    //  LinkedAccounts
    parent: IUserPreview | null;
    children: Array<IUserPreview> | null;
    
    // ChatRooms
    new_messages: Array<IMessage>
    chatrooms: Array<IChatRoomPreview | null>
    availability: "none" | "during_work" | "always"; // system notifications are (allways) allowed (see settings)
    
    // Courses
    courses: Array<ICoursePreview>;
    
    //  Invoices
    invoice_delivery: "post" | "email";
    invoices: Array<IInvoicePreview>;

}

export interface IUserPublicCoach {
    // admin level details
    readonly id: string;

    // personal
    first_name: string;
    last_name: string;
    portrait_url: string | null;

    phone_numbers: IPhoneNumbers;
    date_of_birth: string;
    date_of_birth_numeric: number;
    
    // Courses
    courses: Array<ICoursePreview>;
}
export interface IUserPublicClient {
    // admin level details
    readonly id: string;

    // personal
    first_name: string;
    last_name: string;
    portrait_url: string | null;

    phone_numbers: IPhoneNumbers;
    date_of_birth: string;
    date_of_birth_numeric: number;

    //  LinkedAccounts
    parent: IUserPreview | null;
    children: Array<IUserPreview> | null;
    
    // Courses
    courses: Array<ICoursePreview>;
}

export interface IUserPreview {
    readonly id: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly date_of_birth: string;
    readonly phone_number: string;
}