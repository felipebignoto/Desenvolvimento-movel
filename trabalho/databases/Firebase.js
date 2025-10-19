import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyDgQ5pjj42idNhYO7WC6RYdbDtgSlkpQAE",
  authDomain: "projeto-d72a2.firebaseapp.com",
  projectId: "projeto-d72a2",
  storageBucket: "projeto-d72a2.firebasestorage.app",
  messagingSenderId: "180601381457",
  appId: "1:180601381457:web:cbf71ee0547e6a2cc68e70",
  measurementId: "G-7ZBXZPG37X"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;