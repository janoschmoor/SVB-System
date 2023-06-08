
export default interface IInvoice {
    readonly id: string;
    status: "complete" | "failed" | "cancelled" | "open" | "partial";
    title: string;

    sender_id: string;
    reciever_id: string;
    product_id: string;
    product_type: string;
    created_at: Date;
    last_updated: Date;
    amount: number,
    amount_paid: number,
    currency: "CHF" | "EUR" | "USD",
    action: "book-course" | "unbook-course",
    
}

export interface IInvoicePreview {
    readonly id: string;
    readonly title: string;
    readonly amount: string;
    readonly currency: string;
    readonly state: "pending" | "complete" | "failed" | "canceled" | "new";
}