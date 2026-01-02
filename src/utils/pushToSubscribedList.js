import '../firebaseApp';
import {getDatabase, ref} from 'firebase/database';

import constants from './constants';

const pushToSubscribedList = function (email, subscribeSource, name) {
  const emailFireBaseKey = email.replace(/\./g, ',');

  const subscribedEmailsDbRef = ref(
    getDatabase(),
    constants.SUBSCRIBED_EMAILS_REF_NAME,
  );

  const newEmail = subscribedEmailsDbRef.child(emailFireBaseKey);

  newEmail
    .set({
      email,
      name,
      subscribeTime: new Date().toISOString(),
      subscribeSource,
    })
    .catch(() => {
      // email likely exists already
    });
};

export default pushToSubscribedList;
