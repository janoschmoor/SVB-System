import * as functions from "firebase-functions";
import IUser from "../../interfaces/user/user";
import getNewUser from "../../util/testNewUser";

const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');

const firestore = admin.firestore();

export const processSignUp = functions.auth.user().onCreate((user) => {
    return new Promise((resolve, reject) => {
  
      const customClaims = {
        roles: [],
        access_level: 0
      };
    
      getAuth().setCustomUserClaims(user.uid, customClaims).then(() => {
        const batch = firestore.batch();
        const newUser: IUser = getNewUser(Object.assign({first_name: "", last_name: ""}, user));

        batch.set(firestore.doc('/users/' + user.uid), newUser);
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
  
  