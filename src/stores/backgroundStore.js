import choir from '../assets/main/images/choir.jpg';
import christianEdPeople from '../assets/main/images/christian-ed-people.jpg';
import churchExterior from '../assets/main/images/church-exterior.jpg';
import dance from '../assets/main/images/dance-crop-1.jpg';
import shofarBlower from '../assets/main/images/shofar-blower.png';
import shofarBlowers from '../assets/main/images/shofar-blowers.jpg';

const backgroundSources = {
  CHOIR: choir,
  CHRISTIANEDPEOPLE: christianEdPeople,
  CHURCH: churchExterior,
  DANCE: dance,
  SHOFARBLOWER: shofarBlower,
  SHOFARBLOWERS: shofarBlowers
};

const DEFAULT_BACKGROUND_SOURCE = backgroundSources.CHOIR;

const callbacks = {};

let backgroundSource = DEFAULT_BACKGROUND_SOURCE;

const backgroundStore = {
  dispatchAll() {
    Object.values(callbacks).forEach((callback) => {
      callback(backgroundSource);
    });
  },

  setBackgroundSource(newSource) {
    if (Object.values(backgroundSources).includes(newSource)) {
      backgroundSource = newSource;
      backgroundStore.dispatchAll(backgroundSource);
    }
  },

  resetBackground() {
    backgroundStore.setBackgroundSource(DEFAULT_BACKGROUND_SOURCE);
  },

  getBackgroundSource() {
    return backgroundSource;
  },

  subscribe(id, callback) {
    callbacks[id] = callback;
  },

  unsubscribe(id) {
    delete callbacks[id];
  }
};

backgroundStore.backgroundSources = backgroundSources;

export default backgroundStore;
