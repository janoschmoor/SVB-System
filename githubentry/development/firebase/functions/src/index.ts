const { initializeApp } = require('firebase-admin/app');
initializeApp();

// import { initFirestore } from "./functions/callable/initFirestore";
// import { updateEntity } from "./functions/callable/updateEntity";
// import { processSignUp } from "./functions/firestore/processSignUp";
// import { setUserAccessLevel } from "./functions/callable/setUserAccessLevel";
// import { createEntity } from "./functions/callable/admin/createEntity";
// import { CreateCourses } from "./functions/callable/admin/courseCreator/index";
// import { ManipulateCourse } from "./functions/callable/admin/courseManipulator";

// export {
//   initFirestore,
//   updateEntity,
//   processSignUp,
//   setUserAccessLevel,
//   createEntity,
//   CreateCourses,
//   ManipulateCourse,
// }

import { CreateUser } from "./new/createUser";
import { PlanCourses } from "./new/planCourses"
import { InitializeDummy } from "./new/initializeDummy";
import { ProcessSignUp } from "./new/processSignUp";


export {
  ProcessSignUp,

  CreateUser,
  PlanCourses,
  InitializeDummy,
}
