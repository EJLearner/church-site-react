/* eslint-disable no-undef */
const firebase = jest.genMockFromModule('firebase');

const set = vi.fn(() => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-constant-condition
    if (true) {
      resolve();
    } else {
      reject();
    }
  });
});

const refObject = {
  child: vi.fn(function () {
    return {
      set: set,
    };
  }),
  on: vi.fn(),
  set: vi.fn(),
  update: vi.fn(),
};

const refStub = vi.fn(function () {
  return refObject;
});

const dbObject = {
  ref: refStub,
};

const getDatabase = function () {
  return dbObject;
};

firebase.initializeApp = vi.fn();
firebase.database = vi.fn(getDatabase);

module.exports = firebase;
