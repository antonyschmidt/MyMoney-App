import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDzGhfbZON2wbYuHytbPurhxNUvPqaE4Ek",
    authDomain: "mymoney-app-4c351.firebaseapp.com",
    projectId: "mymoney-app-4c351",
    storageBucket: "mymoney-app-4c351.appspot.com",
    messagingSenderId: "935781222505",
    appId: "1:935781222505:web:a5706343b28158009b7af8"
};

//init firebase

firebase.initializeApp(firebaseConfig)

// init service

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }