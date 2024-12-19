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
  addClientBillingInfo,
  updateClientBillingInfo,
  getClientBillingInfo,
  toggleClientBillingActiveStatus,

  addClientShippingInfo,
  updateClientShippingInfo,
  getClientShippingInfo,
  toggleClientShippingActiveStatus,

  addTechnology,
  updateTechnology,
  getTechnologyList,
  toggleTechnologyActiveStatus,

  addCompanyAddress,
  updateCompanyAddress,
  getCompanyAddressList,
  toggleCompanyAddressActiveStatus,
  
} = require("../controllers/masterController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Company Addresses API
router.post("/addCompanyAddress", authMiddleware, addCompanyAddress);
router.post("/updateCompanyAddress", authMiddleware, updateCompanyAddress);
router.post("/toggleCompanyAddressActiveStatus", authMiddleware, toggleCompanyAddressActiveStatus);
router.get("/getCompanyAddressList", authMiddleware, getCompanyAddressList);


// Technology API
router.post("/addTechnology", authMiddleware, addTechnology);
router.post("/updateTechnology", authMiddleware, updateTechnology);
router.post("/toggleTechnologyActiveStatus", authMiddleware, toggleTechnologyActiveStatus);
router.get("/getTechnologyList", authMiddleware, getTechnologyList);


// Company API
router.post("/add-company", authMiddleware, upload.single("file"), addCompany);
router.post("/edit", authMiddleware, upload.single("file"), updateCompany);
router.post("/activateDeactivate", authMiddleware, activateDeactivateCompany);
router.get("/getCompaniesList", authMiddleware, getCompaniesList);

// Industry API
router.post("/addIndustry", authMiddleware, addIndustry);
router.post("/updateIndustry", authMiddleware, updateIndustry);
router.post(
  "/toggleIndustryActiveStatus",
  authMiddleware,
  toggleIndustryActiveStatus
);
router.get("/industryList", authMiddleware, getIndustryList);

// Project API
router.post("/addProject", authMiddleware, addProject);
router.post("/updateProject", authMiddleware, updateProject);
router.post(
  "/toggleProjectActiveStatus",
  authMiddleware,
  toggleProjectActiveStatus
);
router.get("/projectList", authMiddleware, getProjectList);

// Product API
router.post("/addProduct", authMiddleware, addProduct);
router.post("/updateProduct", authMiddleware, updateProduct);
router.post(
  "/toggleProductActiveStatus",
  authMiddleware,
  toggleProductActiveStatus
);
router.get("/productList", authMiddleware, getProductList);

// Currency API
router.post("/addCurrency", authMiddleware, addCurrency);
router.post("/updateCurrency", authMiddleware, updateCurrency);
router.post(
  "/toggleCurrencyActiveStatus",
  authMiddleware,
  toggleCurrencyActiveStatus
);
router.get("/currencyList", authMiddleware, getCurrencyList);

// Tax API
router.post("/addTaxType", authMiddleware, addTax);
router.post("/updateTaxType", authMiddleware, updateTax);
router.post(
  "/toggleTaxTypeActiveStatus",
  authMiddleware,
  toggleTaxActiveStatus
);
router.get("/taxTypeList", authMiddleware, getTaxList);

// Country API
router.get("/countriesList", authMiddleware, countriesList);

// State API
router.post("/addState", authMiddleware, addState);
router.post("/updateState", authMiddleware, updateState);
router.post(
  "/toggleStateActiveStatus",
  authMiddleware,
  toggleStateActiveStatus
);
router.post("/statesList", authMiddleware, getStateList);

// Account API
router.post("/addAccount", authMiddleware, addAccount);
router.post("/updateAccountDetails", authMiddleware, updateAccount);
router.get("/accountsList", authMiddleware, getAccountList);
router.post(
  "/toggleAccountActiveStatus",
  authMiddleware,
  toggleAccountActiveStatus
);

// Client Info
router.post("/addClient", upload.single("file"), authMiddleware, addClient);
router.post("/updateClientDetails", upload.single("file"), authMiddleware, updateClient);
router.get("/clientsList", authMiddleware, getClients);
router.post(
  "/toggleClientsActiveStatus",
  authMiddleware,
  toggleClientActiveStatus
);

// Client Billing Info
router.post("/addClientBillingInfo", authMiddleware, addClientBillingInfo);
router.post("/updateClientBillingInfo", authMiddleware, updateClientBillingInfo);
router.get("/getClientBillingInfo", authMiddleware, getClientBillingInfo);
router.post("/toggleClientBillingActiveStatus", authMiddleware, toggleClientBillingActiveStatus);

// Client Shipping Info
router.post("/addClientShippingInfo", authMiddleware, addClientShippingInfo);
router.post("/updateClientShippingInfo", authMiddleware, updateClientShippingInfo);
router.get("/getClientShippingInfo", authMiddleware, getClientShippingInfo);
router.post("/toggleClientShippingActiveStatus", authMiddleware, toggleClientShippingActiveStatus);


module.exports = router;