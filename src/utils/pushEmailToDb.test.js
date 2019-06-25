import firebase from '../firebase';
import pushToSubscribedList from './pushEmailToDb';
import constants from './constants';
jest.mock('firebase');

describe('pushToSubscribedList', () => {
  let testEmail;
  let testSource;
  let setMethodMock;
  let childMethodMock;
  let refMethodMock;

  beforeEach(() => {
    testEmail = 'test@email.com';
    testSource = 'test source';
    setMethodMock = jest.fn();

    childMethodMock = jest.fn(() => {
      return {
        set: setMethodMock
      };
    });

    refMethodMock = jest.fn(() => {
      return {
        child: childMethodMock
      };
    });

    firebase.database = jest.fn(() => {
      return {
        ref: refMethodMock
      };
    });
  });

  it('firebase.database is called', () => {
    pushToSubscribedList(testEmail, testSource);

    expect(firebase.database).toBeCalled();
  });

  it('firebase.database().ref to be called with emails ref name', () => {
    pushToSubscribedList(testEmail, testSource);

    expect(firebase.database().ref).toBeCalledWith(
      constants.SUBSCRIBED_EMAILS_REF_NAME
    );
  });

  describe('child key', () => {
    it('firebase.database().ref().child to be called correct key (case 1)', () => {
      pushToSubscribedList('test@email.com', testSource);

      expect(firebase.database().ref().child).toBeCalledWith('test@email,com');
    });

    it('firebase.database().ref().child to be called correct key (case 2)', () => {
      pushToSubscribedList('test@mail.somewhere.com', testSource);

      expect(firebase.database().ref().child).toBeCalledWith(
        'test@mail,somewhere,com'
      );
    });

    it('firebase.database().ref().child to be called correct key (case 3)', () => {
      pushToSubscribedList('a.person-here@mail.somewhere.com', testSource);

      expect(firebase.database().ref().child).toBeCalledWith(
        'a,person-here@mail,somewhere,com'
      );
    });
  });

  describe('set object', () => {
    let setObject;

    beforeEach(() => {
      pushToSubscribedList(testEmail, testSource);

      setObject = firebase
        .database()
        .ref()
        .child().set.mock.calls[0][0];
    });

    it('uses email from argument', () => {
      expect(setObject.email).toBe(testEmail);
    });

    it('uses current time', () => {
      // dddd-dd-ddTdd:dd:dd
      expect(setObject.subscribeTime).toMatch(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
      );
    });

    it('uses subscribeSource', () => {
      expect(setObject.subscribeSource).toBe(testSource);
    });
  });
});
