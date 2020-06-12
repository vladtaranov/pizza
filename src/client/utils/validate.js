export const validateValue = (value, regExp) => {
  let validatedValue = '';
  for (const char of value) {
    if (char.match(regExp)) {
      validatedValue += char;
    }
  }
  return validatedValue;
};
