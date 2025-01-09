const express = require("express");
const {
  signup,
  login,
  changePassword,
  forgetPassword,
  validateToken
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/validatetoken",authMiddleware ,validateToken)
router.post("/change-password", changePassword);
router.post("/forget-password", forgetPassword);

module.exports = router;
