import { validateValue, updateErrors } from '../utils/validate';

const validateOrder = (values) => {
  const {
    name,
    street,
    city,
    zip,
    phone,
    comment
  } = values;

  const validatedValues = {
    name: validateValue(
      name, new RegExp('[A-Za-zäöü -.]')),
    street: validateValue(
      street, new RegExp('[A-Za-zäöü0-9,./ -]')),
    city: validateValue(
      city, new RegExp('[A-Za-zäöü0-9,./ -]')),
    zip: validateValue(
      zip, new RegExp('[0-9-]')),
    phone: validateValue(
      phone, new RegExp('[0-9+() -]')),
    comment: comment
  };

  return {
    ...validatedValues,
    errors: updateErrors(validatedValues, ['comment', 'city', 'zip'])
  }
};

export default validateOrder;
