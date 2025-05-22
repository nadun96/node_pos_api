const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  roles: { type: Array, required: true },
  isActive: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model("User", UserSchema);
