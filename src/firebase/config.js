import firebase from "firebase/app";

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
      apiKey: "AIzaSyDtfdvt8JRJ_H4KTuVY23o9CxE2Nur7HkM",
      authDomain: "chat-app-65f68.firebaseapp.com",
      projectId: "chat-app-65f68",
      storageBucket: "chat-app-65f68.appspot.com",
      messagingSenderId: "377148466569",
      appId: "1:377148466569:web:d0e6beda81d8370ab7ed58",
      measurementId: "G-TRXXQKMB8P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if(window.location.hostname === 'localhost'){
      db.useEmulator('localhost','8080');
}

export {auth, db};
export default firebase;