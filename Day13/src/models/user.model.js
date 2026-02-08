const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: {
    type: String,
    unique: [true, "user already exists with this email"]
  }
});

const userModel = mongoose.model("userDay13", userSchema)

module.exports = userModel
