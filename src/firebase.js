import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtr9jIP_rRk0nObTXks_xgdi_4C_cvRns",
  authDomain: "pokemon-card-3756b.firebaseapp.com",
  projectId: "pokemon-card-3756b",
  storageBucket: "pokemon-card-3756b.appspot.com",
  messagingSenderId: "833233682550",
  appId: "1:833233682550:web:e76a6ba6ffafec23fb5f57",
  measurementId: "G-6HFRMZ2W1C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db; 