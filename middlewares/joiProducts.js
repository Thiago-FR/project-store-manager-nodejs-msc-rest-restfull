const Joi = require('joi');

const validateJoi = (name, quantity) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).required().messages({
      'any.required': '400|"name" is required',
      'string.min': '422|"name" length must be at least 5 characters long',
    }),
    quantity: Joi.number().min(1).positive()
      .strict()
      .required()
      .messages({
      'any.required': '400|"quantity" is required',
      'number.min': '422|"quantity" must be greater than or equal to 1',
      'number.positive': '422|"quantity" must be greater than or equal to 1',
    }),
  }).validate({ name, quantity });

  return error;
};

module.exports = (req, res, next) => {
  const { name, quantity } = req.body;
  const error = validateJoi(name, quantity);
  if (error) {
    return next({
      error: error.details[0].message,
    });
  }
  next();
};
