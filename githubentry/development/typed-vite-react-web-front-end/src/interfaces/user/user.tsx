import { IMessage, IChatRoomPreview } from "../chatroom/chatroom";
import { ICoursePreview } from "../course/course";
import { IInvoicePreview } from "../invoice/invoice";
import IPhoneNumbers from "../utility/phone";

export default interface IUser {
    readonly id: string;
    functions: Array<"client" | "coach" | "admin">;

    form_of_adress: string;
    name: string;
    family_name: string;
    street: string;
    house_number: string;
    postal_code: string;
    city: string;
    country_ISO2: string;
    country: string;
    portrait_url?: string;
    note?: string;

    phone_numbers: IPhoneNumbers;
    date_of_birth: string;
    date_of_birth_numeric: number;
    email: string;
    preffered_language: "d" | "f" | "e";

    status: "active" | "passive";
    discount: number;
    special_pass?: string;
    special_pass_valid_until?: number;
    special_pass_reduction?: string; // representing e.g. "15.00" CHF 


    //  LinkedAccounts
    parent?: IUserPreview;
    children?: Array<IUserPreview>;
    
    // ChatRooms
    new_messages: Array<IMessage>
    chatrooms?: Array<IChatRoomPreview>
    availability: "none" | "during_work" | "always"; // system notifications are (allways) allowed (see settings)
    
    // Courses
    courses: Array<ICoursePreview>;
    
    //  Invoices
    invoice_delivery: "post" | "email";
    invoices: Array<IInvoicePreview>;

}

export interface IUserPreview {
    readonly id: string;
    readonly name: string;
    readonly family_name: string;
    readonly date_of_birth: string;
    readonly phone_number: string;
}