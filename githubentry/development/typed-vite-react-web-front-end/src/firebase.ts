import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const useEmulator = true;

const app = initializeApp({
    apiKey: "AIzaSyB3UyVl0azxDsOW1imlONL95lh63A9XDrE",
    authDomain: "svb-system-dev.firebaseapp.com",
    projectId: "svb-system-dev",
    storageBucket: "svb-system-dev.appspot.com",
    messagingSenderId: "1024131108705",
    appId: "1:1024131108705:web:f852f38b98738e38bebf20"
})

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const functions = getFunctions(app);
export default app;

if (useEmulator) {
    connectFirestoreEmulator(firestore, 'localhost', 8081);
    connectFunctionsEmulator(functions, 'localhost', 5001);
    connectAuthEmulator(auth, 'http://localhost:9099');
}
