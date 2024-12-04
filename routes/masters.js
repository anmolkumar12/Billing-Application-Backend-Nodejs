const express = require("express");
const {
  addCompany,
  updateCompany,
  activateDeactivateCompany,
  getCompaniesList,
} = require("../controllers/masterController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-company", authMiddleware, upload.single("file"), addCompany);
router.post("/edit", authMiddleware, updateCompany);
router.post("/activateDeactivate", authMiddleware, activateDeactivateCompany);
router.post("/getCompaniesList", authMiddleware, getCompaniesList);
module.exports = router;
