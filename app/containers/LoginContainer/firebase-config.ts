
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

import { getAuth } from "firebase/auth";

const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

  
  export const auth = getAuth(app);
  export {db}

  