import * as firebase from "firebase";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCaO72A563GV-J4jrPP6TfTWtLBJgvA9dc",
  authDomain: "narvinpay.firebaseapp.com",
  databaseURL: "https://narvinpay.firebaseio.com",
  projectId: "narvinpay",
  storageBucket: "narvinpay.appspot.com",
  messagingSenderId: "315939437981",
  appId: "1:315939437981:web:dd62120b7cda14b89e4374",
};
console.log(firebase);
firebase.initializeApp(config);
const messaging = firebase.messaging();

export default messaging;
