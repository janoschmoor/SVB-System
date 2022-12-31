import * as functions from "firebase-functions";
import allowAccess from "../../util/auth";

const admin = require('firebase-admin');

import getCustomClaims from "../../helper/getCustomClaims";

export const setUserAccessLevel = functions.https.onCall((data, context) => {
    const access = allowAccess(context, ["admin", 2000])
    if (access.status) {
        return new Promise((resolve, reject) => {

            const customClaims = {
                admin: false,
                coach: false,
                client: true,
                accessLevel: 0
            };
            admin.auth().setCustomUserClaims(data.user.id, customClaims).then(() => {
            
            })
        
            resolve({status: true, msg: "User Updated"})
            reject({status: false, msg: "BatchWriteFail"})
        })
        


    } else {
        return access;
    }
});