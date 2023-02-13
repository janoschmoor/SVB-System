import * as functions from "firebase-functions";
// import IUser from "../../interfaces/user/user";
import allowAccess from "../../util/auth";
// import { NewUser } from "../../util/emptyEntities";

const admin = require('firebase-admin');

const firestore = admin.firestore();

export const updateEntity = functions.https.onCall((data, context) => {
    const access = allowAccess(context, ["admin", 2000])

    if (access.status) {

        return new Promise((resolve, reject) => {
            switch (data.entity) {
                case "users":
                    const state = updateUser(data);
                    state.then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        reject(err)
                    });
                    break;
            
                default:
                    reject("ERROR: data.entity did not match toplevel collection");
                    break;
            }

            
        
        })
    } else return access;

})

const updateUser = (data: any) => {

    // const entity: IUser = Object.assign(NewUser(), data.entityUpdate);

    return new Promise((resolve, reject)=> {

        switch (data.action) {
            case "create":
                console.log("-create");
                
                break;
            
            case "update":
                console.log("-update")
                firestore.runTransaction((t: any) => {

                    const entityRef = firestore.collection(data.entity).doc(data.entityId)
                    return t.get(entityRef).then((doc: any) => {
                        if (doc.exists) {
                            t.update(entityRef, data.entityUpdate)
                            // const userDoc = firestore.collection(data.entity).doc(data.entityId)
                            // t.set(userDoc, { "userId" : userId })
                        } else {
                            console.error("ERROR: Document not found")
                        }
                    }).catch((err: any) => console.error(err))
            
                }).then((result: any) => {
                    resolve(result);
                }).catch((error: any) => {
                    reject(error);
                })
                break;

            case "delete":
                console.log("-delete")
                
                break;

            default:
                console.log("-default")
                reject("ERROR: data.action mismatch")
                break;
        }
    })
};