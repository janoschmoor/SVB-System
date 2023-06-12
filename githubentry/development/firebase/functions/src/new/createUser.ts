import * as functions from "firebase-functions";
import access from "./helper/access";
import defaultUser from "./helper/defaultUser";
import { DocumentReference } from "firebase-admin/firestore";

const admin = require('firebase-admin');
const firestore = admin.firestore();

export const CreateUser = functions.https.onCall((data, context) => {
    const accessStatus = access(context, 2000);
    if (accessStatus.granted) {

        return new Promise((resolve, reject) => {
            const docRef: DocumentReference = firestore.collection('users').doc();
            const newId = docRef.id;

            const newUser = defaultUser();
            newUser.id = newId;

            // upload to firestore with new id as docid
            docRef.set(newUser).then(() => {
                return resolve({access_status: accessStatus, data: newUser});
            }).catch((error: any) => {
                return reject({access_status: accessStatus, error: error.message});
            });
        })

    } else {
        return {access_status: accessStatus, data: null}
    }
});
