// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPxfLs_MXqvPZA33OWVZ0sLHdYBKQR1Qg",
  authDomain: "twitter-clone-feb3f.firebaseapp.com",
  projectId: "twitter-clone-feb3f",
  storageBucket: "twitter-clone-feb3f.appspot.com",
  messagingSenderId: "83020338738",
  appId: "1:83020338738:web:2e85830703b4f76d138e2b",
  measurementId: "G-0GQD7JZGRE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
