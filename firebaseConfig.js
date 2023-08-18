import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCdqA85sxmZQHMAEejFME1i-8X02mByUHg",
  authDomain: "travel-planner-ccf18.firebaseapp.com",
  projectId: "travel-planner-ccf18",
  storageBucket: "travel-planner-ccf18.appspot.com",
  messagingSenderId: "9249612724",
  appId: "1:9249612724:web:f21b8a59a96e06f880c8e1",
  measurementId: "G-PTCPFQB21G",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth, GoogleAuthProvider };
// Import the functions you need from the SDKs you need
