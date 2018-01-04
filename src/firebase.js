// src/firebase.js

import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAzTR9pqe-BTlPl_NrZLN6YqqyNxoLvtos',
  authDomain: 'ct-data-773e4.firebaseapp.com',
  databaseURL: 'https://ct-data-773e4.firebaseio.com',
  projectId: 'ct-data-773e4',
  storageBucket: '',
  messagingSenderId: '127519582002'
};

firebase.initializeApp(config);

export default firebase;
