const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conetplusSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
      max: 50,
    },
    Phonenumber: {
      type: Number,
    },
    Email: {
      type: String,
    },
    Address: {
      type: String,
    },
    Description: {
      type: String,
    },
  },
  {
    collection: "conexplus",
  }
);

module.exports = Profile = mongoose.model("conexplus", conetplusSchema);
