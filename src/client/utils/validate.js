export const validateValue = (value, regExp) => {
  let validatedValue = '';
  for (const char of value) {
    if (char.match(regExp)) {
      validatedValue += char;
    }
  }
  return validatedValue;
};

export const updateErrors = (values, exclude = []) => {
  const errors = {};

  exclude.forEach((key) => {
    delete values[key];
  });

  Object.entries(values)
    .map(([key, value]) => {
      if (value === '') {
        errors[key] = true;
      }
    });

  return errors;
};
