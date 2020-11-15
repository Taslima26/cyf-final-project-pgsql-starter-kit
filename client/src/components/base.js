//import * as firebase from "firebase/app";
import "firebase/auth";
var firebase = require('firebase/app');
//import * as firebase from "firebase/app";
import "firebase/auth";
//import firebase from 'firebase/app';
//const firebase = require('firebase/app');

const app =firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});

export default app;