const {
  createCompany,
  updateCompanyDetails,
  getCompanies,
  activateDeactivateCompanyDetails,

  createIndustry,
  updateIndustryDetails,
  toggleIndustryActiveStatusDetails,
  getIndustryListDetails,

  createProject,
  updateProjectDetails,
  getProjectListDetails,
  toggleProjectActiveStatusDetails,

  createProduct,
  updateProductDetails,
  getProductListDetails,
  toggleProductActiveStatusDetails,

  createCurrency,
  updateCurrencyDetails,
  toggleCurrencyStatus,
  fetchCurrencyList,

  createTax,
  updateTaxDetails,
  getTaxListDetails,
  toggleTaxActiveStatusDetails,

  getCountries,
  createState,
  updateStateDetails,
  getStateListDetails,
  toggleStateActiveStatusDetails,

  createAccount,
  updateAccountDetails,
  getAccountListDetails,
  toggleAccountActiveStatusDetails,
} = require("../models/masterModel");

// Comapny Master
const addCompany = async (req, res) => {
  const {
    companyName,
    Website,
    CINNO,
    IECode,
    PAN,
    Email,
    description,
    isactive,
    updatedBy,
  } = req.body;
  const logopath = req.file ? req.file.path : null; // Get the file path if the logo is uploaded

  try {
    await createCompany(
      companyName,
      Website,
      CINNO,
      IECode,
      PAN,
      Email,
      description,
      isactive,
      updatedBy,
      logopath
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
    companyId,
    companyName,
    Website,
    CINNO,
    IECode,
    PAN,
    Email,
    description,
    isactive,
    updatedBy,
  } = req.body;

  const logopath = req.file ? req.file.path : null; // Handle optional file upload for the logo

  // Validate critical inputs
  if (!companyId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Company ID is required",
    });
  }

  try {
    // Call the model function to update the company details
    const result = await updateCompanyDetails(
      companyId,
      companyName,
      Website,
      CINNO,
      IECode,
      PAN,
      Email,
      description,
      isactive,
      logopath,
      updatedBy
    );

    // Respond to the client with success
    res.status(200).json({
      statusCode: 200,
      message: "Company updated successfully",
    });
  } catch (err) {
    // Log the error and respond with server error
    res.status(500).json({
      statusCode: 500,
      message: "Server error while updating company details",
    });
  }
};

const activateDeactivateCompany = async (req, res) => {
  const { companyId, isActive, updatedBy } = req.body; // `isActive` will be a boolean or 0/1

  try {
    // Call the model function to activate or deactivate the company
    await activateDeactivateCompanyDetails(companyId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Company ${
        isActive == 1 ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getCompaniesList = async (req, res) => {
  try {
    const companies = await getCompanies();
    res.status(200).json({
      statusCode: 200,
      companies,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

// Industry Master
const addIndustry = async (req, res) => {
  const { industryName, description, industryHead, updatedBy } = req.body; // Added updatedBy

  try {
    await createIndustry(industryName, description, industryHead, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "Industry added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateIndustry = async (req, res) => {
  const {
    industryId,
    industryName,
    description,
    industryHead,
    isActive,
    updatedBy, // Added updatedBy to the request body
  } = req.body;

  try {
    await updateIndustryDetails(
      industryId,
      industryName,
      description,
      industryHead,
      isActive,
      updatedBy // Pass updatedBy to the model function
    );
    res.status(200).json({
      statusCode: 200,
      message: "Industry updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const toggleIndustryActiveStatus = async (req, res) => {
  const { industryId, isActive, updatedBy } = req.body; // `industryId` and `updatedBy` are required

  try {
    // Call the model function to activate or deactivate the industry, including updatedBy
    await toggleIndustryActiveStatusDetails(industryId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Industry ${
        isActive == 1 ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getIndustryList = async (req, res) => {
  try {
    // Call the model function to fetch the list of industries
    const industries = await getIndustryListDetails();
    res.status(200).json({
      statusCode: 200,
      industries,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

// Project Master
const addProject = async (req, res) => {
  const { projectName, projectDescription, updatedBy } = req.body;

  try {
    await createProject(projectName, projectDescription, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "Project added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateProject = async (req, res) => {
  const { projectId, projectName, projectDescription, isActive, updatedBy } =
    req.body;

  try {
    await updateProjectDetails(
      projectId,
      projectName,
      projectDescription,
      isActive,
      updatedBy
    );
    res.status(200).json({
      statusCode: 200,
      message: "Project updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getProjectList = async (req, res) => {
  try {
    // Call the model function to fetch the list of projects
    const projects = await getProjectListDetails();
    res.status(200).json({
      statusCode: 200,
      projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const toggleProjectActiveStatus = async (req, res) => {
  const { projectId, isActive, updatedBy } = req.body; // `isActive` is the new status (1 for active, 0 for inactive)

  try {
    // Call the model function to activate or deactivate the project, including updatedBy
    await toggleProjectActiveStatusDetails(projectId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Project ${
        isActive == 1 ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

// Product Master

const addProduct = async (req, res) => {
  const { productName, productDescription, updatedBy } = req.body;

  try {
    await createProduct(productName, productDescription, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "Product added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateProduct = async (req, res) => {
  const { productId, productName, productDescription, isActive, updatedBy } =
    req.body;

  try {
    await updateProductDetails(
      productId,
      productName,
      productDescription,
      isActive,
      updatedBy
    );
    res.status(200).json({
      statusCode: 200,
      message: "Product updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getProductList = async (req, res) => {
  try {
    // Call the model function to fetch the list of products
    const products = await getProductListDetails();
    res.status(200).json({
      statusCode: 200,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const toggleProductActiveStatus = async (req, res) => {
  const { productId, isActive, updatedBy } = req.body; // `isActive` is the new status (1 for active, 0 for inactive)

  try {
    // Call the model function to activate or deactivate the product, including updatedBy
    await toggleProductActiveStatusDetails(productId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Product ${
        isActive == 1 ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

// Currency Master
const addCurrency = async (req, res) => {
  const { currencyName, currencyDescription, exchangeRate, updatedBy } =
    req.body;

  try {
    await createCurrency(
      currencyName,
      currencyDescription,
      exchangeRate,
      updatedBy
    );
    res.status(201).json({
      statusCode: 201,
      message: "Currency added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateCurrency = async (req, res) => {
  const {
    currencyId,
    currencyName,
    currencyDescription,
    exchangeRate,
    isActive,
    updatedBy,
  } = req.body;

  try {
    await updateCurrencyDetails(
      currencyId,
      currencyName,
      currencyDescription,
      exchangeRate,
      isActive,
      updatedBy
    );
    res.status(200).json({
      statusCode: 200,
      message: "Currency updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const toggleCurrencyActiveStatus = async (req, res) => {
  const { currencyId, isActive, updatedBy } = req.body;

  try {
    await toggleCurrencyStatus(currencyId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Currency ${
        isActive == 1 ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getCurrencyList = async (req, res) => {
  const { isActive } = req.query; // Optional query parameter to filter by active status (1 or 0)

  try {
    const currencies = await fetchCurrencyList(isActive);
    res.status(200).json({
      statusCode: 200,
      currencies,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

// Tax Master:
const addTax = async (req, res) => {
  const { taxType, taxPercentage, effectiveDate, updatedBy } = req.body;

  try {
    await createTax(taxType, taxPercentage, effectiveDate, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "Tax added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateTax = async (req, res) => {
  const { taxId, taxType, taxPercentage, effectiveDate, updatedBy } = req.body;

  try {
    await updateTaxDetails(
      taxId,
      taxType,
      taxPercentage,
      effectiveDate,
      updatedBy
    );
    res.status(200).json({
      statusCode: 200,
      message: "Tax updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getTaxList = async (req, res) => {
  try {
    const taxes = await getTaxListDetails();
    res.status(200).json({
      statusCode: 200,
      taxes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const toggleTaxActiveStatus = async (req, res) => {
  const { taxId, isActive, updatedBy } = req.body;

  try {
    await toggleTaxActiveStatusDetails(taxId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Tax ${
        isActive == 1 ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const countriesList = async (req, res) => {
  try {
    const countries = await getCountries();
    res.status(200).json({
      statusCode: 200,
      countries,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

// States Controller

const addState = async (req, res) => {
  const { stateCode, stateName, countryId, updatedBy } = req.body;

  try {
    await createState(stateCode, stateName, countryId, updatedBy);
    res.status(201).json({
      statusCode: 201,
      message: "State added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateState = async (req, res) => {
  const { stateId, stateCode, stateName, countryId, updatedBy } = req.body;

  try {
    await updateStateDetails(
      stateId,
      stateCode,
      stateName,
      countryId,
      updatedBy
    );
    res.status(200).json({
      statusCode: 200,
      message: "State updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getStateList = async (req, res) => {
  const { countryId } = req.body; // Get the countryId from the request parameters

  try {
    const states = await getStateListDetails(countryId);
    res.status(200).json({
      statusCode: 200,
      states,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const toggleStateActiveStatus = async (req, res) => {
  const { stateId, isActive, updatedBy } = req.body;

  try {
    await toggleStateActiveStatusDetails(stateId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `State ${
        isActive == 1 ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const addAccount = async (req, res) => {
  const {
    companyId,
    accountType,
    bankName,
    bankAddress,
    accountNo,
    ifscCode,
    micrCode,
    routingNoSwiftCode,
    bankCode,
    updatedBy,
  } = req.body;

  try {
    await createAccount(
      companyId,
      accountType,
      bankName,
      bankAddress,
      accountNo,
      ifscCode,
      micrCode,
      routingNoSwiftCode,
      bankCode,
      updatedBy
    );
    res.status(201).json({
      statusCode: 201,
      message: "Account added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const updateAccount = async (req, res) => {
  const {
    accountId,
    companyId,
    accountType,
    bankName,
    bankAddress,
    accountNo,
    ifscCode,
    micrCode,
    routingNoSwiftCode,
    bankCode,
    updatedBy,
  } = req.body;

  try {
    await updateAccountDetails(
      accountId,
      companyId,
      accountType,
      bankName,
      bankAddress,
      accountNo,
      ifscCode,
      micrCode,
      routingNoSwiftCode,
      bankCode,
      updatedBy
    );
    res.status(200).json({
      statusCode: 200,
      message: "Account updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const getAccountList = async (req, res) => {
  try {
    const accounts = await getAccountListDetails();
    res.status(200).json({
      statusCode: 200,
      accounts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

const toggleAccountActiveStatus = async (req, res) => {
  const { accountId, isActive, updatedBy } = req.body;

  try {
    await toggleAccountActiveStatusDetails(accountId, isActive, updatedBy);
    res.status(200).json({
      statusCode: 200,
      message: `Account ${
        isActive == 1 ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

module.exports = {
  addAccount,
  updateAccount,
  getAccountList,
  toggleAccountActiveStatus,

  addState,
  updateState,
  getStateList,
  toggleStateActiveStatus,

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

  countriesList,
};
