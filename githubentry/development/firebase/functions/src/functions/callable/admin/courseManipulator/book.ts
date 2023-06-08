import IInvoice from "../../../../interfaces/invoice/invoice";

export const book = async (data: any, context: any, firestore: any) => {
    
    // load course and user
    const promises = [
        firestore.collection("courses").doc(data.courseId).get(),
        firestore.collection("users").doc(context.auth?.token.uid).get(),
    ]
    const documents = await Promise.all(promises);

    // check if both documents exist then run .data()
    if (!documents[0].exists || !documents[1].exists) {
        return {error: "Kurs oder Nutzer nicht gefunden"};
    }
    var courseData = documents[0].data();
    const userData = documents[1].data(); 

    // check if course is full
    if (courseData.clients.length >= courseData.max_clients) {
        return {error: "Kurs ist voll"};
    }

    // check if course is planned
    if (courseData.status == "planned") {
        return {error: "Kurs ist noch nicht aktiv"};
    }

    // check if user is already booked
    if (courseData.clients.find((user: any) => user.id == context.auth?.token.uid)) {
        return {error: "Kurs ist schon gebucht"};
    }

    const client = {
        id: context.auth?.token.uid,
        first_name: userData.first_name,
        last_name: userData.last_name,
        date_of_birth: userData.date_of_birth,
        phone_number: userData.phone_number,
    }

    courseData.clients.push(client);
    courseData.last_updated = new Date();

    // create invoice relating user to courseId and upload to invoices collection
    const invoice: IInvoice = {
        id: firestore.collection("_").doc().id,
        sender_id: context.auth?.token.uid,
        reciever_id: "svb",
        product_id: courseData.id,
        product_type: "course",
        created_at: new Date(),
        last_updated: new Date(),
        amount: courseData.base_cost,
        amount_paid: 0,
        currency: "CHF",
        status: "open",
        action: "book-course",
        title: "Buchung " + courseData.code,
    }

    // upload courseData and invoice to firestore
    const batch = firestore.batch();
    batch.set(firestore.collection("courses").doc(courseData.id), courseData);
    batch.set(firestore.collection("invoices").doc(invoice.id), invoice);
    try {
        await batch.commit();
        return {success: "Kurs gebucht"};
    } catch (error) {
        return {error: "Error während des Buchens"};
    }
}