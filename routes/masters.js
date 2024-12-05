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

  addTax,
  updateTax,
  getTaxList,
  toggleTaxActiveStatus,

  countriesList
} = require("../controllers/masterController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
// company master
router.post("/add-company", authMiddleware, upload.single("file"), addCompany);
router.post("/edit", authMiddleware, upload.single("file"), updateCompany);
router.post("/activateDeactivate", authMiddleware, activateDeactivateCompany);
router.get("/getCompaniesList", authMiddleware, getCompaniesList);

// Industry Master
router.post("/addIndustry", authMiddleware, addIndustry);
router.post("/updateIndustry", authMiddleware, updateIndustry);
router.post(
  "/toggleIndustryActiveStatus",
  authMiddleware,
  toggleIndustryActiveStatus
);
router.get("/industryList", authMiddleware, getIndustryList);

// Project Master
router.post("/addProject", authMiddleware, addProject);
router.post("/updateProject", authMiddleware, updateProject);
router.get("/projectList", authMiddleware, getProjectList);
router.post(
  "/toggleProjectActiveStatus",
  authMiddleware,
  toggleProjectActiveStatus
);

// Product Master
router.post("/addProduct", authMiddleware, addProduct);
router.post("/updateProduct", authMiddleware, updateProduct);
router.get("/productList", authMiddleware, getProductList);
router.post(
  "/toggleProductActiveStatus",
  authMiddleware,
  toggleProductActiveStatus
);

// Currency Master
router.post("/addCurrency", authMiddleware, addCurrency);
router.post("/updateCurrency", authMiddleware, updateCurrency);
router.get("/currencyList", authMiddleware, getCurrencyList);
router.post(
  "/toggleCurrencyActiveStatus",
  authMiddleware,
  toggleCurrencyActiveStatus
);

// Tax Master
router.post("/addTaxType", authMiddleware, addTax);
router.post("/updateTaxType", authMiddleware, updateTax);
router.get("/taxTypeList", authMiddleware, getTaxList);
router.post(
  "/toggleTaxTypeActiveStatus",
  authMiddleware,
  toggleTaxActiveStatus
);

// Country and States
router.get("/countriesList", authMiddleware, countriesList);


module.exports = router;
