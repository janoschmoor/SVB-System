import * as functions from "firebase-functions";
import allowAccess from "../../util/auth";

const admin = require('firebase-admin');

const firestore = admin.firestore();


export const updateEntity = functions.https.onCall((data, context) => {
    const access = allowAccess(context, ["admin", 2000])
    if (access.status) {
  
        return new Promise((resolve, reject) => {
    
            const user = data.user;
    
            const batch = firestore.batch();
            batch.set(firestore.doc('/users/' + user.id), user);
            batch.commit().then(() => {
                resolve({status: true, msg: "User Updated"})
            }).catch(() => {
                reject({status: false, msg: "BatchWriteFail"})
            })
    
        })
    } else {
        return access;
    }
});