const Joi = require("@hapi/joi");

const incurRegisteration = (data) => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    Address1: Joi.string().required(),
    Address2: Joi.string().required(),
    City: Joi.string().required(),
    State: Joi.string().required(),
    Zip: Joi.number().required(),
    Number: Joi.string().required().messages({
      "string.base": "Invalid type, Phone number must be a number",
      "string.empty": "Please enter your phone number",
    }),
    Email: Joi.string().min(6).required().email(),
    Gender: Joi.string().max(7).required(),
    DOB: Joi.string().required(),
    University: Joi.string().required(),
    College: Joi.string().required(),
    Stream: Joi.string().required(),
    Percentage: Joi.number().required(),
    YearOfCompletion: Joi.string().required(),
    Remarks: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.incurRegisteration = incurRegisteration;
