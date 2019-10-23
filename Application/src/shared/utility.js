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
    console.log(isSymbol(value))
    isValid = !isSymbol(value) && isValid;
    symbol = !isSymbol(value);
  }

  return [
    isValid, [
      minimumLength,
      maximumLength,
      symbol
      ]
  ];
};

export const isSymbol = (str) => {
  return !/[~`!#$@.?%&[^*+=\-_';,/{}|":<>]/g.test(str);
 }
