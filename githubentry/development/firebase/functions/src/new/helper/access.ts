import { TaskContext } from "firebase-functions/v1/tasks";

export default function access(context: TaskContext, accessLevel: number) {
    if (!context.auth) {
      return {granted: false, msg: "Zugang verwehrt", help: "Nutzer nicht angemeldet"}
    }
    if (!context.auth.token.email_verified) {
      return {granted: false, msg: "Zugang verwehrt", help: "E-Mail nicht verifiziert"}
    }
  
    if (context.auth?.token.email == "janosch.moor@gmail.com") { // dev only
      return {granted: true, msg: "Access granted", accessLevel: context.auth?.token.access_level};
    }

  
    if (context.auth?.token.access_level >= accessLevel) {
      return {granted: true, msg: "Access granted", accessLevel: context.auth?.token.access_level};
    } else {
      return {granted: false, msg: "Access denied", help: "Access level too low", accessLevel: context.auth?.token.access_level}
    }
  }