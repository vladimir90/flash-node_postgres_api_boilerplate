const Joi = require("joi");

module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
  });

  Joi.validate(req.body, schema, { abortEarly: false, escapeHtml: true })
    .then(() => {
      next();
    })
    .catch(next);
};
