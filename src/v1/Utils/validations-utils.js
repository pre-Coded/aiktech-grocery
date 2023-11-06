export const validate = (val, rules) => {
  let error = false;
  let msg = '';
  for (let rule of rules) {
    if (rule === 'isRequired') {
      error = requiredValidator(val);
      if (error) {
        msg = 'Input is required';
        break;
      }
    }
    if (rule === 'isEmail') {
      error = emailValidator(val);
      if (error) {
        msg = 'Email is not valid';
        break;
      }
    } else if (rule === 'isPhone') {
      error = phoneValidator(val);
      if (error) {
        msg = 'Phone number is not valid';
        break;
      }
    } else {
      error = false;
    }
  }
  return { error, msg: error ? msg : '' };
};

const requiredValidator = (val) => {
  if (!val) {
    return true;
  }
  return false;
}

const emailValidator = val => {
  if (!val) {
    return false;
  }
  if (
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      val
    )
  ) {
    return false;
  } else {
    return true;
  }
};

const phoneValidator = val => {
  if (!val) {
    return false;
  }
  if (/[0-9]/.test(val)) {
    if (String(val).length !== 10) {
      return true;
    }
    return false;
  } else {
    return true;
  }
};

export const checkValidData = (payload, errors) => {
  let err = false;
  for (let control of Object.keys(payload)) {
    if (errors[control] && errors[control]['error']) {
      err = true;
    }
  }

  return err;
};


export const findError = (key, errors, showErr) => {
  if (showErr) {
    if (errors && errors[key] && errors[key]['error']) {
      let err = errors[key]['msg'];
      return err;
    }
  }
  return '';
}

export const isRequired = (payload, keys) => {
  let err = false;
  for (let key of Object.keys(keys)) {
    if (!payload[key]) {
      err = true;
    }
  }
  return err;
}