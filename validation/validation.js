const Joi = require("@hapi/joi");

//Reset Password
const resetPassword = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

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
    Phonenumber: Joi.number().min(10).required(),
    Email: Joi.string().min(6).required().email(),
    Address: Joi.string().min(6).required(),
    Description: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const conexplusspeaker = (data) => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    Phonenumber: Joi.number().min(10).required(),
    Email: Joi.string().min(6).required().email(),
    Location: Joi.string().min(6).required(),
    Expertise: Joi.string().min(6).required(),
    Charge: Joi.string().min(1).required(),
  });

  return schema.validate(data);
};

const subscribe = (data) => {
  const schema = Joi.object({
    buyer_name: Joi.string().required(),
    phone: Joi.number().min(10).required(),
    email: Joi.string().min(6).required().email(),
  });

  return schema.validate(data);
};

const skillCard = (data) => {
  const schema = Joi.object({
    Id: Joi.string().required(),
    Name: Joi.string().required(),
    Organization: Joi.string().required(),
    Points: Joi.number().required(),
    Phone: Joi.number().min(10).required(),
  });

  return schema.validate(data);
};

const skillPoints = (data) => {
  const schema = Joi.object({
    Points: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports.conetregisterValidation = conetregisterValidation;
module.exports.conexplusregister = conexplusregister;
module.exports.subscribe = subscribe;
module.exports.conexplusspeaker = conexplusspeaker;
module.exports.resetPassword = resetPassword;
module.exports.skillcard = skillCard;
module.exports.skillpoints = skillPoints;
