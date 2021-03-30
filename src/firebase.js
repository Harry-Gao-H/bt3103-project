import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyBZ7C6dka5GsinKLlVB-6oAM_DxuIhX5yM",
    authDomain: "finalproject-b00ad.firebaseapp.com",
    projectId: "finalproject-b00ad",
    storageBucket: "finalproject-b00ad.appspot.com",
    messagingSenderId: "242229605617",
    appId: "1:242229605617:web:6b4d54f3db53568acae550",
    measurementId: "G-9NBW55GGEF"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;