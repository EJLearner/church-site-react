import firebase from '../firebase';
import {useState, useEffect} from 'react';
import constants from '../utils/constants';

function useFirebaseEvents() {
  const [events, setEventsList] = useState({});

  useEffect(() => {
    // FBH get a reference for the 'dates' top level prop of the data
    const datesRef = firebase.database().ref(constants.FB_REF_EVENTS);

    // FBH add a listener to the dates object, update on value change
    // listener gets the dates object using snapshot.val();
    // then pushes the udpated date object into the state
    datesRef.on('value', snapshot => {
      const retrievedDates = snapshot.val();
      const newState = {};

      Object.keys(retrievedDates).forEach(key => {
        const date = retrievedDates[key];
        // make an array of events
        if (date.events) {
          const events = Object.values(date.events).map(event => event);
          newState[key] = {events};
        }
      });

      setEventsList(newState);
    });
  }, []);

  return events;
}

export default useFirebaseEvents;
