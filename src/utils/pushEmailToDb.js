import firebase from '../firebase';
import constants from '../utils/constants';

const pushToSubscribedList = function(email, subscribeSource) {
  const emailFireBaseKey = email.replace(/\./g, ',');

  const subscribedEmailsDbRef = firebase
    .database()
    .ref(constants.SUBSCRIBED_EMAILS_REF_NAME);

  const newEmail = subscribedEmailsDbRef.child(emailFireBaseKey);

  newEmail.set({
    email,
    subscribeTime: new Date().toISOString(),
    subscribeSource
  });

  /*

  firebase.database().ref(constants.SUBSCRIBED_EMAILS_REF_NAME).child(emailFireBaseKey).set({});

  */
};

export default pushToSubscribedList;
