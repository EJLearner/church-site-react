import churchExterior from '../assets/main/images/church-exterior.png';
import dance from '../assets/main/images/event-content-template.png';

const backgroundSources = {
  CHURCH: churchExterior,
  DANCE: dance
};

const DEFAULT_BACKGROUND_SOURCE = backgroundSources.CHURCH;

const callbacks = {};

let backgroundSource = backgroundSources.CHURCH;

const backgroundStore = {
  dispatchAll() {
    Object.values(callbacks).forEach(callback => {
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

  unsubscribe(id, callback) {
    delete callbacks[id];
  }
};

backgroundStore.backgroundSources = backgroundSources;

export default backgroundStore;
