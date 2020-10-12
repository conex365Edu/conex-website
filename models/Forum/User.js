const { number, string } = require("@hapi/joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  workrole: {
    type: String,
    required: true,
  },
  verification: {
    type: String,
    default: "pending",
  },
  otp: {
    type: Number,
  },
  profilepic: {
    type: String,
    default:
      "https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);