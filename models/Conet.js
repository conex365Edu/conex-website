const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conetSchema = new Schema({
  Name: {
    type: String,
    required: true,
    max: 50,
  },
  Phonenumber: {
    type: String,
  },
  Email: {
    type: String,
  },
  NativePlace: {
    type: String,
  },
  Expertise: {
    type: String,
  },
  Workrole: {
    type: String,
  },
  Suggestion: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("conet", conetSchema);
