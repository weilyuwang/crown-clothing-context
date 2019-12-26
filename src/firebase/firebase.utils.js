import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyDaBrNfc0sjM6Ht2RhaKER8NQdC_3WFVyQ",
  authDomain: "crown-clothing-db-c5fff.firebaseapp.com",
  databaseURL: "https://crown-clothing-db-c5fff.firebaseio.com",
  projectId: "crown-clothing-db-c5fff",
  storageBucket: "crown-clothing-db-c5fff.appspot.com",
  messagingSenderId: "443117383558",
  appId: "1:443117383558:web:53516db798c47e61dc4607",
  measurementId: "G-VWSVQ8X99Y"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
