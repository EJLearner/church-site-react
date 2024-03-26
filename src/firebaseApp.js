// This import loads the firebase namespace.
import firebaseApp from 'firebase/compat/app';

// These imports load individual services into the firebase namespace.
import 'firebase/compat/auth';
import 'firebase/compat/database';

const config = {
  apiKey: 'AIzaSyAzTR9pqe-BTlPl_NrZLN6YqqyNxoLvtos',
  authDomain: 'ct-data-773e4.firebaseapp.com',
  databaseURL: 'https://ct-data-773e4.firebaseio.com',
  projectId: 'ct-data-773e4',
  storageBucket: '',
  messagingSenderId: '127519582002',
};

firebaseApp.initializeApp(config);

export const provider = new firebaseApp.auth.GoogleAuthProvider();
export const auth = firebaseApp.auth();
export default firebaseApp;
