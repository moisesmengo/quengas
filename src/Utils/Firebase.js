import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAUnToKKcI6645judrdcU3sR8fXkM6l1d8",
    authDomain: "quengas-app.firebaseapp.com",
    projectId: "quengas-app",
    storageBucket: "quengas-app.appspot.com",
    messagingSenderId: "87767118055",
    appId: "1:87767118055:web:de58aa3c4e4f48a1a87242"
  };
  // Initialize Firebase
  export const firebaseapp = firebase.initializeApp(firebaseConfig);