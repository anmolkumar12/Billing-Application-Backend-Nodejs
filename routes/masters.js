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

  createTechnologyGroup,
  updateTechnologyGroup,
  activateDeactivateTechnologyGroup,
  getTechnologyGroups,

  createTechnologySubgroup,
  updateTechnologySubgroup,
  activateDeactivateTechnologySubgroup,
  getTechnologySubgroups,

  createTechnologyName,
  updateTechnologyName,
  activateDeactivateTechnologyName,
  getTechnologyNames,

  createOEM,
  updateOEM,
  activateDeactivateOEM,
  getOEMs,

  createPoleStarProduct,
  updatePoleStarProduct,
  activateDeactivatePoleStarProduct,
  getPoleStarProducts,

  createProjectService,
  updateProjectServiceHandler,
  activateDeactivateProjectServiceHandler,
  getProjectServices,

  createFinancialYear,
  updateFinancialYearHandler,
  activateDeactivateFinancialYearHandler,
  getAllFinancialYearsHandler,

  addRegionHead,
  updateRegionHead,
  activateDeactivateRegionHead,
  getRegionHeadsList,

  createCurrencyHandler,
  updateCurrencyHandler,
  activateOrDeactivateCurrencyHandler,
  getAllCurrenciesHandler

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


// Currency Master

router.post("/createCurrency", authMiddleware, createCurrencyHandler);
router.post("/updateCurrency", authMiddleware, updateCurrencyHandler);
router.post(
  "/activateOrDeactivateCurrency",
  authMiddleware,
  activateOrDeactivateCurrencyHandler
);
router.post("/getCurrency", authMiddleware, getAllCurrenciesHandler);


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

// Technology Group Master
router.post("/createTechnologyGroup", authMiddleware, createTechnologyGroup);
router.post("/updateTechnologyGroup", authMiddleware, updateTechnologyGroup);
router.post(
  "/activateDeactivateTechnologyGroup",
  authMiddleware,
  activateDeactivateTechnologyGroup
);
router.post("/getTechnologyGroups", authMiddleware, getTechnologyGroups);

// Technology Subgroup Master
router.post(
  "/createTechnologySubgroup",
  authMiddleware,
  createTechnologySubgroup
);
router.post(
  "/updateTechnologySubgroup",
  authMiddleware,
  updateTechnologySubgroup
);
router.post(
  "/activateDeactivateTechnologySubgroup",
  authMiddleware,
  activateDeactivateTechnologySubgroup
);
router.post("/getTechnologySubgroups", authMiddleware, getTechnologySubgroups);

// Technology Master
router.post("/createTechnologyName", authMiddleware, createTechnologyName);
router.post("/updateTechnologyName", authMiddleware, updateTechnologyName);
router.post(
  "/activateDeactivateTechnologyName",
  authMiddleware,
  activateDeactivateTechnologyName
);
router.post("/getTechnologyNames", authMiddleware, getTechnologyNames);

// OEM Master
router.post("/createOEM", authMiddleware, createOEM);
router.post("/updateOEM", authMiddleware, updateOEM);
router.post("/activateDeactivateOEM", authMiddleware, activateDeactivateOEM);
router.post("/getOEMs", authMiddleware, getOEMs);

// Product Sales Master
router.post("/createPoleStarProduct", authMiddleware, createPoleStarProduct);
router.post("/updatePoleStarProduct", authMiddleware, updatePoleStarProduct);
router.post(
  "/activateDeactivatePoleStarProduct",
  authMiddleware,
  activateDeactivatePoleStarProduct
);
router.post("/getPoleStarProducts", authMiddleware, getPoleStarProducts);

// Project/Service Master
router.post("/createProjectService", authMiddleware, createProjectService);
router.post(
  "/updateProjectService",
  authMiddleware,
  updateProjectServiceHandler
);
router.post(
  "/activateDeactivateProjectService",
  authMiddleware,
  activateDeactivateProjectServiceHandler
);
router.post("/getProjectService", authMiddleware, getProjectServices);

// Project/Service Master
router.post("/createFinancialYear", authMiddleware, createFinancialYear);
router.post(
  "/updateFinancialYearHandler",
  authMiddleware,
  updateFinancialYearHandler
);
router.post(
  "/activateDeactivateFinancialYear",
  authMiddleware,
  activateDeactivateFinancialYearHandler
);
router.post(
  "/getAllFinancialYearsHandler",
  authMiddleware,
  getAllFinancialYearsHandler
);

// Region Head Master
router.post("/addRegionHead", authMiddleware, addRegionHead);
router.post("/updateRegionHead", authMiddleware, updateRegionHead);
router.post(
  "/activateDeactivateRegionHead",
  authMiddleware,
  activateDeactivateRegionHead
);
router.post("/getRegionHeadsList", authMiddleware, getRegionHeadsList);

module.exports = router;
