const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthly = new Schema(
  {
    Id: {
      type: String,
    },
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
    Amount: {
      type: String,
    },
  },
  {
    collection: "Monthly Subscription",
  }
);

module.exports = Profile = mongoose.model("MonthlySubscription", monthly);
