


const { errorHandler } = require("../utils/errorHandler.js");
const {
  createCountry,
  updateCountryDetails,
  activateDeactivateCountryDetails,
  getCountries,

  createState,
  updateStateDetails,
  activateDeactivateStateDetails,
  getStates,

  createRegion,
  updateRegionDetails,
  activateDeactivateRegionDetails,
  getRegions,

  createCompany,
  getCompanyById,
  updateCompanyDetails,
  activateDeactivateCompanyDetails,
  getCompanies,

  insertCompanyLocation,
  updateLocationDetails,
  getLocations,
  activateDeactivateLocation,

  insertBankAccountType,
  updateBankAccountTypeDetails,
  activateDeactivateAccountType,
  getBankAccountTypesList,

  insertCompanyAccount,
  updateCompanyAccountDetails,
  activateDeactivateCompanyAccountDetails,
  getCompanyAccountsList,
  getDefaultAccount,

  insertProductionType,
  updateProductionTypeDetails,
  updateProductionTypeStatus,
  getProductionTypesList,

  insertIndustryMaster,
  updateIndustryMasterDetails,
  updateIndustryMasterStatus,
  getIndustryMastersList,

  insertGroupIndustry,
  updateGroupIndustryDetails,
  updateGroupIndustryStatus,
  getGroupIndustriesList,

  insertIndustryHead,
  updateIndustryHeadDetails,
  updateIndustryHeadStatus,
  getIndustryHeadsList,

  insertSalesManager,
  updateSalesManagerDetails,
  updateSalesManagerStatus,
  getSalesManagersList,

  insertAccountManager,
  updateAccountManager,
  activateOrDeactivateAccountManager,
  getAccountManagersList,

  insertTechnologyGroup,
  updateTechnologyGroupDetails,
  activateDeactivateGroup,
  getTechnologyGroupsList,

  insertTechnologySubgroup,
  updateTechnologySubgroupDetails,
  activateDeactivateSubgroup,
  getAllTechnologySubgroups,

  insertTechnologyName,
  updateTechnologyNameDetails,
  activateDeactivateTechnologyNameStatus,
  getAllTechnologyNames,

  insertOEM,
  updateOEMDetails,
  activateDeactivateOEMStatus,
  getAllOEMs,

  insertPoleStarProduct,
  updatePoleStarProductDetails,
  activateDeactivatePoleStarProductStatus,
  getAllPoleStarProducts,

  insertProjectService,
  updateProjectService,
  activateDeactivateProjectService,
  getAllProjectServices,

  insertFinancialYear,
  updateFinancialYear,
  activateDeactivateFinancialYear,
  getAllFinancialYears,

  createRegionHead,
  updateRegionHeadDetails,
  activateDeactivateRegionHeadDetails,
  getRegionHeads,

  createCurrency,
  updateCurrency,
  activateOrDeactivateCurrency,
  getAllCurrencies,
  getCurrencyHistory,

  createTax,
  updateTax,
  activateOrDeactivateTax,
  getAllTaxes,

  insertClientType,
  updateClientType,
  activateDeactivateClientType,
  getAllClientTypes,

  createClient,
  updateClientDetails,
  activateDeactivateClientDetails,
  getClientById,
  getClients,

  createClientContact,
  updateClientContactDetails,
  activateDeactivateClientContactDetails,
  getClientContacts,

  // Functions for client_bill_to_info
  insertClientBillTo,
  updateClientBillToDetails,
  activateDeactivateClientBillToDetails,
  getClientBillToDetails,

  // Functions for client_ship_to_info
  insertClientShipTo,
  updateClientShipToDetails,
  activateDeactivateClientShipToDetails,
  getClientShipToDetails,
  // Functions for client_group_info
  insertClientGroup,
  updateClientGroupDetails,
  activateDeactivateClientGroupDetails,
  getClientGroupsDetails,


  getPoContractConfigurationModel,
  getPoContractConfigurationData,
  getPoCascadingConfigurationData,

  insertPoContract,
  updatePoContract,
  activateDeactivatePoContract,
  getAllPoContracts,

  updateClientMSA,

  insertInvoice,
  updateInvoice,
  activateDeactivateInvoice,
  getAllInvoices

} = require("../models/masterModel");

// Country
const addCountry = async (req, res) => {
  const {
    code,
    name,
    language,
    phoneCode,
    addressAdditionalFields,
    bankAccAdditionalFields,
    companyAddtionalFields,
    isActive,
    updatedBy,
  } = req.body;

  try {
    await createCountry(
      code,
      name,
      language,
      phoneCode,
      addressAdditionalFields,
      bankAccAdditionalFields,
      companyAddtionalFields,
      isActive,
      updatedBy
    );

    res.status(201).json({
      statusCode: 201,
      message: "Country created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("country", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};


const updateCountry = async (req, res) => {
  const {
    countryId,
    code,
    name,
    language,
    phoneCode,
    addressAdditionalFields,
    bankAccAdditionalFields,
    companyAddtionalFields,
    isActive,
    updatedBy,
  } = req.body;

  if (!countryId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Country ID is required",
    });
  }

  try {
    await updateCountryDetails(
      countryId,
      code,
      name,
      language,
      phoneCode,
      addressAdditionalFields,
      bankAccAdditionalFields,
      companyAddtionalFields,
      isActive,
      updatedBy
    );

    res.status(200).json({
      statusCode: 200,
      message: "Country updated successfully",
    });
  } catch (err) {
    const { statusCode, message } = errorHandler("country", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateCountry = async (req, res) => {
  const { countryId, isActive, updatedBy } = req.body;

  try {
    await activateDeactivateCountryDetails(countryId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Country ${isActive == 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getCountriesList = async (req, res) => {
  try {
    const countries = await getCountries();
    res.status(200).json({
      statusCode: 200,
      countries,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

// State
const addState = async (req, res) => {
  const {
    countryId, // Country ID (foreign key referencing country_info table)
    stateName, // The name of the state (e.g., "California")
    stateCode, // The unique code for the state (e.g., "CA")
    gstCode, // GST code for the state (if applicable)
    isActive, // Status: Active or Inactive
    updatedBy, // User who is updating this information
  } = req.body;

  try {
    await createState(
      countryId,
      stateName,
      stateCode,
      gstCode,
      isActive,
      updatedBy
    );

    res.status(201).json({
      statusCode: 201,
      message: "State created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("state", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateState = async (req, res) => {
  const {
    stateId, // ID of the state to update
    countryId, // Country ID (foreign key referencing country_info table)
    stateName, // The name of the state (e.g., "California")
    stateCode, // The unique code for the state (e.g., "CA")
    gstCode, // GST code for the state (if applicable)
    isActive, // Status: Active or Inactive
    updatedBy, // User who is updating this information
  } = req.body;

  if (!stateId) {
    return res.status(400).json({
      statusCode: 400,
      message: "State ID is required",
    });
  }

  try {
    await updateStateDetails(
      stateId,
      countryId,
      stateName,
      stateCode,
      gstCode,
      isActive,
      updatedBy
    );

    res.status(200).json({
      statusCode: 200,
      message: "State updated successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("state", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateState = async (req, res) => {
  const { stateId, isActive, updatedBy } = req.body;

  try {
    await activateDeactivateStateDetails(stateId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `State ${isActive == 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getStatesList = async (req, res) => {
  const { countryId } = req.body;

  try {
    const states = await getStates(countryId); // Pass countryId to the function

    res.status(200).json({
      statusCode: 200,
      states,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

// Regions
const addRegion = async (req, res) => {
  const {
    countryId, // Country ID (foreign key referencing country_info table)
    regionName, // The name of the region (e.g., "Midwest")
    regionCode, // The unique code for the region (e.g., "MW")
    stateIds, // State ID (foreign key referencing state_info table)
    isActive, // Status: Active or Inactive
    updatedBy, // User who is updating this information
    regionHeadName, // Name of the region head
    regionHeadEcode, // Employee code of the region head
    regionHeadEmail, // Email of the region head
    fromDate, // Start date of the region's activity
  } = req.body;

  try {
    await createRegion(
      countryId,
      regionName,
      regionCode,
      stateIds,
      isActive,
      updatedBy,
      regionHeadName,
      regionHeadEcode,
      regionHeadEmail,
      fromDate
    );

    res.status(201).json({
      statusCode: 201,
      message: "Region created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("region", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateRegion = async (req, res) => {
  const {
    regionId, // ID of the region to update
    countryId, // Country ID (foreign key referencing country_info table)
    regionName, // The name of the region (e.g., "Midwest")
    regionCode, // The unique code for the region (e.g., "MW")
    stateIds, // State ID (foreign key referencing state_info table)
    isActive, // Status: Active or Inactive
    updatedBy, // User who is updating this information
    regionHeadName, // Name of the region head
    regionHeadEcode, // Employee code of the region head
    regionHeadEmail, // Email of the region head
    fromDate, // Start date of the region's activity
  } = req.body;

  if (!regionId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Region ID is required",
    });
  }

  try {
    await updateRegionDetails(
      regionId,
      countryId,
      regionName,
      regionCode,
      stateIds,
      isActive,
      updatedBy,
      regionHeadName,
      regionHeadEcode,
      regionHeadEmail,
      fromDate
    );

    res.status(200).json({
      statusCode: 200,
      message: "Region updated successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("region", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateRegion = async (req, res) => {
  const { regionId, isActive, updatedBy } = req.body;

  try {
    await activateDeactivateRegionDetails(regionId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Region ${isActive == 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getRegionsList = async (req, res) => {
  const { countryId } = req.body; // Get countryId and stateId from query params if provided

  try {
    const regions = await getRegions(countryId); // Pass countryId and stateId to the function

    res.status(200).json({
      statusCode: 200,
      regions,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

// Company
const addCompany = async (req, res) => {
  const {
    countryId,
    companyName,
    companyCode, // Added companyCode
    Website,
    Email,
    description,
    companyAddtionalFields,
    isActive,
    updatedBy,
    independent, // 0 or 1 to define whether the company is independent
    parentCompanyId,
  } = req.body;

  // Access the files from req.files

  const logoPath = req.files.logo ? req.files.logo[0].path.replace("\\", "/") : null;
  const digitalSignPath = req.files.digitalSign ? req.files.digitalSign[0].path.replace("\\", "/") : null;

  try {
    await createCompany(
      countryId,
      companyName,
      companyCode, // Pass companyCode
      Website,
      Email,
      description,
      companyAddtionalFields,
      isActive,
      updatedBy,
      logoPath,
      independent,
      parentCompanyId,
      digitalSignPath
    );
    res.status(201).json({
      statusCode: 201,
      message: "Company created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("company", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateCompany = async (req, res) => {
  const {
    countryId,
    companyId,
    companyName,
    companyCode, // Added companyCode
    Website,
    Email,
    description,
    companyAddtionalFields,
    isActive,
    updatedBy,
    independent, // 0 or 1 to define whether the company is independent
    parentCompanyId,
  } = req.body;

  // Access the files from req.files
  const logoPath = req.files.logo ? req.files.logo[0].path.replace("\\", "/") : null;
  const digitalSignPath = req.files.digitalSign ? req.files.digitalSign[0].path.replace("\\", "/") : null;

  if (!companyId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Company ID is required",
    });
  }

  try {
    // Fetch existing company data from the database to retain old file paths if no new files are provided
    const company = await getCompanyById(companyId); // Fetch the current data from the database

    // If no new logo or digital signature file, retain the old values
    const updatedLogoPath = logoPath || company.logoPath; // Default to old logo if no new file
    const updatedDigitalSignPath = digitalSignPath || company.digitalSignPath; // Default to old digitalSignPath if no new file

    const result = await updateCompanyDetails(
      countryId,
      companyId,
      companyName,
      companyCode, // Pass companyCode
      Website,
      Email,
      description,
      companyAddtionalFields,
      isActive,
      updatedLogoPath,
      updatedBy,
      independent,
      parentCompanyId,
      updatedDigitalSignPath
    );

    res.status(200).json({
      statusCode: 200,
      message: "Company updated successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("company", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateCompany = async (req, res) => {
  const { companyId, isActive, updatedBy } = req.body;

  try {
    await activateDeactivateCompanyDetails(companyId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Company ${isActive == 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating company",
    });
  }
};

const getCompaniesList = async (req, res) => {
  try {
    const companies = await getCompanies(); // Fetch all companies without isActive filter

    res.status(200).json({
      statusCode: 200,
      companies,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while fetching companies list",
    });
  }
};

// Company Location Master
// Company Location Master
const createCompanyLocation = async (req, res) => {
  const {
    companyId,
    countryId,
    stateId,
    address1,
    address2,
    address3,
    additionalAddressDetails,
    isDefaultAddress,
    isActive,
    updatedBy,
  } = req.body;

  try {
    await insertCompanyLocation(
      companyId,
      countryId,
      stateId,
      address1,
      address2,
      address3,
      additionalAddressDetails,
      isDefaultAddress,
      isActive,
      updatedBy
    );

    res.status(201).json({
      statusCode: 201,
      message: "Company Location created successfully",
    });
  } catch (err) {
    console.error("Error creating company location:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateCompanyLocation = async (req, res) => {
  const {
    locationId,
    companyId,
    countryId,
    stateId,
    address1,
    address2,
    address3,
    additionalAddressDetails,
    isDefaultAddress,
    isActive,
    updatedBy,
  } = req.body;

  if (!locationId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Location ID is required",
    });
  }

  try {
    await updateLocationDetails(
      locationId,
      companyId,
      countryId,
      stateId,
      address1,
      address2,
      address3,
      additionalAddressDetails,
      isDefaultAddress,
      isActive,
      updatedBy
    );

    res.status(200).json({
      statusCode: 200,
      message: "Company Location updated successfully",
    });
  } catch (err) {
    console.error("Error updating company location:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating company location",
    });
  }
};


const getCompanyLocations = async (req, res) => {
  const { companyId } = req.body; // Get companyId from query params

  try {
    // If companyId is provided, filter by companyId; otherwise, fetch all locations
    const locations = await getLocations(companyId);

    res.status(200).json({
      statusCode: 200,
      locations,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const activateDeactivateCompanyLocation = async (req, res) => {
  const { locationId, isActive, updatedBy } = req.body;

  if (!locationId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Location ID is required",
    });
  }

  try {
    await activateDeactivateLocation(locationId, isActive, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: `Company location ${isActive === 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating company location",
    });
  }
};

// Account Type Master
const createBankAccountType = async (req, res) => {
  const {
    countryId, // Country ID (foreign key referencing country_info table)
    accountTypeName, // Name of the bank account type (e.g., "Saving", "Current")
    description, // Description of the account type
    isActive, // Status: Active (1) or Inactive (0)
    updatedBy, // User who is updating this information
  } = req.body;

  try {
    await insertBankAccountType(
      countryId,
      accountTypeName,
      description,
      isActive,
      updatedBy
    );

    res.status(201).json({
      statusCode: 201,
      message: "Bank Account Type created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("bankAccountType", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateBankAccountType = async (req, res) => {
  const {
    accountTypeId, // ID of the bank account type to update
    countryId, // Country ID
    accountTypeName, // Name of the bank account type
    description, // Description of the account type
    isActive, // Status: Active (1) or Inactive (0)
    updatedBy, // User who is updating this information
  } = req.body;

  if (!accountTypeId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Account Type ID is required",
    });
  }

  try {
    await updateBankAccountTypeDetails(
      accountTypeId,
      countryId,
      accountTypeName,
      description,
      isActive,
      updatedBy
    );

    res.status(200).json({
      statusCode: 200,
      message: "Bank Account Type updated successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("bankAccountType", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateBankAccountType = async (req, res) => {
  const { accountTypeId, isActive, updatedBy } = req.body;

  if (!accountTypeId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Account Type ID is required",
    });
  }

  try {
    await activateDeactivateAccountType(accountTypeId, isActive, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: `Bank Account Type ${isActive === 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating bank account type",
    });
  }
};

const getBankAccountTypes = async (req, res) => {
  const { countryId } = req.body; // Get countryId from query params

  try {
    const accountTypes = await getBankAccountTypesList(countryId);

    res.status(200).json({
      statusCode: 200,
      accountTypes,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

// Company Account Master
const createCompanyAccount = async (req, res) => {
  const {
    companyId,
    isDefaultAccount,
    bankAccountTypeId,
    bankName,
    bankAddress,
    accountNumber,
    countryId,
    isActive,
    updatedBy,
    additionalFieldDetails,
  } = req.body;

  try {
    if (isDefaultAccount) {
      // Check if a default account already exists for the company
      const existingDefaultAccount = await getDefaultAccount(companyId);
      if (existingDefaultAccount) {
        return res.status(400).json({
          statusCode: 400,
          message:
            "A default account already exists. Please disable the current default account before making this one the default.",
        });
      }
    }

    await insertCompanyAccount(
      companyId,
      isDefaultAccount,
      bankAccountTypeId,
      bankName,
      bankAddress,
      accountNumber,
      countryId,
      isActive,
      updatedBy,
      additionalFieldDetails
    );

    res.status(201).json({
      statusCode: 201,
      message: "Company Account created successfully",
    });
  } catch (err) {
    console.error("Error creating company account:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating company account",
    });
  }
};

const updateCompanyAccount = async (req, res) => {
  const {
    accountId,
    companyId,
    isDefaultAccount,
    bankAccountTypeId,
    bankName,
    bankAddress,
    accountNumber,
    countryId,
    isActive,
    updatedBy,
    additionalFieldDetails,
  } = req.body;

  if (!accountId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Account ID is required",
    });
  }

  try {
    if (isDefaultAccount) {
      // Check if a default account already exists for the company
      const existingDefaultAccount = await getDefaultAccount(companyId);

      if (existingDefaultAccount && existingDefaultAccount.id !== accountId) {
        return res.status(400).json({
          statusCode: 400,
          message:
            "A default account already exists. Please disable the current default account before making this one the default.",
        });
      }
    }

    await updateCompanyAccountDetails(
      accountId,
      companyId,
      isDefaultAccount,
      bankAccountTypeId,
      bankName,
      bankAddress,
      accountNumber,
      countryId,
      isActive,
      updatedBy,
      additionalFieldDetails
    );

    res.status(200).json({
      statusCode: 200,
      message: "Company Account updated successfully",
    });
  } catch (err) {
    console.error("Error updating company account:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating company account",
    });
  }
};

const activateDeactivateCompanyAccount = async (req, res) => {
  const { accountId, isActive, updatedBy } = req.body;

  if (!accountId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Account ID is required",
    });
  }

  try {
    await activateDeactivateCompanyAccountDetails(
      accountId,
      isActive,
      updatedBy
    );

    res.status(200).json({
      statusCode: 200,
      message: `Company Account ${isActive === 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating company account",
    });
  }
};

const getCompanyAccounts = async (req, res) => {
  const { companyId } = req.body;

  try {
    const companyAccounts = await getCompanyAccountsList(companyId);

    res.status(200).json({
      statusCode: 200,
      companyAccounts,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while fetching company accounts",
    });
  }
};

// Production Type Master
const createProductionType = async (req, res) => {
  const {
    productionTypeName, // Production Type Name
    updatedBy, // User updating the information
    isActive = 1, // Default value is 1 (active)
  } = req.body;

  try {
    await insertProductionType(productionTypeName, updatedBy, isActive);

    res.status(201).json({
      statusCode: 201,
      message: "Production Type created successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating production type",
    });
  }
};

const updateProductionType = async (req, res) => {
  const {
    productionTypeId, // ID of the production type to update
    productionTypeName, // Updated Production Type Name
    updatedBy, // User updating the information
    isActive, // isActive status (1 or 0)
  } = req.body;

  if (!productionTypeId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Production Type ID is required",
    });
  }

  try {
    await updateProductionTypeDetails(
      productionTypeId,
      productionTypeName,
      updatedBy,
      isActive
    );

    res.status(200).json({
      statusCode: 200,
      message: "Production Type updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating production type",
    });
  }
};

const activateOrDeactivateProductionType = async (req, res) => {
  const { productionTypeId, isActive, updatedBy } = req.body;

  if (!productionTypeId || isActive === undefined) {
    return res.status(400).json({
      statusCode: 400,
      message: "Production Type ID and isActive are required",
    });
  }

  try {
    // Toggle isActive based on the value of isActive (0 or 1)
    await updateProductionTypeStatus(productionTypeId, isActive, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: `Production Type ${isActive ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating production type status",
    });
  }
};

const getProductionTypes = async (req, res) => {
  try {
    const productionTypes = await getProductionTypesList();

    res.status(200).json({
      statusCode: 200,
      productionTypes,
    });
  } catch (err) {
    console.error("Error retrieving production types:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while fetching production types",
    });
  }
};

// Industry Master
const createIndustryMaster = async (req, res) => {
  const {
    industryName, // Industry Name
    subIndustryCategory, // Comma-separated string for Sub-Industry Category
    updatedBy, // User updating the record
    isActive = 1, // Default value is 1 (active)
  } = req.body;

  try {
    await insertIndustryMaster(
      industryName,
      subIndustryCategory,
      updatedBy,
      isActive
    );

    res.status(201).json({
      statusCode: 201,
      message: "Industry Master created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("subindustry", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateIndustryMaster = async (req, res) => {
  const {
    industryMasterId, // ID of the industry master record to update
    industryName, // Updated Industry Name
    subIndustryCategory, // Updated Sub-Industry Category
    updatedBy, // User who updated
    isActive, // Active status (1 or 0)
  } = req.body;

  if (!industryMasterId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Industry Master ID is required",
    });
  }

  try {
    await updateIndustryMasterDetails(
      industryMasterId,
      industryName,
      subIndustryCategory,
      updatedBy,
      isActive
    );

    res.status(200).json({
      statusCode: 200,
      message: "Industry Master updated successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("subindustry", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateOrDeactivateIndustryMaster = async (req, res) => {
  const { industryMasterId, isActive, updatedBy } = req.body;

  if (!industryMasterId || isActive === undefined) {
    return res.status(400).json({
      statusCode: 400,
      message: "Industry Master ID and isActive are required",
    });
  }

  try {
    await updateIndustryMasterStatus(industryMasterId, isActive, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: `Industry Master ${isActive ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating industry master status",
    });
  }
};

const getIndustryMasters = async (req, res) => {
  try {
    const industryMasters = await getIndustryMastersList();

    res.status(200).json({
      statusCode: 200,
      industryMasters,
    });
  } catch (err) {
    console.error("Error retrieving industry masters:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while fetching industry masters",
    });
  }
};

// Industries Group Master
const createGroupIndustry = async (req, res) => {
  const {
    groupIndustryName, // Name of Group Industry
    industryIds, // Comma-separated Industry IDs (string)
    updatedBy, // User who updated
    isActive = 1, // Default value is 1 (active)
  } = req.body;

  try {
    // Insert the group industry along with the comma-separated industry IDs
    await insertGroupIndustry(
      groupIndustryName,
      industryIds,
      updatedBy,
      isActive
    );

    res.status(201).json({
      statusCode: 201,
      message: "Group Industry created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("groupIndustry", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateGroupIndustry = async (req, res) => {
  const {
    groupIndustryId, // ID of the group industry record to update
    groupIndustryName, // Updated Name of Group Industry
    industryIds, // Updated comma-separated industry IDs (string)
    updatedBy, // User who updated
    isActive, // Active status (1 or 0)
  } = req.body;

  if (!groupIndustryId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Group Industry ID is required",
    });
  }

  try {
    // Update the group industry details with the new industry IDs
    await updateGroupIndustryDetails(
      groupIndustryId,
      groupIndustryName,
      industryIds,
      updatedBy,
      isActive
    );

    res.status(200).json({
      statusCode: 200,
      message: "Group Industry updated successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("groupIndustry", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateOrDeactivateGroupIndustry = async (req, res) => {
  const { groupIndustryId, isActive, updatedBy } = req.body;

  if (!groupIndustryId || isActive === undefined) {
    return res.status(400).json({
      statusCode: 400,
      message: "Group Industry ID and isActive are required",
    });
  }

  try {
    await updateGroupIndustryStatus(groupIndustryId, isActive, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: `Group Industry ${isActive ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    console.error("Error updating Group Industry status:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating Group Industry status",
    });
  }
};

const getGroupIndustries = async (req, res) => {
  try {
    const groupIndustries = await getGroupIndustriesList();

    res.status(200).json({
      statusCode: 200,
      groupIndustries,
    });
  } catch (err) {
    console.error("Error retrieving Group Industries:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while fetching Group Industries",
    });
  }
};

// Industryhead Master
const createIndustryHead = async (req, res) => {

  const {
    code,
    industry_head_email,
    companyId,
    industryHeadName,
    industryIds,
    isRegionWise,
    countryIds,
    regionIds,
    stateIds,
    startDate,
    endDate,
    updatedBy,
    isActive = 1,
  } = req.body;

  try {
    console.log('hhhhhhhhhhh--->>>>', code, industry_head_email);

    const finalResult = await insertIndustryHead(
      code,
      industry_head_email,
      companyId,
      industryHeadName,
      industryIds,
      isRegionWise,
      countryIds,
      regionIds,
      stateIds,
      startDate,
      endDate,
      updatedBy,
      isActive
    );

    console.log('finalRes--->>>>', finalResult);

    if (finalResult && finalResult.status == 'existing') {
      res.status(400).json({
        statusCode: 400,
        // message: `This region already has a region head ${finalResult.existingRegionHead}`,
        message: finalResult.conflictMessage
      });
    } else {
      res.status(201).json({
        statusCode: 201,
        message: "Industry Head created successfully",
      });
    }
  } catch (err) {
    console.error("Error creating industry head:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating industry head",
    });
  }
};

const updateIndustryHead = async (req, res) => {
  const {
    code,
    industry_head_email,
    companyId,
    industryHeadId,
    industryHeadName,
    industryIds,
    isRegionWise,
    countryIds,
    regionIds,
    stateIds,
    startDate,
    endDate,
    updatedBy,
    isActive,
  } = req.body;

  if (!industryHeadId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Industry Head ID is required",
    });
  }

  try {
    const finalResult = await updateIndustryHeadDetails(
      code,
      industry_head_email,
      companyId,
      industryHeadId,
      industryHeadName,
      industryIds,
      isRegionWise,
      countryIds,
      regionIds,
      stateIds,
      startDate,
      endDate,
      updatedBy,
      isActive
    );

    if (finalResult && finalResult.status == 'existing') {
      res.status(400).json({
        statusCode: 400,
        // message: `This region already has a region head ${finalResult.existingRegionHead}`,
        message: finalResult.conflictMessage
      });
    } else {
      // res.status(201).json({
      //   statusCode: 201,
      //   message: "Industry Head created successfully",
      // });
      res.status(200).json({
        statusCode: 200,
        message: "Industry Head updated successfully",
      });
    }

  } catch (err) {
    console.error("Error updating industry head:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating industry head",
    });
  }
};

const activateOrDeactivateIndustryHead = async (req, res) => {
  const { industryHeadId, isActive, deactivationDate, updatedBy } = req.body;

  if (!industryHeadId || isActive === undefined) {
    return res.status(400).json({
      statusCode: 400,
      message: "Industry Head ID  are required",
    });
  }

  try {
    await updateIndustryHeadStatus(industryHeadId, isActive, deactivationDate, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: `Industry Head ${isActive ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    console.error("Error updating Industry Head status:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating Industry Head status",
    });
  }
};

const getIndustryHeads = async (req, res) => {
  try {
    const industryHeads = await getIndustryHeadsList();

    res.status(200).json({
      statusCode: 200,
      industryHeads,
    });
  } catch (err) {
    console.error("Error retrieving Industry Heads:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while fetching Industry Heads",
    });
  }
};

// Sales Manager Master
const createSalesManager = async (req, res) => {
  const {
    name,
    code,
    industryHeadIds,
    fromDate,
    description,
    updatedBy,
    sales_manager_email, // Add email here
    isActive = 1,
    companyId
  } = req.body;

  try {
    await insertSalesManager(
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      sales_manager_email, // Pass email here
      isActive,
      companyId
    );

    res.status(201).json({
      statusCode: 201,
      message: "Sales Manager created successfully",
    });
  } catch (err) {
    console.error("Error creating sales manager:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating sales manager",
    });
  }
};

const updateSalesManager = async (req, res) => {
  const {
    companyId,
    salesManagerId,
    name,
    code,
    industryHeadIds,
    fromDate,
    description,
    updatedBy,
    sales_manager_email, // Add email here
    isActive,
  } = req.body;

  if (!salesManagerId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Sales Manager ID is required",
    });
  }

  try {
    await updateSalesManagerDetails(
      companyId,
      salesManagerId,
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      sales_manager_email, // Pass email here
      isActive,
    );

    res.status(200).json({
      statusCode: 200,
      message: "Sales Manager updated successfully",
    });
  } catch (err) {
    console.error("Error updating sales manager:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating sales manager",
    });
  }
};

const activateOrDeactivateSalesManager = async (req, res) => {
  const { salesManagerId, isActive, updatedBy, deactivationDate } = req.body;

  if (!salesManagerId || isActive === undefined) {
    return res.status(400).json({
      statusCode: 400,
      message: "Deactivation date is required",
    });
  }

  try {
    await updateSalesManagerStatus(salesManagerId, isActive, updatedBy, deactivationDate);

    res.status(200).json({
      statusCode: 200,
      message: `Sales Manager ${isActive ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    console.error("Error updating Sales Manager status:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating Sales Manager status",
    });
  }
};

const getSalesManagers = async (req, res) => {
  try {
    const salesManagers = await getSalesManagersList();

    res.status(200).json({
      statusCode: 200,
      salesManagers,
    });
  } catch (err) {
    console.error("Error retrieving Sales Managers:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while fetching Sales Managers",
    });
  }
};

// Account Manager Master
const createAccountManager = async (req, res) => {
  const {
    companyId,
    name,
    code,
    industryHeadIds,
    fromDate,
    description,
    updatedBy,
    account_manager_email, // Add email here
    isActive = 1,
  } = req.body;

  try {
    await insertAccountManager(
      companyId,
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      account_manager_email, // Pass email here
      isActive
    );

    res.status(201).json({
      statusCode: 201,
      message: "Account Manager created successfully",
    });
  } catch (err) {
    console.error("Error creating Account Manager:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating Account Manager",
    });
  }
};

const updateAccountsManager = async (req, res) => {
  const {
    companyId,
    accountManagerId, // Rename variable to accountManagerId
    name,
    code,
    industryHeadIds,
    fromDate,
    description,
    updatedBy,
    account_manager_email, // Add email here
    isActive,
  } = req.body;

  if (!accountManagerId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Account Manager ID is required",
    });
  }

  try {
    await updateAccountManager(
      companyId,
      accountManagerId, // Pass the correct ID
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      account_manager_email, // Pass email here
      isActive
    );

    res.status(200).json({
      statusCode: 200,
      message: "Account Manager updated successfully",
    });
  } catch (err) {
    console.error("Error updating Account Manager:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating Account Manager",
    });
  }
};

const activateOrDeactivateAccountsManager = async (req, res) => {
  const { salesManagerId, isActive, updatedBy, deactivationDate } = req.body;

  if (!salesManagerId || isActive === undefined) {
    return res.status(400).json({
      statusCode: 400,
      message: "Deactivation date is required",
    });
  }

  try {
    await activateOrDeactivateAccountManager(
      salesManagerId,
      isActive,
      updatedBy,
      deactivationDate
    );

    res.status(200).json({
      statusCode: 200,
      message: `Account Manager ${isActive ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    console.error("Error updating Sales Manager status:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating Sales Manager status",
    });
  }
};

const getAccountManagers = async (req, res) => {
  try {
    const accountManagers = await getAccountManagersList();

    res.status(200).json({
      statusCode: 200,
      accountManagers,
    });
  } catch (err) {
    console.error("Error retrieving Sales Managers:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while fetching Sales Managers",
    });
  }
};

// Technology Group Master
const createTechnologyGroup = async (req, res) => {
  const { name, description, isActive, updatedBy } = req.body;

  try {
    await insertTechnologyGroup(name, description, isActive, updatedBy);

    res.status(201).json({
      statusCode: 201,
      message: "Technology Group created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("technologyGroup", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateTechnologyGroup = async (req, res) => {
  const { groupId, name, description, isActive, updatedBy } = req.body;

  if (!groupId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Group ID is required",
    });
  }

  try {
    await updateTechnologyGroupDetails(
      groupId,
      name,
      description,
      isActive,
      updatedBy
    );

    res.status(200).json({
      statusCode: 200,
      message: "Technology Group updated successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("technologyGroup", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateTechnologyGroup = async (req, res) => {
  const { groupId, isActive, updatedBy } = req.body;

  if (!groupId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Group ID is required",
    });
  }

  try {
    await activateDeactivateGroup(groupId, isActive, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: `Technology Group ${isActive === 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating technology group",
    });
  }
};

const getTechnologyGroups = async (req, res) => {
  try {
    const groups = await getTechnologyGroupsList();

    res.status(200).json({
      statusCode: 200,
      groups,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

// Technology Subgroup Master
const createTechnologySubgroup = async (req, res) => {
  const { techGroupIds, name, description, isActive, updatedBy } = req.body;

  try {
    await insertTechnologySubgroup(
      techGroupIds,
      name,
      description,
      isActive,
      updatedBy
    );

    res.status(201).json({
      statusCode: 201,
      message: "Technology Subgroup created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("technologySubgroup", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateTechnologySubgroup = async (req, res) => {
  const { subgroupId, techGroupIds, name, description, isActive, updatedBy } =
    req.body;

  if (!subgroupId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Subgroup ID is required",
    });
  }

  try {
    await updateTechnologySubgroupDetails(
      subgroupId,
      techGroupIds,
      name,
      description,
      isActive,
      updatedBy
    );

    res.status(200).json({
      statusCode: 200,
      message: "Technology Subgroup updated successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("technologySubgroup", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateTechnologySubgroup = async (req, res) => {
  const { subgroupId, isActive, updatedBy } = req.body;

  if (!subgroupId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Subgroup ID is required",
    });
  }

  try {
    await activateDeactivateSubgroup(subgroupId, isActive, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: `Technology Subgroup ${isActive === 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating technology subgroup",
    });
  }
};

const getTechnologySubgroups = async (req, res) => {
  try {
    const subgroups = await getAllTechnologySubgroups();

    res.status(200).json({
      statusCode: 200,
      subgroups,
    });
  } catch (err) {
    console.error("Error fetching technology subgroups:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

// Technology Master
const createTechnologyName = async (req, res) => {
  const {
    techGroupIds,
    techSubgroupIds,
    techName,
    description,
    isActive,
    updatedBy,
  } = req.body;

  try {
    await insertTechnologyName(
      techGroupIds,
      techSubgroupIds,
      techName,
      description,
      isActive,
      updatedBy
    );
    res.status(201).json({
      statusCode: 201,
      message: "Technology Name created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    const { statusCode, message } = errorHandler("technologyName", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateTechnologyName = async (req, res) => {
  const {
    id,
    techGroupIds,
    techSubgroupIds,
    techName,
    description,
    isActive,
    updatedBy,
  } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Technology Name ID is required",
    });
  }

  try {
    await updateTechnologyNameDetails(
      id,
      techGroupIds,
      techSubgroupIds,
      techName,
      description,
      isActive,
      updatedBy
    );
    res.status(200).json({
      statusCode: 200,
      message: "Technology Name updated successfully",
    });
  } catch (err) {
    const { statusCode, message } = errorHandler("technologyName", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateTechnologyName = async (req, res) => {
  const { id, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Technology Name ID is required",
    });
  }

  try {
    await activateDeactivateTechnologyNameStatus(id, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Technology Name ${isActive === 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating technology name",
    });
  }
};

const getTechnologyNames = async (req, res) => {
  try {
    const subgroups = await getAllTechnologyNames();

    res.status(200).json({
      statusCode: 200,
      subgroups,
    });
  } catch (err) {
    console.error("Error fetching technology subgroups:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

// OEM Master
const createOEM = async (req, res) => {
  const { oemName, type, productName, isActive, updatedBy } = req.body;

  try {
    await insertOEM(oemName, type, productName, isActive, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "OEM created successfully",
    });
  } catch (err) {
    console.log('error--', err);
    const { statusCode, message } = errorHandler("oem", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateOEM = async (req, res) => {
  const { id, oemName, type, productName, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "OEM ID is required",
    });
  }

  try {
    await updateOEMDetails(id, oemName, type, productName, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: "OEM updated successfully",
    });
  } catch (err) {
    console.log('error--', err);
    const { statusCode, message } = errorHandler("oem", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateOEM = async (req, res) => {
  const { id, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "OEM ID is required",
    });
  }

  try {
    await activateDeactivateOEMStatus(id, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `OEM ${isActive === 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating OEM",
    });
  }
};

const getOEMs = async (req, res) => {
  try {
    const oems = await getAllOEMs();

    res.status(200).json({
      statusCode: 200,
      oems,
    });
  } catch (err) {
    console.error("Error fetching OEMs:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

// Product Sales Master
const createPoleStarProduct = async (req, res) => {
  const { productName, description, isActive, updatedBy } = req.body;

  try {
    await insertPoleStarProduct(productName, description, isActive, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "PoleStar Product created successfully",
    });
  } catch (err) {
    console.log('error--', err);
    const { statusCode, message } = errorHandler("polestarProduct", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updatePoleStarProduct = async (req, res) => {
  const { id, productName, description, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Product ID is required",
    });
  }

  try {
    await updatePoleStarProductDetails(
      id,
      productName,
      description,
      isActive,
      updatedBy
    );
    res.status(200).json({
      statusCode: 200,
      message: "PoleStar Product updated successfully",
    });
  } catch (err) {
    console.log('error--', err);
    const { statusCode, message } = errorHandler("polestarProduct", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivatePoleStarProduct = async (req, res) => {
  const { id, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Product ID is required",
    });
  }

  try {
    await activateDeactivatePoleStarProductStatus(id, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `PoleStar Product ${isActive === 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating PoleStar Product",
    });
  }
};

const getPoleStarProducts = async (req, res) => {
  try {
    const products = await getAllPoleStarProducts();

    res.status(200).json({
      statusCode: 200,
      products,
    });
  } catch (err) {
    console.error("Error fetching PoleStar Products:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

// Project/Service Master
const createProjectService = async (req, res) => {
  const { name, description, isActive, updatedBy } = req.body;

  try {
    await insertProjectService(name, description, isActive, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "Project/Service created successfully",
    });
  } catch (err) {
    console.log('error--', err);
    const { statusCode, message } = errorHandler("projectService", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateProjectServiceHandler = async (req, res) => {
  const { id, name, description, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Project/Service ID is required",
    });
  }

  try {
    await updateProjectService(id, name, description, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: "Project/Service updated successfully",
    });
  } catch (err) {
    console.log('error--', err);
    const { statusCode, message } = errorHandler("projectService", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateProjectServiceHandler = async (req, res) => {
  const { id, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Project/Service ID is required",
    });
  }

  try {
    await activateDeactivateProjectService(id, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Project/Service ${isActive === 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating Project/Service",
    });
  }
};

const getProjectServices = async (req, res) => {
  try {
    const records = await getAllProjectServices();
    res.status(200).json({
      statusCode: 200,
      records,
    });
  } catch (err) {
    console.error("Error fetching Project/Services:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

// Financial Year Master
const createFinancialYear = async (req, res) => {
  const { startYear, endYear, financialYearName, isActive, updatedBy } =
    req.body;

  try {
    await insertFinancialYear(
      startYear,
      endYear,
      financialYearName,
      isActive,
      updatedBy
    );
    res.status(201).json({
      statusCode: 201,
      message: "Financial Year created successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateFinancialYearHandler = async (req, res) => {
  const { id, startYear, endYear, financialYearName, isActive, updatedBy } =
    req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Financial Year ID is required",
    });
  }

  try {
    await updateFinancialYear(
      id,
      startYear,
      endYear,
      financialYearName,
      isActive,
      updatedBy
    );
    res.status(200).json({
      statusCode: 200,
      message: "Financial Year updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating Financial Year",
    });
  }
};

const activateDeactivateFinancialYearHandler = async (req, res) => {
  const { id, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Financial Year ID is required",
    });
  }

  try {
    await activateDeactivateFinancialYear(id, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Financial Year ${isActive === 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating Financial Year",
    });
  }
};

const getAllFinancialYearsHandler = async (req, res) => {
  try {
    const records = await getAllFinancialYears();
    res.status(200).json({
      statusCode: 200,
      records, // Returning the entire list of financial years
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while retrieving Financial Years",
    });
  }
};

// Region Head Master
const addRegionHead = async (req, res) => {
  const {
    regionId, // Region ID
    countryId, // Country ID
    companyId, // Company ID
    regionHeadName, // Name of the region head
    regionHeadEcode, // Ecode of the region head
    regionHeadEmail, // Email of the region head
    fromDate, // From date of the region's activity
    isActive, // Active status
    updatedBy, // User who is updating
  } = req.body;

  try {
    const finalResult = await createRegionHead(
      regionId,
      countryId,
      companyId,
      regionHeadName,
      regionHeadEcode,
      regionHeadEmail,
      fromDate,
      isActive,
      updatedBy
    );
    console.log('rrrrrrrrrrrr', finalResult);

    if (finalResult.status == 'existing') {
      res.status(400).json({
        statusCode: 400,
        // message: `This region already has a region head ${finalResult.existingRegionHead}`,
        message: finalResult.conflictMessage
      });
    } else {
      res.status(201).json({
        statusCode: 201,
        message: "Region Head created successfully",
      });
    }

  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateRegionHead = async (req, res) => {
  const {
    regionHeadId, // Region Head ID to update
    regionId, // Region ID
    countryId, // Country ID
    companyId, // Company ID
    regionHeadName, // Region head name
    regionHeadEcode, // Region head ecode
    regionHeadEmail, // Region head email
    fromDate, // From date
    isActive, // Active status
    updatedBy, // User who is updating
  } = req.body;

  if (!regionHeadId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Region Head ID is required",
    });
  }

  try {
    const finalRes = await updateRegionHeadDetails(
      regionHeadId,
      regionId,
      countryId,
      companyId,
      regionHeadName,
      regionHeadEcode,
      regionHeadEmail,
      fromDate,
      isActive,
      updatedBy
    );
    if (finalRes.status == 'existing') {
      res.status(400).json({
        statusCode: 400,
        // message: `This region already has a region head: ${finalRes.existingRegionHead}`,
        message: finalRes.conflictMessage
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "Region Head updated successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating region head details",
    });
  }
};

const activateDeactivateRegionHead = async (req, res) => {
  const { regionHeadId, isActive, updatedBy, deactivationDate } = req.body;

  try {
    await activateDeactivateRegionHeadDetails(
      regionHeadId,
      isActive,
      updatedBy,
      deactivationDate
    );
    res.status(200).json({
      statusCode: 200,
      message: `Region Head ${isActive == 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getRegionHeadsList = async (req, res) => {
  try {
    const regionHeads = await getRegionHeads();

    res.status(200).json({
      statusCode: 200,
      regionHeads,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};


// Currency


// currency Master
const createCurrencyHandler = async (req, res) => {
  const { currencyCode, description, isActive, updatedBy } = req.body;

  if (!currencyCode || !description || isActive === undefined || !updatedBy) {
    return res.status(400).json({
      statusCode: 400,
      message: "currencyCode, description, isActive, and updatedBy are required",
    });
  }

  try {
    await createCurrency(currencyCode, description, isActive, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "Currency created successfully",
    });
  } catch (err) {
    console.log("Error creating currency:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating currency",
    });
  }
};


const updateCurrencyHandler = async (req, res) => {
  const { id, currencyCode, description, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Currency ID is required",
    });
  }

  if (!currencyCode || !description || isActive === undefined || !updatedBy) {
    return res.status(400).json({
      statusCode: 400,
      message: "currencyCode, description, isActive, and updatedBy are required",
    });
  }

  try {
    await updateCurrency(id, currencyCode, description, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: "Currency updated successfully",
    });
  } catch (err) {
    console.log("Error updating currency:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating currency",
    });
  }
};


const activateOrDeactivateCurrencyHandler = async (req, res) => {
  const { id, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Currency ID is required",
    });
  }

  if (isActive === undefined || !updatedBy) {
    return res.status(400).json({
      statusCode: 400,
      message: "isActive and updatedBy are required",
    });
  }

  try {
    await activateOrDeactivateCurrency(id, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Currency ${isActive === 1 ? "activated" : "deactivated"} successfully`,
    });
  } catch (err) {
    console.log("Error activating/deactivating currency:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating currency",
    });
  }
};

const getAllCurrenciesHandler = async (req, res) => {
  try {

    const currencies = await getAllCurrencies();

    res.status(200).json({
      statusCode: 200,
      message: "Currencies retrieved successfully",
      data: currencies,
    });
  } catch (err) {
    console.log("Error retrieving currencies:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while retrieving currencies",
    });
  }
};

const getCurrencyHistoryHandler = async (req, res) => {
  try {
    const currencies = await getCurrencyHistory(req.body);
    res.status(200).json({
      statusCode: 200,
      message: "Currencies history retrieved successfully",
      data: currencies,
    });
  } catch (err) {
    console.log("Error retrieving currencies history:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while retrieving currencies history",
    });
  }
};

//  Tax Master

const createTaxHandler = async (req, res) => {
  const { countryCode, taxType, taxFieldName, taxPercentage, isActive, updatedBy } = req.body;

  if (!countryCode || !taxType || !taxFieldName || taxPercentage === undefined || isActive === undefined || !updatedBy) {
    return res.status(400).json({
      statusCode: 400,
      message: "countryCode, taxType, taxFieldName, taxPercentage, isActive, and updatedBy are required",
    });
  }

  try {
    await createTax(countryCode, taxType, taxFieldName, taxPercentage, isActive, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "Tax created successfully",
    });
  } catch (err) {
    console.log("Error creating tax:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating tax",
    });
  }
};

const updateTaxHandler = async (req, res) => {
  const { id, countryCode, taxType, taxFieldName, taxPercentage, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Tax ID is required",
    });
  }

  if (!countryCode || !taxType || !taxFieldName || taxPercentage === undefined || isActive === undefined || !updatedBy) {
    return res.status(400).json({
      statusCode: 400,
      message: "countryCode, taxType, taxFieldName, taxPercentage, isActive, and updatedBy are required",
    });
  }

  try {
    console.log('uuuuuuuuuu11', updatedBy);

    await updateTax(id, countryCode, taxType, taxFieldName, taxPercentage, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: "Tax updated successfully",
    });
  } catch (err) {
    console.log("Error updating tax:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating tax",
    });
  }
};

const activateOrDeactivateTaxHandler = async (req, res) => {
  const { id, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Tax ID is required",
    });
  }

  if (isActive === undefined || !updatedBy) {
    return res.status(400).json({
      statusCode: 400,
      message: "isActive and updatedBy are required",
    });
  }

  try {
    await activateOrDeactivateTax(id, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Tax ${isActive === 1 ? "activated" : "deactivated"} successfully`,
    });
  } catch (err) {
    console.log("Error activating/deactivating tax:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating tax",
    });
  }
};

const getAllTaxesHandler = async (req, res) => {
  try {
    const taxes = await getAllTaxes();

    res.status(200).json({
      statusCode: 200,
      message: "Taxes retrieved successfully",
      data: taxes,
    });
  } catch (err) {
    console.log("Error retrieving taxes:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while retrieving taxes",
    });
  }
};

const createClientType = async (req, res) => {
  const { clientType, isActive, updatedBy } = req.body;

  try {
    await insertClientType(clientType, isActive, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "Client Type created successfully",
    });
  } catch (err) {
    console.log("Error:", err);
    const { statusCode, message } = errorHandler("clientType", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateClientTypeHandler = async (req, res) => {
  const { id, clientType, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Client Type ID is required",
    });
  }

  try {
    await updateClientType(id, clientType, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: "Client Type updated successfully",
    });
  } catch (err) {
    console.log("Error:", err);
    const { statusCode, message } = errorHandler("clientType", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateClientTypeHandler = async (req, res) => {
  const { id, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Client Type ID is required",
    });
  }

  try {
    await activateDeactivateClientType(id, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Client Type ${isActive === 1 ? "activated" : "deactivated"} successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating Client Type",
    });
  }
};

const getClientTypes = async (req, res) => {
  try {
    const records = await getAllClientTypes();
    res.status(200).json({
      statusCode: 200,
      records,
    });
  } catch (err) {
    console.error("Error fetching Client Types:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};



// Add client
const addClient = async (req, res) => {
  const {
    client_name,
    vega_client_name,
    client_type,
    credit_period,
    client_status,
    countryId,
    companyId,
    accountId,
    industryId,
    IndustryHeadId,
    IndustryGroupId,
    IndustrySubGroupId,
    salesMangerId,
    accountManagerId,
    msa_start_date,
    msa_end_date,
    msa_flag,
    nda_flag,
    non_solicitation_clause_flag,
    use_logo_permission_flag,
    isActive,
    updated_by,
  } = req.body;

  const msaFilePath = req.files.msaFile ? req.files.msaFile[0].path.replace("\\", "/") : null;
  const ndaFilePath = req.files.ndaFile ? req.files.ndaFile[0].path.replace("\\", "/") : null;

  try {
    await createClient(
      client_name,
      vega_client_name,
      client_type,
      credit_period,
      client_status,
      countryId,
      companyId,
      accountId,
      industryId,
      IndustryHeadId,
      IndustryGroupId,
      IndustrySubGroupId,
      salesMangerId,
      accountManagerId,
      msa_start_date,
      msa_end_date,
      msa_flag,
      nda_flag,
      non_solicitation_clause_flag,
      use_logo_permission_flag,
      isActive,
      updated_by,
      msaFilePath,
      ndaFilePath
    );

    res.status(201).json({
      statusCode: 201,
      message: "Client added successfully",
    });
  } catch (err) {
    console.error("Error adding client:", err);
    const { statusCode, message } = errorHandler("client", err);
    res.status(statusCode).json({ statusCode, message });
  }
};

// Update client
const updateClient = async (req, res) => {
  const {
    clientId,
    client_name,
    vega_client_name,
    client_type,
    credit_period,
    client_status,
    countryId,
    companyId,
    accountId,
    industryId,
    IndustryHeadId,
    IndustryGroupId,
    IndustrySubGroupId,
    salesMangerId,
    accountManagerId,
    msa_start_date,
    msa_end_date,
    msa_flag,
    nda_flag,
    non_solicitation_clause_flag,
    use_logo_permission_flag,
    updated_by,
  } = req.body;

  const msaFilePath = req.files.msaFile ? req.files.msaFile[0].path.replace("\\", "/") : null;
  const ndaFilePath = req.files.ndaFile ? req.files.ndaFile[0].path.replace("\\", "/") : null;

  if (!clientId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Client ID is required",
    });
  }

  try {
    const client = await getClientById(clientId);

    const updatedMsaFilePath = msaFilePath || client.msaFilePath;
    const updatedNdaFilePath = ndaFilePath || client.ndaFilePath;

    await updateClientDetails(
      clientId,
      client_name,
      vega_client_name,
      client_type,
      credit_period,
      client_status,
      countryId,
      companyId,
      accountId,
      industryId,
      IndustryHeadId,
      IndustryGroupId,
      IndustrySubGroupId,
      salesMangerId,
      accountManagerId,
      msa_start_date,
      msa_end_date,
      msa_flag,
      nda_flag,
      non_solicitation_clause_flag,
      use_logo_permission_flag,
      updated_by,
      updatedMsaFilePath,
      updatedNdaFilePath
    );

    res.status(200).json({
      statusCode: 200,
      message: "Client updated successfully",
    });
  } catch (err) {
    console.error("Error updating client:", err);
    const { statusCode, message } = errorHandler("client", err);
    res.status(statusCode).json({ statusCode, message });
  }
};

// Activate/Deactivate client
const activateDeactivateClient = async (req, res) => {
  const { clientId, isActive, updated_by } = req.body;

  try {
    await activateDeactivateClientDetails(clientId, isActive, updated_by);
    res.status(200).json({
      statusCode: 200,
      message: `Client ${isActive === 1 ? "activated" : "deactivated"} successfully`,
    });
  } catch (err) {
    console.error("Error activating/deactivating client:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating client",
    });
  }
};

// Get clients list
const getClientsList = async (req, res) => {
  try {
    const clients = await getClients();

    res.status(200).json({
      statusCode: 200,
      clients,
    });
  } catch (err) {
    console.error("Error fetching clients list:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while fetching clients list",
    });
  }
};



const addClientContact = async (req, res) => {
  const { client_name, salutation, first_name, last_name, email, phone_number, isActive, updatedBy } = req.body;

  try {
    await createClientContact(client_name, salutation, first_name, last_name, email, phone_number, isActive, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "Client contact created successfully",
    });
  } catch (err) {
    console.error("Error", err);
    const { statusCode, message } = errorHandler("clientContact", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const updateClientContact = async (req, res) => {
  const { clientContactId, client_name, salutation, first_name, last_name, email, phone_number, isActive, updatedBy } = req.body;

  if (!clientContactId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Client Contact ID is required",
    });
  }

  try {
    await updateClientContactDetails(clientContactId, client_name, salutation, first_name, last_name, email, phone_number, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: "Client contact updated successfully",
    });
  } catch (err) {
    console.error("Error", err);
    const { statusCode, message } = errorHandler("clientContact", err);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
};

const activateDeactivateClientContact = async (req, res) => {
  const { clientContactId, isActive, updatedBy } = req.body;

  try {
    await activateDeactivateClientContactDetails(clientContactId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Client contact ${isActive == 1 ? "activated" : "deactivated"} successfully`,
    });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating client contact",
    });
  }
};

const getClientContactsList = async (req, res) => {
  try {
    const clientContacts = await getClientContacts();
    res.status(200).json({
      statusCode: 200,
      clientContacts,
    });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while fetching client contacts list",
    });
  }
};


// Create Client Bill To
const createClientBillTo = async (req, res) => {
  const {
    clientId,
    countryId,
    address1,
    address2,
    address3,
    additionalAddressDetails,
    isDefaultAddress,
    state_code,
    gstIn,
    placeOfSupply,
    state_name,
    updated_by // Use `updated_by` to match the payload
  } = req.body;

  try {
    await insertClientBillTo(
      clientId,
      countryId,
      address1,
      address2,
      address3,
      additionalAddressDetails,
      isDefaultAddress,
      updated_by,
      state_code,
      gstIn,
      placeOfSupply ,
      state_name 
       // Pass `updated_by` as `updatedBy`
    );
    res.status(201).json({ statusCode: 201, message: "Client Bill To created successfully" });
  } catch (err) {
    console.error("Error inserting into client_bill_to_info:", err);
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};

// Update Client Bill To
const updateClientBillTo = async (req, res) => {
  const { id, clientId, countryId, address1, address2, address3, additionalAddressDetails, isDefaultAddress, state_code,
    gstIn,
    placeOfSupply,
    state_name, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({ statusCode: 400, message: "ID is required" });
  }

  try {
    await updateClientBillToDetails(id, clientId, countryId, address1, address2, address3, additionalAddressDetails, isDefaultAddress, state_code,
      gstIn,
      placeOfSupply,
      state_name, updatedBy);
    res.status(200).json({ statusCode: 200, message: "Client Bill To updated successfully" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};

// Activate/Deactivate Client Bill To
const activateDeactivateClientBillTo = async (req, res) => {
  const { id, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({ statusCode: 400, message: "ID is required" });
  }

  try {
    await activateDeactivateClientBillToDetails(id, isActive, updatedBy);
    res.status(200).json({ statusCode: 200, message: `Client billing info ${isActive === 1 ? "activated" : "deactivated"} successfully` });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};

// Get Client Bill To
const getClientBillTo = async (req, res) => {
  const { clientId } = req.body;

  try {
    const data = await getClientBillToDetails(clientId);
    res.status(200).json({ statusCode: 200, data });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};


// Create Client Ship To
// Create Client Ship To
const createClientShipTo = async (req, res) => {
  const {
    clientId,
    countryId,
    address1,
    address2,
    address3,
    additionalAddressDetails,
    isDefaultAddress,
    updated_by, // Corrected to match the payload
    state_code,
    gstIn,
    placeOfSupply,
    state_name
  } = req.body;

  try {
    await insertClientShipTo(
      clientId,
      countryId,
      address1,
      address2,
      address3,
      additionalAddressDetails,
      isDefaultAddress,
      updated_by, // Pass the correct field
      state_code,
      gstIn,
      placeOfSupply,
      state_name
    );
    res.status(201).json({ statusCode: 201, message: "Client Shipping info created successfully" });
  } catch (err) {
    console.error("Error creating client shipping info:", err);
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};

// Update Client Ship To
const updateClientShipTo = async (req, res) => {
  const { id, clientId, countryId, address1, address2, address3, additionalAddressDetails, isDefaultAddress, updatedBy, state_code,
    gstIn,
    placeOfSupply,
    state_name } = req.body;

  if (!id) {
    return res.status(400).json({ statusCode: 400, message: "ID is required" });
  }

  try {
    await updateClientShipToDetails(id, clientId, countryId, address1, address2, address3, additionalAddressDetails, isDefaultAddress, updatedBy, state_code,
      gstIn,
      placeOfSupply,
      state_name);
    res.status(200).json({ statusCode: 200, message: "Client Shipping info updated successfully" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};

// Activate/Deactivate Client Ship To
const activateDeactivateClientShipTo = async (req, res) => {
  const { id, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({ statusCode: 400, message: "ID is required" });
  }

  try {
    await activateDeactivateClientShipToDetails(id, isActive, updatedBy);
    res.status(200).json({ statusCode: 200, message: `Client Shipping info ${isActive === 1 ? "activated" : "deactivated"} successfully` });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};

// Get Client Ship To
const getClientShipTo = async (req, res) => {
  const { clientId } = req.body;

  try {
    const data = await getClientShipToDetails(clientId);
    res.status(200).json({ statusCode: 200, data });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};


const createClientGroup = async (req, res) => {
  const { groupName, clientId, updatedBy } = req.body;

  try {
    await insertClientGroup(groupName, clientId, updatedBy);

    res.status(201).json({
      statusCode: 201,
      message: "Client group created successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating client group",
    });
  }
};

const updateClientGroup = async (req, res) => {
  const { id, groupName, clientId, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Group ID is required",
    });
  }

  try {
    await updateClientGroupDetails(id, groupName, clientId, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: "Client group updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating client group",
    });
  }
};

const activateDeactivateClientGroup = async (req, res) => {
  const { id, isActive, updatedBy } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Group ID is required",
    });
  }

  try {
    await activateDeactivateClientGroupDetails(id, isActive, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: `Client group ${isActive === 1 ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while activating/deactivating client group",
    });
  }
};

const getClientGroups = async (req, res) => {
  try {
    const groups = await getClientGroupsDetails();

    res.status(200).json({
      statusCode: 200,
      groups,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while retrieving client groups",
    });
  }
};

const getPoContractConfiguration = async (req, res) => {
  try {
    const sqlResults = await getPoContractConfigurationModel();
    res.status(200).json({
      statusCode: 200,
      data: sqlResults,
    });
  } catch (err) {
    console.log('error---------->', err);
    res.status(500).json({
      statusCode: 500,
      message: err || "Server error while retrieving client groups",
    });
  }
};
const getPoConfigMastersDataHandler = async (req, res) => {
  try {
    const sqlResults = await getPoContractConfigurationData();

    res.status(200).json({
      statusCode: 200,
      data: sqlResults,
    });
  } catch (err) {
    console.log('error---------->', err);
    res.status(500).json({
      statusCode: 500,
      message: err || "Server error while retrieving client groups",
    });
  }
};
const getPoCascadingDataHandler = async (req, res) => {
  try {
    const sqlResults = await getPoCascadingConfigurationData();

    res.status(200).json({
      statusCode: 200,
      data: sqlResults,
    });
  } catch (err) {
    console.log('error---------->', err);
    res.status(500).json({
      statusCode: 500,
      message: err || "Server error while retrieving client groups",
    });
  }
};


const insertPoContractHandler = async (req, res) => {
  const {
    clientId,
    client_name,
    clientBillTo,
    clientShipAddress,
    clientContact,
    billFrom,
    companyName,
    companyLocation,
    po_name,
    creditPeriod,
    poAmount,
    dueAmount,
    start_date,
    end_date,
    projectService,
    technolgyGroup,
    technolgySubGroup,
    technolgy,
    oem,
    product,
    docType,
    poNumber,
    srNumber,
    industryGroups,
    subIndustries,
    industryHead,
    salesManager,
    accountManager, noOfResources, resourcesData, masterNames
  } = req.body;

  // Retrieve the file path if a file is uploaded
  const filePath = req.files && req.files.file ? req.files.file[0].path.replace("\\", "/") : null;

  // Validate required fields
  if (!clientId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Client ID is required",
    });
  }

  console.log('we are there in creating the file');
  try {
    await insertPoContract(
      clientId,
      client_name,
      clientBillTo,
      clientShipAddress,
      clientContact,
      billFrom,
      companyName,
      companyLocation,
      po_name,
      creditPeriod,
      poAmount,
      dueAmount,
      start_date,
      end_date,
      projectService,
      technolgyGroup,
      technolgySubGroup,
      technolgy,
      oem,
      product,
      docType,
      poNumber,
      srNumber,
      industryGroups,
      subIndustries,
      industryHead,
      salesManager,
      accountManager, filePath, noOfResources, resourcesData, masterNames);
    // Respond with a success message
    res.status(201).json({
      statusCode: 201,
      message: "PO contract created successfully",
    });
  } catch (err) {
    // Handle errors
    console.log('errr->', err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating PO contract",
      error: err,
    });
  }
};


const updatePoContractHandler = async (req, res) => {
  const {
    id,
    client_name,
    clientBillTo,
    clientShipAddress,
    clientContact,
    billFrom,
    companyName,
    companyLocation,
    po_name,
    creditPeriod,
    poAmount,
    dueAmount,
    start_date,
    end_date,
    projectService,
    technolgyGroup,
    technolgySubGroup,
    technolgy,
    oem,
    product,
    docType,
    poNumber,
    srNumber,
    industryGroups,
    subIndustries,
    industryHead,
    salesManager,
    accountManager,
    noOfResources, resourcesData, masterNames
  } = req.body;
  const filePath = req.files && req.files.file ? req.files.file[0].path.replace("\\", "/") : null;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "PO contract ID is required",
    });
  }
  try {
    await updatePoContract(
      id,
      client_name,
      clientBillTo,
      clientShipAddress,
      clientContact,
      billFrom,
      companyName,
      companyLocation,
      po_name,
      creditPeriod,
      poAmount,
      dueAmount,
      start_date,
      end_date,
      projectService,
      technolgyGroup,
      technolgySubGroup,
      technolgy,
      oem,
      product,
      docType,
      poNumber,
      srNumber,
      industryGroups,
      subIndustries,
      industryHead,
      salesManager,
      accountManager, filePath, noOfResources, resourcesData, masterNames);
    res.status(200).json({
      statusCode: 200,
      message: "PO contract updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating PO contract",
      error: err,
    });
  }
};



const activateDeactivatePoContractHandler = async (req, res) => {
  const { id, isActive } = req.body;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "PO contract ID is required",
    });
  }
  try {
    const sqlResults = await activateDeactivatePoContract(id, isActive);
    const status = isActive === 1 ? "activated" : "deactivated";
    res.status(200).json({
      statusCode: 200,
      message: `PO contract ${status} successfully`,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating PO contract status",
    });
  }
};


const getPoContractsDataHandler = async (req, res) => {
  try {
    const sqlResults = await getAllPoContracts();
    res.status(200).json({
      statusCode: 200,
      poContracts: sqlResults || [],
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while retrieving PO contracts",
    });
  }
};




const updateMSAFile = async (req, res) => {
  const { clientId, start_date, end_date, updated_by } = req.body;
  const msaFile = req.file ? req.file.path.replace(/\\/g, "/") : null;

  if (!clientId || !start_date || !end_date || !msaFile) {
    return res.status(400).json({
      statusCode: 400,
      message: "Missing required fields: clientId, start_date, end_date, msaFile",
    });
  }

  try {
    const result = await updateClientMSA(clientId, start_date, end_date, msaFile, updated_by);
    res.status(201).json({
      statusCode: 201,
      message: "MSA file updated successfully",
    });
  } catch (err) {
    console.error("Error updating MSA file:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Failed to update MSA file",
    });
  }
};



// ----------------- INVOICE --------------

// const insertInvoiceHandler = async (req, res) => {
//   const {
//     client_name,
//     client_id,
//     contract_name,
//     contract_id,
//     po_number,
//     po_amount,
//     remain_po_amount,
//     invoice_date,
//     clientBillTo,
//     clientShipAddress,
//     clientContact,
//     company_name,
//     bill_from,
//     invoice_bill_from_id,
//     contract_type,
//     tax_type,
//     tax_type_id,
//     tax_code,
//     tax_code_id,
//     invoice_amount,
//     note_one,
//     note_two,
//     updated_by,
//     isActive,
//     total_amount,
//     gst_total,
//     final_amount,
//     invoiceData,
//     clientContact_name, // ✅ Added missing fields
//     clientBillTo_name,
//     clientShipAddress_name
//   } = req.body;

//   let parsedInvoiceData;
//   try {
//     parsedInvoiceData = typeof invoiceData === "string" ? JSON.parse(invoiceData) : invoiceData;
//   } catch (error) {
//     return res.status(400).json({
//       statusCode: 400,
//       message: "Invalid invoiceData format",
//       error: error.message
//     });
//   }

//   const filePath = req.files && req.files.file ? req.files.file[0].path.replace("\\", "/") : null;

//   if (!client_id) {
//     return res.status(400).json({ statusCode: 400, message: "Client ID is required" });
//   }

//   if (!parsedInvoiceData || !Array.isArray(parsedInvoiceData.invoiceItems)) {
//     return res.status(400).json({
//       statusCode: 400,
//       message: "Invalid invoiceData format. 'invoiceItems' must be an array."
//     });
//   }

//   try {
//     await insertInvoice(
//       client_name,
//       client_id,
//       contract_name,
//       contract_id,
//       po_number,
//       po_amount,
//       remain_po_amount,
//       invoice_date,
//       clientBillTo,
//       clientShipAddress,
//       clientContact,
//       company_name,
//       bill_from,
//       invoice_bill_from_id,
//       contract_type,
//       tax_type,
//       tax_type_id,
//       tax_code,
//       tax_code_id,
//       invoice_amount,
//       note_one,
//       note_two,
//       updated_by,
//       isActive,
//       filePath,
//       total_amount,
//       gst_total,
//       final_amount,
//       parsedInvoiceData,
//       clientContact_name, // ✅ Pass to insertInvoice function
//       clientBillTo_name,
//       clientShipAddress_name
//     );

//     res.status(201).json({ statusCode: 201, message: "Invoice created successfully" });
//   } catch (err) {
//     console.error("Error creating invoice:", err);
//     res.status(500).json({ statusCode: 500, message: "Server error while creating invoice", error: err });
//   }
// };


const insertInvoiceHandler = async (req, res) => {
  const {
    client_name,
    client_id,
    contract_name,
    contract_id,
    po_number,
    po_amount,
    remain_po_amount,
    invoice_date,
    clientBillTo,
    clientShipAddress,
    clientContact,
    company_name,
    bill_from,
    invoice_bill_from_id,
    // contract_type,
    tax_type,
    tax_type_id,
    tax_code,
    tax_code_id,
    invoice_amount,
    note_one,
    note_two,
    updated_by,
    isActive,
    total_amount,
    gst_total,
    final_amount,
    invoiceData,
    clientContact_name,
    clientBillTo_name,
    clientShipAddress_name,
    projectService,
    projectService_names,
  } = req.body;

  let parsedInvoiceData;
  try {
    parsedInvoiceData = typeof invoiceData === "string" ? JSON.parse(invoiceData) : invoiceData;
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid invoiceData format",
      error: error.message
    });
  }

  const filePath = req.files && req.files.file ? req.files.file[0].path.replace("\\", "/") : null;

  if (!client_id) {
    return res.status(400).json({ statusCode: 400, message: "Client ID is required" });
  }

  if (!parsedInvoiceData || !Array.isArray(parsedInvoiceData.invoiceItems)) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid invoiceData format. 'invoiceItems' must be an array."
    });
  }

  // Generate invoice_name prefix
  const invoiceNamePrefix = `${client_name.split(" ").map(word => word[0]).join("").toUpperCase()}/${invoice_date.slice(2, 4)}-${(parseInt(invoice_date.slice(2, 4)) + 1)}`;

  try {
    const { invoice_name } = await insertInvoice(
      client_name,
      client_id,
      invoiceNamePrefix, // ✅ Pass prefix to backend
      contract_name,
      contract_id,
      po_number,
      po_amount,
      remain_po_amount,
      invoice_date,
      clientBillTo,
      clientShipAddress,
      clientContact,
      company_name,
      bill_from,
      invoice_bill_from_id,
      // contract_type,
      tax_type,
      tax_type_id,
      tax_code,
      tax_code_id,
      invoice_amount,
      note_one,
      note_two,
      updated_by,
      isActive,
      filePath,
      total_amount,
      gst_total,
      final_amount,
      parsedInvoiceData,
      clientContact_name,
      clientBillTo_name,
      clientShipAddress_name,
      projectService,
    projectService_names,
    );

    res.status(201).json({ statusCode: 201, message: "Invoice created successfully", invoice_name });

  } catch (err) {
    console.error("Error creating invoice:", err);
    res.status(500).json({ statusCode: 500, message: "Server error while creating invoice", error: err });
  }
};




const updateInvoiceHandler = async (req, res) => {
  let {
    id, client_name, client_id, invoice_name, contract_name, contract_id,
    po_number, po_amount, remain_po_amount, invoice_date, clientBillTo,
    clientShipAddress, clientContact, company_name, bill_from, invoice_bill_from_id,
    tax_type, tax_type_id, tax_code, tax_code_id, invoice_amount, note_one,
    note_two, updated_by, isActive, total_amount, gst_total, final_amount,
    invoiceData, clientContact_name, clientBillTo_name, clientShipAddress_name,
    projectService, projectService_names
  } = req.body;

  const filePath = req.files && req.files.file ? req.files.file[0].path.replace("\\", "/") : null;

  if (!id) {
    return res.status(400).json({ statusCode: 400, message: "Invoice ID is required" });
  }

  console.log("Received invoiceData:", invoiceData);

  // Ensure invoiceData is parsed
  if (typeof invoiceData === "string") {
    try {
      invoiceData = JSON.parse(invoiceData);
    } catch (error) {
      return res.status(400).json({ statusCode: 400, message: "Invalid invoiceData format", error: error.message });
    }
  }

  console.log("Parsed invoiceData:", invoiceData);

  if (!invoiceData || !Array.isArray(invoiceData.invoiceItems)) {
    return res.status(400).json({ statusCode: 400, message: "'invoiceItems' must be an array." });
  }

  try {
    const result = await updateInvoice(
      id, client_name, client_id, invoice_name, contract_name, contract_id, po_number,
      po_amount, remain_po_amount, invoice_date, clientBillTo, clientShipAddress, clientContact,
      company_name, bill_from, invoice_bill_from_id, tax_type, tax_type_id, tax_code, tax_code_id,
      invoice_amount, note_one, note_two, updated_by, isActive, filePath, total_amount, gst_total,
      final_amount, invoiceData, clientContact_name, clientBillTo_name, clientShipAddress_name,
      projectService, projectService_names
    );

    res.status(200).json({ statusCode: 200, message: "Invoice updated successfully", result });
  } catch (err) {
    console.error("Error updating invoice:", err);
    res.status(500).json({ statusCode: 500, message: "Server error while updating invoice", error: err.message });
  }
};




const activateDeactivateInvoiceHandler = async (req, res) => {
  const { id, isActive } = req.body;

  if (!id) {
    return res.status(400).json({ statusCode: 400, message: "Invoice ID is required" });
  }

  try {
    await activateDeactivateInvoice(id, isActive);
    const status = isActive === 1 ? "activated" : "deactivated";
    res.status(200).json({ statusCode: 200, message: `Invoice ${status} successfully` });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error while updating invoice status" });
  }
};

const getInvoicesDataHandler = async (req, res) => {
  try {
    const invoices = await getAllInvoices();
    res.status(200).json({ statusCode: 200, invoices: invoices || [] });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error while retrieving invoices" });
  }
};






module.exports = {
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

  // currency
  createCurrencyHandler,
  updateCurrencyHandler,
  activateOrDeactivateCurrencyHandler,
  getAllCurrenciesHandler,
  getCurrencyHistoryHandler,

  //  tax master

  createTaxHandler,
  updateTaxHandler,
  activateOrDeactivateTaxHandler,
  getAllTaxesHandler,

  //  client type
  createClientType,
  updateClientTypeHandler,
  activateDeactivateClientTypeHandler,
  getClientTypes,

  addClient,
  updateClient,
  activateDeactivateClient,
  getClientsList,

  addClientContact,
  updateClientContact,
  getClientContactsList,
  activateDeactivateClientContact,

  // Controller functions for client_bill_to_info
  createClientBillTo,
  updateClientBillTo,
  activateDeactivateClientBillTo,
  getClientBillTo,

  // Controller functions for client_ship_to_info
  createClientShipTo,
  updateClientShipTo,
  activateDeactivateClientShipTo,
  getClientShipTo,


  createClientGroup,
  updateClientGroup,
  activateDeactivateClientGroup,
  getClientGroups,


  getPoContractConfiguration,
  getPoConfigMastersDataHandler,
  getPoCascadingDataHandler,
  insertPoContractHandler,
  updatePoContractHandler,
  activateDeactivatePoContractHandler,
  getPoContractsDataHandler,
  updateMSAFile,
  insertInvoiceHandler,
  updateInvoiceHandler,
  activateDeactivateInvoiceHandler,
  getInvoicesDataHandler
};
