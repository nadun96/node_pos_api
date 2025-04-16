const express = require("express");
const router = express.Router();
const User = require("../model/User");
const userController = require("../controller/User");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
