import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDw9gYTx6iNgzX-kcWzrjmW8fwzoQeN-RQ",
    authDomain: "timer-79f9a.firebaseapp.com",
    databaseURL: "https://timer-79f9a-default-rtdb.firebaseio.com",
    projectId: "timer-79f9a",
    storageBucket: "timer-79f9a.appspot.com",
    messagingSenderId: "388379496557",
    appId: "1:388379496557:web:a54aac81bbca6c2fc46f64",
    measurementId: "G-SJL3JSVQRZ"
};


const app = initializeApp(firebaseConfig);
export default getFirestore();
