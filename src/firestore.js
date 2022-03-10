import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc} from "@firebase/firestore";
import {getFirestore} from "@firebase/firestore";
import { auth, app } from "./firebase-config";


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

  export const db = getFirestore(app);