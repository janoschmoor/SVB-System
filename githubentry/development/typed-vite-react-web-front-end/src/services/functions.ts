import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

export const ttt = httpsCallable(functions, 'helloWorld');
