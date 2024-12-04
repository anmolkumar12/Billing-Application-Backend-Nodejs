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
  logopath
) => {
  try {
    // SQL query to insert company data into the company_info table
    const query = `
        INSERT INTO company_info (companyName, Website, CINNO, IECode, PAN, Email, logopath, description, created_by, updated_by, isactive)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?)
      `;

    // Execute the query with the provided values and the current timestamp for created_by and updated_by
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

module.exports = {
  createCompany,
  updateCompanyDetails,
  activateDeactivateCompanyDetails,
};
