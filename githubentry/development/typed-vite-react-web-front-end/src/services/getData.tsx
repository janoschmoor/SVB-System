import { collection, getDocs } from "firebase/firestore";

import React from 'react'

import { firestore } from "../firebase";

export default async function getData() {

    

    const querySnapshot = await getDocs(collection(firestore, "cities"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
}
