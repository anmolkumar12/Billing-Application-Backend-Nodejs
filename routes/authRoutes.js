const express = require("express");
const {
  signup,
  login,
  changePassword,
  forgetPassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/change-password", changePassword);
router.post("/forget-password", forgetPassword);

module.exports = router;
