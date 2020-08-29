const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthly = new Schema(
  {
    userId: {
      type: String,
      required: true,
      max: 50,
    },
    first: {
      type: String,
      required: true,
      max: 50,
    },
    last: {
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
    Date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "Monthly Subscription",
  }
);

module.exports = Profile = mongoose.model("MonthlySubscription", monthly);
