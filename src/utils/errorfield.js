export const setFormikErrors = (errorObject, setErrors) => {
  var data = [{ email: 'test' }, { phonenumber: 'testjj' }, { address: 'testjj' }];
  const errors = Object.keys(errorObject);
  var data = {};
  errors.forEach(key => {
    data[key] = errorObject[key][0];
  });
  setErrors(data);
};
