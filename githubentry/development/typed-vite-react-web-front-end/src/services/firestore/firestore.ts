import { collection, getDocs, getDoc, doc, query, where, limit, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, startAfter } from "firebase/firestore";
import { firestore } from "../../firebase";
import { buildConstraintStringDynamically } from "./util/constraintBuilder";


if (true) { // this is to make sure compound query dependencies are being loaded
    limit(1)
    orderBy("a")
    where("a", "==", "a");
    startAfter(doc(firestore, "nada/1"));
    query(collection(firestore, "nada"))
}

export function loadCollection({path, options}: {path:string, options: any}) {
    var collectionRef = collection(firestore, path);
    var constraintString = buildConstraintStringDynamically(options)
    const q = eval(`query(collectionRef, ${constraintString})`);
    return getDocs(q);
}
export function loadCollectionSnapshot({path, options, callback, queryId, lastDocument}: {path:string, options: any, callback: Function, queryId: number, lastDocument?: any}) {
    var collectionRef = collection(firestore, path);
    var constraintString = buildConstraintStringDynamically(options)
    console.log(constraintString)
    const q = lastDocument ? eval(`query(collectionRef, ${constraintString}, startAfter(lastDocument))`) : eval(`query(collectionRef, ${constraintString})`)
    return onSnapshot(q, (querySnapshot: any) => {
        callback(querySnapshot, queryId);
    });
}
export function loadDocument(path: string) {
    return getDoc(doc(firestore, path));
}
export function loadDocumentSnapshot(path: string, callback: any) {
    return onSnapshot(doc(firestore, path), (querySnapshot: any) => {
        callback(querySnapshot);
    });
}


export function addDocument(path: string, data: any) {
    return addDoc(collection(firestore, path), data);
}
export function updateDocument(path: string, data: any) {
    return updateDoc(doc(firestore, path), data);
}
export function deleteDocument(path: string) {
    return deleteDoc(doc(firestore, path));
}