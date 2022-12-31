import { TaskContext } from "firebase-functions/v1/tasks";

export default function allowAccess(context: TaskContext, [type, accessLevel]: Array<string | number>) {
    if (!context.auth) {
      return {status: false, msg: "Access denied", reason: "User not signed in"}
    }
    if (!context.auth.token.email_verified) {
      return {status: false, msg: "Access denied", reason: "Email not verified"}
    }
  
    if (context.auth?.token.email == "janosch.moor@gmail.com" && context.auth?.token.email_verified) {
      return {status: true, msg: "Access granted"};
    }
  
    if (context.auth?.token.accessLevel >= accessLevel) {
      return {status: true, msg: "Access granted"};
    } else {
      return {status: false, msg: "Access denied", reason: "Insufficient permission"}
    }
  }