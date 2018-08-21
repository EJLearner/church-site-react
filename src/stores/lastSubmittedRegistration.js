let _lastSubmittedRegistration;
let _lastRoutePath;

const getRegistrationData = () => {
  return _lastSubmittedRegistration;
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
