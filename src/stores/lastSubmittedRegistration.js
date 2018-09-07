let _lastSubmittedRegistration;
let _lastRoutePath;

/**
 * Return the registration data that was saved
 * @param {bool} removeNameAndDob - returns data that does not includes child's name and dob
 */
const getRegistrationData = removeNameAndDob => {
  let returnedData = Object.assign({}, _lastSubmittedRegistration);

  if (removeNameAndDob) {
    delete returnedData.childName;
    delete returnedData.childDob;
  }

  return returnedData;
};

const getRoutePath = () => {
  return _lastRoutePath;
};

const resetRegistrationData = () => {
  _lastSubmittedRegistration = undefined;
  _lastRoutePath = undefined;
};

const saveRegistrationData = (data, routePath) => {
  _lastSubmittedRegistration = data;
  _lastRoutePath = routePath;
};

export {
  getRegistrationData,
  getRoutePath,
  resetRegistrationData,
  saveRegistrationData
};
