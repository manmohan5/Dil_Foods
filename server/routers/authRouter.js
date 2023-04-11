const express = require("express");
const userService = require("../services/userService");
const router = express.Router();

router.post("/register", (req, res, next) => {
  const values = req.body;
  return userService.register(values, res);
});

router.post("/login", (req, res, next) => {
  const values = req.body;
  return userService.login(values, req, res);
});
  

module.exports = router;
