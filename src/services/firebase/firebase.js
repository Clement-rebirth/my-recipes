// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaDklljNG0fqG3I29pTRY3Uo09O0JhjEY",
  authDomain: "my-recipes-5f5d6.firebaseapp.com",
  databaseURL: "https://my-recipes-5f5d6-default-rtdb.firebaseio.com",
  projectId: "my-recipes-5f5d6",
  storageBucket: "my-recipes-5f5d6.appspot.com",
  messagingSenderId: "1092479917736",
  appId: "1:1092479917736:web:69edb37ca30fb5fab3ac9d"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
