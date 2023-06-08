import * as functions from "firebase-functions";
import { IUser } from "./helper/interfaces";
import defaultUser from "./helper/defaultUser";

const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');

const firestore = admin.firestore();

export const ProcessSignUp = functions.auth.user().onCreate((user) => {
    return new Promise((resolve, reject) => {
  
      const customClaims = {
        access_level: 0,
        doc_id: firestore.collection('_').doc().id,
      };
    
      getAuth().setCustomUserClaims(user.uid, customClaims).then(() => {
        const batch = firestore.batch();
        const newUser: IUser = defaultUser();

        newUser.first_name = user.email ? user.email.split("@")[0] : "Name";
        newUser.access_level = customClaims.access_level;
        newUser.auth_id = user.uid;
        newUser.id = customClaims.doc_id;
        newUser.email = user.email ? user.email : "";

        batch.set(firestore.doc('/users/' + newUser.id), newUser);
        batch.commit()
          .then((res: any) => {
            resolve(res)
          })
          .catch((err:any) => {
            reject(err)
          });
      }).catch((e: any) => {
        reject(e)
      })
    })
  });
  
  