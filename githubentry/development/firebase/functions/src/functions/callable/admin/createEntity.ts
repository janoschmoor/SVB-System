import * as functions from "firebase-functions";
import allowAccess from "../../../util/auth";

const admin = require('firebase-admin');

const firestore = admin.firestore();


export const createEntity = functions.https.onCall((data, context) => {
    const access = allowAccess(context, ["admin", 2000])
    if (access.status) {
        return new Promise((resolve, reject) => {

            var entity = data.entity;
            const type = data.type;

            const docRef = firestore.collection('_').doc();
            const newId = docRef.id;
            entity.id = newId;

            const batch = firestore.batch();

            switch (type) {
                case "users":
                    
                    batch.set(firestore.doc(`/${type}/` + entity.id), entity);
                    batch.commit().then(() => {
                        resolve({status: true, msg: "CreateSuccess"})
                    }).catch(() => {
                        reject({status: false, msg: "CreateFail"})
                    })
                    break;
            
                default:
                    reject({status: false, msg: `Type ${type} not found`})
            }
        })
    } else {
        return access;
    }
});