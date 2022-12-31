const { initializeApp } = require('firebase-admin/app');
initializeApp();

import { populateFirestoreWithUsers } from "./functions/callable/populateFirestoreWithUsers";
import { updateUser } from "./functions/callable/updateUser";
import { processSignUp } from "./functions/firestore/processSignUp";

export {
  populateFirestoreWithUsers,
  updateUser,
  processSignUp,
}


