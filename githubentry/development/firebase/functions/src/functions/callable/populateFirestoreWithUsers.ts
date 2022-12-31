import * as functions from "firebase-functions";
import IUser from "../../interfaces/user/user";
import getNewUser from "../../util/testNewUser";

const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const firestore = admin.firestore();

export const populateFirestoreWithUsers = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
      // functions.logger.info("Hello logs!", {structuredData: true});
      const batch = firestore.batch();
  
      for (let index = 0; index < 110; index++) {
        const newUser: IUser = getNewUser({
          uid: `uid_${index}`,
          last_name: last_names[Math.floor(Math.random()*last_names.length)],
          first_name: first_names[Math.floor(Math.random()*first_names.length)],
          email: "",
        });
        newUser.email = `${newUser.first_name.toLowerCase()}.${newUser.last_name.toLowerCase()}@${mailproviders[Math.floor(Math.random()*mailproviders.length)]}.com`,
        batch.set(firestore.doc('/users/' + newUser.id), newUser);
      }
  
      batch.commit()
        .then(() => {
          const msg = {
            data: "Successful batchWrite!",
          }
          response.send(msg);
        })
        .catch(() => {
          const msg = {
            data: "failed to write batch",
          }
          response.send(msg)
        });
    })
  });
  


const last_names = ["Moor", "Heyn", "Paganini", "Georgy", "Schwyzer", "Zihlmann", "Hamel", "Merkle", "Wittreck", "Blumenbach", "Greenleaf", "Miotto", "Lüthy", "Frederix"]
const first_names = ["Janosch", "René", "Micol", "Nicolas", "Fabian", "David", "Jacques", "Sinan", "Raphael", "Tanner", "Davide", "Jonas", "Victor"]
const mailproviders = ["mail", "gmail", "yallo", "bluewin", "gmx", "jk"]
