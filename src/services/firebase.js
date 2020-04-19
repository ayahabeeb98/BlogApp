import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDA2jPZ_84ZBu-2bqEktoPUJZqyresyIX8",
    authDomain: "training-app-db9b5.firebaseapp.com",
    databaseURL: "https://training-app-db9b5.firebaseio.com",
    projectId: "training-app-db9b5",
    storageBucket: "training-app-db9b5.appspot.com",
    messagingSenderId: "569183208052",
    appId: "1:569183208052:web:35e89a1e3569d1b6ecc721",
    measurementId: "G-NLRSL4DVJT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export default firebase;
export {auth , db}