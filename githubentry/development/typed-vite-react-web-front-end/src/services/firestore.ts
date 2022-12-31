import { collection, getDocs, getDoc, doc, query, where, limit, orderBy, onSnapshot } from "firebase/firestore";
import React from "react";
import { firestore } from "../firebase";


if (true) { // this is to make sure compound query dependencies are being loaded
    limit(1)
    orderBy("a")
    where("a", "==", "a");
    query(collection(firestore, "nada"))
}


export default function getCollectionSnapshot(path: string) {
    return getDocs(collection(firestore, path));
}

export function getCollectionRealTime(path: string, callback: any, textSearch: string, option: undefined | any) {
    if (option) {
        var compoundConstraints = option.options;
        const pathRef = collection(firestore, path);
        //     .where(".description", ">=", "world")
        // .where(".description", "<=", "world\uf8ff")
        var constrainingString = "";

        if (textSearch != "") {
            constrainingString += `where("${option.key}", ">=", "${textSearch}"),where("${option.key}", "<=", "${textSearch}\uf8ff"),`;
        }

        compoundConstraints.forEach((opt: { type: any; value: any; }) => {
            switch (opt.type) {
                case "limit":
                    constrainingString += `limit(${opt.value}),`;
                    break;
                
                case "orderBy":
                    constrainingString += `orderBy('${opt.value}'),`;
                    break

                default:
                    break;
            }
        })

        if (constrainingString.length > 0) {
            constrainingString = constrainingString.slice(0,constrainingString.length-1);
        }

        const q = eval(`query(pathRef, ${constrainingString})`);
        
        const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
            callback(querySnapshot);
        });
        return unsubscribe;
    }
  }
export function getDocumentSnapshot(path: string) {
    return getDoc(doc(firestore, path));
}


