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
  addProject,
  updateProject,
  getProjectList,
  toggleProjectActiveStatus,
  addProduct,
  updateProduct,
  getProductList,
  toggleProductActiveStatus,

  addCurrency,
  updateCurrency,
  toggleCurrencyActiveStatus,
  getCurrencyList,
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

// Project Master
router.post("/addProject", authMiddleware, addProject);
router.post("/updateProject", authMiddleware, updateProject);
router.post("/projectList", authMiddleware, getProjectList);
router.post(
  "/toggleProjectActiveStatus",
  authMiddleware,
  toggleProjectActiveStatus
);

// Product Master
router.post("/addProduct", authMiddleware, addProduct);
router.post("/updateProduct", authMiddleware, updateProduct);
router.post("/productList", authMiddleware, getProductList);
router.post(
  "/toggleProductActiveStatus",
  authMiddleware,
  toggleProductActiveStatus
);

// Currency Master
// Product Master
router.post("/addCurrency", authMiddleware, addCurrency);
router.post("/updateCurrency", authMiddleware, updateCurrency);
router.post("/productList", authMiddleware, getCurrencyList);
router.post(
  "/toggleCurrencyActiveStatus",
  authMiddleware,
  toggleCurrencyActiveStatus
);

module.exports = router;
