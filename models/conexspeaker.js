const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conexspeakerSchema = new Schema(
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
    Location: {
      type: String,
    },
    Expertise: {
      type: String,
    },
    Charge: {
      type: Number,
    },
  },
  {
    collection: "conexspeaker",
  }
);

module.exports = Profile = mongoose.model("conexspeaker", conexspeakerSchema);
