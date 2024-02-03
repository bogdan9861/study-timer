import db from '../../firebase'
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export const addNewDoc = async ({ id, name, schedules }) => {
    const colRef = collection(db, 'schedule');
    const payload = { id, name, schedules }
    const docRef = await addDoc(colRef, payload);
}

