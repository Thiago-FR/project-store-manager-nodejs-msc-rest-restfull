const Joi = require('joi');

const validateJoi = (productId, quantity) => {
  const { error } = Joi.object({
    productId: Joi.number().min(1).required().messages({
      'any.required': '400|"productId" is required',
      'number.min': '422|"name" code min 1',
    }),
    quantity: Joi.number().min(1).positive()
      .strict()
      .required()
      .messages({
      'any.required': '400|"quantity" is required',
      'number.min': '422|"quantity" must be greater than or equal to 1',
      'number.positive': '422|"quantity" must be greater than or equal to 1',
    }),
  }).validate({ productId, quantity });

  return error;
};

module.exports = (req, _res, next) => {
  const sales = req.body;
  
  sales.forEach((item) => {
    const error = validateJoi(item.productId, item.quantity);
    if (error) {
      return next({
        error: error.details[0].message,
      });
    }
  });
  
  next();
};
