import { ICoursePreview } from "../course/course";
import { IUserPreview } from "../user/user";

export default interface IInvoice {
    readonly id: string;
    state: "pending" | "complete" | "failed" | "canceled" | "issued";
    title: string;

    course: ICoursePreview;
    client: IUserPreview;
    payer: IUserPreview;
    delivery: "email" | "post";

    amount: string;
    currency: string;

    has_been_paid: boolean;
    date_of_payment: string;
}

export interface IInvoicePreview {
    readonly id: string;
    readonly title: string;
    readonly amount: string;
    readonly currency: string;
    readonly state: "pending" | "complete" | "failed" | "canceled" | "new";
}