import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDSK1CBg8J_9PDGihmxTm5tXQvztAvBs4I",
  authDomain: "tpi-turismo.firebaseapp.com",
  databaseURL: "https://tpi-turismo.firebaseio.com",
  projectId: "tpi-turismo",
  storageBucket: "tpi-turismo.appspot.com",
  messagingSenderId: "284805795343",
  appId: "1:284805795343:web:01f196e592552d7b671d7a",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, storage, timestamp };

//// AUTHENTICATION
// const authentication = () => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   console.log(provider);

//   firebase
//     .auth()
//     .signInWithPopup(provider)
//     .then((result) => {
//       const user = result.user;
//       console.log(user);
//     })
//     .catch((e) => console.log(e));
// };
