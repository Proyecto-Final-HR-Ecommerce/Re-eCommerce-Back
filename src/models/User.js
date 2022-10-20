const mongoose = require("mongoose");
const generateId = require("../helper/generateId");

const UserSchema = mongoose.Schema({
  image: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    Unique: true,
  },
  email: {
    type: String,
    Unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  token: {
    type: String,
    default: generateId(),
  },

  confirmed: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
