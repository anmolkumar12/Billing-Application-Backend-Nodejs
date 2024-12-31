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
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
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
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating country details",
    });
  }
};

const activateDeactivateCountry = async (req, res) => {
  const { countryId, isActive, updatedBy } = req.body;

  try {
    await activateDeactivateCountryDetails(countryId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Country ${
        isActive == 1 ? "activated" : "deactivated"
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
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
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
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating state details",
    });
  }
};

const activateDeactivateState = async (req, res) => {
  const { stateId, isActive, updatedBy } = req.body;

  try {
    await activateDeactivateStateDetails(stateId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `State ${
        isActive == 1 ? "activated" : "deactivated"
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
  } = req.body;

  try {
    await createRegion(
      countryId,
      regionName,
      regionCode,
      stateIds,
      isActive,
      updatedBy
    );

    res.status(201).json({
      statusCode: 201,
      message: "Region created successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
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
      updatedBy
    );

    res.status(200).json({
      statusCode: 200,
      message: "Region updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating region details",
    });
  }
};

const activateDeactivateRegion = async (req, res) => {
  const { regionId, isActive, updatedBy } = req.body;

  try {
    await activateDeactivateRegionDetails(regionId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Region ${
        isActive == 1 ? "activated" : "deactivated"
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
  const logoPath = req.files.logo ? req.files.logo[0].path : null; // Handle logo
  const digitalSignPath = req.files.digitalSign
    ? req.files.digitalSign[0].path
    : null; // Handle digital signature

  try {
    await createCompany(
      countryId,
      companyName,
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
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateCompany = async (req, res) => {
  const {
    countryId,
    companyId,
    companyName,
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
  const logoPath = req.files.logo ? req.files.logo[0].path : null; // Handle logo
  const digitalSignPath = req.files.digitalSign
    ? req.files.digitalSign[0].path
    : null; // Handle digital signature

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
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating company details",
    });
  }
};

const activateDeactivateCompany = async (req, res) => {
  const { companyId, isActive, updatedBy } = req.body;

  try {
    await activateDeactivateCompanyDetails(companyId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Company ${
        isActive == 1 ? "activated" : "deactivated"
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
const createCompanyLocation = async (req, res) => {
  const {
    companyId, // Company ID (foreign key referencing company_info table)
    countryId, // Country ID (foreign key referencing country_info table)
    stateId, // State ID (foreign key referencing state_info table)
    address1,
    address2,
    address3, // Address fields
    additionalAddressDetails, // Text for additional address details based on country
    updatedBy, // User updating the company location
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
      updatedBy
    );

    res.status(201).json({
      statusCode: 201,
      message: "Company Location created successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateCompanyLocation = async (req, res) => {
  const {
    locationId, // ID of the company location to update
    companyId, // Company ID
    countryId, // Country ID
    stateId, // State ID
    address1,
    address2,
    address3, // Address fields
    additionalAddressDetails, // Additional address details
    updatedBy, // User updating the company location
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
      updatedBy
    );

    res.status(200).json({
      statusCode: 200,
      message: "Company Location updated successfully",
    });
  } catch (err) {
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
      message: `Company location ${
        isActive === 1 ? "activated" : "deactivated"
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
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
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
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating bank account type",
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
      message: `Bank Account Type ${
        isActive === 1 ? "activated" : "deactivated"
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
    companyId, // Company Selection
    isDefaultAccount, // Default Account or not
    bankAccountTypeId, // Bank Account Type - Foreign key referencing the master table
    bankName, // Bank Name
    bankAddress, // Bank Address
    accountNumber, // Account Number
    countryId, // Country Selection
    isActive, // Status: Active (1) or Inactive (0)
    updatedBy, // User updating the information
    additionalFieldDetails, // Additional fields as a JSON string or object
  } = req.body;

  try {
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
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating company account",
    });
  }
};

const updateCompanyAccount = async (req, res) => {
  const {
    accountId, // ID of the company account to update
    companyId, // Company Selection
    isDefaultAccount, // Default Account or not
    bankAccountTypeId, // Bank Account Type
    bankName, // Bank Name
    bankAddress, // Bank Address
    accountNumber, // Account Number
    countryId, // Country Selection
    isActive, // Status: Active (1) or Inactive (0)
    updatedBy, // User updating the information
    additionalFieldDetails, // Additional fields as a JSON string or object
  } = req.body;

  if (!accountId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Account ID is required",
    });
  }

  try {
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
      message: `Company Account ${
        isActive === 1 ? "activated" : "deactivated"
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
      message: `Production Type ${
        isActive ? "activated" : "deactivated"
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
    productionTypeIds, // Tag/Select Production Type
    updatedBy, // User updating the record
    isActive = 1, // Default value is 1 (active)
  } = req.body;

  try {
    await insertIndustryMaster(
      industryName,
      productionTypeIds,
      updatedBy,
      isActive
    );

    res.status(201).json({
      statusCode: 201,
      message: "Industry Master created successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating industry master",
    });
  }
};

const updateIndustryMaster = async (req, res) => {
  const {
    industryMasterId, // ID of the industry master record to update
    industryName, // Updated Industry Name
    productionTypeIds, // Updated Production Type ID
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
      productionTypeIds,
      updatedBy,
      isActive
    );

    res.status(200).json({
      statusCode: 200,
      message: "Industry Master updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating industry master",
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
      message: `Industry Master ${
        isActive ? "activated" : "deactivated"
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
    console.error("Error creating group industry:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while creating group industry",
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
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating group industry",
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
      message: `Group Industry ${
        isActive ? "activated" : "deactivated"
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
    await insertIndustryHead(
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

    res.status(201).json({
      statusCode: 201,
      message: "Industry Head created successfully",
    });
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
    await updateIndustryHeadDetails(
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

    res.status(200).json({
      statusCode: 200,
      message: "Industry Head updated successfully",
    });
  } catch (err) {
    console.error("Error updating industry head:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating industry head",
    });
  }
};

const activateOrDeactivateIndustryHead = async (req, res) => {
  const { industryHeadId, isActive, updatedBy } = req.body;

  if (!industryHeadId || isActive === undefined) {
    return res.status(400).json({
      statusCode: 400,
      message: "Industry Head ID and isActive are required",
    });
  }

  try {
    await updateIndustryHeadStatus(industryHeadId, isActive, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: `Industry Head ${
        isActive ? "activated" : "deactivated"
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
    isActive = 1,
  } = req.body;

  try {
    await insertSalesManager(
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      isActive
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
    salesManagerId,
    name,
    code,
    industryHeadIds,
    fromDate,
    description,
    updatedBy,
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
      salesManagerId,
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      isActive
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
  const { salesManagerId, isActive, updatedBy } = req.body;

  if (!salesManagerId || isActive === undefined) {
    return res.status(400).json({
      statusCode: 400,
      message: "Sales Manager ID and isActive are required",
    });
  }

  try {
    await updateSalesManagerStatus(salesManagerId, isActive, updatedBy);

    res.status(200).json({
      statusCode: 200,
      message: `Sales Manager ${
        isActive ? "activated" : "deactivated"
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
    name,
    code,
    industryHeadIds,
    fromDate,
    description,
    updatedBy,
    isActive = 1,
  } = req.body;

  try {
    await insertAccountManager(
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      isActive
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

const updateAccountsManager = async (req, res) => {
  const {
    salesManagerId,
    name,
    code,
    industryHeadIds,
    fromDate,
    description,
    updatedBy,
    isActive,
  } = req.body;

  if (!salesManagerId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Sales Manager ID is required",
    });
  }

  try {
    await updateAccountManager(
      salesManagerId,
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      isActive
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

const activateOrDeactivateAccountsManager = async (req, res) => {
  const { salesManagerId, isActive, updatedBy } = req.body;

  if (!salesManagerId || isActive === undefined) {
    return res.status(400).json({
      statusCode: 400,
      message: "Sales Manager ID and isActive are required",
    });
  }

  try {
    await activateOrDeactivateAccountManager(
      salesManagerId,
      isActive,
      updatedBy
    );

    res.status(200).json({
      statusCode: 200,
      message: `Sales Manager ${
        isActive ? "activated" : "deactivated"
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
    const salesManagers = await getAccountManagersList();

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
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
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
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating technology group",
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
      message: `Technology Group ${
        isActive === 1 ? "activated" : "deactivated"
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
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
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
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating technology subgroup",
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
      message: `Technology Subgroup ${
        isActive === 1 ? "activated" : "deactivated"
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
};
