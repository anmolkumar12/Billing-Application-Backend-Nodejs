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
  getRegionsList
} = require("../controllers/masterController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Country
router.post("/addCountry", authMiddleware, addCountry);
router.post("/updateCountry", authMiddleware, updateCountry);
router.post("/activateDeactivateCountry", authMiddleware, activateDeactivateCountry);
router.get("/getCountriesList", authMiddleware, getCountriesList);

// State
router.post("/addState", authMiddleware, addState);
router.post("/updateState", authMiddleware, updateState);
router.post("/activateDeactivateState", authMiddleware, activateDeactivateState);
router.post("/getStatesList", authMiddleware, getStatesList);

// Region
router.post("/addRegion", authMiddleware, addRegion);
router.post("/updateRegion", authMiddleware, updateRegion);
router.post("/activateDeactivateRegion", authMiddleware, activateDeactivateRegion);
router.get("/getRegionsList", authMiddleware, getRegionsList);

module.exports = router;