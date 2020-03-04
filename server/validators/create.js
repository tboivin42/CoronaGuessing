const Joi = require('joi')

const create = Joi.object().keys({
  mail: Joi.string().email().required(),
  login: Joi.string().min(3).max(30).required(),
  password: Joi.string().regex(/[a-zA-Z].*/).min(6).max(100)
    .required(),
  message: Joi.string().min(5).max(50),
  latitude: Joi.number(),
  longitude: Joi.number()
})

module.exports = create
