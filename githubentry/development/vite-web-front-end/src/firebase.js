import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const app = initializeApp({
    apiKey: "AIzaSyB3UyVl0azxDsOW1imlONL95lh63A9XDrE",
    authDomain: "svb-system-dev.firebaseapp.com",
    projectId: "svb-system-dev",
    storageBucket: "svb-system-dev.appspot.com",
    messagingSenderId: "1024131108705",
    appId: "1:1024131108705:web:f852f38b98738e38bebf20"
})

export const auth = getAuth(app);
export default app;
