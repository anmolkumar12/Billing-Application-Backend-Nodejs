const {  createCountry,
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
  getBankAccountTypesList
} = require("../models/masterModel");

// Industry Master
// const addIndustry = async (req, res) => {
//   const { industryName, description, industryHead, updatedBy } = req.body; // Added updatedBy

//   try {
//     await createIndustry(industryName, description, industryHead, updatedBy);
//     res.status(201).json({
//       statusCode: 201,
//       message: "Industry added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const updateIndustry = async (req, res) => {
//   const {
//     industryId,
//     industryName,
//     description,
//     industryHead,
//     isActive,
//     updatedBy, // Added updatedBy to the request body
//   } = req.body;

//   try {
//     await updateIndustryDetails(
//       industryId,
//       industryName,
//       description,
//       industryHead,
//       isActive,
//       updatedBy // Pass updatedBy to the model function
//     );
//     res.status(200).json({
//       statusCode: 200,
//       message: "Industry updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const toggleIndustryActiveStatus = async (req, res) => {
//   const { industryId, isActive, updatedBy } = req.body; // `industryId` and `updatedBy` are required

//   try {
//     // Call the model function to activate or deactivate the industry, including updatedBy
//     await toggleIndustryActiveStatusDetails(industryId, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `Industry ${
//         isActive == 1 ? "activated" : "deactivated"
//       } successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const getIndustryList = async (req, res) => {
//   try {
//     // Call the model function to fetch the list of industries
//     const industries = await getIndustryListDetails();
//     res.status(200).json({
//       statusCode: 200,
//       industries,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// Project Master
// const addProject = async (req, res) => {
//   const { projectName, projectDescription, updatedBy } = req.body;

//   try {
//     await createProject(projectName, projectDescription, updatedBy);
//     res.status(201).json({
//       statusCode: 201,
//       message: "Project added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const updateProject = async (req, res) => {
//   const { projectId, projectName, projectDescription, isActive, updatedBy } =
//     req.body;

//   try {
//     await updateProjectDetails(
//       projectId,
//       projectName,
//       projectDescription,
//       isActive,
//       updatedBy
//     );
//     res.status(200).json({
//       statusCode: 200,
//       message: "Project updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const getProjectList = async (req, res) => {
//   try {
//     // Call the model function to fetch the list of projects
//     const projects = await getProjectListDetails();
//     res.status(200).json({
//       statusCode: 200,
//       projects,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const toggleProjectActiveStatus = async (req, res) => {
//   const { projectId, isActive, updatedBy } = req.body; // `isActive` is the new status (1 for active, 0 for inactive)

//   try {
//     // Call the model function to activate or deactivate the project, including updatedBy
//     await toggleProjectActiveStatusDetails(projectId, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `Project ${
//         isActive == 1 ? "activated" : "deactivated"
//       } successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// Product Master

// const addProduct = async (req, res) => {
//   const { productName, productDescription, updatedBy } = req.body;

//   try {
//     await createProduct(productName, productDescription, updatedBy);
//     res.status(201).json({
//       statusCode: 201,
//       message: "Product added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const updateProduct = async (req, res) => {
//   const { productId, productName, productDescription, isActive, updatedBy } =
//     req.body;

//   try {
//     await updateProductDetails(
//       productId,
//       productName,
//       productDescription,
//       isActive,
//       updatedBy
//     );
//     res.status(200).json({
//       statusCode: 200,
//       message: "Product updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const getProductList = async (req, res) => {
//   try {
//     // Call the model function to fetch the list of products
//     const products = await getProductListDetails();
//     res.status(200).json({
//       statusCode: 200,
//       products,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const toggleProductActiveStatus = async (req, res) => {
//   const { productId, isActive, updatedBy } = req.body; // `isActive` is the new status (1 for active, 0 for inactive)

//   try {
//     // Call the model function to activate or deactivate the product, including updatedBy
//     await toggleProductActiveStatusDetails(productId, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `Product ${
//         isActive == 1 ? "activated" : "deactivated"
//       } successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// Currency Master
// const addCurrency = async (req, res) => {
//   const { currencyName, currencyDescription, updatedBy } = req.body;

//   try {
//     await createCurrency(currencyName, currencyDescription, updatedBy);
//     res.status(201).json({
//       statusCode: 201,
//       message: "Currency added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const updateCurrency = async (req, res) => {
//   const { currencyId, currencyName, currencyDescription, isActive, updatedBy } =
//     req.body;

//   try {
//     await updateCurrencyDetails(
//       currencyId,
//       currencyName,
//       currencyDescription,
//       isActive,
//       updatedBy
//     );
//     res.status(200).json({
//       statusCode: 200,
//       message: "Currency updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const toggleCurrencyActiveStatus = async (req, res) => {
//   const { currencyId, isActive, updatedBy } = req.body;

//   try {
//     await toggleCurrencyStatus(currencyId, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `Currency ${
//         isActive == 1 ? "activated" : "deactivated"
//       } successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const getCurrencyList = async (req, res) => {
//   const { isActive } = req.query; // Optional query parameter to filter by active status (1 or 0)

//   try {
//     const currencies = await fetchCurrencyList(isActive);
//     res.status(200).json({
//       statusCode: 200,
//       currencies,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// Tax Master:
// const addTax = async (req, res) => {
//   const { taxType, taxPercentage, effectiveDate, updatedBy } = req.body;

//   try {
//     await createTax(taxType, taxPercentage, effectiveDate, updatedBy);
//     res.status(201).json({
//       statusCode: 201,
//       message: "Tax added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const updateTax = async (req, res) => {
//   const { taxId, taxType, taxPercentage, effectiveDate, updatedBy } = req.body;

//   try {
//     await updateTaxDetails(
//       taxId,
//       taxType,
//       taxPercentage,
//       effectiveDate,
//       updatedBy
//     );
//     res.status(200).json({
//       statusCode: 200,
//       message: "Tax updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const getTaxList = async (req, res) => {
//   try {
//     const taxes = await getTaxListDetails();
//     res.status(200).json({
//       statusCode: 200,
//       taxes,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const toggleTaxActiveStatus = async (req, res) => {
//   const { taxId, isActive, updatedBy } = req.body;

//   try {
//     await toggleTaxActiveStatusDetails(taxId, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `Tax ${
//         isActive == 1 ? "activated" : "deactivated"
//       } successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const countriesList = async (req, res) => {
//   try {
//     const countries = await getCountries();
//     res.status(200).json({
//       statusCode: 200,
//       countries,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// States Controller

// const addState = async (req, res) => {
//   const { stateCode, stateName, countryId, updatedBy } = req.body;

//   try {
//     await createState(stateCode, stateName, countryId, updatedBy);
//     res.status(201).json({
//       statusCode: 201,
//       message: "State added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const updateState = async (req, res) => {
//   const { stateId, stateCode, stateName, countryId, updatedBy } = req.body;

//   try {
//     await updateStateDetails(
//       stateId,
//       stateCode,
//       stateName,
//       countryId,
//       updatedBy
//     );
//     res.status(200).json({
//       statusCode: 200,
//       message: "State updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const getStateList = async (req, res) => {
//   const { countryId } = req.body; // Get the countryId from the request parameters

//   try {
//     const states = await getStateListDetails(countryId);
//     res.status(200).json({
//       statusCode: 200,
//       states,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const toggleStateActiveStatus = async (req, res) => {
//   const { stateId, isActive, updatedBy } = req.body;

//   try {
//     await toggleStateActiveStatusDetails(stateId, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `State ${
//         isActive == 1 ? "activated" : "deactivated"
//       } successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const addAccount = async (req, res) => {
//   const {
//     companyId,
//     accountType,
//     bankName,
//     bankAddress,
//     accountNo,
//     ifscCode,
//     micrCode,
//     routingNoSwiftCode,
//     bankCode,
//     updatedBy,
//   } = req.body;

//   try {
//     await createAccount(
//       companyId,
//       accountType,
//       bankName,
//       bankAddress,
//       accountNo,
//       ifscCode,
//       micrCode,
//       routingNoSwiftCode,
//       bankCode,
//       updatedBy
//     );
//     res.status(201).json({
//       statusCode: 201,
//       message: "Account added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const updateAccount = async (req, res) => {
//   const {
//     accountId,
//     companyId,
//     accountType,
//     bankName,
//     bankAddress,
//     accountNo,
//     ifscCode,
//     micrCode,
//     routingNoSwiftCode,
//     bankCode,
//     updatedBy,
//   } = req.body;

//   try {
//     await updateAccountDetails(
//       accountId,
//       companyId,
//       accountType,
//       bankName,
//       bankAddress,
//       accountNo,
//       ifscCode,
//       micrCode,
//       routingNoSwiftCode,
//       bankCode,
//       updatedBy
//     );
//     res.status(200).json({
//       statusCode: 200,
//       message: "Account updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const getAccountList = async (req, res) => {
//   try {
//     const accounts = await getAccountListDetails();
//     res.status(200).json({
//       statusCode: 200,
//       accounts,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const toggleAccountActiveStatus = async (req, res) => {
//   const { accountId, isActive, updatedBy } = req.body;

//   try {
//     await toggleAccountActiveStatusDetails(accountId, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `Account ${
//         isActive == 1 ? "activated" : "deactivated"
//       } successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const addClient = async (req, res) => {
//   const {
//     industry_id,
//     name,
//     alias,
//     pan_no,
//     // address1,
//     // address2,
//     // address3,
//     // pin,
//     // country_id,
//     // state_id,
//     polestar_bank_account_id,
//     gstn,
//     // client_ship_to_address1,
//     // client_ship_to_address2,
//     // client_ship_to_address3,
//     // client_ship_to_pin,
//     // client_ship_to_country_id,
//     // client_ship_to_state_id,
//     // client_ship_to_gstn,
//     salutation,
//     first_name,
//     last_name,
//     email,
//     phone,
//     msa_flag,
//     is_performa,
//     msa_start_date,
//     msa_end_date,
//     non_solicitation_clause,
//     use_logo_permission,
//     client_category,
//     servicing_type,
//     missing_msa_deadline,
//     is_msa_missing,
//     updated_by
//   } = req.body;
//   const logopath = req.file ? req.file.path : null; // Handle file upload for logo

//   try {
//     await createClient(
//       industry_id,
//     name,
//     alias,
//     pan_no,
//     polestar_bank_account_id,
//     gstn,
//     salutation,
//     first_name,
//     last_name,
//     email,
//     phone,
//     msa_flag,
//     is_performa,
//     msa_start_date,
//     msa_end_date,
//     non_solicitation_clause,
//     use_logo_permission,
//     client_category,
//     servicing_type,
//     missing_msa_deadline,
//     is_msa_missing,
//     updated_by,
//     logopath
//     );
//     res.status(201).json({
//       statusCode: 201,
//       message: "Client added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error while adding client",
//     });
//   }
// };

// const updateClient = async (req, res) => {
//   const {
//     id,
//     industry_id,
//     name,
//     alias,
//     pan_no,
//     // address1,
//     // address2,
//     // address3,
//     // pin,
//     // country_id,
//     // state_id,
//     polestar_bank_account_id,
//     gstn,
//     // client_ship_to_address1,
//     // client_ship_to_address2,
//     // client_ship_to_address3,
//     // client_ship_to_pin,
//     // client_ship_to_country_id,
//     // client_ship_to_state_id,
//     // client_ship_to_gstn,
//     salutation,
//     first_name,
//     last_name,
//     email,
//     phone,
//     msa_flag,
//     is_performa,
//     msa_start_date,
//     msa_end_date,
//     non_solicitation_clause,
//     use_logo_permission,
//     client_category,
//     servicing_type,
//     missing_msa_deadline,
//     is_msa_missing,
//     updated_by
//   } = req.body;

//   const logopath = req.file ? req.file.path : null;

//   if (!id) {
//     return res.status(400).json({
//       statusCode: 400,
//       message: "Client ID is required",
//     });
//   }

//   try {
//     await updateClientDetails(
//       id,
//       industry_id,
//       name,
//       alias,
//       pan_no,
//       // address1,
//       // address2,
//       // address3,
//       // pin,
//       // country_id,
//       // state_id,
//       polestar_bank_account_id,
//       gstn,
//       // client_ship_to_address1,
//       // client_ship_to_address2,
//       // client_ship_to_address3,
//       // client_ship_to_pin,
//       // client_ship_to_country_id,
//       // client_ship_to_state_id,
//       // client_ship_to_gstn,
//       salutation,
//       first_name,
//       last_name,
//       email,
//       phone,
//       msa_flag,
//       is_performa,
//       msa_start_date,
//       msa_end_date,
//       non_solicitation_clause,
//       use_logo_permission,
//       client_category,
//       servicing_type,
//       missing_msa_deadline,
//       is_msa_missing,
//       logopath,
//       updated_by
//     );
//     res.status(200).json({
//       statusCode: 200,
//       message: "Client updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error while updating client",
//     });
//   }
// };

// const getClients = async (req, res) => {
//   try {
//     const clients = await fetchClients();
//     res.status(200).json({
//       statusCode: 200,
//       clients,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error while fetching clients",
//     });
//   }
// };

// const toggleClientActiveStatus = async (req, res) => {
//   const { clientId, isActive, updatedBy } = req.body;

//   try {
//     await toggleClientActiveStatusDetails(clientId, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `Client ${
//         isActive == 1 ? "activated" : "deactivated"
//       } successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const addClientBillingInfo = async (req, res) => {
//   const { address1, address2, address3, pin, countryId, stateId, clientId, updatedBy } = req.body;

//   try {
//     await createClientBillingInfo(address1, address2, address3, pin, countryId, stateId, clientId, updatedBy);
//     res.status(201).json({
//       statusCode: 201,
//       message: "Client billing information added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const updateClientBillingInfo = async (req, res) => {
//   const { billingId, address1, address2, address3, pin, countryId, stateId, clientId, updatedBy } = req.body;

//   try {
//     await updateClientBillingDetails(billingId, address1, address2, address3, pin, countryId, stateId, clientId, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: "Client billing information updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const getClientBillingInfo = async (req, res) => {
//   try {
//     const billingInfo = await getClientBillingDetails();
//     res.status(200).json({
//       statusCode: 200,
//       billingInfo,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const toggleClientBillingActiveStatus = async (req, res) => {
//   const { billingId, isActive, updatedBy } = req.body;

//   try {
//     await toggleClientBillingActiveStatusDetails(billingId, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `Billing record ${
//         isActive == 1 ? "activated" : "deactivated"
//       } successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const addClientShippingInfo = async (req, res) => {
//   const { clientId, address1, address2, address3, pin, countryId, stateId, gstn, updatedBy } = req.body;

//   try {
//     await createClientShippingInfo(clientId, address1, address2, address3, pin, countryId, stateId, gstn, updatedBy);
//     res.status(201).json({
//       statusCode: 201,
//       message: "Client shipping information added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const updateClientShippingInfo = async (req, res) => {
//   const { shippingId, clientId, address1, address2, address3, pin, countryId, stateId, gstn, updatedBy } = req.body;

//   try {
//     await updateClientShippingDetails(shippingId, clientId, address1, address2, address3, pin, countryId, stateId, gstn, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: "Client shipping information updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const getClientShippingInfo = async (req, res) => {
//   try {
//     const shippingInfo = await getClientShippingDetails();
//     res.status(200).json({
//       statusCode: 200,
//       shippingInfo,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const toggleClientShippingActiveStatus = async (req, res) => {
//   const { shippingId, isActive, updatedBy } = req.body;

//   try {
//     await toggleClientShippingActiveStatusDetails(shippingId, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `Shipping record ${isActive == 1 ? "activated" : "deactivated"} successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const addTechnology = async (req, res) => {
//   const { technologyName, description, updatedBy } = req.body;

//   try {
//     await createTechnology(technologyName, description, updatedBy);
//     res.status(201).json({
//       statusCode: 201,
//       message: "Technology added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const updateTechnology = async (req, res) => {
//   const { technologyId, technologyName, description, updatedBy } = req.body;

//   try {
//     await updateTechnologyDetails(
//       technologyId,
//       technologyName,
//       description,
//       updatedBy
//     );
//     res.status(200).json({
//       statusCode: 200,
//       message: "Technology updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const getTechnologyList = async (req, res) => {
//   try {
//     const technologies = await getTechnologyListDetails();
//     res.status(200).json({
//       statusCode: 200,
//       technologies,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const toggleTechnologyActiveStatus = async (req, res) => {
//   const { technologyId, isActive, updatedBy } = req.body;

//   try {
//     await toggleTechnologyActiveStatusDetails(technologyId, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `Technology ${
//         isActive == 1 ? "activated" : "deactivated"
//       } successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const addCompanyAddress = async (req, res) => {
//   const {
//     address1,
//     address2,
//     address3,
//     stateId,
//     countryId,
//     pin,
//     GST,
//     PAN,
//     companyId,  // Added companyId
//     updatedBy,
//   } = req.body;

//   try {
//     await createCompanyAddress(
//       address1,
//       address2,
//       address3,
//       stateId,
//       countryId,
//       pin,
//       GST,
//       PAN,
//       companyId,  // Added companyId
//       updatedBy
//     );
//     res.status(201).json({
//       statusCode: 201,
//       message: "Company address added successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const updateCompanyAddress = async (req, res) => {
//   const {
//     id,
//     address1,
//     address2,
//     address3,
//     stateId,
//     countryId,
//     pin,
//     GST,
//     PAN,
//     companyId,  // Added companyId
//     updatedBy,
//   } = req.body;

//   try {
//     await updateCompanyAddressDetails(
//       id,
//       address1,
//       address2,
//       address3,
//       stateId,
//       countryId,
//       pin,
//       GST,
//       PAN,
//       companyId,  // Added companyId
//       updatedBy
//     );
//     res.status(200).json({
//       statusCode: 200,
//       message: "Company address updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const getCompanyAddressList = async (req, res) => {
//   try {
//     const addresses = await getCompanyAddressListDetails();
//     res.status(200).json({
//       statusCode: 200,
//       addresses,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// const toggleCompanyAddressActiveStatus = async (req, res) => {
//   const { id, isActive, updatedBy } = req.body;

//   try {
//     await toggleCompanyAddressActiveStatusDetails(id, isActive, updatedBy);
//     res.status(200).json({
//       statusCode: 200,
//       message: `Company address ${
//         isActive == 1 ? "activated" : "deactivated"
//       } successfully`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: "Server error",
//     });
//   }
// };

// Country
const addCountry = async (req, res) => {
  const {
    code,
    name,
    language,
    phoneCode,
    addressAdditionalFields,
    bankAccAdditionalFields,
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
    stateId, // State ID (foreign key referencing state_info table)
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
      stateId,
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
    companyName,
    Website,
    CINNO,
    IECode,
    Email,
    description,
    isActive,
    updatedBy,
    independent, // 0 or 1 to define whether the company is independent
    parentCompanyId,
  } = req.body;

  // Access the files from req.files
  const logoPath = req.files.logo ? req.files.logo[0].path : null;  // Handle logo
  const digitalSignPath = req.files.digitalSign ? req.files.digitalSign[0].path : null;  // Handle digital signature

  try {
    await createCompany(
      companyName,
      Website,
      CINNO,
      IECode,
      Email,
      description,
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
    companyId,
    companyName,
    Website,
    CINNO,
    IECode,
    Email,
    description,
    isActive,
    updatedBy,
    independent, // 0 or 1 to define whether the company is independent
    parentCompanyId,
  } = req.body;

  // Access the files from req.files
  const logoPath = req.files.logo ? req.files.logo[0].path : null;  // Handle logo
  const digitalSignPath = req.files.digitalSign ? req.files.digitalSign[0].path : null;  // Handle digital signature

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
      companyId,
      companyName,
      Website,
      CINNO,
      IECode,
      Email,
      description,
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
      message: `Company ${isActive == 1 ? "activated" : "deactivated"} successfully`,
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
    companyId,         // Company ID (foreign key referencing company_info table)
    countryId,         // Country ID (foreign key referencing country_info table)
    stateId,           // State ID (foreign key referencing state_info table)
    address1, address2, address3, // Address fields
    additionalAddressDetails,     // Text for additional address details based on country
    updatedBy          // User updating the company location
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
    locationId,        // ID of the company location to update
    companyId,         // Company ID
    countryId,         // Country ID
    stateId,           // State ID
    address1, address2, address3, // Address fields
    additionalAddressDetails,     // Additional address details
    updatedBy          // User updating the company location
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
    countryId,          // Country ID (foreign key referencing country_info table)
    accountTypeName,    // Name of the bank account type (e.g., "Saving", "Current")
    description,        // Description of the account type
    isActive,           // Status: Active (1) or Inactive (0)
    updatedBy           // User who is updating this information
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
    accountTypeId,      // ID of the bank account type to update
    countryId,          // Country ID
    accountTypeName,    // Name of the bank account type
    description,        // Description of the account type
    isActive,           // Status: Active (1) or Inactive (0)
    updatedBy           // User who is updating this information
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
  getBankAccountTypes
};
