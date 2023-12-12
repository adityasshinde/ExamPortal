// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1_UA0RChjyNVxedwVaErvs2vEgquUsoU",
  authDomain: "examportal-1.firebaseapp.com",
  projectId: "examportal-1",
  storageBucket: "examportal-1.appspot.com",
  messagingSenderId: "649321851516",
  appId: "1:649321851516:web:69c55190f727ecb791b7f9",
  measurementId: "G-86N9N2GGCP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();
export const provider=new GoogleAuthProvider();