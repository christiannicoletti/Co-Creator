export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  let minimumLength = true;
  let maximumLength = true;
  let symbol = true;
  let phoneandemail = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    minimumLength = value.length >= rules.minLength;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    maximumLength = value.length <= rules.maxLength;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    maximumLength = value.length <= rules.maxLength;
  }

  if (rules.oneSymbolRequire) {
    isValid = isSymbol(value) && isValid;
    symbol = isSymbol(value);
  }

  if (rules.isPhoneAndEmail) {
    isValid = (isPhone(value) || isEmail(value)) && isValid;
    phoneandemail = isPhone(value) || isEmail(value);
  }

  return [isValid, [minimumLength, maximumLength, symbol]];
};

export const isSymbol = val => {
  return /[~`!#$@.?%&[^*+=\-_';,/{}|":<>]/.test(val);
};

export const isPhone = val => {
  return /^[2-9]\d{2}-\d{3}-\d{4}$/.test(val) || /^\d{10}$/.test(val);
};

export const isEmail = val => {
  return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(val);
};
