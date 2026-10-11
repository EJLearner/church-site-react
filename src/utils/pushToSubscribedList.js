import '../firebaseApp';
import {child, getDatabase, ref, set} from 'firebase/database';

import constants from './constants';

const pushToSubscribedList = function (email, subscribeSource, name) {
  const emailFireBaseKey = email.replace(/\./g, ',');

  const subscribedEmailsDbRef = ref(
    getDatabase(),
    constants.SUBSCRIBED_EMAILS_REF_NAME,
  );

  set(child(subscribedEmailsDbRef, emailFireBaseKey), {
    email,
    name,
    subscribeTime: new Date().toISOString(),
    subscribeSource,
  }).catch(() => {
    // email likely exists already
  });
};

export default pushToSubscribedList;
