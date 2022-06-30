/* eslint-disable no-undef */
const firebase = jest.genMockFromModule('firebase');

const set = jest.fn(() => {
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
  child: jest.fn(function () {
    return {
      set: set
    };
  }),
  on: jest.fn(),
  set: jest.fn(),
  update: jest.fn()
};

const refStub = jest.fn(function () {
  return refObject;
});

const dbObject = {
  ref: refStub
};

const getDatabase = function () {
  return dbObject;
};

firebase.initializeApp = jest.fn();
firebase.database = jest.fn(getDatabase);

module.exports = firebase;
