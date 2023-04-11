const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const otpSchema = new Schema({
  date: { type: Date, default: Date.now },
  otp: { type: String, unique: true },
  active: { type: Number, default: 1 },
});

const Otp = model("Otp", otpSchema);

module.exports = Otp;
