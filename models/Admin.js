const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: "https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Admin", AdminSchema);