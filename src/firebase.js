import firebase from 'firebase';

// TODO: Switch to smaller format once I figure out how to do jest mocking this way
// import firebase from 'firebase/app';
// import 'firebase/database';
// import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAzTR9pqe-BTlPl_NrZLN6YqqyNxoLvtos',
  authDomain: 'ct-data-773e4.firebaseapp.com',
  databaseURL: 'https://ct-data-773e4.firebaseio.com',
  projectId: 'ct-data-773e4',
  storageBucket: '',
  messagingSenderId: '127519582002'
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
