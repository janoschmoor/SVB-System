import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

export const populateFirestoreWithUsers = httpsCallable(functions, "populateFirestoreWithUsers");
export const updateUser = httpsCallable(functions, "updateUser");
