import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

export const setUserAccessLevel = httpsCallable(functions, "setUserAccessLevel");
export const CreateCourses = httpsCallable(functions, "CreateCourses");
export const ManipulateCourse = httpsCallable(functions, "ManipulateCourse");
export const CreateUser = httpsCallable(functions, "CreateUser");
