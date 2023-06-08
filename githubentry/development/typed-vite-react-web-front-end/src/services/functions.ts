import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

export const populateFirestoreWithUsers = httpsCallable(functions, "populateFirestoreWithUsers");
export const updateEntity = httpsCallable(functions, "updateEntity");
export const setUserAccessLevel = httpsCallable(functions, "setUserAccessLevel");
export const createEntity = httpsCallable(functions, "createEntity");
export const CreateCourses = httpsCallable(functions, "CreateCourses");
export const ManipulateCourse = httpsCallable(functions, "ManipulateCourse");
