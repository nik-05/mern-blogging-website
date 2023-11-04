// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3lDpZ_drH56bFoR-349mdSFs8tUVoMqk",
  authDomain: "react-js-blog-website-f5a68.firebaseapp.com",
  projectId: "react-js-blog-website-f5a68",
  storageBucket: "react-js-blog-website-f5a68.appspot.com",
  messagingSenderId: "953082390142",
  appId: "1:953082390142:web:7352cce23114af37bc9a2f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);
    });

  return user;
};
