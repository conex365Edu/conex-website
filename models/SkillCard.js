const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skrill = new Schema(
  {
    id: {
      type: String,
      required: true,
      max: 16,
    },
    name: {
      type: String,
      required: true,
      max: 20,
    },
    organization: {
      type: String,
      required: true,
      max: 20,
    },
    phone: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "Skrill Card",
  }
);

module.exports = Skrill = mongoose.model("SkrillCard", skrill);
