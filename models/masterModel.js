const db = require("../config/db");

const createCompany = async (
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
) => {
  try {
    // SQL query to insert company data into the company_info table
    const query = `
          INSERT INTO company_info (companyName, Website, CINNO, IECode, PAN, Email, logopath, description, isactive, updated_by, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `;

    // Execute the query with the provided values
    const [result] = await db.execute(query, [
      companyName,
      Website,
      CINNO,
      IECode,
      PAN,
      Email,
      logopath,
      description,
      isactive,
      updatedBy,
    ]);

    return result; // Return the result of the insert operation (e.g., insert id or success message)
  } catch (err) {
    console.error(err);
    throw new Error("Error creating company");
  }
};

const updateCompanyDetails = async (
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
) => {
  try {
    // Sanitize inputs to replace undefined with null
    const sanitizedValues = [
      companyName ?? null,
      Website ?? null,
      CINNO ?? null,
      IECode ?? null,
      PAN ?? null,
      Email ?? null,
      logopath ?? null,
      description ?? null,
      updatedBy ?? null,
      isactive ?? null,
      companyId,
    ];

    // SQL query to update company details
    const query = `
      UPDATE company_info
      SET 
        companyName = ?, 
        Website = ?, 
        CINNO = ?, 
        IECode = ?, 
        PAN = ?, 
        Email = ?, 
        logopath = ?, 
        description = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP, 
        isactive = ?
      WHERE id = ?
    `;

    // Execute the query and return the result
    const [result] = await db.execute(query, sanitizedValues);
    return result; // Contains affectedRows and other metadata
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Error updating company details in the database");
  }
};

const activateDeactivateCompanyDetails = async (
  companyId,
  isActive,
  updatedBy
) => {
  try {
    // SQL query to update the isactive field in the company_info table
    const query = `
          UPDATE company_info
          SET isactive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `;

    // Execute the query with the companyId, new isActive status, and updatedBy
    const [result] = await db.execute(query, [
      isActive, // 1 or 0 based on the activation status
      updatedBy, // Use the authenticated user's ID for updated_by
      companyId, // The ID of the company to activate or deactivate
    ]);

    return result; // Return the result of the update operation (e.g., number of rows affected)
  } catch (err) {
    console.error(err);
    throw new Error("Error activating or deactivating company");
  }
};

const getCompanies = async () => {
  try {
    // SQL query to select all companies from the company_info table
    const query = `SELECT * FROM company_info`;

    // Execute the query and return the result
    const [companies] = await db.execute(query);
    return companies; // Return the list of companies
  } catch (err) {
    console.error(err);
    throw new Error("Error retrieving companies list");
  }
};

// Industry
const createIndustry = async (
  industryName,
  description,
  industryHead,
  updatedBy
) => {
  try {
    // SQL query to insert industry data into the industries table
    const query = `
          INSERT INTO industries (industryName, description, industryHead, updated_by, isActive, updated_at)
          VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
        `;

    // Execute the query with the provided industry data
    const [result] = await db.execute(query, [
      industryName,
      description,
      industryHead,
      updatedBy,
    ]);
    return result; // Return the result of the insert operation
  } catch (err) {
    console.error(err);
    throw new Error("Error adding industry");
  }
};

const updateIndustryDetails = async (
  industryId,
  industryName,
  description,
  industryHead,
  isActive,
  updatedBy // Include updatedBy as a parameter
) => {
  try {
    // SQL query to update the industry details including isActive and updated_by
    const query = `
            UPDATE industries
            SET industryName = ?, description = ?, industryHead = ?, isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `;

    // Execute the query with the updated details
    const [result] = await db.execute(query, [
      industryName,
      description,
      industryHead,
      isActive, // Update isActive column
      updatedBy, // Update updated_by column
      industryId, // Specify the industry ID for the update
    ]);
    return result; // Return the result of the update operation
  } catch (err) {
    console.error(err);
    throw new Error("Error updating industry");
  }
};

const toggleIndustryActiveStatusDetails = async (
  industryId,
  isActive,
  updatedBy
) => {
  try {
    // SQL query to update the industry active status and log the user who made the update
    const query = `
          UPDATE industries
          SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `;

    const [result] = await db.execute(query, [
      isActive ? 1 : 0, // Convert boolean to 1/0 for SQL
      updatedBy, // Store the user who updated the status
      industryId, // Specify the industry ID for the update
    ]);
    return result; // Return the result of the update operation
  } catch (err) {
    console.error(err);
    throw new Error("Error toggling industry active status");
  }
};

const getIndustryListDetails = async () => {
  try {
    // SQL query to retrieve the list of industries
    const query = `
        SELECT 
          id, 
          industryName, 
          description, 
          industryHead, 
          isActive, 
          updated_at, 
          updated_by
        FROM industries
      `;

    // Execute the query and return the list of industries
    const [industries] = await db.execute(query);
    return industries; // Return the industries data
  } catch (err) {
    console.error(err);
    throw new Error("Error retrieving industry list");
  }
};

// Project
const createProject = async (projectName, projectDescription, updatedBy) => {
  try {
    // SQL query to insert project data into the project_master table
    const query = `
          INSERT INTO project_master (projectName, projectDescription, isActive, updated_by, updated_at)
          VALUES (?, ?, 1, ?, CURRENT_TIMESTAMP)
        `;

    // Execute the query with the provided project data
    const [result] = await db.execute(query, [
      projectName,
      projectDescription,
      updatedBy,
    ]);
    return result; // Return the result of the insert operation
  } catch (err) {
    console.error(err);
    throw new Error("Error adding project");
  }
};

const updateProjectDetails = async (
  projectId,
  projectName,
  projectDescription,
  isActive,
  updatedBy
) => {
  try {
    // SQL query to update the project details including isActive and updatedBy
    const query = `
          UPDATE project_master
          SET projectName = ?, projectDescription = ?, isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `;

    // Execute the query with the updated details
    const [result] = await db.execute(query, [
      projectName,
      projectDescription,
      isActive ? 1 : 0,
      updatedBy, // Store the user who updated the project
      projectId, // The ID of the project to update
    ]);
    return result; // Return the result of the update operation
  } catch (err) {
    console.error(err);
    throw new Error("Error updating project");
  }
};

const getProjectListDetails = async () => {
  try {
    // SQL query to retrieve the list of projects
    const query = `
        SELECT 
          id, 
          projectName, 
          projectDescription, 
          isActive, 
          updated_at, 
          updated_by
        FROM project_master
      `;

    // Execute the query and return the list of projects
    const [projects] = await db.execute(query);
    return projects; // Return the project data
  } catch (err) {
    console.error(err);
    throw new Error("Error retrieving project list");
  }
};

const toggleProjectActiveStatusDetails = async (
  projectId,
  isActive,
  updatedBy
) => {
  try {
    // SQL query to update the project active status and log the user who made the update
    const query = `
        UPDATE project_master
        SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

    // Execute the query with the provided details
    const [result] = await db.execute(query, [
      isActive ? 1 : 0, // Convert boolean to 1/0 for SQL
      updatedBy, // Store the user who updated the status
      projectId, // Specify the project ID for the update
    ]);
    return result; // Return the result of the update operation
  } catch (err) {
    console.error(err);
    throw new Error("Error toggling project active status");
  }
};

// Product Master
const createProduct = async (productName, productDescription, updatedBy) => {
  try {
    // SQL query to insert project data into the project_master table
    const query = `
            INSERT INTO product_master (productName, productDescription, isActive, updated_by, updated_at)
            VALUES (?, ?, 1, ?, CURRENT_TIMESTAMP)
          `;

    // Execute the query with the provided project data
    const [result] = await db.execute(query, [
      productName,
      productDescription,
      updatedBy,
    ]);
    return result; // Return the result of the insert operation
  } catch (err) {
    console.error(err);
    throw new Error("Error adding project");
  }
};

const updateProductDetails = async (
  productId,
  productName,
  productDescription,
  isActive,
  updatedBy
) => {
  try {
    // SQL query to update the project details including isActive and updatedBy
    const query = `
            UPDATE product_master
            SET productName = ?, productDescription = ?, isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `;

    // Execute the query with the updated details
    const [result] = await db.execute(query, [
      productName,
      productDescription,
      isActive ? 1 : 0,
      updatedBy, // Store the user who updated the project
      productId, // The ID of the project to update
    ]);
    return result; // Return the result of the update operation
  } catch (err) {
    console.error(err);
    throw new Error("Error updating project");
  }
};

const getProductListDetails = async () => {
  try {
    // SQL query to retrieve the list of projects
    const query = `
          SELECT 
            id, 
            productName, 
            productDescription, 
            isActive, 
            updated_at, 
            updated_by
          FROM product_master
        `;

    // Execute the query and return the list of projects
    const [projects] = await db.execute(query);
    return projects; // Return the project data
  } catch (err) {
    console.error(err);
    throw new Error("Error retrieving project list");
  }
};

const toggleProductActiveStatusDetails = async (
  productId,
  isActive,
  updatedBy
) => {
  try {
    // SQL query to update the project active status and log the user who made the update
    const query = `
          UPDATE product_master
          SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `;

    // Execute the query with the provided details
    const [result] = await db.execute(query, [
      isActive ? 1 : 0, // Convert boolean to 1/0 for SQL
      updatedBy, // Store the user who updated the status
      productId, // Specify the project ID for the update
    ]);
    return result; // Return the result of the update operation
  } catch (err) {
    console.error(err);
    throw new Error("Error toggling project active status");
  }
};

// Currency Master
const createCurrency = async (
  currencyName,
  currencyDescription,
  exchangeRate,
  updatedBy
) => {
  try {
    const query = `
        INSERT INTO currency_master (currencyName, currencyDescription, exchangeRate, isActive, updated_by, updated_at)
        VALUES (?, ?, ?, 1, ?, CURRENT_TIMESTAMP)
      `;

    const [result] = await db.execute(query, [
      currencyName,
      currencyDescription,
      exchangeRate,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error adding currency");
  }
};

const updateCurrencyDetails = async (
  currencyId,
  currencyName,
  currencyDescription,
  exchangeRate,
  isActive,
  updatedBy
) => {
  try {
    const query = `
        UPDATE currency_master
        SET currencyName = ?, currencyDescription = ?, exchangeRate = ?, isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

    const [result] = await db.execute(query, [
      currencyName,
      currencyDescription,
      exchangeRate,
      isActive ? 1 : 0,
      updatedBy,
      currencyId,
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error updating currency");
  }
};

const toggleCurrencyStatus = async (currencyId, isActive, updatedBy) => {
  try {
    const query = `
        UPDATE currency_master
        SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

    const [result] = await db.execute(query, [
      isActive ? 1 : 0,
      updatedBy,
      currencyId,
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error toggling currency active status");
  }
};

const fetchCurrencyList = async (isActive) => {
  try {
    let query =
      "SELECT id, currencyName, currencyDescription, exchangeRate, isActive FROM currency_master";

    // If `isActive` is provided, filter by active status
    if (isActive !== undefined) {
      query += " WHERE isActive = ?";
    }

    const [result] = await db.execute(query, isActive ? [isActive] : []);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching currency list");
  }
};

// Tax Master
const createTax = async (taxType, taxPercentage, effectiveDate, updatedBy) => {
  try {
    const query = `
      INSERT INTO tax_master (taxType, taxPercentage, effectiveDate, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, 1, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      taxType,
      taxPercentage,
      effectiveDate,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error adding tax");
  }
};

const updateTaxDetails = async (
  taxId,
  taxType,
  taxPercentage,
  effectiveDate,
  updatedBy
) => {
  try {
    const query = `
      UPDATE tax_master
      SET taxType = ?, taxPercentage = ?, effectiveDate = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      taxType,
      taxPercentage,
      effectiveDate,
      updatedBy,
      taxId,
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error updating tax");
  }
};

const getTaxListDetails = async () => {
  try {
    const query = `
      SELECT id, taxType, taxPercentage, effectiveDate, isActive, updated_at, updated_by
      FROM tax_master
    `;

    const [taxes] = await db.execute(query);
    return taxes;
  } catch (err) {
    console.error(err);
    throw new Error("Error retrieving tax list");
  }
};

const toggleTaxActiveStatusDetails = async (taxId, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE tax_master
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive ? 1 : 0,
      updatedBy,
      taxId,
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error toggling tax active status");
  }
};

// adding states:
// States Model

const createState = async (stateCode, stateName, countryId, updatedBy) => {
  try {
    const query = `
      INSERT INTO states (state_code, state_name, country_id, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, 1, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      stateCode,
      stateName,
      countryId,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error adding state");
  }
};

const updateStateDetails = async (
  stateId,
  stateCode,
  stateName,
  countryId,
  updatedBy
) => {
  try {
    const query = `
      UPDATE states
      SET state_code = ?, state_name = ?, country_id = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE state_id = ?
    `;

    const [result] = await db.execute(query, [
      stateCode,
      stateName,
      countryId,
      updatedBy,
      stateId,
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error updating state");
  }
};

const getStateListDetails = async (countryId) => {
  try {
    const query = `
      SELECT state_id, state_code, state_name, country_id, isActive, updated_at, updated_by
      FROM states
      WHERE country_id = ?
    `;

    const [states] = await db.execute(query, [countryId]);
    return states;
  } catch (err) {
    console.error(err);
    throw new Error("Error retrieving state list");
  }
};

const toggleStateActiveStatusDetails = async (stateId, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE states
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE state_id = ?
    `;

    const [result] = await db.execute(query, [
      isActive ? 1 : 0,
      updatedBy,
      stateId,
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error toggling state active status");
  }
};

module.exports = {
  createState,
  updateStateDetails,
  getStateListDetails,
  toggleStateActiveStatusDetails,
  createCompany,
  updateCompanyDetails,
  activateDeactivateCompanyDetails,
  getCompanies,
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
};
