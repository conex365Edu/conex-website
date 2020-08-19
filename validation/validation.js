const Joi = require("@hapi/joi");

//Conet Register Validation
const conetregisterValidation = (data) => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    Phonenumber: Joi.number().min(6).required(),
    Email: Joi.string().min(6).required().email(),
    NativePlace: Joi.string().min(6).required(),
    Expertise: Joi.string().min(6).required(),
    Workrole: Joi.string().min(6).required(),
    Suggestion: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const conexplusregister = (data) => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    Phonenumber: Joi.number().min(6).required(),
    Email: Joi.string().min(6).required().email(),
    Address: Joi.string().min(6).required(),
    Description: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const conexplusspeaker = (data) => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    Phonenumber: Joi.number().min(9).required(),
    Email: Joi.string().min(6).required().email(),
    Location: Joi.string().min(6).required(),
    Expertise: Joi.string().min(6).required(),
    Charge: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.conetregisterValidation = conetregisterValidation;
module.exports.conexplusregister = conexplusregister;
module.exports.conexplusspeaker = conexplusspeaker;
