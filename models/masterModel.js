const db = require("../config/db");

// const createCompany = async (
//   companyName,
//   Website,
//   CINNO,
//   IECode,
//   Email,
//   description,
//   isactive,
//   updatedBy,
//   logopath,
// ) => {
//   try {
//     // SQL query to insert company data into the company_info table
//     const query = `
//           INSERT INTO company_info (companyName, Website, CINNO, IECode, Email, logopath, description, isactive, updated_by,
//           updated_at)
//           VALUES ( ?, ?, ?, ?, ?, ?, ?,?,?, CURRENT_TIMESTAMP)
//         `;

//     // Execute the query with the provided values
//     const [result] = await db.execute(query, [
//       companyName,
//       Website,
//       CINNO,
//       IECode,
//       Email,
//       logopath,
//       description,
//       isactive,
//       updatedBy,
//     ]);

//     return result; // Return the result of the insert operation (e.g., insert id or success message)
//   } catch (err) {
//     console.log(err);
//     throw new Error("Error creating company");
//   }
// };

// const updateCompanyDetails = async (
//   companyId,
//   companyName,
//   Website,
//   CINNO,
//   IECode,
//   Email,
//   description,
//   isactive,
//   logopath,
//   updatedBy,
// ) => {
//   try {
//     const sanitizedValues = [
//       companyName ?? null,
//       Website ?? null,
//       CINNO ?? null,
//       IECode ?? null,
//       Email ?? null,
//       logopath ?? null,
//       description ?? null,
//       updatedBy ?? null,
//       isactive ?? null,
//       companyId,
//     ];

//     const query = `
//       UPDATE company_info
//       SET 
//         companyName = ?, 
//         Website = ?, 
//         CINNO = ?, 
//         IECode = ?, 
//         Email = ?, 
//         logopath = ?, 
//         description = ?, 
//         updated_by = ?, 
//         updated_at = CURRENT_TIMESTAMP, 
//         isactive = ?
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, sanitizedValues);
//     return result;
//   } catch (err) {
//     throw new Error("Error updating company details in the database");
//   }
// };

// const activateDeactivateCompanyDetails = async (
//   companyId,
//   isActive,
//   updatedBy
// ) => {
//   try {
//     // SQL query to update the isactive field in the company_info table
//     const query = `
//           UPDATE company_info
//           SET isactive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//           WHERE id = ?
//         `;

//     // Execute the query with the companyId, new isActive status, and updatedBy
//     const [result] = await db.execute(query, [
//       isActive, // 1 or 0 based on the activation status
//       updatedBy, // Use the authenticated user's ID for updated_by
//       companyId, // The ID of the company to activate or deactivate
//     ]);

//     return result; // Return the result of the update operation (e.g., number of rows affected)
//   } catch (err) {
//     throw new Error("Error activating or deactivating company");
//   }
// };

// const getCompanies = async () => {
//   try {
//     // SQL query to select all companies from the company_info table
//     const query = `SELECT * FROM company_info`;

//     // Execute the query and return the result
//     const [companies] = await db.execute(query);
//     return companies; // Return the list of companies
//   } catch (err) {
//     throw new Error("Error retrieving companies list");
//   }
// };

// // Industry
// const getCountries = async () => {
//   try {
//     // SQL query to select all companies from the company_info table
//     const query = `SELECT * FROM countries`;

//     // Execute the query and return the result
//     const [countries] = await db.execute(query);
//     return countries; // Return the list of companies
//   } catch (err) {
//     throw new Error("Error retrieving companies list");
//   }
// };

// const createIndustry = async (
//   industryName,
//   description,
//   industryHead,
//   updatedBy
// ) => {
//   try {
//     // SQL query to insert industry data into the industries table
//     const query = `
//           INSERT INTO industries (industryName, description, industryHead, updated_by, isActive, updated_at)
//           VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
//         `;

//     // Execute the query with the provided industry data
//     const [result] = await db.execute(query, [
//       industryName,
//       description,
//       industryHead,
//       updatedBy,
//     ]);
//     return result; // Return the result of the insert operation
//   } catch (err) {
//     throw new Error("Error adding industry");
//   }
// };

// const updateIndustryDetails = async (
//   industryId,
//   industryName,
//   description,
//   industryHead,
//   isActive,
//   updatedBy // Include updatedBy as a parameter
// ) => {
//   try {
//     // SQL query to update the industry details including isActive and updated_by
//     const query = `
//             UPDATE industries
//             SET industryName = ?, description = ?, industryHead = ?, isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//             WHERE id = ?
//           `;

//     // Execute the query with the updated details
//     const [result] = await db.execute(query, [
//       industryName,
//       description,
//       industryHead,
//       isActive, // Update isActive column
//       updatedBy, // Update updated_by column
//       industryId, // Specify the industry ID for the update
//     ]);
//     return result; // Return the result of the update operation
//   } catch (err) {
//     throw new Error("Error updating industry");
//   }
// };

// const toggleIndustryActiveStatusDetails = async (
//   industryId,
//   isActive,
//   updatedBy
// ) => {
//   try {
//     // SQL query to update the industry active status and log the user who made the update
//     const query = `
//           UPDATE industries
//           SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//           WHERE id = ?
//         `;

//     const [result] = await db.execute(query, [
//       isActive, // Convert boolean to 1/0 for SQL
//       updatedBy, // Store the user who updated the status
//       industryId, // Specify the industry ID for the update
//     ]);
//     return result; // Return the result of the update operation
//   } catch (err) {
//     throw new Error("Error toggling industry active status");
//   }
// };

// const getIndustryListDetails = async () => {
//   try {
//     // SQL query to retrieve the list of industries
//     const query = `
//         SELECT 
//           id, 
//           industryName, 
//           description, 
//           industryHead, 
//           isActive, 
//           updated_at, 
//           updated_by
//         FROM industries
//       `;

//     // Execute the query and return the list of industries
//     const [industries] = await db.execute(query);
//     return industries; // Return the industries data
//   } catch (err) {
//     throw new Error("Error retrieving industry list");
//   }
// };

// // Project
// const createProject = async (projectName, projectDescription, updatedBy) => {
//   try {
//     // SQL query to insert project data into the project_master table
//     const query = `
//           INSERT INTO project_master (projectName, projectDescription, isActive, updated_by, updated_at)
//           VALUES (?, ?, 1, ?, CURRENT_TIMESTAMP)
//         `;

//     // Execute the query with the provided project data
//     const [result] = await db.execute(query, [
//       projectName,
//       projectDescription,
//       updatedBy,
//     ]);
//     return result; // Return the result of the insert operation
//   } catch (err) {
//     throw new Error("Error adding project");
//   }
// };

// const updateProjectDetails = async (
//   projectId,
//   projectName,
//   projectDescription,
//   isActive,
//   updatedBy
// ) => {
//   try {
//     // SQL query to update the project details including isActive and updatedBy
//     const query = `
//           UPDATE project_master
//           SET projectName = ?, projectDescription = ?, isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//           WHERE id = ?
//         `;

//     // Execute the query with the updated details
//     const [result] = await db.execute(query, [
//       projectName,
//       projectDescription,
//       isActive ? 1 : 0,
//       updatedBy, // Store the user who updated the project
//       projectId, // The ID of the project to update
//     ]);
//     return result; // Return the result of the update operation
//   } catch (err) {
//     throw new Error("Error updating project");
//   }
// };

// const getProjectListDetails = async () => {
//   try {
//     // SQL query to retrieve the list of projects
//     const query = `
//         SELECT 
//           id, 
//           projectName, 
//           projectDescription, 
//           isActive, 
//           updated_at, 
//           updated_by
//         FROM project_master
//       `;

//     // Execute the query and return the list of projects
//     const [projects] = await db.execute(query);
//     return projects; // Return the project data
//   } catch (err) {
//     throw new Error("Error retrieving project list");
//   }
// };

// const toggleProjectActiveStatusDetails = async (
//   projectId,
//   isActive,
//   updatedBy
// ) => {
//   try {
//     // SQL query to update the project active status and log the user who made the update
//     const query = `
//         UPDATE project_master
//         SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//         WHERE id = ?
//       `;

//     // Execute the query with the provided details
//     const [result] = await db.execute(query, [
//       isActive, // Convert boolean to 1/0 for SQL
//       updatedBy, // Store the user who updated the status
//       projectId, // Specify the project ID for the update
//     ]);
//     return result; // Return the result of the update operation
//   } catch (err) {
//     throw new Error("Error toggling project active status");
//   }
// };

// // Product Master
// const createProduct = async (productName, productDescription, updatedBy) => {
//   try {
//     // SQL query to insert project data into the project_master table
//     const query = `
//             INSERT INTO product_master (productName, productDescription, isActive, updated_by, updated_at)
//             VALUES (?, ?, 1, ?, CURRENT_TIMESTAMP)
//           `;

//     // Execute the query with the provided project data
//     const [result] = await db.execute(query, [
//       productName,
//       productDescription,
//       updatedBy,
//     ]);
//     return result; // Return the result of the insert operation
//   } catch (err) {
//     throw new Error("Error adding project");
//   }
// };

// const updateProductDetails = async (
//   productId,
//   productName,
//   productDescription,
//   isActive,
//   updatedBy
// ) => {
//   try {
//     // SQL query to update the project details including isActive and updatedBy
//     const query = `
//             UPDATE product_master
//             SET productName = ?, productDescription = ?, isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//             WHERE id = ?
//           `;

//     // Execute the query with the updated details
//     const [result] = await db.execute(query, [
//       productName,
//       productDescription,
//       isActive ? 1 : 0,
//       updatedBy, // Store the user who updated the project
//       productId, // The ID of the project to update
//     ]);
//     return result; // Return the result of the update operation
//   } catch (err) {
//     throw new Error("Error updating project");
//   }
// };

// const getProductListDetails = async () => {
//   try {
//     // SQL query to retrieve the list of projects
//     const query = `
//           SELECT 
//             id, 
//             productName, 
//             productDescription, 
//             isActive, 
//             updated_at, 
//             updated_by
//           FROM product_master
//         `;

//     // Execute the query and return the list of projects
//     const [projects] = await db.execute(query);
//     return projects; // Return the project data
//   } catch (err) {
//     throw new Error("Error retrieving project list");
//   }
// };

// const toggleProductActiveStatusDetails = async (
//   productId,
//   isActive,
//   updatedBy
// ) => {
//   try {
//     // SQL query to update the project active status and log the user who made the update
//     const query = `
//           UPDATE product_master
//           SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//           WHERE id = ?
//         `;

//     // Execute the query with the provided details
//     const [result] = await db.execute(query, [
//       isActive, // Convert boolean to 1/0 for SQL
//       updatedBy, // Store the user who updated the status
//       productId, // Specify the project ID for the update
//     ]);
//     return result; // Return the result of the update operation
//   } catch (err) {
//     throw new Error("Error toggling project active status");
//   }
// };

// // Currency Master
// const createCurrency = async (
//   currencyName,
//   currencyDescription,
//   updatedBy
// ) => {
//   try {
//     const query = `
//         INSERT INTO currency_master (currencyName, currencyDescription,  isActive, updated_by, updated_at)
//         VALUES (?, ?, 1, ?, CURRENT_TIMESTAMP)
//       `;

//     const [result] = await db.execute(query, [
//       currencyName,
//       currencyDescription,
//       updatedBy,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error adding currency");
//   }
// };

// const updateCurrencyDetails = async (
//   currencyId,
//   currencyName,
//   currencyDescription,
//   isActive,
//   updatedBy
// ) => {
//   try {
//     const query = `
//         UPDATE currency_master
//         SET currencyName = ?, currencyDescription = ?, isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//         WHERE id = ?
//       `;

//     const [result] = await db.execute(query, [
//       currencyName,
//       currencyDescription,
//       isActive ? 1 : 0,
//       updatedBy,
//       currencyId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error updating currency");
//   }
// };

// const toggleCurrencyStatus = async (currencyId, isActive, updatedBy) => {
//   try {
//     const query = `
//         UPDATE currency_master
//         SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//         WHERE id = ?
//       `;

//     const [result] = await db.execute(query, [
//       isActive,
//       updatedBy,
//       currencyId,
//     ]);

//     return result;
//   } catch (err) {
//     throw new Error("Error toggling currency active status");
//   }
// };

// const fetchCurrencyList = async (isActive) => {
//   try {
//     let query =
//       "SELECT id, currencyName, currencyDescription, exchangeRate, isActive FROM currency_master";

//     // If `isActive` is provided, filter by active status
//     if (isActive !== undefined) {
//       query += " WHERE isActive = ?";
//     }

//     const [result] = await db.execute(query, isActive ? [isActive] : []);
//     return result;
//   } catch (err) {
//     throw new Error("Error fetching currency list");
//   }
// };

// // Tax Master
// const createTax = async (taxType, taxPercentage, effectiveDate, updatedBy) => {
//   try {
//     const query = `
//       INSERT INTO tax_master (taxType, taxPercentage, effectiveDate, isActive, updated_by, updated_at)
//       VALUES (?, ?, ?, 1, ?, CURRENT_TIMESTAMP)
//     `;

//     const [result] = await db.execute(query, [
//       taxType,
//       taxPercentage,
//       effectiveDate,
//       updatedBy,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error adding tax");
//   }
// };

// const updateTaxDetails = async (
//   taxId,
//   taxType,
//   taxPercentage,
//   effectiveDate,
//   updatedBy
// ) => {
//   try {
//     const query = `
//       UPDATE tax_master
//       SET taxType = ?, taxPercentage = ?, effectiveDate = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, [
//       taxType,
//       taxPercentage,
//       effectiveDate,
//       updatedBy,
//       taxId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error updating tax");
//   }
// };

// const getTaxListDetails = async () => {
//   try {
//     const query = `
//       SELECT id, taxType, taxPercentage, effectiveDate, isActive, updated_at, updated_by
//       FROM tax_master
//     `;

//     const [taxes] = await db.execute(query);
//     return taxes;
//   } catch (err) {
//     throw new Error("Error retrieving tax list");
//   }
// };

// const toggleTaxActiveStatusDetails = async (taxId, isActive, updatedBy) => {
//   try {
//     const query = `
//       UPDATE tax_master
//       SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, [
//       isActive,
//       updatedBy,
//       taxId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error toggling tax active status");
//   }
// };

// // States Model

// const createState = async (stateCode, stateName, countryId, updatedBy) => {
//   try {
//     const query = `
//       INSERT INTO states (state_code, state_name, country_id, isActive, updated_by, updated_at)
//       VALUES (?, ?, ?, 1, ?, CURRENT_TIMESTAMP)
//     `;

//     const [result] = await db.execute(query, [
//       stateCode,
//       stateName,
//       countryId,
//       updatedBy,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error adding state");
//   }
// };

// const updateStateDetails = async (
//   stateId,
//   stateCode,
//   stateName,
//   countryId,
//   updatedBy
// ) => {
//   try {
//     const query = `
//       UPDATE states
//       SET state_code = ?, state_name = ?, country_id = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE state_id = ?
//     `;

//     const [result] = await db.execute(query, [
//       stateCode,
//       stateName,
//       countryId,
//       updatedBy,
//       stateId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error updating state");
//   }
// };

// const getStateListDetails = async (countryId) => {
//   try {
//     let query = `
//       SELECT 
//         s.state_id, s.state_code, s.state_name, s.country_id, s.isActive, s.updated_at, s.updated_by,
//         c.name AS country_name, c.code as country_code
//       FROM states s
//       LEFT JOIN countries c ON s.country_id = c.id
//     `;
//     let params = [];

//     if (countryId) {
//       query += " WHERE s.country_id = ?";
//       params.push(countryId);
//     }

//     const [results] = await db.execute(query, params);

//     // Group states under the country details if needed
//     // const countryDetails = results.length > 0 ? {
//     //   country_id: results[0].country_id,
//     //   country_name: results[0].country_name,
//     //   country_code: results[0].country_code,
//     //   isActive: results[0].country_isActive,
//     // } : null;

//     // const states = results.map(state => ({
//     //   state_id: state.state_id,
//     //   state_code: state.state_code,
//     //   state_name: state.state_name,
//     //   country_id: state.country_id,
//     //   isActive: state.isActive,
//     //   updated_at: state.updated_at,
//     //   updated_by: state.updated_by,
//     // }));

//     return results;
//   } catch (err) {
//     throw new Error("Error retrieving state and country details");
//   }
// };

// const toggleStateActiveStatusDetails = async (stateId, isActive, updatedBy) => {
//   try {
//     const query = `
//       UPDATE states
//       SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE state_id = ?
//     `;

//     const [result] = await db.execute(query, [
//       isActive,
//       updatedBy,
//       stateId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error toggling state active status");
//   }
// };

// // Account
// const createAccount = async (
//   companyId,
//   accountType,
//   bankName,
//   bankAddress,
//   accountNo,
//   ifscCode,
//   micrCode,
//   routingNoSwiftCode,
//   bankCode,
//   updatedBy
// ) => {
//   try {
//     const query = `
//       INSERT INTO accounts (
//         company_id, account_type, bank_name, bank_address, account_no,
//         ifsc_code, micr_code, routing_no_swift_code, bank_code,
//         is_active, updated_by, updated_at
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, CURRENT_TIMESTAMP)
//     `;

//     const [result] = await db.execute(query, [
//       companyId,
//       accountType,
//       bankName,
//       bankAddress,
//       accountNo,
//       ifscCode,
//       micrCode,
//       routingNoSwiftCode,
//       bankCode,
//       updatedBy,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error adding account");
//   }
// };

// const updateAccountDetails = async (
//   accountId,
//   companyId,
//   accountType,
//   bankName,
//   bankAddress,
//   accountNo,
//   ifscCode,
//   micrCode,
//   routingNoSwiftCode,
//   bankCode,
//   updatedBy
// ) => {
//   try {
//     const query = `
//       UPDATE accounts 
//       SET company_id = ?, account_type = ?, bank_name = ?, bank_address = ?, 
//           account_no = ?, ifsc_code = ?, micr_code = ?, 
//           routing_no_swift_code = ?, bank_code = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE account_id = ?
//     `;

//     const [result] = await db.execute(query, [
//       companyId,
//       accountType,
//       bankName,
//       bankAddress,
//       accountNo,
//       ifscCode,
//       micrCode,
//       routingNoSwiftCode,
//       bankCode,
//       updatedBy,
//       accountId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error updating account");
//   }
// };

// const getAccountListDetails = async () => {
//   try {
//     const query = `
// SELECT 
//     a.account_id, 
//     a.company_id, 
//     ci.companyName as company_name, 
//     a.account_type, 
//     a.bank_name, 
//     a.bank_address, 
//     a.account_no, 
//     a.ifsc_code, 
//     a.micr_code, 
//     a.routing_no_swift_code, 
//     a.bank_code, 
//     a.is_active, 
//     a.updated_at, 
//     a.updated_by
// FROM 
//     accounts a
// JOIN 
//     company_info ci 
// ON 
//     a.company_id = ci.id;
//     `;

//     const [accounts] = await db.execute(query);
//     return accounts;
//   } catch (err) {
//     throw new Error("Error retrieving account list");
//   }
// };

// const toggleAccountActiveStatusDetails = async (
//   accountId,
//   isActive,
//   updatedBy
// ) => {
//   try {
//     const query = `
//       UPDATE accounts
//       SET is_active = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE account_id = ?
//     `;

//     const [result] = await db.execute(query, [
//       isActive,
//       updatedBy,
//       accountId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error toggling account active status");
//   }
// };

// // Clients 
// const createClient = async (
//   industry_id,
//   name,
//   alias,
//   pan_no,
//   polestar_bank_account_id,
//   gstn,
//   salutation,
//   first_name,
//   last_name,
//   email,
//   phone,
//   msa_flag,
//   is_performa,
//   msa_start_date,
//   msa_end_date,
//   non_solicitation_clause,
//   use_logo_permission,
//   client_category,
//   servicing_type,
//   missing_msa_deadline,
//   is_msa_missing,
//   logopath,
//   updated_by // Include updated_by
// ) => {
//   const query = `
//     INSERT INTO client_details (
//       industry_id, name, alias, pan_no,  polestar_bank_account_id, gstn,
//       salutation, first_name, last_name, email, phone, msa_flag, is_performa,
//       msa_start_date, msa_end_date, non_solicitation_clause, use_logo_permission,
//       client_category, servicing_type, missing_msa_deadline, is_msa_missing, logopath, updated_by
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;
//   const params = [
//     industry_id,
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
//     logopath,
//     updated_by
//   ];
//   await db.execute(query, params);
// };

// const updateClientDetails = async (
//   id,
//   industry_id,
//   name,
//   alias,
//   pan_no,
//   polestar_bank_account_id,
//   gstn,
//   salutation,
//   first_name,
//   last_name,
//   email,
//   phone,
//   msa_flag,
//   is_performa,
//   msa_start_date,
//   msa_end_date,
//   non_solicitation_clause,
//   use_logo_permission,
//   client_category,
//   servicing_type,
//   missing_msa_deadline,
//   is_msa_missing,
//   logopath,
//   updated_by // Add updated_by here
// ) => {
//   const query = `
//     UPDATE client_details
//     SET industry_id = ?, name = ?, alias = ?, pan_no = ?, polestar_bank_account_id = ?, gstn = ?,
//         salutation = ?, first_name = ?, last_name = ?, email = ?, phone = ?,
//         msa_flag = ?, is_performa = ?, msa_start_date = ?, msa_end_date = ?, non_solicitation_clause = ?,
//         use_logo_permission = ?, client_category = ?, servicing_type = ?, missing_msa_deadline = ?,
//         is_msa_missing = ?, logopath = ?, updated_at = CURRENT_TIMESTAMP, updated_by = ?
//     WHERE id = ?
//   `;
//   const params = [
//     industry_id,
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
//     logopath,
//     updated_by, // Add updated_by to params
//     id,
//   ];
//   await db.execute(query, params);
// };

// const fetchClients = async () => {
//   const query = `SELECT 
//   cd.*,
//   a.account_no AS polestar_bank_account_number,
//   i.industryName AS industry_name
// FROM 
// client_details cd
// LEFT JOIN 
//   accounts a ON cd.polestar_bank_account_id = a.account_id 
// LEFT JOIN 
//   industries i ON cd.industry_id = i.id;
// `;
//   const [rows] = await db.query(query);
//   return rows;
// };

// const toggleClientActiveStatusDetails = async (
//   clientId,
//   isActive,
//   updatedBy
// ) => {
//   try {
//     const query = `
//       UPDATE client_details
//       SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, [
//       isActive ? 1 : 0,
//       updatedBy,
//       clientId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error toggling account active status");
//   }
// };

// const createClientBillingInfo = async (address1, address2, address3, pin, countryId, stateId, clientId, updatedBy) => {
//   try {
//     const query = `
//       INSERT INTO client_billing_info (address1, address2, address3, pin, country_id, state_id, client_id, isActive, updated_by, updated_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, CURRENT_TIMESTAMP)
//     `;

//     const [result] = await db.execute(query, [
//       address1,
//       address2,
//       address3,
//       pin,
//       countryId,
//       stateId,
//       clientId,
//       updatedBy,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error adding client billing information");
//   }
// };

// const updateClientBillingDetails = async (
//   billingId,
//   address1,
//   address2,
//   address3,
//   pin,
//   countryId,
//   stateId,
//   clientId,
//   updatedBy
// ) => {
//   try {
//     const query = `
//       UPDATE client_billing_info
//       SET address1 = ?, address2 = ?, address3 = ?, pin = ?, country_id = ?, state_id = ?, client_id = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, [
//       address1,
//       address2,
//       address3,
//       pin,
//       countryId,
//       stateId,
//       clientId,
//       updatedBy,
//       billingId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error updating client billing information");
//   }
// };

// const getClientBillingDetails = async () => {
//   try {
//     // const query = `
//     //   SELECT 
//     //     id, address1, address2, address3, pin, country_id, state_id, client_id, isActive, updated_at, updated_by
//     //   FROM client_billing_info
//     // `;
// const query = `SELECT 
//     cbi.id, 
//     cbi.address1, 
//     cbi.address2, 
//     cbi.address3, 
//     cbi.pin, 
//     cbi.country_id, 
//     cbi.state_id, 
//     cbi.client_id, 
//     cbi.isActive, 
//     cbi.updated_at, 
//     cbi.updated_by,
//     s.state_name, 
//     co.name as country_name, 
//     cd.name AS client_name
// FROM 
//     client_billing_info cbi
// JOIN 
//     states s ON cbi.state_id = s.state_id
// JOIN 
//     countries co ON cbi.country_id = co.id
// JOIN 
//     client_details cd ON cbi.client_id = cd.id;
// `

//     const [results] = await db.execute(query, []);
//     return results;
//   } catch (err) {
//     throw new Error("Error retrieving client billing information");
//   }
// };

// const toggleClientBillingActiveStatusDetails = async (billingId, isActive, updatedBy) => {
//   try {
//     const query = `
//       UPDATE client_billing_info
//       SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, [
//       isActive ? 1 : 0,
//       updatedBy,
//       billingId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error toggling client billing active status");
//   }
// };

// const createClientShippingInfo = async (clientId, address1, address2, address3, pin, countryId, stateId, gstn, updatedBy) => {
//   try {
//     const query = `
//       INSERT INTO client_shipping_info (client_id, client_ship_to_address1, client_ship_to_address2, client_ship_to_address3, 
//       client_ship_to_pin, client_ship_to_country_id, client_ship_to_state_id, client_ship_to_gstn, updated_by, created_at, updated_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
//     `;

//     const [result] = await db.execute(query, [
//       clientId,
//       address1,
//       address2,
//       address3,
//       pin,
//       countryId,
//       stateId,
//       gstn,
//       updatedBy,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error adding client shipping information");
//   }
// };

// const updateClientShippingDetails = async (shippingId, clientId, address1, address2, address3, pin, countryId, stateId, gstn, updatedBy) => {
//   try {
//     const query = `
//       UPDATE client_shipping_info
//       SET client_id = ?, client_ship_to_address1 = ?, client_ship_to_address2 = ?, client_ship_to_address3 = ?, 
//       client_ship_to_pin = ?, client_ship_to_country_id = ?, client_ship_to_state_id = ?, client_ship_to_gstn = ?, 
//       updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, [
//       clientId,
//       address1,
//       address2,
//       address3,
//       pin,
//       countryId,
//       stateId,
//       gstn,
//       updatedBy,
//       shippingId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error updating client shipping information");
//   }
// };

// const getClientShippingDetails = async () => {
//   try {
//     // const query = `
//     //   SELECT 
//     //     id, client_id, client_ship_to_address1, client_ship_to_address2, client_ship_to_address3, 
//     //     client_ship_to_pin, client_ship_to_country_id, client_ship_to_state_id, client_ship_to_gstn, 
//     //     created_at, updated_at, updated_by, isActive
//     //   FROM client_shipping_info
//     // `;
 
//     const query = `SELECT 
//     csi.id, 
//     csi.client_id, 
//     csi.client_ship_to_address1, 
//     csi.client_ship_to_address2, 
//     csi.client_ship_to_address3, 
//     csi.client_ship_to_pin, 
//     csi.client_ship_to_country_id, 
//     csi.client_ship_to_state_id, 
//     csi.client_ship_to_gstn, 
//     csi.created_at, 
//     csi.updated_at, 
//     csi.updated_by, 
//     csi.isActive,
//     s.state_name, 
//     co.name AS country_name, 
//     cd.name AS client_name
// FROM 
//     client_shipping_info csi
// JOIN 
//     states s ON csi.client_ship_to_state_id = s.state_id
// JOIN 
//     countries co ON csi.client_ship_to_country_id = co.id
// JOIN 
//     client_details cd ON csi.client_id = cd.id;
// `
//     const [results] = await db.execute(query, []);
//     return results;
//   } catch (err) {
//     throw new Error("Error retrieving client shipping information");
//   }
// };

// const toggleClientShippingActiveStatusDetails = async (shippingId, isActive, updatedBy) => {
//   try {
//     const query = `
//       UPDATE client_shipping_info
//       SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, [
//       isActive ? 1 : 0,
//       updatedBy,
//       shippingId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error toggling client shipping active status");
//   }
// };

// const createTechnology = async (technologyName, description, updatedBy) => {
//   try {
//     const query = `
//       INSERT INTO technology_master (technologyName, description, isActive, updated_by, updated_at)
//       VALUES (?, ?, 1, ?, CURRENT_TIMESTAMP)
//     `;

//     const [result] = await db.execute(query, [
//       technologyName,
//       description,
//       updatedBy,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error adding technology");
//   }
// };

// const updateTechnologyDetails = async (
//   technologyId,
//   technologyName,
//   description,
//   updatedBy
// ) => {
//   try {
//     const query = `
//       UPDATE technology_master
//       SET technologyName = ?, description = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, [
//       technologyName,
//       description,
//       updatedBy,
//       technologyId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error updating technology");
//   }
// };

// const getTechnologyListDetails = async () => {
//   try {
//     const query = `
//       SELECT id, technologyName, description, isActive, updated_at, updated_by
//       FROM technology_master
//     `;

//     const [technologies] = await db.execute(query);
//     return technologies;
//   } catch (err) {
//     throw new Error("Error retrieving technology list");
//   }
// };

// const toggleTechnologyActiveStatusDetails = async (
//   technologyId,
//   isActive,
//   updatedBy
// ) => {
//   try {
//     const query = `
//       UPDATE technology_master
//       SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, [
//       isActive,
//       updatedBy,
//       technologyId,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error toggling technology active status");
//   }
// };

// const createCompanyAddress = async (
//   address1,
//   address2,
//   address3,
//   stateId,
//   countryId,
//   pin,
//   GST,
//   PAN,
//   companyId,  // Added companyId
//   updatedBy
// ) => {
//   try {
//     const query = `
//       INSERT INTO company_addresses (address1, address2, address3, stateId, countryId, pin, GST, PAN, companyId, isActive, updated_by, updated_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, CURRENT_TIMESTAMP)
//     `;

//     const [result] = await db.execute(query, [
//       address1,
//       address2,
//       address3,
//       stateId,
//       countryId,
//       pin,
//       GST,
//       PAN,
//       companyId,  // Added companyId
//       updatedBy,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error adding company address");
//   }
// };

// const updateCompanyAddressDetails = async (
//   id,
//   address1,
//   address2,
//   address3,
//   stateId,
//   countryId,
//   pin,
//   GST,
//   PAN,
//   companyId,  // Added companyId
//   updatedBy
// ) => {
//   try {
//     const query = `
//       UPDATE company_addresses
//       SET address1 = ?, address2 = ?, address3 = ?, stateId = ?, countryId = ?, pin = ?, GST = ?, PAN = ?, companyId = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, [
//       address1,
//       address2,
//       address3,
//       stateId,
//       countryId,
//       pin,
//       GST,
//       PAN,
//       companyId,  // Added companyId
//       updatedBy,
//       id,
//     ]);
//     return result;
//   } catch (err) {
//     throw new Error("Error updating company address");
//   }
// };

// const getCompanyAddressListDetails = async () => {
//   try {
//     const query = `
//       SELECT 
//         ca.id, 
//         ca.address1, 
//         ca.address2, 
//         ca.address3, 
//         ca.pin, 
//         ca.GST, 
//         ca.PAN, 
//         ca.isActive, 
//         ca.updated_at, 
//         ca.updated_by,
//         s.state_name AS state,
//         c.name AS country,
//         ci.companyName AS company
//       FROM 
//         company_addresses AS ca
//       LEFT JOIN 
//         states AS s ON ca.stateId = s.state_id
//       LEFT JOIN 
//         countries AS c ON ca.countryId = c.id
//       LEFT JOIN 
//         company_info AS ci ON ca.companyId = ci.id  -- Updated to use companyId
//     `;

//     const [addresses] = await db.execute(query);
//     return addresses;
//   } catch (err) {
//     throw new Error("Error retrieving company address list");
//   }
// };


// const toggleCompanyAddressActiveStatusDetails = async (id, isActive, updatedBy) => {
//   try {
//     const query = `
//       UPDATE company_addresses
//       SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(query, [isActive, updatedBy, id]);
//     return result;
//   } catch (err) {
//     throw new Error("Error toggling company address active status");
//   }
// };

// Country 
const createCountry = async (
  code,
  name,
  language,
  phoneCode,
  addressAdditionalFields,
  bankAccAdditionalFields,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO country_info (code, name, language, phoneCode, addressAdditionalFields, bankAccAdditionalFields, isactive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    
    const [result] = await db.execute(query, [
      code,
      name,
      language,
      phoneCode,
      addressAdditionalFields,
      bankAccAdditionalFields,
      isActive,
      updatedBy
    ]);
    
    return result;
  } catch (err) {
    console.log("Error creating country:", err);
    throw new Error("Error creating country");
  }
};

const updateCountryDetails = async (
  countryId,
  code,
  name,
  language,
  phoneCode,
  addressAdditionalFields,
  bankAccAdditionalFields,
  isActive,
  updatedBy
) => {
  try {
    const sanitizedValues = [
      code ?? null,
      name ?? null,
      language ?? null,
      phoneCode ?? null,
      addressAdditionalFields ?? null,
      bankAccAdditionalFields ?? null,
      updatedBy ?? null,
      isActive ?? null,
      countryId
    ];

    const query = `
      UPDATE country_info
      SET 
        code = ?, 
        name = ?, 
        language = ?, 
        phoneCode = ?, 
        addressAdditionalFields = ?, 
        bankAccAdditionalFields = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP, 
        isactive = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.log("Error updating country:", err);
    throw new Error("Error updating country details");
  }
};

const activateDeactivateCountryDetails = async (
  countryId,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE country_info
      SET isactive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive, // 1 or 0
      updatedBy,
      countryId
    ]);

    return result;
  } catch (err) {
    console.log("Error activating or deactivating country:", err);
    throw new Error("Error activating/deactivating country");
  }
};

const getCountries = async () => {
  try {
    const query = `SELECT * FROM country_info`;

    const [countries] = await db.execute(query);
    return countries;
  } catch (err) {
    console.log("Error retrieving countries list:", err);
    throw new Error("Error retrieving countries list");
  }
};

// State
const createState = async (
  countryId,
  stateName,
  stateCode,
  gstCode,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO state_info (countryId, stateName, stateCode, gstCode, isactive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    
    const [result] = await db.execute(query, [
      countryId,
      stateName,
      stateCode,
      gstCode,
      isActive,
      updatedBy
    ]);
    
    return result;
  } catch (err) {
    console.log("Error creating state:", err);
    throw new Error("Error creating state");
  }
};

const updateStateDetails = async (
  stateId,
  countryId,
  stateName,
  stateCode,
  gstCode,
  isActive,
  updatedBy
) => {
  try {
    const sanitizedValues = [
      countryId ?? null,
      stateName ?? null,
      stateCode ?? null,
      gstCode ?? null,
      isActive ?? null,
      updatedBy ?? null,
      stateId
    ];

    const query = `
      UPDATE state_info
      SET 
        countryId = ?, 
        stateName = ?, 
        stateCode = ?, 
        gstCode = ?, 
        isactive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.log("Error updating state:", err);
    throw new Error("Error updating state details");
  }
};

const activateDeactivateStateDetails = async (stateId, isActive, updatedBy) => {
  console.log("stateId", stateId,"isActive",isActive,"updatedBy",updatedBy);
  try {
    const query = `
      UPDATE state_info
      SET isactive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive,        // 1 or 0 for active/inactive
      updatedBy ?? null, // Use null if updatedBy is undefined
      stateId          // The state ID to update
    ]);

    return result;
  } catch (err) {
    console.error("Error activating or deactivating state:", err);
    throw new Error("Error activating/deactivating state");
  }
};

const getStates = async (countryId = null) => {
  try {
    // Define the base query with an INNER JOIN to include countryName
    let query = `
      SELECT 
        s.*, 
        c.name 
      FROM 
        state_info s
      INNER JOIN 
        country_info c 
      ON 
        s.countryId = c.id
    `;
    const queryParams = [];

    // If countryId is provided, filter by countryId
    if (countryId) {
      query += ` WHERE s.countryId = ?`;
      queryParams.push(countryId);
    }

    // Execute the query with the appropriate parameters
    const [states] = await db.execute(query, queryParams);
    return states;
  } catch (err) {
    console.log("Error retrieving states list:", err);
    throw new Error("Error retrieving states list");
  }
};


// Region
const createRegion = async (
  countryId,
  regionName,
  regionCode,
  stateIds,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO region_info (countryId, regionName, regionCode, stateIds, isactive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      countryId,
      regionName,
      regionCode,
      stateIds,
      isActive,
      updatedBy
    ]);

    return result;
  } catch (err) {
    console.log("Error creating region:", err);
    throw new Error("Error creating region");
  }
};

const updateRegionDetails = async (
  regionId,
  countryId,
  regionName,
  regionCode,
  stateIds,
  isActive,
  updatedBy
) => {
  try {
    const sanitizedValues = [
      countryId ?? null,
      regionName ?? null,
      regionCode ?? null,
      stateIds ?? null,
      isActive ?? null,
      updatedBy ?? null,
      regionId
    ];

    const query = `
      UPDATE region_info
      SET 
        countryId = ?, 
        regionName = ?, 
        regionCode = ?, 
        stateIds = ?, 
        isactive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.log("Error updating region:", err);
    throw new Error("Error updating region details");
  }
};

const activateDeactivateRegionDetails = async (regionId, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE region_info
      SET isactive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive,        // 1 or 0 for active/inactive
      updatedBy ?? null, // Use null if updatedBy is undefined
      regionId          // The region ID to update
    ]);

    return result;
  } catch (err) {
    console.error("Error activating or deactivating region:", err);
    throw new Error("Error activating/deactivating region");
  }
};

const getRegions = async (countryId = null) => {
  try {
    // Define the base query with joins to fetch country name and state names
    let query = `
      SELECT 
        region_info.*, 
        country_info.name AS countryName,
        IFNULL(GROUP_CONCAT(state_info.stateName), 'No States') AS stateNames
      FROM 
        region_info
      LEFT JOIN 
        country_info 
      ON 
        region_info.countryId = country_info.id
      LEFT JOIN 
        state_info 
      ON 
        region_info.stateIds IS NOT NULL AND FIND_IN_SET(state_info.id, region_info.stateIds) > 0`;

    const queryParams = [];

    // If countryId is provided, filter by it
    if (countryId) {
      query += " WHERE region_info.countryId = ?";
      queryParams.push(countryId);
    }

    // Group by region to aggregate state names
    query += " GROUP BY region_info.id";

    // Debugging query output for validation
    console.log("Executing query:", query, "with params:", queryParams);

    // Execute the query with the appropriate parameters
    const [regions] = await db.execute(query, queryParams);
    return regions;
  } catch (err) {
    console.log("Error retrieving regions list:", err);
    throw new Error("Error retrieving regions list");
  }
};

// Company
const createCompany = async (
  companyName,
  Website,
  CINNO,
  IECode,
  Email,
  description,
  isActive,
  updatedBy,
  logopath,
  independent, // 0 or 1 to define whether the company is independent
  parentCompanyId,
  digitalSignPath
) => {
  try {
    const query = `
      INSERT INTO company_info (
        companyName, Website, CINNO, IECode, Email, logopath, description, isactive, updated_by, 
        independent, parentCompanyId, digitalSignPath, updated_at
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      companyName,
      Website,
      CINNO,
      IECode,
      Email,
      logopath,
      description,
      isActive,
      updatedBy,
      independent,
      parentCompanyId,
      digitalSignPath,
    ]);

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error creating company");
  }
};

const getCompanyById = async (companyId) => {
  try {
    const query = "SELECT logoPath, digitalSignPath FROM company_info WHERE id = ?";
    const [rows] = await db.execute(query, [companyId]);
    
    if (rows.length > 0) {
      return rows[0]; // Return the first matching row
    }
    
    throw new Error("Company not found");
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching company details");
  }
};

const updateCompanyDetails = async (
  companyId,
  companyName,
  Website,
  CINNO,
  IECode,
  Email,
  description,
  isActive,
  logopath,
  updatedBy,
  independent, // 0 or 1 to define whether the company is independent
  parentCompanyId,
  digitalSignPath
) => {
  try {
    const sanitizedValues = [
      companyName ?? null,
      Website ?? null,
      CINNO ?? null,
      IECode ?? null,
      Email ?? null,
      logopath ?? null, // Updated logo path (if new)
      description ?? null,
      updatedBy ?? null,
      isActive ?? null,
      independent ?? null,
      parentCompanyId ?? null,
      digitalSignPath ?? null, // Updated digital signature path (if new)
      companyId,
    ];

    const query = `
      UPDATE company_info
      SET 
        companyName = ?, 
        Website = ?, 
        CINNO = ?, 
        IECode = ?, 
        Email = ?, 
        logopath = ?, 
        description = ?, 
        updated_by = ?, 
        isactive = ?, 
        independent = ?, 
        parentCompanyId = ?, 
        digitalSignPath = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Error updating company details");
  }
};

const activateDeactivateCompanyDetails = async (companyId, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE company_info
      SET isactive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive,        // 1 or 0 for active/inactive
      updatedBy ?? null, // Use null if updatedBy is undefined
      companyId        // The company ID to update
    ]);

    return result;
  } catch (err) {
    console.error("Error activating or deactivating company:", err);
    throw new Error("Error activating/deactivating company");
  }
};

const getCompanies = async () => {
  try {
    // Define the base query to fetch all company details, including parent company info
    const query = `
      SELECT 
        company_info.*, 
        parent_company.companyName AS parentCompanyName
      FROM 
        company_info
      LEFT JOIN 
        company_info AS parent_company
      ON 
        company_info.parentCompanyId = parent_company.id`;

    // Execute the query with no additional filtering
    const [companies] = await db.execute(query);
    return companies;
  } catch (err) {
    console.error("Error retrieving companies list:", err);
    throw new Error("Error retrieving companies list");
  }
};


module.exports = {
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
  getCompanies
};
