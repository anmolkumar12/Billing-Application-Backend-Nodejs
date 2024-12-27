const express = require("express");
const { 
  addCountry,
  updateCountry,
  activateDeactivateCountry,
  getCountriesList,

  addState,
  updateState,
  activateDeactivateState,
  getStatesList,

  addRegion,
  updateRegion,
  activateDeactivateRegion,
  getRegionsList,

  addCompany,
  updateCompany,
  activateDeactivateCompany,
  getCompaniesList
} = require("../controllers/masterController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Country
router.post("/addCountry", authMiddleware, addCountry);
router.post("/updateCountry", authMiddleware, updateCountry);
router.post("/activateDeactivateCountry", authMiddleware, activateDeactivateCountry);
router.post("/getCountriesList", authMiddleware, getCountriesList);

// State
router.post("/addState", authMiddleware, addState);
router.post("/updateState", authMiddleware, updateState);
router.post("/activateDeactivateState", authMiddleware, activateDeactivateState);
router.post("/getStatesList", authMiddleware, getStatesList);

// Region
router.post("/addRegion", authMiddleware, addRegion);
router.post("/updateRegion", authMiddleware, updateRegion);
router.post("/activateDeactivateRegion", authMiddleware, activateDeactivateRegion);
router.post("/getRegionsList", authMiddleware, getRegionsList);

// Company
router.post("/addCompany", authMiddleware, upload.fields([{ name: 'logo', maxCount: 1 },{ name: 'digitalSign', maxCount: 1 }]), addCompany);
router.post("/updateCompany", authMiddleware, upload.fields([{ name: 'logo', maxCount: 1 },{ name: 'digitalSign', maxCount: 1 }]), updateCompany);
router.post("/activateDeactivateCompany", authMiddleware, activateDeactivateCompany)
router.post("/getCompaniesList", authMiddleware, getCompaniesList);
module.exports = router;