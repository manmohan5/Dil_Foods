const express = require("express");
const responseHelper = require("../responseHelper");
const userService = require("../services/userService");
const router = express.Router();

router.post("/register", (req, res, next) => {
  console.log("req", req.body);
  const values = req.body;
  return userService.register(values, res);
});

router.post("/login", (req, res, next) => {
  const values = req.body;
  return userService.login(values, res);
});

router.post("/verify-otp", (req, res, next) => {
  const values = req.body;
  return userService.verifyOtp(values, res);
});

router.post("/place-order", (req, res, next) => {
  const values = req.body;
  return userService.placeOrder(values, res);
});

router.get("/generate-otp", (req, res, next) => {
  return userService.generateOtp(res);
});


router.get("/my-orders", (req, res, next) => {
  return userService.findAllOrderForListing(res);
});

module.exports = router;
