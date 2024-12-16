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
  addState,
  updateState,
  getStateList,
  toggleStateActiveStatus,
  countriesList,
  addAccount,
  updateAccount,
  getAccountList,
  toggleAccountActiveStatus,

  addClient,
  updateClient,
  getClients,
  toggleClientActiveStatus,
} = require("../controllers/masterController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add-company", authMiddleware, upload.single("file"), addCompany);
router.post("/edit", authMiddleware, upload.single("file"), updateCompany);
router.post("/activateDeactivate", authMiddleware, activateDeactivateCompany);
router.get("/getCompaniesList", authMiddleware, getCompaniesList);

router.post("/addIndustry", authMiddleware, addIndustry);
router.post("/updateIndustry", authMiddleware, updateIndustry);
router.post(
  "/toggleIndustryActiveStatus",
  authMiddleware,
  toggleIndustryActiveStatus
);
router.get("/industryList", authMiddleware, getIndustryList);
router.post("/addProject", authMiddleware, addProject);
router.post("/updateProject", authMiddleware, updateProject);
router.get("/projectList", authMiddleware, getProjectList);
router.post(
  "/toggleProjectActiveStatus",
  authMiddleware,
  toggleProjectActiveStatus
);
router.post("/addProduct", authMiddleware, addProduct);
router.post("/updateProduct", authMiddleware, updateProduct);
router.get("/productList", authMiddleware, getProductList);
router.post(
  "/toggleProductActiveStatus",
  authMiddleware,
  toggleProductActiveStatus
);
router.post("/addCurrency", authMiddleware, addCurrency);
router.post("/updateCurrency", authMiddleware, updateCurrency);
router.get("/currencyList", authMiddleware, getCurrencyList);
router.post(
  "/toggleCurrencyActiveStatus",
  authMiddleware,
  toggleCurrencyActiveStatus
);
router.post("/addTaxType", authMiddleware, addTax);
router.post("/updateTaxType", authMiddleware, updateTax);
router.get("/taxTypeList", authMiddleware, getTaxList);
router.post(
  "/toggleTaxTypeActiveStatus",
  authMiddleware,
  toggleTaxActiveStatus
);
router.get("/countriesList", authMiddleware, countriesList);
router.post("/addState", authMiddleware, addState);
router.post("/updateState", authMiddleware, updateState);
router.post("/statesList", authMiddleware, getStateList);
router.post(
  "/toggleStateActiveStatus",
  authMiddleware,
  toggleStateActiveStatus
);

router.post("/addAccount", authMiddleware, addAccount);
router.post("/updateAccountDetails", authMiddleware, updateAccount);
router.get("/accountsList", authMiddleware, getAccountList);
router.post(
  "/toggleAccountActiveStatus",
  authMiddleware,
  toggleAccountActiveStatus
);

router.post("/addClient", upload.single("file"), authMiddleware, addClient);
router.post("/updateClientDetails", upload.single("file"), authMiddleware, updateClient);
router.get("/clientsList", authMiddleware, getClients);
router.post(
  "/toggleClientsActiveStatus",
  authMiddleware,
  toggleClientActiveStatus
);

module.exports = router;