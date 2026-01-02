// This import loads the firebase namespace.
import {initializeApp} from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAzTR9pqe-BTlPl_NrZLN6YqqyNxoLvtos',
  authDomain: 'ct-data-773e4.firebaseapp.com',
  databaseURL: 'https://ct-data-773e4.firebaseio.com',
  projectId: 'ct-data-773e4',
  storageBucket: '',
  messagingSenderId: '127519582002',
});

export default firebaseApp;
