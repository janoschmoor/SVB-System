import { TaskContext } from "firebase-functions/v1/tasks";

export default function allowAccess(context: TaskContext, [type, accessLevel]: Array<string | number>) {
    if (!context.auth) {
      return {status: false, msg: "Access denied", error: "User not signed in"}
    }
    if (!context.auth.token.email_verified) {
      return {status: false, msg: "Access denied", error: "Email not verified"}
    }
  
    if (context.auth?.token.email == "janosch.moor@gmail.com" && context.auth?.token.email_verified) {
      return {status: true, msg: "Access granted", level: context.auth?.token.access_level};
    }

  
    if (context.auth?.token.access_level >= accessLevel) {
      return {status: true, msg: "Access granted", level: context.auth?.token.access_level};
    } else {
      return {status: false, msg: "Access denied", error: "Insufficient permission"}
    }
  }