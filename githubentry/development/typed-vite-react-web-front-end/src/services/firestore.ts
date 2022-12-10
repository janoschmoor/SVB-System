import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

export default function getCollectionSnapshot(path: string) {
    return getDocs(collection(firestore, path));
}
