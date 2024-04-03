import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  
  updateProfile,
} from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  /*
  apiKey: 'AIzaSyAzL_2jiVBhmiIUFGs2z6-cDR-Hgoedh3k',
  authDomain: 'crema-react.firebaseapp.com',
  databaseURL: 'https://crema-react.firebaseio.com',
  projectId: 'crema-react',
  storageBucket: 'crema-react.appspot.com',
  messagingSenderId: '369173776768',
  appId: '1:369173776768:web:895ded916749deebd31965',
  measurementId: 'G-976YVMRB4R',
  */
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  databaseURL: import.meta.env.VITE_FIREBASE_databaseURL,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucker,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();
//const githubAuthProvider = new GithubAuthProvider();
//const facebookAuthProvider = new FacebookAuthProvider();
//const twitterAuthProvider = new TwitterAuthProvider();

export {
  db,
  auth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  signOut,
  googleAuthProvider,
  //githubAuthProvider,
  //facebookAuthProvider,
  //twitterAuthProvider,
};
