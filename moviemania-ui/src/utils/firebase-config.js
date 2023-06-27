import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWi-vZM-AoTN7Xg5OTgmXvmMTBym9tM4w",
  authDomain: "mern-moviemania.firebaseapp.com",
  projectId: "mern-moviemania",
  storageBucket: "mern-moviemania.appspot.com",
  messagingSenderId: "666873157705",
  appId: "1:666873157705:web:cf35657d9115036e61c798"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);