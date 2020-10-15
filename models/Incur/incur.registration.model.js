const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incurModel = new Schema(
  {
    RegisterId: {
      type: String,
      required: true,
      max: 10,
    },
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
      type: Number,
      required: true,
    },
    Number: {
      type: Number,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
      max: 6,
    },
    DOB: {
      type: String,
      required: true,
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
    Percentage: {
      type: Number,
      required: true,
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
  },
  {
    collection: "Incur Registration",
  }
);

module.exports = Profile = mongoose.model("IncurModel", incurModel);
