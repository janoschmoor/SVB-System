import { IInvoice, IInvoicePreview } from "./interfaces";

export default function defaultInvoice(): IInvoice {
    return {
        id: "",
        state: "open",
        title: "",
        sender_id: "",
        reciever_id: "",
        product_id: "",
        product_type: "",
        created_at: new Date(),
        last_updated: new Date(),
        amount: 0,
        amount_paid: 0,
        currency: "CHF",
        action: "book-course",
    }
};

const getInvoicePreview = (invoice: IInvoice): IInvoicePreview => {
    return {
        id: invoice.id,
        title: invoice.title,
        amount: invoice.amount.toString(),
        currency: invoice.currency,
        state: invoice.state,
    }
}

export {
    getInvoicePreview,
};
