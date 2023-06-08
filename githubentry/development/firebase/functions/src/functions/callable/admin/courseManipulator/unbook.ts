import IInvoice from "../../../../interfaces/invoice/invoice";

export const unbook = async (data: any, context: any, firestore: any) => {
    
    // load course and query for invoice
    const promises = [
        firestore.collection("courses").doc(data.courseId).get(),
        firestore.collection("invoices").where("sender_id", "==", context.auth?.token.uid).where("product_id", "==", data.courseId).get(),
    ]
    const documents = await Promise.all(promises);

    // check if both documents exist then run .data()
    if (!documents[0].exists) {
        return {error: "Kurs nicht gefunden"};
    }

    var courseData = documents[0].data();

    // get invoices
    const invoices = documents[1].docs.map((doc: any) => doc.data());

    if (invoices.length == 0) {
        return {error: "Keine Rechnung gefunden"};
    }

    // check if client is booked
    const clientIndex = courseData.clients.findIndex((user: any) => user.id == context.auth?.token.uid);
    if (clientIndex == -1) {
        return {error: "Kurs ist nicht gebucht"};
    }

    courseData.clients.splice(clientIndex, 1);
    courseData.last_updated = new Date();

    // delete invoice
    // TODO: check if invoice is paid or partially paid and refund if necessary
    const oldInvoice = invoices.find((invoice: any) => invoice.status != "cancelled") as IInvoice;
    oldInvoice.status = "cancelled";
    oldInvoice.last_updated = new Date();

    const invoice: IInvoice  = {
        id: firestore.collection("_").doc().id,
        sender_id: "svb",
        reciever_id: context.auth?.token.uid,
        product_id: courseData.id,
        product_type: "course",
        created_at: new Date(),
        last_updated: new Date(),
        amount: oldInvoice.amount_paid,
        amount_paid: 0,
        currency: "CHF",
        status: "open",
        action: "unbook-course",
        title: "Rückzahlung für " + courseData.code + " und Rechnung " + oldInvoice.id,
    }

    // update course and invoice
    const batch = firestore.batch();
    batch.set(firestore.collection("courses").doc(data.courseId), courseData);
    batch.set(firestore.collection("invoices").doc(oldInvoice.id), oldInvoice);
    if (oldInvoice.amount_paid > 0) {
        batch.set(firestore.collection("invoices").doc(invoice.id), invoice);
    }
    try {
        await batch.commit();
        return {success: "Kurs erfolgreich storniert"};
    } catch (error) {
        return {error: error};
    }
}