import * as functions from "firebase-functions";
const cors = require('cors')({origin: false});

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
      // your function body here - use the provided req and res from cors
      functions.logger.info("Hello logs!", {structuredData: true});
      response.set("Access-Control-Allow-Origin", "*")
      response.send("Hello from Firebase!");
  })
});
