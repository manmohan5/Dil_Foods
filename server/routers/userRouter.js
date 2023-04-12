const express = require("express");
const responseHelper = require("../responseHelper");
const userService = require("../services/userService");
const router = express.Router();

router.post("/verify-otp", (req, res, next) => {
  const values = req.body;
  return userService.verifyOtp(values, res);
});

router.post("/place-order", (req, res, next) => {
  const values = req.body;
  return userService.placeOrder(values, res);
});

router.get("/generate-otp", (req, res, next) => {
  const options = req.query;
  return userService.generateOtp(options,res);
});


router.get("/my-orders", (req, res, next) => {
  return userService.findAllOrderForListing(res);
});


router.get("/profile", (req, res, next) => {
  return userService.profile(res, req);
});

module.exports = router;
