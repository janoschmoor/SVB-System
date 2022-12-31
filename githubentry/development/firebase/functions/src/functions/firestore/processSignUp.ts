import * as functions from "firebase-functions";
import IUser from "../../interfaces/user/user";
import getNewUser from "../../util/testNewUser";

const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');

const firestore = admin.firestore();

export const processSignUp = functions.auth.user().onCreate((user) => {

    return new Promise((resolve, reject) => {
  
      const customClaims = {
        admin: false,
        coach: false,
        client: true,
        accessLevel: 0
      };
    
      getAuth().setCustomUserClaims(user.uid, customClaims).then(() => {
        const batch = firestore.batch();
  
        const newUser: IUser = getNewUser(user);
  
        // Add your write operations to the batch
        batch.set(firestore.doc('/users/' + user.uid), newUser);
        // batch.set(firestore.doc('/users_public_client/' + user.uid), newUser);
  
        // Commit the batch
        batch.commit()
          .then(() => {
            resolve("Successful setCustemUserClaims&&batchWrite")
          })
          .catch(() => {
            reject("Unable to batchWrite")
          });
      }).catch(() => {
        reject("Unable to setCustomUserClaims")
      })
    })
  });
  
  