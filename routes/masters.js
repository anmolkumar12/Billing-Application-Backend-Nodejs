const express = require("express");
const {
  addCompany,
  updateCompany,
  activateDeactivateCompany,
  getCompaniesList,
  addIndustry,
  updateIndustry,
  toggleIndustryActiveStatus,
  getIndustryList,
} = require("../controllers/masterController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
// company master
router.post("/add-company", authMiddleware, upload.single("file"), addCompany);
router.post("/edit", authMiddleware, updateCompany);
router.post("/activateDeactivate", authMiddleware, activateDeactivateCompany);
router.post("/getCompaniesList", authMiddleware, getCompaniesList);

// Industry Master
router.post("/addIndustry", authMiddleware, addIndustry);
router.post("/updateIndustry", authMiddleware, updateIndustry);
router.post(
  "/toggleIndustryActiveStatus",
  authMiddleware,
  toggleIndustryActiveStatus
);
router.post("/industryList", authMiddleware, getIndustryList);

module.exports = router;
