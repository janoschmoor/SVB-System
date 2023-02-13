const { initializeApp } = require('firebase-admin/app');
initializeApp();

import { initFirestore } from "./functions/callable/initFirestore";
import { updateEntity } from "./functions/callable/updateEntity";
import { processSignUp } from "./functions/firestore/processSignUp";
import { setUserAccessLevel } from "./functions/callable/setUserAccessLevel";

export {
  initFirestore,
  updateEntity,
  processSignUp,
  setUserAccessLevel,
}


