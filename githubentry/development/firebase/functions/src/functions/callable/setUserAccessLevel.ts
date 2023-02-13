import * as functions from "firebase-functions";
import allowAccess from "../../util/auth";

const admin = require('firebase-admin');
const firestore = admin.firestore();

export const setUserAccessLevel = functions.https.onCall((data, context) => {
    const access = allowAccess(context, ["admin", 2000])
    if (access.status) {
        return new Promise((resolve, reject) => {
            admin.auth().setCustomUserClaims(data.userId, data.newClaims).then(() => {
                firestore.doc(`users/${data.userId}`).set({
                    access_level: data.newClaims.access_level,
                    roles: data.newClaims.roles
                }, {merge: true}).then(() => {
                    resolve({statusCode: 200});
                }).catch((err:any) => {
                    reject(err);
                });
            }).catch((err: any) => {
                reject(err);
            })
        
        })
    } else {
        return access;
    }
});