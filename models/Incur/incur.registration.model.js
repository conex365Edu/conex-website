const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incurModel = new Schema({
  Name: {
    type: String,
    required: true,
    max: 50,
  },
  Address1: {
    type: String,
    required: true,
  },
  Address2: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
    max: 30,
  },
  State: {
    type: String,
    required: true,
    max: 20,
  },
  Zip: {
    type: String,
    required: true,
    max: 7,
  },
  Number: {
    type: String,
    required: true,
    max: 10,
  },
  Email: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
    max: 10,
  },
  DOB: {
    type: String,
    required: true,
    max: 8,
  },
  University: {
    type: String,
    required: true,
  },
  College: {
    type: String,
    required: true,
  },
  Stream: {
    type: String,
    required: true,
  },
  RegisterNumber: {
    type: String,
    required: true,
    max: 30,
  },
  Percentage: {
    type: String,
    required: true,
    max: 5,
  },
  YearOfCompletion: {
    type: String,
    required: true,
  },
  Remarks: {
    type: String,
    required: true,
    max: 10,
  },
});

module.exports = Profile = mongoose.model("IncurModel", incurModel);
