const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String, unique: false },
  phone: { type: String, unique: true },
  date: { type: Date, default: Date.now },
  email: { type: String, unique: true },
});

userSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj._v;
    delete returnObj.password;
  },
});

const User = model("User", userSchema);

module.exports = User;
