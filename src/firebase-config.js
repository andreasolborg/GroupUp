import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {doc, setDoc, getDocs, getFirestore} from "@firebase/firestore";
import {collection} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

const myQuery = collection(db, 'profile')

async function myFunction(){
  const myDocs = await getDocs(myQuery)
}

export const createUser = async (firstName, lastName, gender, age, mail, interests, password) => {
  await createUserWithEmailAndPassword(
    auth, mail, password
  );
  
  await setDoc(doc(db, "profile", mail), {
    firstname: firstName,
    email: mail,
    lastname: lastName,
    gender: gender,
    age: age,
    interest: interests
  });
}