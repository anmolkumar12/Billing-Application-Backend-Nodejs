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
  getCompaniesList,

  createCompanyLocation,
  updateCompanyLocation,
  getCompanyLocations,
  activateDeactivateCompanyLocation,

  createBankAccountType,
  updateBankAccountType,
  activateDeactivateBankAccountType,
  getBankAccountTypes,

  createCompanyAccount,
  updateCompanyAccount,
  activateDeactivateCompanyAccount,
  getCompanyAccounts,

  createProductionType,
  updateProductionType,
  activateOrDeactivateProductionType,
  getProductionTypes,

  createIndustryMaster,
  updateIndustryMaster,
  activateOrDeactivateIndustryMaster,
  getIndustryMasters,

  createGroupIndustry,
  updateGroupIndustry,
  activateOrDeactivateGroupIndustry,
  getGroupIndustries,

  createIndustryHead,
  updateIndustryHead,
  activateOrDeactivateIndustryHead,
  getIndustryHeads,

  createSalesManager,
  updateSalesManager,
  activateOrDeactivateSalesManager,
  getSalesManagers,

  createAccountManager,
  updateAccountsManager,
  activateOrDeactivateAccountsManager,
  getAccountManagers,
} = require("../controllers/masterController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Country
router.post("/addCountry", authMiddleware, addCountry);
router.post("/updateCountry", authMiddleware, updateCountry);
router.post(
  "/activateDeactivateCountry",
  authMiddleware,
  activateDeactivateCountry
);
router.post("/getCountriesList", authMiddleware, getCountriesList);

// State
router.post("/addState", authMiddleware, addState);
router.post("/updateState", authMiddleware, updateState);
router.post(
  "/activateDeactivateState",
  authMiddleware,
  activateDeactivateState
);
router.post("/getStatesList", authMiddleware, getStatesList);

// Region
router.post("/addRegion", authMiddleware, addRegion);
router.post("/updateRegion", authMiddleware, updateRegion);
router.post(
  "/activateDeactivateRegion",
  authMiddleware,
  activateDeactivateRegion
);
router.post("/getRegionsList", authMiddleware, getRegionsList);

// Company
router.post(
  "/addCompany",
  authMiddleware,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "digitalSign", maxCount: 1 },
  ]),
  addCompany
);
router.post(
  "/updateCompany",
  authMiddleware,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "digitalSign", maxCount: 1 },
  ]),
  updateCompany
);
router.post(
  "/activateDeactivateCompany",
  authMiddleware,
  activateDeactivateCompany
);
router.post("/getCompaniesList", authMiddleware, getCompaniesList);

// Company location master
router.post("/createCompanyLocation", authMiddleware, createCompanyLocation);
router.post("/updateCompanyLocation", authMiddleware, updateCompanyLocation);
router.post(
  "/activateDeactivateCompanyLocation",
  authMiddleware,
  activateDeactivateCompanyLocation
);
router.post("/getCompanyLocations", authMiddleware, getCompanyLocations);

// Account Type Master
router.post("/createBankAccountType", authMiddleware, createBankAccountType);
router.post("/updateBankAccountType", authMiddleware, updateBankAccountType);
router.post(
  "/activateDeactivateBankAccountType",
  authMiddleware,
  activateDeactivateBankAccountType
);
router.post("/getBankAccountTypes", authMiddleware, getBankAccountTypes);

// Account Type Master
router.post("/createCompanyAccount", authMiddleware, createCompanyAccount);
router.post("/updateCompanyAccount", authMiddleware, updateCompanyAccount);
router.post(
  "/activateDeactivateCompanyAccount",
  authMiddleware,
  activateDeactivateCompanyAccount
);
router.post("/getCompanyAccounts", authMiddleware, getCompanyAccounts);

// Account Type Master
router.post("/createProductionType", authMiddleware, createProductionType);
router.post("/updateProductionType", authMiddleware, updateProductionType);
router.post(
  "/activateOrDeactivateProductionType",
  authMiddleware,
  activateOrDeactivateProductionType
);
router.post("/getProductionTypes", authMiddleware, getProductionTypes);

// Industry Type Master
router.post("/createIndustryMaster", authMiddleware, createIndustryMaster);
router.post("/updateIndustryMaster", authMiddleware, updateIndustryMaster);
router.post(
  "/activateOrDeactivateIndustryMaster",
  authMiddleware,
  activateOrDeactivateIndustryMaster
);
router.post("/getIndustryMasters", authMiddleware, getIndustryMasters);

// Group Industry Master
router.post("/createGroupIndustry", authMiddleware, createGroupIndustry);
router.post("/updateGroupIndustry", authMiddleware, updateGroupIndustry);
router.post(
  "/activateOrDeactivateGroupIndustry",
  authMiddleware,
  activateOrDeactivateGroupIndustry
);
router.post("/getGroupIndustries", authMiddleware, getGroupIndustries);

// Group Industry Master
router.post("/createIndustryHead", authMiddleware, createIndustryHead);
router.post("/updateIndustryHead", authMiddleware, updateIndustryHead);
router.post(
  "/activateOrDeactivateIndustryHead",
  authMiddleware,
  activateOrDeactivateIndustryHead
);
router.post("/getIndustryHeads", authMiddleware, getIndustryHeads);

// Sales Manager Master
router.post("/createSalesManager", authMiddleware, createSalesManager);
router.post("/updateSalesManager", authMiddleware, updateSalesManager);
router.post(
  "/activateOrDeactivateSalesManager",
  authMiddleware,
  activateOrDeactivateSalesManager
);
router.post("/getSalesManagers", authMiddleware, getSalesManagers);

// Accounts Manager Master
router.post("/createAccountManager", authMiddleware, createAccountManager);
router.post("/updateAccountsManager", authMiddleware, updateAccountsManager);
router.post(
  "/activateOrDeactivateAccountsManager",
  authMiddleware,
  activateOrDeactivateAccountsManager
);
router.post("/getAccountManagers", authMiddleware, getAccountManagers);

module.exports = router;
