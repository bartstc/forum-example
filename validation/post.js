const Validator = require('validator');
const isEmpty = require('../utils/isEmpty');

module.exports = postValidation = (data) => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  // the rest is not empty becouse it will be comes from user informations

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
