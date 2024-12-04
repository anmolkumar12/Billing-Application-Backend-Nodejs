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
    // SQL query to update company data in the company_info table
    const query = `
            UPDATE company_info
            SET companyName = ?, Website = ?, CINNO = ?, IECode = ?, PAN = ?, Email = ?, logopath = ?, description = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP, isactive = ?
            WHERE id = ?
          `;

    // Execute the query with the provided values and companyId
    const [result] = await db.execute(query, [
      companyName,
      Website,
      CINNO,
      IECode,
      PAN,
      Email,
      logopath,
      description,
      updatedBy, // Use the authenticated user's ID for updated_by
      isactive,
      companyId, // The ID of the company to update
    ]);

    return result; // Return the result of the update operation (e.g., number of rows affected)
  } catch (err) {
    console.error(err);
    throw new Error("Error updating company");
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
    const query = `
        SELECT id, companyName, Website, CINNO, IECode, PAN, Email, logopath, description, created_by, updated_by, isactive, created_at, updated_at
        FROM company_info
      `;

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
  projectId,
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

module.exports = {
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
};
