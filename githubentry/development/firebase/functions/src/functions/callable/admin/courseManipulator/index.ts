import * as functions from "firebase-functions";
import allowAccess from "../../../../util/auth";
import { book } from "./book";
import { trainingCancel } from "./trainingCancel";
import { unbook } from "./unbook";

const admin = require('firebase-admin');

const firestore = admin.firestore();

export const ManipulateCourse = functions.https.onCall( async (data, context) => {
    const access = allowAccess(context, ["admin", 0]);
    if (access.level >= 0) {
        switch (data.action) {
            case "book":
                return await book(data, context, firestore);
    
            case "unbook":
                return await unbook(data, context, firestore);

            case "rebook":

                break;
            case "training-cancel":
                return await trainingCancel(data, context, firestore);
        }
    }
    if (access.level >= 1000) {
        switch (data.action) {
            case "training-entry" && access.level >= 1000:
                break;
        }
                    
    }
    return {error: "Invalid action"};
});