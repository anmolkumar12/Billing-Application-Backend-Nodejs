const db = require("../config/db");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument();
const path = require('path');
const puppeteer = require('puppeteer');
const numberToWords = require("number-to-words");

// Country
const createCountry = async (
  code,
  name,
  language,
  phoneCode,
  addressAdditionalFields,
  bankAccAdditionalFields,
  companyAddtionalFields,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO country_info (code, name, language, phoneCode, addressAdditionalFields, bankAccAdditionalFields, companyAddtionalFields, isactive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      code,
      name,
      language,
      phoneCode,
      addressAdditionalFields,
      bankAccAdditionalFields,
      companyAddtionalFields,
      isActive,
      updatedBy,
    ]);

    return result;
  } catch (err) {
    console.error("Error creating country:", err); // Log the full error
    throw err; // Re-throw the original error for handling in the controller
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
  companyAddtionalFields,
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
      companyAddtionalFields ?? null,
      updatedBy ?? null,
      isActive ?? null,
      countryId,
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
        companyAddtionalFields = ?,
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP, 
        isactive = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.log("Error updating country:", err);
    throw err;
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
      countryId,
    ]);

    return result;
  } catch (err) {
    console.log("Error activating or deactivating country:", err);
    throw err;
  }
};

const getCountries = async () => {
  try {
    const query = `
      SELECT 
        ci.id,
        ci.code,
        ci.name,
        ci.language,
        ci.phoneCode,
        ci.addressAdditionalFields,
        ci.bankAccAdditionalFields,
        ci.companyAddtionalFields,
        ci.isactive,
        u.username AS updated_by,
        ci.updated_at
      FROM country_info ci
      LEFT JOIN users u ON ci.updated_by = u.id
    `;

    const [countries] = await db.execute(query);
    return countries;
  } catch (err) {
    console.log("Error retrieving countries list:", err);
    throw err;
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
      updatedBy,
    ]);

    return result;
  } catch (err) {
    console.log("Error creating state:", err);
    throw err;
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
      stateId,
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
    throw err;
  }
};

const activateDeactivateStateDetails = async (stateId, isActive, updatedBy) => {
  console.log("stateId", stateId, "isActive", isActive, "updatedBy", updatedBy);
  try {
    const query = `
      UPDATE state_info
      SET isactive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive, // 1 or 0 for active/inactive
      updatedBy ?? null, // Use null if updatedBy is undefined
      stateId, // The state ID to update
    ]);

    return result;
  } catch (err) {
    console.error("Error activating or deactivating state:", err);
    throw err;
  }
};

const getStates = async (countryId = null) => {
  try {
    // Define the base query with an INNER JOIN to include countryName
    let query = `
      SELECT 
          s.*, 
          c.name,
          u.username AS updated_by
      FROM 
          state_info s
      INNER JOIN 
          country_info c 
      ON 
          s.countryId = c.id
      LEFT JOIN 
          users u
      ON 
          s.updated_by = u.id

        
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
    throw err;
  }
};

// Region
const createRegion = async (
  countryId,
  regionName,
  regionCode,
  stateIds,
  isActive,
  updatedBy,
  regionHeadName,
  regionHeadEcode,
  regionHeadEmail,
  fromDate // Added fromDate
) => {
  try {
    const query = `
      INSERT INTO region_info (
        countryId, 
        regionName, 
        regionCode, 
        stateIds, 
        isActive, 
        updated_by, 
        updated_at, 
        regionHeadName, 
        regionHeadEcode, 
        regionHeadEmail, 
        fromDate
      )
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      countryId,
      regionName,
      regionCode,
      stateIds,
      isActive,
      updatedBy,
      regionHeadName ?? null,
      regionHeadEcode ?? null,
      regionHeadEmail ?? null,
      // fromDate, // Pass fromDate as a parameter
    ]);

    return result;
  } catch (err) {
    console.log("Error creating region:", err);
    throw err;
  }
};

const updateRegionDetails = async (
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
  fromDate // Added fromDate
) => {
  try {
    const sanitizedValues = [
      countryId ?? null,
      regionName ?? null,
      regionCode ?? null,
      stateIds ?? null,
      isActive ?? null,
      updatedBy ?? null,
      regionHeadName ?? null,
      regionHeadEcode ?? null,
      regionHeadEmail ?? null,
      // fromDate ?? null, // Include fromDate in the update
      regionId,
    ];

    const query = `
      UPDATE region_info
      SET 
        countryId = ?, 
        regionName = ?, 
        regionCode = ?, 
        stateIds = ?, 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP,
        regionHeadName = ?,
        regionHeadEcode = ?,
        regionHeadEmail = ?,
        fromDate = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.log("Error updating region:", err);
    throw err;
  }
};

const activateDeactivateRegionDetails = async (
  regionId,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE region_info
      SET isactive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive, // 1 or 0 for active/inactive
      updatedBy ?? null, // Use null if updatedBy is undefined
      regionId, // The region ID to update
    ]);

    return result;
  } catch (err) {
    console.error("Error activating or deactivating region:", err);
    throw err;
  }
};

const getRegions = async (countryId = null) => {
  try {
    // Define the base query with joins to fetch country name and state names
    let query = `
        SELECT 
          region_info.*, 
          country_info.name AS countryName,
          IFNULL(GROUP_CONCAT(state_info.stateName), 'No States') AS stateNames,
          u.username AS updated_by
        FROM 
          region_info
        LEFT JOIN 
          country_info 
        ON 
          region_info.countryId = country_info.id
        LEFT JOIN 
          state_info 
        ON 
          region_info.stateIds IS NOT NULL AND FIND_IN_SET(state_info.id, region_info.stateIds) > 0
        LEFT JOIN 
          users u
        ON 
          region_info.updated_by = u.id`;

    // Add condition for filtering by `countryId`, if provided
    const queryParams = [];
    if (countryId) {
      query += " WHERE region_info.countryId = ?";
      queryParams.push(countryId);
    }

    // Add GROUP BY clause
    query += " GROUP BY region_info.id, country_info.name, u.username";

    // Debugging query output for validation
    console.log("Executing query:", query, "with params:", queryParams);

    // Execute the query with the appropriate parameters
    const [regions] = await db.execute(query, queryParams);

    return regions;
  } catch (err) {
    console.log("Error retrieving regions list:", err);
    throw err;
  }
};

// Company
const createCompany = async (
  countryId,
  companyName,
  companyCode, // Added companyCode
  Website,
  Email,
  description,
  companyAddtionalFields,
  isActive,
  updatedBy,
  logopath,
  independent, // 0 or 1 to define whether the company is independent
  parentCompanyId,
  pan_number,
  digitalSignPath
) => {
  try {
    const query = `
      INSERT INTO company_info (
        countryId, companyName, companyCode, Website, Email, logopath, description, companyAddtionalFields, isactive, 
        updated_by, independent, parentCompanyId, pan_number, digitalSignPath, updated_at
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      countryId,
      companyName,
      companyCode, // Insert companyCode
      Website,
      Email,
      logopath,
      description,
      companyAddtionalFields,
      isActive,
      updatedBy,
      independent,
      parentCompanyId,
      pan_number,
      digitalSignPath,
    ]);

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateCompanyDetails = async (
  countryId,
  companyId,
  companyName,
  companyCode, // Added companyCode
  Website,
  Email,
  description,
  companyAddtionalFields,
  isActive,
  logopath,
  updatedBy,
  independent, // 0 or 1 to define whether the company is independent
  parentCompanyId,
  pan_number,
  digitalSignPath
) => {
  try {
    const sanitizedValues = [
      countryId ?? null,
      companyName ?? null,
      companyCode ?? null, // Pass companyCode
      Website ?? null,
      Email ?? null,
      logopath ?? null, // Updated logo path (if new)
      description ?? null,
      companyAddtionalFields ?? null,
      updatedBy ?? null,
      isActive ?? null,
      independent ?? null,
      parentCompanyId ?? null,
      pan_number ?? null,
      digitalSignPath ?? null, // Updated digital signature path (if new)
      companyId,
    ];

    const query = `
      UPDATE company_info
      SET 
        countryId = ?,
        companyName = ?, 
        companyCode = ?, 
        Website = ?, 
        Email = ?, 
        logopath = ?, 
        description = ?, 
        companyAddtionalFields = ?,
        updated_by = ?, 
        isactive = ?, 
        independent = ?, 
        parentCompanyId = ?, 
        pan_number = ?,
        digitalSignPath = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getCompanyById = async (companyId) => {
  try {
    const query =
      "SELECT logoPath, digitalSignPath FROM company_info WHERE id = ?";
    const [rows] = await db.execute(query, [companyId]);

    if (rows.length > 0) {
      return rows[0]; // Return the first matching row
    }

    throw err;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const activateDeactivateCompanyDetails = async (
  companyId,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE company_info
      SET isactive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive, // 1 or 0 for active/inactive
      updatedBy ?? null, // Use null if updatedBy is undefined
      companyId, // The company ID to update
    ]);

    return result;
  } catch (err) {
    console.error("Error activating or deactivating company:", err);
    throw err;
  }
};

const getCompanies = async () => {
  try {
    // Define the base query to fetch all company details, including parent company info and country name
    const query = `
      SELECT 
        company_info.*, 
        parent_company.companyName AS parentCompanyName,
        users.username as updated_by,
        country_info.name AS countryName
      FROM 
        company_info
      LEFT JOIN 
        company_info AS parent_company
      ON 
        company_info.parentCompanyId = parent_company.id
      LEFT JOIN 
        country_info
      ON 
        company_info.countryId = country_info.id
        left join 
        users
        on users.id = company_info.updated_by
        `;

    // Execute the query with no additional filtering
    const [companies] = await db.execute(query);
    return companies;
  } catch (err) {
    console.error("Error retrieving companies list:", err);
    throw err;
  }
};

// Insert Company Location
const insertCompanyLocation = async (
  companyId,
  countryId,
  stateId,
  address1,
  address2,
  address3,
  additionalAddressDetails,
  isDefaultAddress,
  gst_number,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO company_location_info 
      (companyId, countryId, stateId, address1, address2, address3, additionalAddressDetails, isDefaultAddress, gst_number, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const sanitizedValues = [
      companyId ?? null,
      countryId ?? null,
      stateId ?? null,
      address1 ?? null,
      address2 ?? null,
      address3 ?? null,
      JSON.stringify(additionalAddressDetails) ?? null,
      isDefaultAddress ?? null,
      gst_number ?? null,
      isActive ?? null,
      updatedBy ?? null,
    ];

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.error("Error inserting company location:", err);
    throw err;
  }
};

// Update Company Location
const updateLocationDetails = async (
  locationId,
  companyId,
  countryId,
  stateId,
  address1,
  address2,
  address3,
  additionalAddressDetails,
  isDefaultAddress,
  gst_number,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE company_location_info
      SET 
        companyId = ?, 
        countryId = ?, 
        stateId = ?, 
        address1 = ?, 
        address2 = ?, 
        address3 = ?, 
        additionalAddressDetails = ?, 
        isDefaultAddress = ?, 
        gst_number = ?,
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const sanitizedValues = [
      companyId ?? null,
      countryId ?? null,
      stateId ?? null,
      address1 ?? null,
      address2 ?? null,
      address3 ?? null,
      JSON.stringify(additionalAddressDetails) ?? null,
      isDefaultAddress ?? null,
      gst_number ?? null,
      isActive ?? null,
      updatedBy ?? null,
      locationId,
    ];

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.error("Error updating company location:", err);
    throw err;
  }
};


const getLocations = async (companyId = null) => {
  try {
    let query = `
      SELECT 
        company_location_info.*, 
        country_info.name AS countryName,
        users.username as updated_by,
        state_info.stateName AS stateName,
        company_info.companyName  -- Include the company name here
      FROM 
        company_location_info
      LEFT JOIN 
        country_info ON company_location_info.countryId = country_info.id
      LEFT JOIN 
        state_info ON company_location_info.stateId = state_info.id
      LEFT JOIN 
        company_info ON company_location_info.companyId = company_info.id 
        LEFT JOIN users
        on company_location_info.updated_by = users.id
         -- Join with company_info table
    `;

    const queryParams = [];

    // If companyId is provided, filter by it
    if (companyId) {
      query += " WHERE company_location_info.companyId = ?";
      queryParams.push(companyId);
    }

    const [locations] = await db.execute(query, queryParams);
    return locations;
  } catch (err) {
    console.log("Error retrieving company locations:", err);
    throw err;
  }
};

const activateDeactivateLocation = async (locationId, isActive, deactivationDate, updatedBy) => {
  try {
    const query = `
      UPDATE company_location_info
      SET isActive = ?, updated_by = ?, deactivationDate = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive, // 1 for active, 0 for inactive
      updatedBy ?? null, // Updated by user, default to null if not provided
      deactivationDate ?? null,
      locationId, // The location ID to update
    ]);

    return result;
  } catch (err) {
    console.error("Error activating or deactivating company location:", err);
    throw err;
  }
};

// Account Type Master
const insertBankAccountType = async (
  countryId,
  accountTypeName,
  description,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO bank_account_type_info (countryId, accountTypeName, description, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      countryId,
      accountTypeName,
      description,
      isActive,
      updatedBy,
    ]);

    return result;
  } catch (err) {
    console.log("Error inserting bank account type:", err);
    throw err;
  }
};

const updateBankAccountTypeDetails = async (
  accountTypeId,
  countryId,
  accountTypeName,
  description,
  isActive,
  updatedBy
) => {
  try {
    const sanitizedValues = [
      countryId ?? null,
      accountTypeName ?? null,
      description ?? null,
      isActive ?? null,
      updatedBy ?? null,
      accountTypeId,
    ];

    const query = `
      UPDATE bank_account_type_info
      SET 
        countryId = ?, 
        accountTypeName = ?, 
        description = ?, 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.log("Error updating bank account type:", err);
    throw err;
  }
};

const activateDeactivateAccountType = async (
  accountTypeId,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE bank_account_type_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive, // 1 for active, 0 for inactive
      updatedBy ?? null, // Updated by user, default to null if not provided
      accountTypeId, // The bank account type ID to update
    ]);

    return result;
  } catch (err) {
    console.error("Error activating or deactivating bank account type:", err);
    throw err;
  }
};

const getBankAccountTypesList = async (countryId = null) => {
  try {
    let query = `
      SELECT 
        bank_account_type_info.*, 
        country_info.name AS countryName,
        users.username as updated_by
      FROM 
        bank_account_type_info
      LEFT JOIN 
        country_info ON bank_account_type_info.countryId = country_info.id
        LEFT JOIN
        users 
        on users.id = bank_account_type_info.updated_by
    `;

    const queryParams = [];

    // If countryId is provided, filter by it
    if (countryId) {
      query += " WHERE bank_account_type_info.countryId = ?";
      queryParams.push(countryId);
    }

    const [accountTypes] = await db.execute(query, queryParams);
    return accountTypes;
  } catch (err) {
    console.log("Error retrieving bank account types:", err);
    throw err;
  }
};

// Company Account Master
const getDefaultAccount = async (companyId) => {
  try {
    const query = `
      SELECT id 
      FROM company_account_info
      WHERE companyId = ? AND isDefaultAccount = 1
      LIMIT 1
    `;
    const [rows] = await db.execute(query, [companyId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error("Error fetching default account:", err);
    throw err;
  }
};

const insertCompanyAccount = async (
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
) => {
  try {
    const query = `
      INSERT INTO company_account_info 
      (companyId, isDefaultAccount, bankAccountTypeId, bankName, bankAddress, accountNumber, countryId, isActive, updated_by, additionalFieldDetails, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      companyId,
      isDefaultAccount,
      bankAccountTypeId,
      bankName,
      bankAddress,
      accountNumber,
      countryId,
      isActive,
      updatedBy,
      JSON.stringify(additionalFieldDetails),
    ]);

    return result;
  } catch (err) {
    console.error("Error inserting company account:", err);
    throw err;
  }
};

const updateCompanyAccountDetails = async (
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
) => {
  try {
    const sanitizedValues = [
      companyId ?? null,
      isDefaultAccount ?? null,
      bankAccountTypeId ?? null,
      bankName ?? null,
      bankAddress ?? null,
      accountNumber ?? null,
      countryId ?? null,
      isActive ?? null,
      updatedBy ?? null,
      JSON.stringify(additionalFieldDetails) ?? null,
      accountId,
    ];

    const query = `
      UPDATE company_account_info
      SET 
        companyId = ?, 
        isDefaultAccount = ?, 
        bankAccountTypeId = ?, 
        bankName = ?, 
        bankAddress = ?, 
        accountNumber = ?, 
        countryId = ?, 
        isActive = ?, 
        updated_by = ?, 
        additionalFieldDetails = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.error("Error updating company account:", err);
    throw err;
  }
};

const activateDeactivateCompanyAccountDetails = async (
  accountId,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE company_account_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive,
      updatedBy ?? null,
      accountId,
    ]);

    return result;
  } catch (err) {
    console.error("Error activating/deactivating company account:", err);
    throw err;
  }
};

const getCompanyAccountsList = async (companyId = null) => {
  try {
    let query = `
      SELECT 
        company_account_info.*, 
        company_info.companyName,
        bank_account_type_info.accountTypeName,
        country_info.name AS countryName,
        users.username as updated_by
      FROM 
        company_account_info
      LEFT JOIN 
        company_info ON company_account_info.companyId = company_info.id
      LEFT JOIN 
        bank_account_type_info ON company_account_info.bankAccountTypeId = bank_account_type_info.id
      LEFT JOIN 
        country_info ON company_account_info.countryId = country_info.id
                LEFT JOIN
        users 
        on users.id = company_account_info.updated_by
    `;

    const queryParams = [];

    if (companyId) {
      query += " WHERE company_account_info.companyId = ?";
      queryParams.push(companyId);
    }

    const [companyAccounts] = await db.execute(query, queryParams);
    return companyAccounts;
  } catch (err) {
    console.error("Error retrieving company accounts:", err);
    throw err;
  }
};

// Production Type Master
const insertProductionType = async (
  productionTypeName,
  updatedBy,
  isActive
) => {
  try {
    const query = `
      INSERT INTO production_type_info 
      (productionTypeName, updated_by, isActive, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      productionTypeName,
      updatedBy,
      isActive,
    ]);

    return result;
  } catch (err) {
    console.error("Error inserting production type:", err);
    throw err;
  }
};

const updateProductionTypeDetails = async (
  productionTypeId,
  productionTypeName,
  updatedBy,
  isActive
) => {
  try {
    const sanitizedValues = [
      productionTypeName ?? null,
      updatedBy ?? null,
      isActive ?? null, // Update isActive field
      productionTypeId,
    ];

    const query = `
      UPDATE production_type_info
      SET 
        productionTypeName = ?, 
        updated_by = ?, 
        isActive = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.error("Error updating production type:", err);
    throw err;
  }
};

const updateProductionTypeStatus = async (
  productionTypeId,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE production_type_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive,
      updatedBy,
      productionTypeId,
    ]);
    return result;
  } catch (err) {
    console.error("Error updating production type status:", err);
    throw err;
  }
};

const getProductionTypesList = async () => {
  try {
    const query = `SELECT * FROM production_type_info`;
    const [productionTypes] = await db.execute(query);
    return productionTypes;
  } catch (err) {
    console.error("Error retrieving production types:", err);
    throw err;
  }
};

// Industry Master
const insertIndustryMaster = async (
  industryName,
  subIndustryCategory,
  updatedBy,
  isActive
) => {
  try {
    const query = `
      INSERT INTO industry_master_info 
      (industryName, subIndustryCategory, updated_by, isActive, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      industryName,
      subIndustryCategory ?? '',
      updatedBy,
      isActive,
    ]);

    return result;
  } catch (err) {
    console.error("Error inserting industry master:", err);
    throw err;
  }
};

const updateIndustryMasterDetails = async (
  industryMasterId,
  industryName,
  subIndustryCategory,
  updatedBy,
  isActive
) => {
  try {
    const query = `
      UPDATE industry_master_info
      SET 
        industryName = ?, 
        subIndustryCategory = ?, 
        updated_by = ?, 
        isActive = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      industryName,
      subIndustryCategory ?? "",
      updatedBy,
      isActive,
      industryMasterId,
    ]);

    return result;
  } catch (err) {
    console.error("Error updating industry master:", err);
    throw err;
  }
};

const updateIndustryMasterStatus = async (
  industryMasterId,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE industry_master_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive,
      updatedBy,
      industryMasterId,
    ]);
    return result;
  } catch (err) {
    console.error("Error updating industry master status:", err);
    throw err;
  }
};

const getIndustryMastersList = async () => {
  try {
    const query = `
      SELECT industry_master_info.*,users.username as updated_by 
      FROM industry_master_info
              LEFT JOIN
        users 
        on users.id = industry_master_info.updated_by;
    `;
    const [industryMasters] = await db.execute(query);

    return industryMasters; // Returning all columns as is
  } catch (err) {
    console.error("Error retrieving industry masters:", err);
    throw err;
  }
};

// Industries Group
const insertGroupIndustry = async (
  groupIndustryName,
  industryIds,
  updatedBy,
  isActive
) => {
  try {
    const query = `
      INSERT INTO group_industry_info 
      (groupIndustryName, industryIds, updated_by, isActive, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    await db.execute(query, [
      groupIndustryName,
      industryIds, // Directly use the comma-separated string here
      updatedBy,
      isActive,
    ]);
  } catch (err) {
    console.error("Error inserting group industry:", err);
    throw err;
  }
};

const updateGroupIndustryDetails = async (
  groupIndustryId,
  groupIndustryName,
  industryIds,
  updatedBy,
  isActive
) => {
  try {
    const query = `
      UPDATE group_industry_info
      SET groupIndustryName = ?, industryIds = ?, updated_by = ?, isActive = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await db.execute(query, [
      groupIndustryName,
      industryIds, // Directly update the comma-separated industryIds
      updatedBy,
      isActive,
      groupIndustryId,
    ]);
  } catch (err) {
    console.error("Error updating group industry:", err);
    throw err;
  }
};

const updateGroupIndustryStatus = async (
  groupIndustryId,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE group_industry_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive,
      updatedBy,
      groupIndustryId,
    ]);
    return result;
  } catch (err) {
    console.error("Error updating Group Industry status:", err);
    throw err;
  }
};

const getGroupIndustriesList = async () => {
  try {
    const query = `
      SELECT group_industry_info.*, 
      users.username as updated_by,
             (SELECT GROUP_CONCAT(industry_master_info.industryName) 
              FROM industry_master_info 
              WHERE FIND_IN_SET(industry_master_info.id, group_industry_info.industryIds)) AS industryNames
      FROM group_industry_info   
       LEFT JOIN
        users 
        on users.id = group_industry_info.updated_by
    `;

    const [groupIndustries] = await db.execute(query);
    return groupIndustries;
  } catch (err) {
    console.error("Error retrieving Group Industries:", err);
    throw err;
  }
};

// Industry Head Master
const insertIndustryHead = async (
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
) => {
  try {

    // // Convert regionIds and stateIds to arrays for comparison
    // const regionIdArray = regionIds ? String(regionIds).split(",").map(id => id.trim()) : [];
    // const stateIdArray = stateIds ? String(stateIds).split(",").map(id => id.trim()) : [];
    // console.log('regionIdArray', code);

    // // Check for existing regionIds
    // if (isRegionWise && regionIdArray.length > 0) {
    //   const [existingRegions] = await db.execute(
    //     `SELECT regionIds, industryHeadName, r.id AS regionId, r.regionName
    //     FROM industry_head_master 
    //     JOIN region_info r ON FIND_IN_SET(r.id, industry_head_master.regionIds)
    //     WHERE isRegionWise = 1 
    //     AND companyId = ?`,
    //     [companyId]
    //   );

    //   console.log('overlapRegions111---->>>>>', [existingRegions]);
    //   for (const record of existingRegions) {
    //     const existingRegionIds = record.regionIds ? record.regionIds.split(",").map(id => id.trim()) : [];
    //     const overlapRegions = regionIdArray.filter(id => existingRegionIds.includes(id));


    //     if (overlapRegions.length > 0) {
    //       return { status: 'existing', conflictMessage: `Region ${record.regionName} already allocated to ${record.industryHeadName}` }
    //     }
    //   }
    // }

    // // Check for existing stateIds
    // // if (!isRegionWise && stateIdArray.length > 0) {
    // //   const [existingStates] = await db.execute(
    // //     `SELECT stateIds, industryHeadName FROM industry_head_master WHERE isRegionWise = 0 AND companyId = ?`,
    // //     [companyId]
    // //   );

    // //   for (const record of existingStates) {
    // //     const existingStateIds = record.stateIds ? record.stateIds.split(",").map(id => id.trim()) : [];
    // //     const overlapStates = stateIdArray.filter(id => existingStateIds.includes(id));
    // //     console.log('overlapStates', overlapStates);

    // //     if (overlapStates.length > 0) {
    // //       return { status: 'existing', conflictMessage: `State ID(s) ${overlapStates.join(", ")} already allocated to ${record.industryHeadName}` }
    // //     }
    // //   }
    // // }

    // if (!isRegionWise && stateIdArray.length > 0) {
    //   const [existingStates] = await db.execute(
    //     `SELECT 
    //         ihm.stateIds, 
    //         ihm.industryHeadName, 
    //         s.id AS stateId, 
    //         s.stateName 
    //      FROM 
    //         industry_head_master ihm 
    //      JOIN 
    //         state_info s 
    //      ON 
    //         FIND_IN_SET(s.id, ihm.stateIds) 
    //      WHERE 
    //         ihm.isRegionWise = 0 
    //         AND ihm.companyId = ?`,
    //     [companyId]
    //   );

    //   for (const record of existingStates) {
    //     const existingStateIds = record.stateIds
    //       ? record.stateIds.split(",").map(id => id.trim())
    //       : [];
    //     const overlapStates = stateIdArray.filter(id => existingStateIds.includes(id));

    //     if (overlapStates.length > 0) {
    //       const overlappingStateNames = existingStates
    //         .filter(r => overlapStates.includes(String(r.stateId))) // Match `stateId` with `overlapStates`
    //         .map(r => r.stateName);
    //       console.log('overlappingStateNames', overlapStates, existingStates);

    //       return {
    //         status: 'existing',
    //         conflictMessage: `State ${overlappingStateNames.join(", ")} already allocated to ${record.industryHeadName}`
    //       };
    //     }
    //   }
    // }


    const query = `
      INSERT INTO industry_head_master 
      (code, industry_head_email, companyId, industryHeadName, industryIds, isRegionWise, countryIds, regionIds, stateIds, startDate, endDate, updated_by, isActive, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    await db.execute(query, [
      code,
      industry_head_email,
      companyId,
      industryHeadName,
      industryIds,
      isRegionWise,
      countryIds,
      isRegionWise ? regionIds || null : null, // Ensure null is passed if regionIds is undefined
      !isRegionWise ? stateIds || null : null, // Ensure null is passed if stateIds is undefined
      startDate,
      endDate,
      updatedBy,
      isActive,
    ]);
  } catch (err) {
    console.error("Error inserting industry head:", err);
    throw err;
  }
};

// const updateIndustryHeadDetails = async (
//   companyId,
//   industryHeadId,
//   industryHeadName,
//   industryIds,
//   isRegionWise,
//   countryIds,
//   regionIds,
//   stateIds,
//   startDate,
//   endDate,
//   updatedBy,
//   isActive
// ) => {
//   try {
//     const query = `
//       UPDATE industry_head_master
//       SET companyId = ?, industryHeadName = ?, industryIds = ?, isRegionWise = ?, countryIds = ?, regionIds = ?, stateIds = ?, startDate = ?, endDate = ?, updated_by = ?, isActive = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE id = ?
//     `;

//     await db.execute(query, [
//       companyId,
//       industryHeadName,
//       industryIds,
//       isRegionWise,
//       countryIds,
//       isRegionWise ? regionIds : null,
//       !isRegionWise ? stateIds : null,
//       startDate,
//       endDate,
//       updatedBy,
//       isActive,
//       industryHeadId,
//     ]);
//   } catch (err) {
//     console.error("Error updating industry head:", err);
//     throw err;
//   }
// };


const updateIndustryHeadDetails = async (
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
) => {
  try {
    // const regionIdArray = regionIds ? String(regionIds).split(",").map(id => id.trim()) : [];
    // const stateIdArray = stateIds ? String(stateIds).split(",").map(id => id.trim()) : [];

    // // Check for overlapping states
    // if (!isRegionWise && stateIdArray.length > 0) {
    //   const [existingStates] = await db.execute(
    //     `SELECT industry_head_master.stateIds, industry_head_master.industryHeadName, 
    //             industry_head_master.id AS industryHeadId, 
    //             s.id AS stateId, s.stateName
    //      FROM industry_head_master 
    //      JOIN state_info s ON FIND_IN_SET(s.id, industry_head_master.stateIds)
    //      WHERE industry_head_master.isRegionWise = 0 
    //      AND industry_head_master.companyId = ?
    //      AND industry_head_master.id != ?`, // Exclude the current record
    //     [companyId, industryHeadId]
    //   );

    //   for (const record of existingStates) {
    //     const existingStateIds = record.stateIds ? record.stateIds.split(",").map(id => id.trim()) : [];
    //     const overlapStates = stateIdArray.filter(id => existingStateIds.includes(id));

    //     if (overlapStates.length > 0) {
    //       const overlappingStateNames = [...new Set(existingStates
    //         .filter(r => overlapStates.includes(String(r.stateId)))
    //         .map(r => r.stateName))];

    //       return {
    //         status: 'existing',
    //         conflictMessage: `State ${overlappingStateNames.join(", ")} already allocated to ${record.industryHeadName}`
    //       };
    //     }
    //   }
    // }

    // Proceed with updating the record
    const query = `
      UPDATE industry_head_master
      SET code = ?, industry_head_email = ?, companyId = ?, industryHeadName = ?, industryIds = ?, isRegionWise = ?, countryIds = ?, regionIds = ?, stateIds = ?, startDate = ?, endDate = ?, updated_by = ?, isActive = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await db.execute(query, [
      code,
      industry_head_email,
      companyId,
      industryHeadName,
      industryIds,
      isRegionWise,
      countryIds,
      isRegionWise ? regionIds : null,
      !isRegionWise ? stateIds : null,
      startDate,
      endDate,
      updatedBy,
      isActive,
      industryHeadId,
    ]);

    return { status: 'success', message: 'Industry head updated successfully' };
  } catch (err) {
    console.error("Error updating industry head:", err);
    throw err;
  }
};


const updateIndustryHeadStatus = async (
  industryHeadId,
  isActive,
  deactivationDate,
  updatedBy,

) => {
  try {
    const query = `
      UPDATE industry_head_master
      SET isActive = ?, updated_by = ?, endDate =?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive,
      updatedBy,
      deactivationDate,
      industryHeadId,
    ]);
    return result;
  } catch (err) {
    console.error("Error updating Industry Head status:", err);
    throw err;
  }
};

const getIndustryHeadsList = async () => {
  try {
    const query = `
      SELECT industry_head_master.*, 
              users.username as updated_by,
             (SELECT GROUP_CONCAT(group_industry_info.groupIndustryName) 
              FROM group_industry_info 
              WHERE FIND_IN_SET(group_industry_info.id, industry_head_master.industryIds)) AS industryNames,
             (SELECT GROUP_CONCAT(country_info.name) 
              FROM country_info 
              WHERE FIND_IN_SET(country_info.id, industry_head_master.countryIds)) AS countryNames,
             (SELECT GROUP_CONCAT(region_info.regionName) 
              FROM region_info 
              WHERE FIND_IN_SET(region_info.id, industry_head_master.regionIds)) AS regionNames,
             (SELECT GROUP_CONCAT(state_info.stateName) 
              FROM state_info 
              WHERE FIND_IN_SET(state_info.id, industry_head_master.stateIds)) AS stateNames, company_info.companyName
      FROM industry_head_master
      LEFT JOIN 
        company_info ON industry_head_master.companyId  = company_info.id
        LEFT JOIN
        users 
        on users.id = industry_head_master.updated_by
    `;

    const [industryHeads] = await db.execute(query);
    return industryHeads;
  } catch (err) {
    console.error("Error retrieving Industry Heads:", err);
    throw err;
  }
};

// Sales Manager Master
const insertSalesManager = async (
  name,
  code,
  industryHeadIds,
  fromDate,
  description,
  updatedBy,
  sales_manager_email, // Add email here
  isActive,
  companyId
) => {
  try {
    const query = `
      INSERT INTO sales_manager_master 
      (name, code, industryHeadIds, fromDate, description, updated_by, sales_manager_email, isActive, updated_at, companyId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
    `;

    await db.execute(query, [
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      sales_manager_email, // Insert email here
      isActive,
      companyId
    ]);
  } catch (err) {
    console.error("Error inserting sales manager:", err);
    throw err;
  }
};

const updateSalesManagerDetails = async (
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
) => {
  try {
    const query = `
      UPDATE sales_manager_master
      SET companyId = ?, name = ?, code = ?, industryHeadIds = ?, fromDate = ?, description = ?, updated_by = ?, sales_manager_email = ?, isActive = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await db.execute(query, [
      companyId,
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      sales_manager_email, // Update email here
      isActive,
      salesManagerId,
    ]);
  } catch (err) {
    console.error("Error updating sales manager:", err);
    throw err;
  }
};

// const updateSalesManagerStatus = async (
//   salesManagerId,
//   isActive,
//   updatedBy,
//   deactivationDate
// ) => {
//   try {
//     const query = `
//       UPDATE sales_manager_master
//       SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP,deactivationDate = ?
//       WHERE id = ?
//     `;

//     await db.execute(query, [isActive, updatedBy, deactivationDate, salesManagerId]);
//   } catch (err) {
//     console.error("Error updating Sales Manager status:", err);
//     throw err;
//   }
// };


const updateSalesManagerStatus = async (
  salesManagerId,
  isActive,
  industryHeadIds,
  updatedBy,
  deactivationDate
) => {
  try {
    const [rows] = await db.execute(
      `SELECT industryHeadIds, deactivatedIndustryIds FROM sales_manager_master WHERE id = ?`,
      [salesManagerId]
    );

    if (!rows.length) throw new Error("Sales Manager not found");

    const currentIndustryIds = rows[0].industryHeadIds?.split(',').map(id => id.trim()).filter(Boolean) || [];
    const currentDeactivatedIds = rows[0].deactivatedIndustryIds?.split(',').map(id => id.trim()).filter(Boolean) || [];

    let updatedIndustryIds = [...currentIndustryIds];
    let updatedDeactivatedIds = [...currentDeactivatedIds];

    if (isActive) {
      // 🟢 Activation
      const reactivatingIds = industryHeadIds.map(String);
      // Add to industryHeadIds if not already present
      updatedIndustryIds = Array.from(new Set([...updatedIndustryIds, ...reactivatingIds]));
      // Remove from deactivated list
      updatedDeactivatedIds = updatedDeactivatedIds.filter(id => !reactivatingIds.includes(id));
    } else {
      // 🔴 Deactivation request - Schedule for cron
      const toDeactivate = industryHeadIds.map(String);
      updatedDeactivatedIds = Array.from(new Set([...updatedDeactivatedIds, ...toDeactivate]));
    }

    const newIndustryHeadStr = updatedIndustryIds.length ? updatedIndustryIds.join(',') : null;
    const newDeactivatedStr = updatedDeactivatedIds.length ? updatedDeactivatedIds.join(',') : null;

    const isActiveFinal = updatedIndustryIds.length > 0 ? 1 : 0;

    const updateQuery = `
      UPDATE sales_manager_master
      SET 
        industryHeadIds = ?,
        deactivatedIndustryIds = ?,
        isActive = ?,
        updated_by = ?,
        updated_at = CURRENT_TIMESTAMP,
        deactivationDate = ?
      WHERE id = ?
    `;

    await db.execute(updateQuery, [
      newIndustryHeadStr,
      newDeactivatedStr,
      isActiveFinal,
      updatedBy,
      newDeactivatedStr ? deactivationDate : null,
      salesManagerId
    ]);

  } catch (err) {
    console.error("Error updating Sales Manager status:", err);
    throw err;
  }
};






const getSalesManagersList = async () => {
  try {
    const query = `
      SELECT sales_manager_master.*, 
      users.username as updated_by,
             (SELECT GROUP_CONCAT(industry_head_master.industryHeadName)
              FROM industry_head_master 
              WHERE FIND_IN_SET(industry_head_master.id, sales_manager_master.industryHeadIds)) AS industryHeadNames, company_info.companyName
      FROM sales_manager_master
      LEFT JOIN 
        company_info ON sales_manager_master.companyId = company_info.id
    LEFT JOIN
        users 
        on users.id = sales_manager_master.updated_by
    `;

    const [salesManagers] = await db.execute(query);
    return salesManagers;
  } catch (err) {
    console.error("Error retrieving Sales Managers:", err);
    throw err;
  }
};

// Account Manager Master
const insertAccountManager = async (
  companyId,
  name,
  code,
  industryHeadIds,
  fromDate,
  description,
  updatedBy,
  account_manager_email, // Add email here
  isActive
) => {
  try {
    const query = `
      INSERT INTO account_manager_master 
      (companyId, name, code, industryHeadIds, fromDate, description, updated_by, account_manager_email, isActive, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    await db.execute(query, [
      companyId,
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      account_manager_email, // Insert email here
      isActive,
    ]);
  } catch (err) {
    console.error("Error inserting Account Manager:", err);
    throw err;
  }
};

const updateAccountManager = async (
  companyId,
  id,
  name,
  code,
  industryHeadIds,
  fromDate,
  description,
  updatedBy,
  account_manager_email, // Add email here
  isActive
) => {
  try {
    const query = `
      UPDATE account_manager_master
      SET companyId = ?, name = ?, code = ?, industryHeadIds = ?, fromDate = ?, description = ?, updated_by = ?, account_manager_email = ?, isActive = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await db.execute(query, [
      companyId,
      name,
      code,
      industryHeadIds,
      fromDate,
      description,
      updatedBy,
      account_manager_email, // Update email here
      isActive,
      id,
    ]);
  } catch (err) {
    console.error("Error updating Account Manager:", err);
    throw err;
  }
};

// const activateOrDeactivateAccountManager = async (id, isActive, updatedBy, deactivationDate) => {
//   try {
//     const query = `
//             UPDATE account_manager_master
//             SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP,deactivationDate = ?
//             WHERE id = ?
//         `;
//     await db.execute(query, [isActive, updatedBy, deactivationDate, id]);
//   } catch (err) {
//     console.error("Error updating Account Manager status:", err);
//     throw err;
//   }
// };


const activateOrDeactivateAccountManager = async (
  accountManagerId,
  isActive,
  industryHeadIds,
  updatedBy,
  deactivationDate
) => {
  try {
    const [rows] = await db.execute(
      `SELECT industryHeadIds, deactivatedIndustryIds FROM account_manager_master WHERE id = ?`,
      [accountManagerId]
    );

    if (!rows.length) throw new Error("Account Manager not found");

    const currentIndustryIds = rows[0].industryHeadIds?.split(',').map(id => id.trim()).filter(Boolean) || [];
    const currentDeactivatedIds = rows[0].deactivatedIndustryIds?.split(',').map(id => id.trim()).filter(Boolean) || [];

    let updatedIndustryIds = [...currentIndustryIds];
    let updatedDeactivatedIds = [...currentDeactivatedIds];

    if (isActive) {
      // 🟢 Activation
      const reactivatingIds = industryHeadIds.map(String);
      updatedIndustryIds = Array.from(new Set([...updatedIndustryIds, ...reactivatingIds]));
      updatedDeactivatedIds = updatedDeactivatedIds.filter(id => !reactivatingIds.includes(id));
    } else {
      // 🔴 Deactivation
      const toDeactivate = industryHeadIds.map(String);
      updatedDeactivatedIds = Array.from(new Set([...updatedDeactivatedIds, ...toDeactivate]));
    }

    const newIndustryHeadStr = updatedIndustryIds.length ? updatedIndustryIds.join(',') : null;
    const newDeactivatedStr = updatedDeactivatedIds.length ? updatedDeactivatedIds.join(',') : null;

    const isActiveFinal = updatedIndustryIds.length > 0 ? 1 : 0;

    const updateQuery = `
      UPDATE account_manager_master
      SET 
        industryHeadIds = ?,
        deactivatedIndustryIds = ?,
        isActive = ?,
        updated_by = ?,
        updated_at = CURRENT_TIMESTAMP,
        deactivationDate = ?
      WHERE id = ?
    `;

    await db.execute(updateQuery, [
      newIndustryHeadStr,
      newDeactivatedStr,
      isActiveFinal,
      updatedBy,
      newDeactivatedStr ? deactivationDate : null,
      accountManagerId
    ]);

  } catch (err) {
    console.error("Error updating Account Manager status:", err);
    throw err;
  }
};


const getAccountManagersList = async () => {
  try {
    const query = `
            SELECT account_manager_master.*, 
            users.username as updated_by,
                   (SELECT GROUP_CONCAT(industry_head_master.industryHeadName) 
                    FROM industry_head_master 
                    WHERE FIND_IN_SET(industry_head_master.id, account_manager_master.industryHeadIds)) AS industryHeadNames, company_info.companyName
            FROM account_manager_master
            LEFT JOIN 
            company_info ON account_manager_master.companyId = company_info.id
                    LEFT JOIN
            users 
            on users.id = account_manager_master.updated_by
            
        `;
    const [accountManagers] = await db.execute(query);
    return accountManagers;
  } catch (err) {
    console.error("Error retrieving Account Managers:", err);
    throw err;
  }
};

// Technology Group Master
const insertTechnologyGroup = async (
  name,
  description,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO technology_group_info (name, description, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      name,
      description,
      isActive,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.log("Error inserting technology group:", err);
    throw err;
  }
};

const updateTechnologyGroupDetails = async (
  groupId,
  name,
  description,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE technology_group_info
      SET 
        name = ?, 
        description = ?, 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      name,
      description,
      isActive,
      updatedBy,
      groupId,
    ]);
    return result;
  } catch (err) {
    console.log("Error updating technology group:", err);
    throw err;
  }
};

const activateDeactivateGroup = async (groupId, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE technology_group_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [isActive, updatedBy, groupId]);
    return result;
  } catch (err) {
    console.error("Error activating or deactivating technology group:", err);
    throw err;
  }
};

const getTechnologyGroupsList = async () => {
  try {
    const query = `
      SELECT technology_group_info.*,users.username as updated_by
      FROM 
        technology_group_info
                LEFT JOIN
        users 
        on users.id = technology_group_info.updated_by
    `;

    const [groups] = await db.execute(query);
    return groups;
  } catch (err) {
    console.log("Error retrieving technology groups:", err);
    throw err;
  }
};

// Technology Subgroup Master
const insertTechnologySubgroup = async (
  techGroupIds,
  name,
  description,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO technology_subgroup_info (techGroupIds, name, description, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await db.execute(query, [
      techGroupIds,
      name,
      description,
      isActive,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.error("Error inserting technology subgroup:", err);
    throw err;
  }
};

const updateTechnologySubgroupDetails = async (
  subgroupId,
  techGroupIds,
  name,
  description,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE technology_subgroup_info
      SET 
        techGroupIds = ?, 
        name = ?, 
        description = ?, 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      techGroupIds,
      name,
      description,
      isActive,
      updatedBy,
      subgroupId,
    ]);
    return result;
  } catch (err) {
    console.error("Error updating technology subgroup:", err);
    throw err;
  }
};

const activateDeactivateSubgroup = async (subgroupId, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE technology_subgroup_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [isActive, updatedBy, subgroupId]);
    return result;
  } catch (err) {
    console.error("Error activating or deactivating technology subgroup:", err);
    throw err;
  }
};

const getAllTechnologySubgroups = async () => {
  try {
    const query = `
      SELECT 
        technology_subgroup_info.*, 
        users.username as updated_by,
        (SELECT GROUP_CONCAT(technology_group_info.name) 
         FROM technology_group_info 
         WHERE technology_group_info.id = technology_subgroup_info.techGroupIds) AS techGroupNames
      FROM 
        technology_subgroup_info
        LEFT JOIN
        users 
        on users.id = technology_subgroup_info.updated_by
    `;

    const [subgroups] = await db.execute(query);
    return subgroups;
  } catch (err) {
    console.error("Error retrieving Technology Subgroups:", err);
    throw err;
  }
};

// Technology Master
const insertTechnologyName = async (
  techGroupIds,
  techSubgroupIds,
  techName,
  description,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO technology_name_info (techGroupIds, techSubgroupIds, techName, description, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await db.execute(query, [
      techGroupIds,
      techSubgroupIds,
      techName,
      description,
      isActive,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.log("Error inserting technology name:", err);
    throw err;

  }
};

const updateTechnologyNameDetails = async (
  id,
  techGroupIds,
  techSubgroupIds,
  techName,
  description,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE technology_name_info
      SET 
        techGroupIds = ?, 
        techSubgroupIds = ?, 
        techName = ?, 
        description = ?, 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      techGroupIds,
      techSubgroupIds,
      techName,
      description,
      isActive,
      updatedBy,
      id,
    ]);
    return result;
  } catch (err) {
    console.log("Error updating technology name:", err);
    throw err;
  }
};

const activateDeactivateTechnologyNameStatus = async (
  id,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE technology_name_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.log("Error activating or deactivating technology name:", err);
    throw new Error("Error activating/deactivating technology name");
  }
};

const getAllTechnologyNames = async () => {
  try {
    const query = `
      SELECT 
        technology_name_info.*, 
        users.username as updated_by,
        (SELECT GROUP_CONCAT(technology_group_info.name) 
         FROM technology_group_info 
         WHERE FIND_IN_SET(technology_group_info.id, technology_name_info.techGroupIds)) AS techGroupNames,
        (SELECT GROUP_CONCAT(technology_subgroup_info.name) 
         FROM technology_subgroup_info 
         WHERE FIND_IN_SET(technology_subgroup_info.id, technology_name_info.techSubgroupIds)) AS techSubgroupNames
      FROM 
        technology_name_info
        LEFT JOIN
        users 
        on users.id = technology_name_info.updated_by
    `;
    const [names] = await db.execute(query);
    return names;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Error retrieving technology names");
  }
};

// OEM Master
const insertOEM = async (oemName, type, productName, isActive, updatedBy) => {
  try {
    const query = `
      INSERT INTO oem_info (oemName, type, productName, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await db.execute(query, [
      oemName,
      type,
      productName,
      isActive,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.log("Error inserting OEM:", err);
    throw err;
  }
};

const updateOEMDetails = async (
  id,
  oemName,
  type,
  productName,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE oem_info
      SET 
        oemName = ?, 
        type = ?, 
        productName = ?, 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      oemName,
      type,
      productName,
      isActive,
      updatedBy,
      id,
    ]);
    return result;
  } catch (err) {
    console.log("Error updating OEM:", err);
    throw err;
  }
};

const activateDeactivateOEMStatus = async (id, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE oem_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.log("Error activating or deactivating OEM:", err);
    throw new Error("Error activating/deactivating OEM");
  }
};

const getAllOEMs = async () => {
  try {
    const query = `
      SELECT oem_info.*,users.username as updated_by FROM oem_info  LEFT JOIN
        users 
        on users.id = oem_info.updated_by
    `;
    const [oems] = await db.execute(query);
    return oems;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Error retrieving OEMs");
  }
};

// Product Sales Master
const insertPoleStarProduct = async (
  productName,
  description,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO polestar_product_sales_master (productName, description, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await db.execute(query, [
      productName,
      description,
      isActive,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.error("Error inserting PoleStar Product:", err);
    throw err;
  }
};

const updatePoleStarProductDetails = async (
  id,
  productName,
  description,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE polestar_product_sales_master
      SET 
        productName = ?, 
        description = ?, 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      productName,
      description,
      isActive,
      updatedBy,
      id,
    ]);
    return result;
  } catch (err) {
    console.error("Error updating PoleStar Product:", err);
    throw err;
  }
};

const activateDeactivatePoleStarProductStatus = async (
  id,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE polestar_product_sales_master
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.error("Error activating or deactivating PoleStar Product:", err);
    throw new Error("Error activating/deactivating PoleStar Product");
  }
};

const getAllPoleStarProducts = async () => {
  try {
    const query = `
      SELECT polestar_product_sales_master.*,users.username as updated_by FROM polestar_product_sales_master 
      LEFT JOIN
        users 
        on users.id = polestar_product_sales_master.updated_by
    `;
    const [products] = await db.execute(query);
    return products;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Error retrieving PoleStar Products");
  }
};

// Project/Service Master
const insertProjectService = async (name, description, isActive, updatedBy) => {
  try {
    const query = `
      INSERT INTO project_service_master (name, description, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await db.execute(query, [
      name,
      description,
      isActive,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.log("Error inserting Project/Service:", err);
    throw err;
  }
};

const updateProjectService = async (
  id,
  name,
  description,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE project_service_master
      SET 
        name = ?, 
        description = ?, 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      name,
      description,
      isActive,
      updatedBy,
      id,
    ]);
    return result;
  } catch (err) {
    console.log("Error updating Project/Service:", err);
    throw err;
  }
};


const activateDeactivateProjectService = async (id, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE project_service_master
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.log("Error activating or deactivating Project/Service:", err);
    throw new Error("Error activating/deactivating Project/Service");
  }
};

const getAllProjectServices = async () => {
  try {
    const query = `
      SELECT project_service_master.*,users.username as updated_by FROM project_service_master
        LEFT JOIN
        users 
        on users.id = project_service_master.updated_by
    `;
    const [records] = await db.execute(query);
    return records;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Error retrieving Project/Services");
  }
};

// Financial Year Master
const insertFinancialYear = async (
  startYear,
  endYear,
  financialYearName,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO financial_year_master (startYear, endYear, financialYearName, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await db.execute(query, [
      startYear,
      endYear,
      financialYearName,
      isActive,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.log("Error inserting Financial Year:", err);
    throw new Error("Error inserting Financial Year");
  }
};

const updateFinancialYear = async (
  id,
  startYear,
  endYear,
  financialYearName,
  isActive,
  updatedBy
) => {
  try {
    const query = `
      UPDATE financial_year_master
      SET 
        startYear = ?, 
        endYear = ?, 
        financialYearName = ?, 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      startYear,
      endYear,
      financialYearName,
      isActive,
      updatedBy,
      id,
    ]);
    return result;
  } catch (err) {
    console.log("Error updating Financial Year:", err);
    throw new Error("Error updating Financial Year details");
  }
};

const activateDeactivateFinancialYear = async (id, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE financial_year_master
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.log("Error activating or deactivating Financial Year:", err);
    throw new Error("Error activating/deactivating Financial Year");
  }
};

const getAllFinancialYears = async () => {
  try {
    const query = `
      SELECT financial_year_master.*,users.username as updated_by FROM financial_year_master LEFT JOIN
        users 
        on users.id = financial_year_master.updated_by
    `;
    const [records] = await db.execute(query);
    return records;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Error retrieving Financial Years");
  }
};

// Function to check if a region head already exists for the given regionId
const checkExistingRegionHead = async (regionId) => {
  try {
    const query = `
      SELECT regionHeadName
      FROM region_head_info
      WHERE regionId = ?
      AND isActive = 1
    `;

    const [rows] = await db.execute(query, [regionId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error("Error checking existing region head:", err);
    throw new Error("Error checking existing region head");
  }
};

const checkRegionHeadOverlap = async (newRegionIds, companyId) => {
  console.log("newRegionIds:", newRegionIds);

  if (!Array.isArray(newRegionIds)) {
    newRegionIds = newRegionIds.split(",").map((id) => id.trim());
  }

  try {
    const query = `
      SELECT rhi.regionHeadName, rhi.regionId, r.id AS regionId, r.regionName
      FROM region_head_info rhi
      JOIN region_info r ON FIND_IN_SET(r.id, rhi.regionId)
      WHERE rhi.companyId = ?
      AND rhi.isActive = 1
    `;

    const [rows] = await db.execute(query, [companyId]);

    const overlappingRegions = [];

    for (const row of rows) {
      if (newRegionIds.includes(row.regionId.toString())) {
        overlappingRegions.push({
          regionName: row.regionName,
          regionHeadName: row.regionHeadName,
        });
      }
    }

    return overlappingRegions.length > 0 ? overlappingRegions : null;
  } catch (err) {
    console.error("Error checking region head overlap:", err);
    throw new Error("Error checking region head overlap");
  }
};


// Region Head Master
const createRegionHead = async (
  regionId,
  countryId,
  companyId,
  regionHeadName,
  regionHeadEcode,
  regionHeadEmail,
  fromDate,
  isActive,
  updatedBy
) => {
  try {

    // const existingOverlaps = await checkRegionHeadOverlap(regionId, companyId);
    // console.log('ooooooooo', existingOverlaps);

    // if (existingOverlaps) {
    //   const conflictMessage = existingOverlaps.map((conflict) => `Region ${conflict.regionName} is already assigned to ${conflict.regionHeadName}`).join(", ");
    //   return {
    //     status: "existing",
    //     conflictMessage: conflictMessage,
    //   };
    // }

    const query = `
      INSERT INTO region_head_info (
        regionId,
        countryId,
        companyId,
        regionHeadName,
        regionHeadEcode,
        regionHeadEmail,
        fromDate,
        isActive,
        updated_by,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      regionId,
      countryId,
      companyId,
      regionHeadName,
      regionHeadEcode,
      regionHeadEmail,
      fromDate,
      isActive,
      updatedBy,
    ]);

    return result;
  } catch (err) {
    console.log("Error creating region head:", err);
    throw new Error("Error creating region head");
  }
};

const updateRegionHeadDetails = async (
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
) => {
  try {

    // Check for region ID conflict
    // const conflictQuery = `
    //     SELECT rhi.regionHeadName, r.regionName
    //     FROM region_head_info rhi
    //     JOIN region_info r ON FIND_IN_SET(r.id, rhi.regionId)
    //     WHERE rhi.companyId = ? 
    //       AND rhi.id != ? 
    //       AND (
    //         ${regionId.split(',').map(() => "FIND_IN_SET(?, rhi.regionId)").join(" OR ")}
    //       )
    //   `;

    // const regionIdArray = regionId.split(',').map(id => id.trim());
    // const conflictValues = [companyId, regionHeadId, ...regionIdArray];

    // const [conflictRows] = await db.execute(conflictQuery, conflictValues);
    // const conflictingRegions = conflictRows
    //   .map(row => `Region ${row.regionName} is already assigned to ${row.regionHeadName}`)
    //   .join(", ");
    // console.log('conflictRows', conflictingRegions);
    // if (conflictRows.length > 0) {
    //   return { status: 'existing', conflictMessage: conflictingRegions }
    //   // res.status(400).json({
    //   //   statusCode: 400,
    //   //   message: `Region already assigned to ${conflictRows[0].regionHeadName}`,
    //   // });
    // }
    const sanitizedValues = [
      regionId ?? null,
      countryId ?? null,
      companyId ?? null,
      regionHeadName ?? null,
      regionHeadEcode ?? null,
      regionHeadEmail ?? null,
      fromDate ?? null,
      isActive ?? null,
      updatedBy ?? null,
      regionHeadId,
    ];

    const query = `
      UPDATE region_head_info
      SET 
        regionId = ?, 
        countryId = ?, 
        companyId = ?, 
        regionHeadName = ?, 
        regionHeadEcode = ?, 
        regionHeadEmail = ?, 
        fromDate = ?, 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.log("Error updating region head:", err);
    throw new Error("Error updating region head details");
  }
};

const activateDeactivateRegionHeadDetails = async (
  regionHeadId,
  isActive,
  updatedBy,
  deactivationDate
) => {
  try {
    const query = `
      UPDATE region_head_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP,deactivationDate = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive, // 1 for active, 0 for inactive
      updatedBy ?? null,
      deactivationDate,
      regionHeadId

    ]);

    return result;
  } catch (err) {
    console.error("Error activating or deactivating region head:", err);
    throw new Error("Error activating/deactivating region head");
  }
};

const getRegionHeads = async () => {
  try {
    const query = `
      SELECT 
        region_head_info.*, 
        users.username as updated_by,
        country_info.name AS countryName,
        company_info.companyName,
        (SELECT GROUP_CONCAT(region_info.regionName) 
              FROM region_info 
              WHERE FIND_IN_SET(region_info.id, region_head_info.regionId)) AS regionNames,
        (SELECT GROUP_CONCAT(region_info.regionCode) 
              FROM region_info 
              WHERE FIND_IN_SET(region_info.id, region_head_info.regionId)) AS regionCodes
      FROM 
        region_head_info
      LEFT JOIN 
        country_info 
      ON 
        region_head_info.countryId = country_info.id
      LEFT JOIN 
        company_info 
      ON 
        region_head_info.companyId = company_info.id
        left join 
        users
        on region_head_info.updated_by = users.id
    `;

    const [regionHeads] = await db.execute(query);
    return regionHeads;
  } catch (err) {
    console.log("Error retrieving region heads list:", err);
    throw new Error("Error retrieving region heads list");
  }
};



// Currency Master
const createCurrency = async (currencyCode, description, isActive, updatedBy) => {
  try {
    const query = `
      INSERT INTO currency_master (currencyCode, description, isActive, updatedBy, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await db.execute(query, [
      currencyCode,
      description,
      isActive,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.log("Error inserting Currency:", err);
    throw new Error("Error inserting Currency");
  }
};

const updateCurrency = async (id, currencyCode, description, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE currency_master
      SET 
        currencyCode = ?, 
        description = ?, 
        isActive = ?, 
        updatedBy = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      currencyCode,
      description,
      isActive,
      updatedBy,
      id,
    ]);
    return result;
  } catch (err) {
    console.log("Error updating Currency:", err);
    throw new Error("Error updating Currency details");
  }
};



const activateOrDeactivateCurrency = async (id, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE currency_master
      SET isActive = ?, updatedBy = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.log("Error activating or deactivating Currency:", err);
    throw new Error("Error activating/deactivating Currency");
  }
};


const getAllCurrencies = async () => {
  try {
    const query = `
      SELECT currency_exchange_table.*, 'cron service' as updated_by FROM currency_exchange_table
    `;
    const [records] = await db.execute(query);
    return records;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Error retrieving Currencies");
  }
};
const getCurrencyHistory = async (data) => {
  const { currencyCode = 'USD' } = data;
  try {
    const query = `
      SELECT * FROM currency_exchange_table where currencyCode = ? order by -id;
    `;
    const [records] = await db.execute(query, [currencyCode]);
    return records;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Error retrieving Currencies");
  }
};

//  tax services

const createTax = async (countryCode, taxType, taxFieldName, taxPercentage, isActive, updatedBy) => {
  try {
    const query = `
      INSERT INTO tax_master (countryCode, taxType, taxFieldName, taxPercentage, isActive, updated_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await db.execute(query, [
      countryCode,
      taxType,
      taxFieldName,
      taxPercentage,
      isActive,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.log("Error inserting Tax:", err);
    throw new Error("Error inserting Tax");
  }
};

const updateTax = async (id, countryCode, taxType, taxFieldName, taxPercentage, isActive, updatedBy) => {
  try {
    console.log('uuuuuuuuuu', updatedBy);

    const query = `
      UPDATE tax_master
      SET 
        countryCode = ?, 
        taxType = ?, 
        taxFieldName = ?, 
        taxPercentage = ?, 
        isActive = ?,
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      countryCode,
      taxType,
      taxFieldName,
      taxPercentage,
      isActive,
      updatedBy,
      id,
    ]);
    return result;
  } catch (err) {
    console.log("Error updating Tax:", err);
    throw new Error("Error updating Tax details");
  }
};

const activateOrDeactivateTax = async (id, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE tax_master
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.log("Error activating or deactivating Tax:", err);
    throw new Error("Error activating/deactivating Tax");
  }
};

const getAllTaxes = async () => {
  try {
    const query = `
      SELECT tm.*,cf.name as countryName,users.username as updated_by FROM tax_master tm inner join country_info cf on tm.countryCode = cf.id  
       LEFT JOIN
        users 
        on users.id = tm.updated_by;
    `;
    const [records] = await db.execute(query);
    return records;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Error retrieving Taxes");
  }
};

const insertClientType = async (clientType, isActive, updatedBy) => {
  try {
    const query = `
      INSERT INTO client_type_master (client_type, isActive, updated_by, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await db.execute(query, [clientType, isActive, updatedBy]);
    return result;
  } catch (err) {
    console.log("Error inserting Client Type:", err);
    throw err;
  }
};

const updateClientType = async (id, clientType, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE client_type_master
      SET 
        client_type = ?, 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [clientType, isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.log("Error updating Client Type:", err);
    throw err;
  }
};

const activateDeactivateClientType = async (id, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE client_type_master
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.log("Error activating or deactivating Client Type:", err);
    throw new Error("Error activating/deactivating Client Type");
  }
};

const getAllClientTypes = async () => {
  try {
    const query = `
      SELECT client_type_master.*, users.username AS updated_by 
      FROM client_type_master
      LEFT JOIN users ON users.id = client_type_master.updated_by
    `;
    const [records] = await db.execute(query);
    return records;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Error retrieving Client Types");
  }
};



// Create a new client
// const createClient = async (
//   client_name,
//   vega_client_name,
//   client_type,
//   credit_period,
//   client_status,
//   countryId,
//   companyId,
//   accountId,
//   industryId,
//   IndustryHeadId,
//   IndustryGroupId,
//   IndustrySubGroupId,
//   salesMangerId,
//   accountManagerId,
//   msa_start_date,
//   msa_end_date,
//   msa_flag,
//   nda_flag,
//   non_solicitation_clause_flag,
//   use_logo_permission_flag,
//   updated_by,
//   msaFilePath,
//   ndaFilePath
// ) => {
//   try {
//     const sanitizedValues = [
//       client_name ?? null,
//       vega_client_name ?? null,
//       client_type ?? null,
//       credit_period ?? null,
//       client_status ?? null,
//       countryId ?? null,
//       companyId ?? null,
//       accountId ?? null,
//       industryId ?? null,
//       IndustryHeadId ?? null,
//       IndustryGroupId ?? null,
//       IndustrySubGroupId ?? null,
//       salesMangerId ?? null,
//       accountManagerId ?? null,
//       msa_start_date ?? null,
//       msa_end_date ?? null,
//       msa_flag ?? null,
//       nda_flag ?? null,
//       non_solicitation_clause_flag ?? null,
//       use_logo_permission_flag ?? null,
//       msaFilePath ?? null,
//       ndaFilePath ?? null,
//       updated_by ?? null,
//     ];

//     const query = `
//       INSERT INTO client_info (
//         client_name, vega_client_name, client_type, credit_period, client_status, 
//         countryId, companyId, accountId, industryId, IndustryHeadId, 
//         IndustryGroupId, IndustrySubGroupId, salesMangerId, accountManagerId, msa_start_date, 
//         msa_end_date, msa_flag, nda_flag, non_solicitation_clause_flag, 
//         use_logo_permission_flag, msaFilePath, ndaFilePath, updated_by, updated_at
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
//     `;

//     const [result] = await db.execute(query, sanitizedValues);

//     return result;
//   } catch (err) {
//     console.error("Error creating client:", err);
//     throw err;
//   }
// };


// Create a new client
const createClient = async (
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
  isApplicableAM,
  msa_start_date,
  msa_end_date,
  msa_flag,
  nda_flag,
  non_solicitation_clause_flag,
  use_logo_permission_flag,
  isActive,
  updated_by,
  msaFilePath,
  ndaFilePath,
) => {
  const connection = await db.getConnection(); // Use a transaction for safety

  try {
    await connection.beginTransaction();

    let msaDocumentId = null;

    // Insert into msa_documents if msaFilePath exists
    if (msaFilePath) {
      const msaQuery = `
        INSERT INTO msa_documents (
          msa_doc_url, start_date, end_date, created_by, client_id
        ) VALUES (?, ?, ?, ?, NULL)
      `;

      const [msaResult] = await connection.execute(msaQuery, [
        msaFilePath,
        msa_start_date ?? null,
        msa_end_date ?? null,
        updated_by ?? null,
      ]);

      msaDocumentId = msaResult.insertId;
    }

    // Insert into client_info
    const clientQuery = `
      INSERT INTO client_info (
        client_name, vega_client_name, client_type, credit_period, client_status, 
        countryId, companyId, accountId, industryId, IndustryHeadId, 
        IndustryGroupId, IndustrySubGroupId, salesMangerId, accountManagerId, isApplicableAM, msa_start_date, 
        msa_end_date, msa_flag, nda_flag, non_solicitation_clause_flag, 
        use_logo_permission_flag,isActive, msaFilePath, ndaFilePath, msa_document_id, updated_by, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const sanitizedClientValues = [
      client_name ?? null,
      vega_client_name ?? null,
      client_type ?? null,
      credit_period ?? null,
      client_status ?? null,
      countryId ?? null,
      companyId ?? null,
      accountId ?? null,
      industryId ?? null,
      IndustryHeadId ?? null,
      IndustryGroupId ?? null,
      IndustrySubGroupId ?? null,
      salesMangerId ?? null,
      accountManagerId ?? null,
      isApplicableAM ?? null,
      msa_start_date ?? null,
      msa_end_date ?? null,
      msa_flag ?? null,
      nda_flag ?? null,
      non_solicitation_clause_flag ?? null,
      use_logo_permission_flag ?? null,
      isActive ?? 1,
      msaFilePath ?? null,
      ndaFilePath ?? null,
      msaDocumentId,
      updated_by ?? null,
    ];

    const [clientResult] = await connection.execute(clientQuery, sanitizedClientValues);
    const clientId = clientResult.insertId;

    // Update msa_documents with the client_id
    if (msaDocumentId) {
      const updateMsaQuery = `
        UPDATE msa_documents
        SET client_id = ?
        WHERE id = ?
      `;

      await connection.execute(updateMsaQuery, [clientId, msaDocumentId]);
    }

    await connection.commit();

    return clientResult;
  } catch (err) {
    await connection.rollback();
    console.error("Error creating client:", err);
    throw err;
  } finally {
    connection.release();
  }
};


// Update client details
const updateClientDetails = async (
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
  isApplicableAM,
  msa_start_date,
  msa_end_date,
  msa_flag,
  nda_flag,
  non_solicitation_clause_flag,
  use_logo_permission_flag,
  updated_by,
  msaFilePath,
  ndaFilePath
) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Update msa_documents if msaFilePath exists
    if (msaFilePath) {
      const msaUpdateQuery = `
        UPDATE msa_documents
        SET msa_doc_url = ?, start_date = ?, end_date = ?
        WHERE client_id = ?
      `;
      await connection.execute(msaUpdateQuery, [
        msaFilePath,
        msa_start_date ?? null,
        msa_end_date ?? null,
        clientId,
      ]);
    }

    // Update client_info
    const clientUpdateQuery = `
      UPDATE client_info
      SET 
        client_name = ?, 
        vega_client_name = ?, 
        client_type = ?, 
        credit_period = ?, 
        client_status = ?, 
        countryId = ?, 
        companyId = ?, 
        accountId = ?, 
        industryId = ?, 
        IndustryHeadId = ?, 
        IndustryGroupId = ?, 
        IndustrySubGroupId = ?, 
        salesMangerId = ?, 
        accountManagerId = ?, 
        isApplicableAM = ?,
        msa_start_date = ?, 
        msa_end_date = ?, 
        msa_flag = ?, 
        nda_flag = ?, 
        non_solicitation_clause_flag = ?, 
        use_logo_permission_flag = ?, 
        msaFilePath = ?, 
        ndaFilePath = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    // Replace undefined or invalid values with null
    const sanitizedClientValues = [
      client_name ?? null,
      vega_client_name ?? null,
      client_type ?? null,
      credit_period ?? null,
      client_status ?? null,
      countryId ?? null,
      companyId ?? null,
      accountId ?? null,
      industryId ?? null,
      IndustryHeadId ?? null,
      IndustryGroupId ?? null,
      IndustrySubGroupId ?? null,
      salesMangerId ?? null,
      accountManagerId ?? null,
      isApplicableAM ?? null,
      msa_start_date ?? null,
      msa_end_date ?? null,
      msa_flag ?? null,
      nda_flag ?? null,
      non_solicitation_clause_flag ?? null,
      use_logo_permission_flag ?? null,
      msaFilePath ?? null,
      ndaFilePath ?? null,
      updated_by ?? null,
      clientId,
    ];

    await connection.execute(clientUpdateQuery, sanitizedClientValues);

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    console.error("Error updating client:", err);
    throw err;
  } finally {
    connection.release();
  }
};



// Activate/Deactivate client
const activateDeactivateClientDetails = async (clientId, isActive, updated_by) => {
  try {
    const query = `
      UPDATE client_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [isActive, updated_by, clientId]);
    return result;
  } catch (err) {
    console.error("Error activating/deactivating client:", err);
    throw err;
  }
};

// Get client by ID
const getClientById = async (clientId) => {
  try {
    const query = `
      SELECT msaFilePath, ndaFilePath
      FROM client_info
      WHERE id = ?
    `;

    const [rows] = await db.execute(query, [clientId]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error("Client not found");
    }
  } catch (err) {
    console.error("Error fetching client by ID:", err);
    throw err;
  }
};

// Get all clients
const getClients = async () => {
  try {
    const query = `
      SELECT 
        client_info.*, 
        (SELECT GROUP_CONCAT(company_info.companyName) 
              FROM company_info 
              WHERE FIND_IN_SET(company_info.id, client_info.companyId)) AS companyName,
        (SELECT GROUP_CONCAT(industry_master_info.industryName) 
              FROM industry_master_info 
              WHERE FIND_IN_SET(industry_master_info.id, client_info.IndustryGroupId)) AS currentIndustryGroupNames,
        (SELECT GROUP_CONCAT(group_industry_info.groupIndustryName) 
              FROM group_industry_info 
              WHERE FIND_IN_SET(group_industry_info.id, client_info.IndustryGroupId)) AS industryGroupNames,
        (SELECT GROUP_CONCAT(industry_master_info.subIndustryCategory) 
              FROM industry_master_info 
              WHERE FIND_IN_SET(industry_master_info.id, client_info.IndustrySubGroupId)) AS industrySubGroupNames,
        (SELECT GROUP_CONCAT(industry_head_master.industryHeadName) 
              FROM industry_head_master 
              WHERE FIND_IN_SET(industry_head_master.id, client_info.IndustryHeadId)) AS industryHeadName,
        (SELECT GROUP_CONCAT(group_industry_info.groupIndustryName) 
              FROM group_industry_info 
              WHERE FIND_IN_SET(group_industry_info.id, client_info.industryId)) AS currentIndustryName,
        (SELECT GROUP_CONCAT(industry_master_info.industryName) 
              FROM industry_master_info 
              WHERE FIND_IN_SET(industry_master_info.id, client_info.industryId)) AS industryName,
        (SELECT GROUP_CONCAT(country_info.name) 
              FROM country_info 
              WHERE FIND_IN_SET(country_info.id, client_info.countryId)) AS countryName,
        (SELECT GROUP_CONCAT(account_manager_master.name) 
              FROM account_manager_master 
              WHERE FIND_IN_SET(account_manager_master.id, client_info.accountManagerId)) AS accountManagerNames,
        (SELECT GROUP_CONCAT(company_account_info.bankName) 
              FROM company_account_info 
              WHERE FIND_IN_SET(company_account_info.id, client_info.accountId)) AS bankName,
        (SELECT GROUP_CONCAT(sales_manager_master.name) 
              FROM sales_manager_master 
              WHERE FIND_IN_SET(sales_manager_master.id, client_info.salesMangerId)) AS salesMangerName
      FROM client_info
    `;

    const [clients] = await db.execute(query);
    return clients;
  } catch (err) {
    console.error("Error fetching clients list:", err);
    throw err;
  }
};



const createClientContact = async (client_name, salutation, first_name, last_name, email, phone_number, isActive, updatedBy) => {
  try {
    // Replace undefined values with null
    const params = [
      client_name ?? null,
      salutation ?? null,
      first_name ?? null,
      last_name ?? null,
      email ?? null,
      phone_number ?? null,
      isActive ?? 1,      // Assuming 1 (Active) by default
      updatedBy ?? null
    ];

    const query = `
      INSERT INTO client_contact (
        client_name, salutation, first_name, last_name, email, phone_number, isActive, updated_by, updated_at
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, params);
    return result;

  } catch (err) {
    console.error("Error in createClientContact:", err);
    throw err;
  }
};


const updateClientContactDetails = async (clientContactId, client_name, salutation, first_name, last_name, email, phone_number, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE client_contact
      SET 
        client_name = ?,
        salutation = ?,
        first_name = ?,
        last_name = ?,
        email = ?,
        phone_number = ?,
        isActive = ?,
        updated_by = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [client_name, salutation, first_name, last_name, email, phone_number, isActive, updatedBy, clientContactId]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const activateDeactivateClientContactDetails = async (clientContactId, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE client_contact
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [isActive, updatedBy, clientContactId]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getClientContacts = async () => {
  try {
    const query = `
      SELECT * FROM client_contact
    `;
    const [clientContacts] = await db.execute(query);
    return clientContacts;
  } catch (err) {
    console.error("Error retrieving client contacts list:", err);
    throw err;
  }
};


// Insert into client_bill_to_info
const insertClientBillTo = async (
  clientId,
  countryId,
  address1,
  address2,
  address3,
  additionalAddressDetails,
  isDefaultAddress,
  updatedBy,
  state_code,
  gstIn,
  placeOfSupply,
  state_name,
  iec_code
) => {
  try {
    const sanitizedValues = [
      clientId ?? null,
      countryId ?? null,
      address1 ?? null,
      address2 ?? null,
      address3 ?? null,
      JSON.stringify(additionalAddressDetails) ?? null,
      isDefaultAddress ?? null,
      updatedBy ?? null, // Explicitly handle `undefined` and convert to `null`
      state_code ?? null,
      gstIn ?? null,
      placeOfSupply ?? null,
      state_name ?? null,
      iec_code ?? null
    ];

    const query = `
      INSERT INTO client_bill_to_info 
      (clientId, countryId, address1, address2, address3, additionalAddressDetails, isDefaultAddress, updated_by,state_code,gstIn,placeOfSupply,state_name, iec_code, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, sanitizedValues);

    return result;
  } catch (err) {
    console.error("Error inserting into client_bill_to_info:", err);
    throw err;
  }
};

// Update client_bill_to_info
const updateClientBillToDetails = async (
  id,
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
  iec_code,
  updatedBy
) => {
  try {
    const sanitizedValues = [
      clientId ?? null,
      countryId ?? null,
      address1 ?? null,
      address2 ?? null,
      address3 ?? null,
      JSON.stringify(additionalAddressDetails) ?? null,
      isDefaultAddress, // Explicitly pass isDefaultAddress without coalescing to null
      updatedBy ?? null,
      // Ensure 'id' is the last parameter
      state_code,
      gstIn,
      placeOfSupply,
      state_name,
      iec_code,
      id
    ];
    const query = `
      UPDATE client_bill_to_info
      SET 
        clientId = ?, 
        countryId = ?,
        address1 = ?, 
        address2 = ?, 
        address3 = ?, 
        additionalAddressDetails = ?, 
        isDefaultAddress = ?,
        updated_by = ?, 
        state_code = ?,
        gstIn = ?,
        placeOfSupply = ?,
        state_name = ?,
        iec_code = ?
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);

    return result;
  } catch (err) {
    console.error("Error updating client_bill_to_info:", err);
    throw err;
  }
};

// Activate or deactivate client_bill_to_info
const activateDeactivateClientBillToDetails = async (id, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE client_bill_to_info
      SET 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.error("Error activating/deactivating client_bill_to_info:", err);
    throw err;
  }
};

// Get client_bill_to_info
const getClientBillToDetails = async (clientId = null) => {
  try {
    let query = `
      SELECT 
        client_bill_to_info.*, 
        client_info.client_name,         
        country_info.name AS countryName

      FROM 
        client_bill_to_info
      LEFT JOIN 
        client_info ON client_bill_to_info.clientId = client_info.id
      LEFT JOIN 
        country_info 
      ON 
        client_bill_to_info.countryId = country_info.id
    `;

    const queryParams = [];

    if (clientId) {
      query += " WHERE client_bill_to_info.clientId = ?";
      queryParams.push(clientId);
    }

    const [result] = await db.execute(query, queryParams);
    return result;
  } catch (err) {
    console.error("Error retrieving client_bill_to_info:", err);
    throw err;
  }
};


// Insert into client_ship_to_info
const insertClientShipTo = async (
  clientId,
  countryId,
  address1,
  address2,
  address3,
  additionalAddressDetails,
  isDefaultAddress,
  updatedBy,
  state_code,
  gstIn,
  placeOfSupply,
  state_name
) => {
  try {
    const sanitizedValues = [
      clientId ?? null,
      countryId ?? null,
      address1 ?? null,
      address2 ?? null,
      address3 ?? null,
      JSON.stringify(additionalAddressDetails) ?? null,
      isDefaultAddress ?? null,
      updatedBy ?? null, // Ensure this is not undefined
      state_code ?? null,
      gstIn ?? null,
      placeOfSupply ?? null,
      state_name ?? null

    ];


    const query = `
      INSERT INTO client_ship_to_info 
      (clientId, countryId, address1, address2, address3, additionalAddressDetails, isDefaultAddress, updated_by,state_code,gstIn,placeOfSupply,state_name, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, sanitizedValues);

    return result;
  } catch (err) {
    console.error("Error inserting into client_ship_to_info:", err);
    throw err;
  }
};

// Update client_ship_to_info
const updateClientShipToDetails = async (
  id,
  clientId,
  countryId,
  address1,
  address2,
  address3,
  additionalAddressDetails,
  isDefaultAddress,
  updatedBy,
  state_code,
  gstIn,
  placeOfSupply,
  state_name
) => {
  try {
    const sanitizedValues = [
      clientId ?? null,
      countryId ?? null,
      address1 ?? null,
      address2 ?? null,
      address3 ?? null,
      JSON.stringify(additionalAddressDetails) ?? null,
      isDefaultAddress, // Explicitly pass isDefaultAddress without coalescing to null
      updatedBy ?? null,
      state_code ?? null,
      gstIn ?? null,
      placeOfSupply ?? null,
      state_name ?? null,
      id // Ensure 'id' is the last parameter
    ];

    const query = `
      UPDATE client_ship_to_info
      SET 
        clientId = ?,
        countryId = ?, 
        address1 = ?, 
        address2 = ?, 
        address3 = ?, 
        additionalAddressDetails = ?, 
        isDefaultAddress = ?,
        updated_by = ?, 
        state_code = ?,
        gstIn = ?,
        placeOfSupply = ?,
        state_name = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);

    return result;
  } catch (err) {
    console.error("Error updating client_ship_to_info:", err);
    throw err;
  }
};

// Activate or deactivate client_ship_to_info
const activateDeactivateClientShipToDetails = async (id, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE client_ship_to_info
      SET 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.error("Error activating/deactivating client_ship_to_info:", err);
    throw err;
  }
};

// Get client_ship_to_info
const getClientShipToDetails = async (clientId = null) => {
  try {

    let query = `
    SELECT 
      client_ship_to_info.*, 
      client_info.client_name,         
      country_info.name AS countryName
    FROM 
      client_ship_to_info
    LEFT JOIN 
      client_info ON client_ship_to_info.clientId = client_info.id
    LEFT JOIN 
      country_info 
    ON 
      client_ship_to_info.countryId = country_info.id
  `;

    const queryParams = [];

    if (clientId) {
      query += " WHERE client_ship_to_info.clientId = ?";
      queryParams.push(clientId);
    }

    const [result] = await db.execute(query, queryParams);
    return result;
  } catch (err) {
    console.error("Error retrieving client_ship_to_info:", err);
    throw err;
  }
};


// Insert into client_group_info
const insertClientGroup = async (groupName, clientIds, updatedBy) => {
  try {
    const query = `
      INSERT INTO client_group_info 
      (groupName, clientIds, updated_by, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      groupName,
      clientIds, // Store clientIds as JSON array
      updatedBy,
    ]);

    return result;
  } catch (err) {
    console.error("Error inserting into client_group_info:", err);
    throw err;
  }
};

// Update client_group_info
const updateClientGroupDetails = async (id, groupName, clientIds, updatedBy) => {
  try {
    const query = `
      UPDATE client_group_info
      SET 
        groupName = ?, 
        clientIds = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      groupName,
      clientIds,
      updatedBy,
      id,
    ]);

    return result;
  } catch (err) {
    console.error("Error updating client_group_info:", err);
    throw err;
  }
};

// Activate or deactivate client_group_info
const activateDeactivateClientGroupDetails = async (id, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE client_group_info
      SET 
        isActive = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [isActive, updatedBy, id]);
    return result;
  } catch (err) {
    console.error("Error activating/deactivating client_group_info:", err);
    throw err;
  }
};

// Get client_group_info
const getClientGroupsDetails = async () => {
  try {
    const query = `
      SELECT client_group_info.* , 
      (SELECT GROUP_CONCAT(client_info.client_name) 
              FROM client_info 
              WHERE FIND_IN_SET(client_info.id, client_group_info.clientIds)) AS clientName
      FROM client_group_info
    `;

    const [result] = await db.execute(query);
    return result;
  } catch (err) {
    console.error("Error retrieving client_group_info:", err);
    throw err;
  }
};

//  get PO configuration data
const getPoContractConfigurationModel = async () => {

  try {
    const query = `
      SELECT 
        c.id AS client_id,
        c.client_name,
        
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', b.id,
                'countryId', b.countryId,
                'stateId', b.stateId,
                'iec_code', b.iec_code,
                'address1', b.address1,
                'address2', b.address2,
                'address3', b.address3,
                'additionalAddressDetails', b.additionalAddressDetails
            )
        ) AS clientBill,
        
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', s.id,
                'countryId', s.countryId,
                'stateId', s.stateId,
                'address1', s.address1,
                'address2', s.address2,
                'address3', s.address3,
                'additionalAddressDetails', s.additionalAddressDetails
            )
        ) AS clientShip,
        
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', con.id,
                'salutation', con.salutation,
                'first_name', con.first_name,
                'last_name', con.last_name,
                'email', con.email,
                'phone_number', con.phone_number,
                'name',concat(con.first_name,' ',con.last_name)
            )
        ) AS contacts,
        
        JSON_OBJECT(
            'id', ci.id,
            'countryId', ci.countryId,
            'companyName', ci.companyName,
            'Website', ci.Website,
            'Email', ci.Email
        ) AS companyInfo,
        
        JSON_OBJECT(
            'id', cl.id,
            'countryId', cl.countryId,
            'stateId', cl.stateId,
            'address1', cl.address1,
            'address2', cl.address2,
            'address3', cl.address3,
            'additionalAddressDetails', cl.additionalAddressDetails
        ) AS companyLocation

        FROM 
            client_info c
        LEFT JOIN 
            client_bill_to_info b ON c.id = b.clientId AND b.isActive = 1
        LEFT JOIN 
            client_ship_to_info s ON c.id = s.clientId AND s.isActive = 1
        LEFT JOIN 
            client_contact con ON c.client_name = con.client_name AND con.isActive = 1
        LEFT JOIN 
            company_info ci ON c.companyId = ci.id AND ci.isactive = 1
        LEFT JOIN 
            company_location_info cl ON ci.id = cl.companyId AND cl.isActive = 1

        WHERE 
            c.isActive = 1

        GROUP BY 
            c.id, c.client_name, cl.id
    `;

    const [result] = await db.execute(query);
    return result;
  } catch (err) {
    console.error("Error retrieving PO contact configuration:", err);
    throw err;
  }
};



const getPoContractConfigurationData = async () => {
  try {
    const queries = [
      'SELECT * FROM project_service_master;',
      'SELECT * FROM technology_group_info;',
      'SELECT * FROM technology_subgroup_info;',
      'SELECT * FROM technology_name_info;',
      'SELECT * FROM oem_info;',
      'SELECT * FROM polestar_product_sales_master;',
    ];

    // Execute all queries in parallel
    const [
      projectService,
      technologyGroup,
      technologySubGroup,
      technologyName,
      oem,
      product
    ] = await Promise.all(queries.map(query => db.execute(query).then(([rows]) => rows)));

    // Construct result
    const result = {
      projectService: projectService || [],
      technolgyGroup: technologyGroup || [],
      technolgySubGroup: technologySubGroup || [],
      technolgy: technologyName || [],
      oem: oem || [],
      product: product || [],
    };
    return result;
  } catch (err) {
    console.error('Error retrieving PO contract configuration:', err);
    throw err;
  }
};
const getPoCascadingConfigurationData = async () => {
  try {
    const [groupIndustryData] = await db.execute(`
      SELECT id AS groupIndustryId, groupIndustryName, industryIds 
      FROM group_industry_info
      WHERE isActive = 1
    `);

    const [industryData] = await db.execute(`
      SELECT id AS industryId, industryName, subIndustryCategory, updated_by 
      FROM industry_master_info
      WHERE isActive = 1
    `);

    const [industryHeadData] = await db.execute(`
      SELECT id AS industryHeadId, industryHeadName, industryIds, isRegionWise, countryIds, regionIds, stateIds 
      FROM industry_head_master
      WHERE isActive = 1
    `);

    const [salesManagerData] = await db.execute(`
      SELECT id AS salesManagerId, name AS salesManagerName, industryHeadIds 
      FROM sales_manager_master
      WHERE isActive = 1
    `);

    const [accountManagerData] = await db.execute(`
      SELECT id AS accountManagerId, name AS accountManagerName, industryHeadIds 
      FROM account_manager_master
      WHERE isActive = 1
    `);

    const result = {
      groupIndustryData: groupIndustryData || [],
      industryData: industryData || [],
      industryHeadData: industryHeadData || [],
      salesManagerData: salesManagerData || [],
      accountManagerData: accountManagerData || [],
    };

    return result;
  } catch (err) {
    console.error('Error retrieving PO Cascading configuration:', err);
    throw err;
  }
};

const insertPoContract = async (
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
  accountManager,
  filePath,
  noOfResources,
  resourcesData,
  masterNames,
  po_creation_date
) => {
  try {
    const query = `
      INSERT INTO po_contract_info (
        clientId, client_name, clientBillTo, clientShipAddress, clientContact,
        billFrom, companyName, companyLocation, po_name, creditPeriod, poAmount,
        dueAmount, start_date, end_date, projectService, technolgyGroup,
        technolgySubGroup, technolgy, oem, product, docType, poNumber,
        srNumber, industryGroups, subIndustries, industryHead, salesManager,
        accountManager, filePath,noOfResources,resourcesData,masterNames, po_creation_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?, ?)
    `;
    const [result] = await db.execute(query, [
      clientId,
      client_name || null,
      clientBillTo || null,
      clientShipAddress || null,
      clientContact || null,
      billFrom || null,
      companyName || null,
      companyLocation || null,
      po_name || null,
      creditPeriod || null,
      poAmount || null,
      dueAmount || null,
      start_date || null,
      end_date || null,
      projectService || null,
      technolgyGroup || null,
      technolgySubGroup || null,
      technolgy || null,
      oem || null,
      product || null,
      docType || null,
      poNumber || null,
      srNumber || null,
      industryGroups || null,
      subIndustries || null,
      industryHead || null,
      salesManager || null,
      accountManager || null,
      filePath || null,
      noOfResources || null,
      resourcesData || null,
      masterNames || null,
      po_creation_date || null
    ]);
    return result;
  } catch (err) {
    console.error("Error inserting PO contract:", err);
    throw err;
  }
};

const updatePoContract = async (
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
  filePath,
  noOfResources,
  resourcesData,
  masterNames,
  po_creation_date
) => {
  try {
    const query = `
      UPDATE po_contract_info
      SET
        client_name = ?, clientBillTo = ?, clientShipAddress = ?, clientContact = ?,
        billFrom = ?, companyName = ?, companyLocation = ?, po_name = ?, creditPeriod = ?,
        poAmount = ?, dueAmount = ?, start_date = ?, end_date = ?, projectService = ?,
        technolgyGroup = ?, technolgySubGroup = ?, technolgy = ?, oem = ?, product = ?,
        docType = ?, poNumber = ?, srNumber = ?, industryGroups = ?, subIndustries = ?,
        industryHead = ?, salesManager = ?, accountManager = ?,filePath = ?, noOfResources = ?,
      resourcesData = ?,masterNames = ?, po_creation_date = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      client_name || null,
      clientBillTo || null,
      clientShipAddress || null,
      clientContact || null,
      billFrom || null,
      companyName || null,
      companyLocation || null,
      po_name || null,
      creditPeriod || null,
      poAmount || null,
      dueAmount || null,
      start_date || null,
      end_date || null,
      projectService || null,
      technolgyGroup || null,
      technolgySubGroup || null,
      technolgy || null,
      oem || null,
      product || null,
      docType || null,
      poNumber || null,
      srNumber || null,
      industryGroups || null,
      subIndustries || null,
      industryHead || null,
      salesManager || null,
      accountManager || null,
      filePath || null,
      noOfResources || null,
      resourcesData || null,
      masterNames || null,
      po_creation_date || null,
      id,
    ]);
    return result;
  } catch (err) {
    console.error("Error updating PO contract:", err);
    throw err;
  }
};

const activateDeactivatePoContract = async (id, isActive) => {
  try {
    const query = `
      UPDATE po_contract_info
      SET isActive = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [isActive, id]);
    return result;
  } catch (err) {
    console.error("Error updating PO contract status:", err);
    throw err;
  }
};

const getAllPoContracts = async () => {
  try {
    // SELECT * FROM po_contract_info WHERE isActive = 1
    const query = `
      SELECT * FROM po_contract_info
    `;
    const [contracts] = await db.execute(query);
    return contracts;
  } catch (err) {
    console.error("Error retrieving PO contracts:", err);
    throw err;
  }
};


const updateClientMSA = async (clientId, start_date, end_date, msaFile, updated_by) => {
  try {
    const connection = await db.getConnection();
    await connection.beginTransaction();

    const [clientRows] = await connection.execute(
      "SELECT * FROM client_info WHERE id = ?",
      [clientId]
    );

    if (clientRows.length === 0) {
      throw new Error("Client not found");
    }

    const updateClientQuery = `
      UPDATE client_info
      SET msa_start_date = ?, msa_end_date = ?, msaFilePath = ?
      WHERE id = ?
    `;

    await connection.execute(updateClientQuery, [
      start_date,
      end_date,
      msaFile,
      clientId,
    ]);

    const insertMSAQuery = `
      INSERT INTO msa_documents (
        msa_doc_url, start_date, end_date, created_by, client_id
      ) VALUES (?, ?, ?, ?, ?)
    `;

    const [msaResult] = await connection.execute(insertMSAQuery, [
      msaFile,
      start_date,
      end_date,
      updated_by,
      clientId,
    ]);

    const newMSADocumentId = msaResult.insertId;

    const updateClientMSAIdQuery = `
      UPDATE client_info
      SET msa_document_id = ?
      WHERE id = ?
    `;

    await connection.execute(updateClientMSAIdQuery, [
      newMSADocumentId,
      clientId,
    ]);

    await connection.commit();

    return { message: "MSA file updated successfully" };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ----------- INVOICE -------------


// const insertInvoice = async (
//   client_name,
//   client_id,
//   invoice_name, // ✅ Ensure this is included
//   contract_name,
//   contract_id,
//   po_number,
//   po_amount,
//   remain_po_amount,
//   invoice_date,
//   clientBillTo,
//   clientShipAddress,
//   clientContact,
//   company_name,
//   bill_from,
//   invoice_bill_from_id,
//   contract_type,
//   tax_type,
//   tax_type_id,
//   tax_code,
//   tax_code_id,
//   invoice_amount,
//   note_one,
//   note_two,
//   updated_by,
//   isActive,
//   filePath,
//   total_amount,
//   gst_total,
//   final_amount,
//   invoiceData,
//   clientContact_name,
//   clientBillTo_name,
//   clientShipAddress_name
// ) => {
//   try {
//     // Step 1: Fetch the latest invoice number for the given invoice_name prefix
//     const getLastInvoiceQuery = `
//       SELECT invoice_name FROM invoice_info 
//       WHERE invoice_name LIKE ? 
//       ORDER BY invoice_name DESC 
//       LIMIT 1
//     `;

//     const [lastInvoice] = await db.execute(getLastInvoiceQuery, [`${invoice_name}/%`]);

//     let newInvoiceNumber = "0001"; // Default for the first record

//     if (lastInvoice.length > 0) {
//       const lastInvoiceName = lastInvoice[0].invoice_name;
//       const lastNumber = parseInt(lastInvoiceName.split("/").pop(), 10) || 0;
//       newInvoiceNumber = String(lastNumber + 1).padStart(4, "0"); // Ensure 4-digit format
//     }

//     // Generate the final invoice_name
//     const finalInvoiceName = `${invoice_name}/${newInvoiceNumber}`;

//     // Step 2: Insert the invoice with the correct number of values
//     const query = `
//       INSERT INTO invoice_info (
//         invoice_name, client_name, client_id, contract_name, contract_id, po_number, po_amount,
//         remain_po_amount, invoice_date, clientBillTo, clientShipAddress, clientContact,
//         company_name, bill_from, invoice_bill_from_id, contract_type, tax_type, tax_type_id,
//         tax_code, tax_code_id, invoice_amount, note_one, note_two, updated_by, isActive, 
//         filePath, total_amount, gst_total, final_amount, clientContact_name, clientBillTo_name, clientShipAddress_name
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [
//       finalInvoiceName, // ✅ Ensure invoice_name is included
//       client_name, client_id, contract_name, contract_id, po_number, po_amount,
//       remain_po_amount, invoice_date, clientBillTo, clientShipAddress, clientContact,
//       company_name, bill_from, invoice_bill_from_id, contract_type, tax_type, tax_type_id,
//       tax_code, tax_code_id, invoice_amount, note_one, note_two, updated_by, isActive,
//       filePath, total_amount, gst_total, final_amount, clientContact_name, clientBillTo_name, clientShipAddress_name
//     ];

//     const [invoiceResult] = await db.execute(query, values);

//     const invoice_id = invoiceResult.insertId; // Get the inserted invoice_id

//     // Step 3: Insert multiple invoice items
//     const invoiceDataQuery = `
//       INSERT INTO invoice_data (
//         invoice_id, description, sacCode, amount, totalAmount, gstTotal, finalAmount, taxBreakdown
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     for (const item of invoiceData.invoiceItems) {
//       await db.execute(invoiceDataQuery, [
//         invoice_id,
//         item.description || null,
//         item.sacCode || null,
//         item.amount || 0,
//         invoiceData.totalAmount || 0,
//         invoiceData.gstTotal || 0,
//         invoiceData.finalAmount || 0,
//         JSON.stringify(invoiceData.taxBreakdown) || null
//       ]);
//     }

//     return { invoice: invoiceResult, invoice_name: finalInvoiceName };

//   } catch (err) {
//     console.error("Error inserting invoice:", err);
//     throw err;
//   }
// };


const insertInvoice = async (
  client_name,
  client_id,
  invoice_name,
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
  invoiceData,
  clientContact_name,
  clientBillTo_name,
  clientShipAddress_name,
  projectService,
  projectService_names,
  billed_hours,
  currency, due_date,
  terms_of_payment,
  iec_code
) => {
  try {
    console.log("Received values in insertInvoice:", {
      invoice_name, client_name, client_id, contract_name, contract_id, po_number, po_amount,
      remain_po_amount, invoice_date, clientBillTo, clientShipAddress, clientContact,
      company_name, bill_from, invoice_bill_from_id, tax_type, tax_type_id,
      tax_code, tax_code_id, invoice_amount, note_one, note_two, updated_by, isActive,
      filePath, total_amount, gst_total, final_amount, clientContact_name, clientBillTo_name,
      clientShipAddress_name, projectService, projectService_names, billed_hours, currency, due_date,
      terms_of_payment,
      iec_code, invoiceData
    });

    // Ensure client_id is a number
    client_id = Number(client_id) || null;

    // Step 1: Fetch the latest invoice number for the given invoice_name prefix
    const getLastInvoiceQuery = `
      SELECT invoice_name FROM invoice_info 
      WHERE invoice_name LIKE ? 
      ORDER BY invoice_name DESC 
      LIMIT 1
    `;

    const [lastInvoice] = await db.execute(getLastInvoiceQuery, [`${invoice_name}-%`]);

    let newInvoiceNumber = "0001";
    if (lastInvoice.length > 0) {
      const lastInvoiceName = lastInvoice[0].invoice_name;
      const lastNumber = parseInt(lastInvoiceName.split("-").pop(), 10) || 0;
      newInvoiceNumber = String(lastNumber + 1).padStart(4, "0");
    }

    const finalInvoiceName = `${invoice_name}-${newInvoiceNumber}`;

    const safeValues = [
      finalInvoiceName,
      client_name || null,
      client_id || null,
      contract_name || null,
      contract_id || null,
      po_number || null,
      po_amount || null,
      remain_po_amount || null,
      invoice_date || null,
      clientBillTo || null,
      clientShipAddress || null,
      clientContact || null,
      company_name || null,
      bill_from || null,
      invoice_bill_from_id || null,
      tax_type || null,
      tax_type_id || null,
      tax_code || null,
      tax_code_id || null,
      invoice_amount || null,
      note_one || null,
      note_two || null,
      updated_by || null,
      isActive || null,
      filePath || null,
      total_amount || null,
      gst_total || null,
      final_amount || null,
      clientContact_name || null,
      clientBillTo_name || null,
      clientShipAddress_name || null,
      projectService || null,
      projectService_names || null,
      billed_hours || null,
      currency || null,
      due_date || null,
      terms_of_payment || null,
      iec_code || null
    ];

    console.log("Final safeValues before query:", safeValues);

    const insertQuery = `
      INSERT INTO invoice_info (
        invoice_name, client_name, client_id, contract_name, contract_id, po_number, po_amount,
        remain_po_amount, invoice_date, clientBillTo, clientShipAddress, clientContact,
        company_name, bill_from, invoice_bill_from_id, tax_type, tax_type_id,
        tax_code, tax_code_id, invoice_amount, note_one, note_two, updated_by, isActive,
        filePath, total_amount, gst_total, final_amount, clientContact_name,
        clientBillTo_name, clientShipAddress_name, projectService, projectService_names, billed_hours, currency, due_date,
    terms_of_payment,
    iec_code 
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [invoiceResult] = await db.execute(insertQuery, safeValues);
    const invoice_id = invoiceResult.insertId;

    // Step 3: Insert multiple invoice items
    const invoiceDataQuery = `
      INSERT INTO invoice_data (
        invoice_id, description, sacCode, amount, totalAmount, gstTotal, finalAmount, taxBreakdown
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const item of invoiceData.invoiceItems) {
      await db.execute(invoiceDataQuery, [
        invoice_id,
        item.description || null,
        item.sacCode || null,
        item.amount || 0,
        invoiceData.totalAmount || 0,
        invoiceData.gstTotal || 0,
        invoiceData.finalAmount || 0,
        JSON.stringify(invoiceData.taxBreakdown) || null
      ]);
    }

    // Step 4: Update dueAmount in po_contract_info
    //   const updateDueAmountQuery = `
    //   UPDATE po_contract_info
    //   SET dueAmount = dueAmount - ?
    //   WHERE poNumber = ? AND po_name = ?
    // `;
    const updateDueAmountQuery = `
        UPDATE po_contract_info
        SET dueAmount = dueAmount - ?
        WHERE po_name = ?
      `;

    await db.execute(updateDueAmountQuery, [invoice_amount, contract_name]);

    return { invoice: invoiceResult, invoice_name: finalInvoiceName };

  } catch (err) {
    console.error("Error inserting invoice:", err);
    throw err;
  }
};




const sanitizeValue = (value) => (value === undefined ? null : value);

const updateInvoice = async (
  id, client_name, client_id, invoice_name, contract_name, contract_id, po_number,
  po_amount, remain_po_amount, invoice_date, clientBillTo, clientShipAddress, clientContact,
  company_name, bill_from, invoice_bill_from_id, tax_type, tax_type_id, tax_code, tax_code_id,
  invoice_amount, note_one, note_two, updated_by, isActive, filePath, total_amount, gst_total,
  final_amount, invoiceData, clientContact_name, clientBillTo_name, clientShipAddress_name,
  projectService, projectService_names, billed_hours, due_date,
  terms_of_payment,
  iec_code
) => {
  try {
    const query = `
      UPDATE invoice_info
      SET
        client_name = ?, client_id = ?, invoice_name = ?, contract_name = ?, contract_id = ?, 
        po_number = ?, po_amount = ?, remain_po_amount = ?, invoice_date = ?, clientBillTo = ?, 
        clientShipAddress = ?, clientContact = ?, company_name = ?, bill_from = ?, 
        invoice_bill_from_id = ?, tax_type = ?, tax_type_id = ?, tax_code = ?, 
        tax_code_id = ?, invoice_amount = ?, note_one = ?, note_two = ?, updated_by = ?, 
        isActive = ?, filePath = ?, total_amount = ?, gst_total = ?, final_amount = ?, 
        clientContact_name = ?, clientBillTo_name = ?, clientShipAddress_name = ?, 
        projectService = ?, projectService_names = ?, billed_hours = ?,due_date = ?,
    terms_of_payment = ?,
    iec_code = ? WHERE id = ?
    `;

    const values = [
      sanitizeValue(client_name), sanitizeValue(client_id), sanitizeValue(invoice_name),
      sanitizeValue(contract_name), sanitizeValue(contract_id), sanitizeValue(po_number),
      sanitizeValue(po_amount), sanitizeValue(remain_po_amount), sanitizeValue(invoice_date),
      sanitizeValue(clientBillTo), sanitizeValue(clientShipAddress), sanitizeValue(clientContact),
      sanitizeValue(company_name), sanitizeValue(bill_from), sanitizeValue(invoice_bill_from_id),
      sanitizeValue(tax_type), sanitizeValue(tax_type_id), sanitizeValue(tax_code),
      sanitizeValue(tax_code_id), sanitizeValue(invoice_amount), sanitizeValue(note_one),
      sanitizeValue(note_two), sanitizeValue(updated_by), sanitizeValue(isActive),
      sanitizeValue(filePath), sanitizeValue(total_amount), sanitizeValue(gst_total),
      sanitizeValue(final_amount), sanitizeValue(clientContact_name), sanitizeValue(clientBillTo_name),
      sanitizeValue(clientShipAddress_name), sanitizeValue(projectService), sanitizeValue(projectService_names), sanitizeValue(billed_hours), sanitizeValue(due_date),
      sanitizeValue(terms_of_payment),
      sanitizeValue(iec_code),
      sanitizeValue(id)
    ];

    await db.execute(query, values);

    // Delete existing invoice_data entries
    const deleteInvoiceDataQuery = `DELETE FROM invoice_data WHERE invoice_id = ?`;
    await db.execute(deleteInvoiceDataQuery, [id]);

    // Insert new invoiceData entries
    const insertInvoiceDataQuery = `
      INSERT INTO invoice_data (
        invoice_id, description, sacCode, amount, totalAmount, gstTotal, finalAmount, taxBreakdown
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const item of invoiceData.invoiceItems) {
      await db.execute(insertInvoiceDataQuery, [
        id, sanitizeValue(item.description), sanitizeValue(item.sacCode),
        sanitizeValue(item.amount), sanitizeValue(invoiceData.totalAmount),
        sanitizeValue(invoiceData.gstTotal), sanitizeValue(invoiceData.finalAmount),
        JSON.stringify(invoiceData.taxBreakdown)
      ]);
    }

    return { message: "Invoice updated successfully" };
  } catch (err) {
    console.error("Error updating invoice:", err);
    throw err;
  }
};



const activateDeactivateInvoice = async (id, isActive) => {
  try {
    const query = `UPDATE invoice_info SET isActive = ? WHERE id = ?`;
    const [result] = await db.execute(query, [isActive, id]);
    return result;
  } catch (err) {
    console.error("Error updating invoice status:", err);
    throw err;
  }
};

const getAllInvoices = async () => {
  try {
    const query = `
      SELECT 
        ii.*, 
        COALESCE(
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'invoice_data_id', id.id,
              'description', id.description,
              'sacCode', id.sacCode,
              'amount', id.amount,
              'totalAmount', id.totalAmount,
              'gstTotal', id.gstTotal,
              'finalAmount', id.finalAmount,
              'taxBreakdown', id.taxBreakdown,
              'created_at', id.created_at,
              'updated_at', id.updated_at
            )
          ), '[]'
        ) AS invoiceInfo
      FROM invoice_info ii
      LEFT JOIN invoice_data id ON ii.id = id.invoice_id
      GROUP BY ii.id
    `;

    const [invoices] = await db.execute(query);
    return invoices;
  } catch (err) {
    console.error("Error retrieving invoices:", err);
    throw err;
  }
};



// ------------------- CREDIT NOTE ------------------------

const insertCreditNote = async (
  client_name,
  client_id,
  invoice_name,
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
  invoiceData,
  clientContact_name,
  clientBillTo_name,
  clientShipAddress_name,
  projectService,
  projectService_names,
  invoice_number,
  invoice_number_id,
) => {
  try {
    console.log("Received values in insertInvoice:", {
      invoice_name, client_name, client_id, contract_name, contract_id, po_number, po_amount,
      remain_po_amount, invoice_date, clientBillTo, clientShipAddress, clientContact,
      company_name, bill_from, invoice_bill_from_id, tax_type, tax_type_id,
      tax_code, tax_code_id, invoice_amount, note_one, note_two, updated_by, isActive,
      filePath, total_amount, gst_total, final_amount, clientContact_name, clientBillTo_name,
      clientShipAddress_name, projectService, projectService_names, invoice_number,
      invoice_number_id, invoiceData
    });

    // Ensure client_id is a number
    client_id = Number(client_id) || null;

    // Step 1: Fetch the latest invoice number for the given invoice_name prefix
    const getLastInvoiceQuery = `
      SELECT invoice_name FROM credit_note_info 
      WHERE invoice_name LIKE ? 
      ORDER BY invoice_name DESC 
      LIMIT 1
    `;

    const [lastInvoice] = await db.execute(getLastInvoiceQuery, [`${invoice_name}-%`]);

    let newInvoiceNumber = "0001";
    if (lastInvoice.length > 0) {
      const lastInvoiceName = lastInvoice[0].invoice_name;
      const lastNumber = parseInt(lastInvoiceName.split("-").pop(), 10) || 0;
      newInvoiceNumber = String(lastNumber + 1).padStart(4, "0");
    }

    const finalInvoiceName = `${invoice_name}-${newInvoiceNumber}`;

    const safeValues = [
      finalInvoiceName,
      client_name || null,
      client_id || null,
      contract_name || null,
      contract_id || null,
      po_number || null,
      po_amount || null,
      remain_po_amount || null,
      invoice_date || null,
      clientBillTo || null,
      clientShipAddress || null,
      clientContact || null,
      company_name || null,
      bill_from || null,
      invoice_bill_from_id || null,
      tax_type || null,
      tax_type_id || null,
      tax_code || null,
      tax_code_id || null,
      invoice_amount || null,
      note_one || null,
      note_two || null,
      updated_by || null,
      isActive || null,
      filePath || null,
      total_amount || null,
      gst_total || null,
      final_amount || null,
      clientContact_name || null,
      clientBillTo_name || null,
      clientShipAddress_name || null,
      projectService || null,
      projectService_names || null,
      invoice_number || null,
      invoice_number_id || null
    ];

    console.log("Final safeValues before query:", safeValues);

    const insertQuery = `
      INSERT INTO credit_note_info (
        invoice_name, client_name, client_id, contract_name, contract_id, po_number, po_amount,
        remain_po_amount, invoice_date, clientBillTo, clientShipAddress, clientContact,
        company_name, bill_from, invoice_bill_from_id, tax_type, tax_type_id,
        tax_code, tax_code_id, invoice_amount, note_one, note_two, updated_by, isActive,
        filePath, total_amount, gst_total, final_amount, clientContact_name,
        clientBillTo_name, clientShipAddress_name, projectService, projectService_names,   invoice_number, invoice_number_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [invoiceResult] = await db.execute(insertQuery, safeValues);
    const invoice_id = invoiceResult.insertId;

    // Step 3: Insert multiple invoice items
    const invoiceDataQuery = `
      INSERT INTO credit_note_data (
        invoice_id, description, sacCode, amount, totalAmount, gstTotal, finalAmount, taxBreakdown
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const item of invoiceData.invoiceItems) {
      await db.execute(invoiceDataQuery, [
        invoice_id,
        item.description || null,
        item.sacCode || null,
        item.amount || 0,
        invoiceData.totalAmount || 0,
        invoiceData.gstTotal || 0,
        invoiceData.finalAmount || 0,
        JSON.stringify(invoiceData.taxBreakdown) || null
      ]);
    }

    // Step 4: Update dueAmount in po_contract_info
    const updateDueAmountQuery = `
            UPDATE po_contract_info
            SET dueAmount = dueAmount + ?
            WHERE poNumber = ? AND po_name = ?
          `;

    await db.execute(updateDueAmountQuery, [invoice_amount, po_number, contract_name]);

    return { invoice: invoiceResult, invoice_name: finalInvoiceName };

  } catch (err) {
    console.error("Error inserting credit note:", err);
    throw err;
  }
};




// const sanitizeValue = (value) => (value === undefined ? null : value);

const updateCreditNote = async (
  id, client_name, client_id, invoice_name, contract_name, contract_id, po_number,
  po_amount, remain_po_amount, invoice_date, clientBillTo, clientShipAddress, clientContact,
  company_name, bill_from, invoice_bill_from_id, tax_type, tax_type_id, tax_code, tax_code_id,
  invoice_amount, note_one, note_two, updated_by, isActive, filePath, total_amount, gst_total,
  final_amount, invoiceData, clientContact_name, clientBillTo_name, clientShipAddress_name,
  projectService, projectService_names, invoice_number, invoice_number_id
) => {
  try {
    const query = `
      UPDATE credit_note_info
      SET
        client_name = ?, client_id = ?, invoice_name = ?, contract_name = ?, contract_id = ?, 
        po_number = ?, po_amount = ?, remain_po_amount = ?, invoice_date = ?, clientBillTo = ?, 
        clientShipAddress = ?, clientContact = ?, company_name = ?, bill_from = ?, 
        invoice_bill_from_id = ?, tax_type = ?, tax_type_id = ?, tax_code = ?, 
        tax_code_id = ?, invoice_amount = ?, note_one = ?, note_two = ?, updated_by = ?, 
        isActive = ?, filePath = ?, total_amount = ?, gst_total = ?, final_amount = ?, 
        clientContact_name = ?, clientBillTo_name = ?, clientShipAddress_name = ?, 
        projectService = ?, projectService_names = ?, invoice_number = ?, invoice_number_id = ? WHERE id = ?
    `;

    const values = [
      sanitizeValue(client_name), sanitizeValue(client_id), sanitizeValue(invoice_name),
      sanitizeValue(contract_name), sanitizeValue(contract_id), sanitizeValue(po_number),
      sanitizeValue(po_amount), sanitizeValue(remain_po_amount), sanitizeValue(invoice_date),
      sanitizeValue(clientBillTo), sanitizeValue(clientShipAddress), sanitizeValue(clientContact),
      sanitizeValue(company_name), sanitizeValue(bill_from), sanitizeValue(invoice_bill_from_id),
      sanitizeValue(tax_type), sanitizeValue(tax_type_id), sanitizeValue(tax_code),
      sanitizeValue(tax_code_id), sanitizeValue(invoice_amount), sanitizeValue(note_one),
      sanitizeValue(note_two), sanitizeValue(updated_by), sanitizeValue(isActive),
      sanitizeValue(filePath), sanitizeValue(total_amount), sanitizeValue(gst_total),
      sanitizeValue(final_amount), sanitizeValue(clientContact_name), sanitizeValue(clientBillTo_name),
      sanitizeValue(clientShipAddress_name), sanitizeValue(projectService), sanitizeValue(projectService_names), sanitizeValue(invoice_number), sanitizeValue(invoice_number_id),
      sanitizeValue(id)
    ];

    await db.execute(query, values);

    // Delete existing invoice_data entries
    const deleteInvoiceDataQuery = `DELETE FROM credit_note_data WHERE invoice_id = ?`;
    await db.execute(deleteInvoiceDataQuery, [id]);

    // Insert new invoiceData entries
    const insertInvoiceDataQuery = `
      INSERT INTO credit_note_data (
        invoice_id, description, sacCode, amount, totalAmount, gstTotal, finalAmount, taxBreakdown
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const item of invoiceData.invoiceItems) {
      await db.execute(insertInvoiceDataQuery, [
        id, sanitizeValue(item.description), sanitizeValue(item.sacCode),
        sanitizeValue(item.amount), sanitizeValue(invoiceData.totalAmount),
        sanitizeValue(invoiceData.gstTotal), sanitizeValue(invoiceData.finalAmount),
        JSON.stringify(invoiceData.taxBreakdown)
      ]);
    }

    return { message: "Credit note updated successfully" };
  } catch (err) {
    console.error("Error updating credit note:", err);
    throw err;
  }
};



const activateDeactivateCreditNote = async (id, isActive) => {
  try {
    const query = `UPDATE credit_note_info SET isActive = ? WHERE id = ?`;
    const [result] = await db.execute(query, [isActive, id]);
    return result;
  } catch (err) {
    console.error("Error updating credit note status:", err);
    throw err;
  }
};

const getAllCreditNote = async () => {
  try {
    const query = `
      SELECT 
        ii.*, 
        COALESCE(
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'invoice_data_id', id.id,
              'description', id.description,
              'sacCode', id.sacCode,
              'amount', id.amount,
              'totalAmount', id.totalAmount,
              'gstTotal', id.gstTotal,
              'finalAmount', id.finalAmount,
              'taxBreakdown', id.taxBreakdown,
              'created_at', id.created_at,
              'updated_at', id.updated_at
            )
          ), '[]'
        ) AS invoiceInfo
      FROM credit_note_info ii
      LEFT JOIN credit_note_data id ON ii.id = id.invoice_id
      GROUP BY ii.id
    `;

    const [invoices] = await db.execute(query);
    return invoices;
  } catch (err) {
    console.error("Error retrieving credit notes:", err);
    throw err;
  }
};

const getInvoicePDFPath = async (invoice_number) => {
  try {
    const query = "SELECT pdf_path FROM invoice_info WHERE invoice_name = ?";
    const [result] = await db.execute(query, [invoice_number]);
    return result.length ? result[0].pdf_path : null;
  } catch (err) {
    console.error("Error fetching PDF path:", err);
    throw err;
  }
};



const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  // return `${year}/${month}/${day}`;
  return `${day}/${month}/${year}`;
};

const convertAmountToWords = (amount, currency) => {
  let [whole, decimal] = amount.toString().split(".");

  let currencyWord = currency === "USD" ? "Dollars" : "Rupees";
  let subCurrencyWord = currency === "USD" ? "Cents" : "Paise";

  let words = numberToWords.toWords(parseInt(whole)) + ` ${currencyWord}`;

  if (decimal && parseInt(decimal) > 0) {
    if (decimal.length === 1) decimal += "0"; // Ensure two decimal places
    words += ` and ${numberToWords.toWords(parseInt(decimal))} ${subCurrencyWord}`;
  }

  return `In Words: ${currency} ${words} Only`;
};


const generateInvoicePDF = async (invoice_number) => {
  try {
    // Fetch invoice data from the database
    const query = "SELECT * FROM invoice_info WHERE invoice_name = ?";
    const [invoiceData] = await db.execute(query, [invoice_number]);

    if (!invoiceData.length) {
      throw new Error("Invoice not found");
    }

    const invoice = invoiceData[0];

    // Company Info
    const companyQuery = "SELECT * FROM company_info WHERE companyName = ?";
    const [companyData] = await db.execute(companyQuery, [invoice.company_name]);
    invoice['companyInfo'] = companyData[0];

    // Company Location Info
    const companyLocationQuery = "SELECT * FROM company_location_info WHERE companyId = ? AND isDefaultAddress = 1";
    const [companyLocationData] = await db.execute(companyLocationQuery, [companyData[0].id]);
    const additionalDetails = JSON.parse(companyLocationData[0].additionalAddressDetails || "{}");

    companyLocationData[0].additionalDetailsHtml = Object.entries(additionalDetails)
      .map(([key, value]) => `<span>${key}: ${value}</span>`)
      .join(", ");

    invoice['companyLocationInfo'] = companyLocationData[0];

    // Company Account Info
    const companyAccountQuery = "SELECT * FROM company_account_info WHERE companyId = ? AND isDefaultAccount = 1";
    const [companyAccountData] = await db.execute(companyAccountQuery, [companyData[0].id]);

    const accountDetails = companyAccountData[0]?.additionalFieldDetails || {};
    companyAccountData[0].additionalDetailsHtml = Object.entries(accountDetails)
      .map(([key, value]) => `<span>${key}: ${value}</span><br />`)
      .join("");

    invoice['companyAccountInfo'] = companyAccountData[0];

    // Client Contact Info
    if (invoice.clientContact) {
      const clientContactQuery = "SELECT * FROM client_contact WHERE id = ?";
      const [clientContactData] = await db.execute(clientContactQuery, [invoice.clientContact]);
      invoice['clientContactInfo'] = clientContactData[0];
    } else {
      invoice['clientContactInfo'] = {};
    }

    // Ensure directory exists
    const dirPath = path.join(__dirname, '..', 'models', 'invoices');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Define PDF path and URL
    const fileName = `${invoice_number}.pdf`;
    const pdfPath = path.join(dirPath, fileName);
    const relativePDFUrl = `/invoices/${fileName}`;

    // Generate the PDF using Puppeteer
    await createPDF(invoice, pdfPath);

    // Update DB with relative path
    const updatePDFQuery = "UPDATE invoice_info SET pdf_path = ? WHERE invoice_name = ?";
    await db.execute(updatePDFQuery, [relativePDFUrl, invoice_number]);

    // ✅ Return relative path for frontend
    return {
      statusCode: 201,
      message: "PDF generated successfully",
      pdfPath: relativePDFUrl
    };

  } catch (err) {
    console.error("Error generating PDF:", err);
    throw err;
  }
};


// Function to generate PDF using Puppeteer
const createPDF = async (invoice, pdfPath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.error("companyDataaaa", invoice, pdfPath);

  // Define the HTML content with the invoice details
  const htmlContent = ` 
    <html>
      <head></head>
      <body>
        <div style="position: absolute; top: 0; left: 0; background: #00000099; height: 100vh; width: 100vw; z-index: 1; display: flex; justify-content: center; align-items: center; overflow: hidden;" onclick="props?.setDownloadExportPDF(false)">
          <div style="width: 90%; max-width: 750px; height: 90vh; background-color: white; padding: 2rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow-y: auto;" onclick="event.stopPropagation()">

            <img src="http://localhost:5000/${invoice.companyInfo.logopath}" alt="Polestar" style="height: 35px; width: 80px; margin-bottom: 0px; margin-left: 10px;" />
            <h1 style="text-align: center; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Export ${pdfPath.includes("invoices") ? 'Invoice' : 'Credit Note'}</h1>
            <div style="border: 1px solid black;">
              <div style="display: flex;">
                <div style="display: flex; width: 40%; ">
                  <div style="border: 1px solid black; width: 100%; padding: 4px;">
                    <div style="font-size: 0.875rem;">
                      <span style="font-weight: 600;">${invoice.company_name}</span><br />
                      <span>${invoice.companyLocationInfo.address1}</span><br />
                      <span>${invoice.companyLocationInfo.address2}</span><br />
                      <span>${invoice.companyLocationInfo.address3}</span><br />
                      <span>${invoice.companyLocationInfo.additionalDetailsHtml}</span><br />

                      <span>Website - <a href=${invoice.companyInfo.Website} target="_blank" rel="noopener noreferrer">${invoice.companyInfo.Website}</a></span><br />
                      <span>Email - ${invoice.companyInfo.Email}</span><br />
                      <span>CIN No. - U72900UP2017PTC092242</span>
                    </div>
                  </div>
                </div>
                <div style="display: grid; width: 60%; grid-template-columns: repeat(4, 1fr);">
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">Invoice No:</span>
                    <span>${invoice.invoice_name}</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">Invoice Date:</span>
                    <span>${formatDate(invoice.invoice_date)}</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">Due Date:</span>
                    <span>${formatDate(invoice.due_date) || ''}</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">Terms of Payment:</span>
                    <span>${invoice.terms_of_payment || 0} Days</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">PO Number:</span>
                    <span>${invoice.po_number || ''}</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">PAN:</span>
                    <span>${invoice.companyInfo.pan_number || ''}</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">GSTN:</span>
                    <span>${invoice.companyLocationInfo.gst_number || ''}</span>
                  </div>
                  ${pdfPath.includes("invoices") ? `
                    <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                      <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">IEC:</span>
                      <span>${invoice.iec_code || ''}</span>
                    </div>
                  ` : ''}

                </div>
              </div>
              <div style="display: flex;">
                <span style="font-weight: 600; padding: 4px; width: 20%; border: 1px solid black;">Client's Details</span>
                <div style="width: 80%; display: grid; grid-template-columns: 1fr 1fr; font-size: 0.875rem;">
                  <div style="border: 1px solid black; padding: 4px;">
                    <span style="font-weight: 600; text-decoration: underline;">Delivery Address:</span><br />
                    <span>${invoice.clientShipAddress_name}</span><br />
                  </div>
                  <div style="border: 1px solid black; padding: 4px;">
                    <span style="font-weight: 600; text-decoration: underline;">Billing Address:</span><br />
                    <span>${invoice.clientBillTo_name}</span><br />
                  </div>

                </div>
              </div>
              <div>
                <div style="fontSize: 14px, padding: 4px, display: flex, justifyContent: center, border: 1px solid black">

                  ${Object.keys(invoice.clientContactInfo).length > 0 ?
                    `<div style="font-weight: 800; text-align: center;">
                  Kind Attention : ${invoice.clientContactInfo.salutation || ''} 
                  ${invoice.clientContactInfo.first_name || ''} 
                  ${invoice.clientContactInfo.last_name || ''}
                </div>`
                    : ''
                  }


                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr>
                        <th style="border: 1px solid black; padding: 4px; text-align: left;">Description</th>
                        <th style="border: 1px solid black; padding: 4px; text-align: right;">Amount (INR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="border: 1px solid black; padding: 4px; vertical-align: top; height: 200px;">
                          <span style="font-weight: 600;">${invoice.companyInfo.description}</span><br />

                          <span style="font-weight: 600;">Total Amount Payable</span>
                        </td>
                        <td style="border: 1px solid black; padding: 4px; text-align: right; font-weight: 600;">
                          <span>${invoice.final_amount}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="border: 1px solid black; padding: 4px; font-size: 12px;">
                  <span style="font-weight: 600;">${convertAmountToWords(invoice.final_amount, invoice.currency)}</span>
                </div>
                <div style="display: flex; justify-content: flex-end; border: 1px solid black; padding: 4px;">
                  <div style="text-align: center;">
                    <div style="margin-bottom: 3rem;"></div>
                    ${invoice.companyInfo.digitalSignPath ? `
                      <img src="http://localhost:5000/${invoice.companyInfo.digitalSignPath}" alt="Polestar" style="height: 30px; width: 100px; margin-bottom: 0px; margin-left: 10px;" />
                    ` : ''}
                    <div style="font-weight: 600; font-size: 14px;">Authorised Signatory</div>
                  </div>
                </div>

                <div style="border: 1px solid black; font-size: 0.875rem; padding: 4px;">
                  <div style="font-weight: 600;">Terms & Conditions:</div>
                  <ol style="margin-bottom: 0px; padding-left: 16px;">
                    <li style="margin-bottom: 0.25rem;">
                      This bill is payable on receipt by Cheque/Wire transfer in favor of Polestar Solutions & Services India Pvt. Ltd. In case payment is made by electronic fund transfer, please send details to
                      <a href="mailto:ajay@polestarllp.com" target="_blank" rel="noopener noreferrer">ajay@polestarllp.com</a>.
                    </li>
                    <li style="margin-bottom: 0.25rem;">TDS certificate, if applicable is to be sent to the above address.</li>
                    <li style="margin-bottom: 0.25rem;">Whether GST is payable on Reverse Charge basis? - No</li>
                  </ol>
                </div>


                <div>
                  <div style="font-weight: 600; display: flex; justify-content: space-around; border: 1px solid black; padding: 4px;">Bank Details :</div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr;">
                    <div style="display: flex; flex-direction: column; border: 1px solid black; padding: 4px;">
                      <div><span style="font-weight: bold; flex: 1;">Beneficiary Name : </span><span>${invoice.company_name}</span></div>
                      <div><span style="font-weight: bold; flex: 1;">Bank Name : </span><span>${invoice.companyAccountInfo.bankName}</span></div>
                      <div><span style="font-weight: bold; flex: 1;">Bank Address : </span><span>${invoice.companyAccountInfo.bankAddress}</span></div>
                      <div><span style="font-weight: bold; flex: 1;">Account No. : </span><span>${invoice.companyAccountInfo.accountNumber}</span></div>
                    </div>
                    <div style="display: flex; flex-direction: column; border: 1px solid black; padding: 4px;">
                      <div><span style="font-weight: bold; flex: 1;">${invoice.companyAccountInfo.additionalDetailsHtml}</span></div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </body>
    </html>

 `
    ;

  // Set the content to the page
  await page.setContent(htmlContent);

  // Generate PDF from HTML content
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
  });

  console.log('PDF generated at:', pdfPath);

  await browser.close();
};

const generateCreditNotePDF = async (invoice_number) => {
  try {
    // Fetch invoice data
    const query = "SELECT * FROM credit_note_info WHERE invoice_name = ?";
    const [invoiceData] = await db.execute(query, [invoice_number]);

    if (!invoiceData.length) {
      throw new Error("Invoice not found");
    }

    const invoice = invoiceData[0];

    // Company info
    const companyQuery = "SELECT * FROM company_info WHERE companyName = ?";
    const [companyData] = await db.execute(companyQuery, [invoice.company_name]);
    invoice['companyInfo'] = companyData[0];

    // Company location
    const companyLocationQuery = "SELECT * FROM company_location_info WHERE companyId = ? and isDefaultAddress = 1";
    const [companyLocationData] = await db.execute(companyLocationQuery, [companyData[0].id]);
    const additionalDetails = JSON.parse(companyLocationData[0].additionalAddressDetails || "{}");

    companyLocationData[0].additionalDetailsHtml = Object.entries(additionalDetails)
      .map(([key, value]) => `<span>${key}: ${value}</span>`)
      .join("");

    invoice['companyLocationInfo'] = companyLocationData[0];

    // Company account info
    const companyAccountQuery = "SELECT * FROM company_account_info WHERE companyId = ? and isDefaultAccount = 1";
    const [companyAccountData] = await db.execute(companyAccountQuery, [companyData[0].id]);

    const accountDetails = companyAccountData[0]?.additionalFieldDetails || {};
    companyAccountData[0].additionalDetailsHtml = Object.entries(accountDetails)
      .map(([key, value]) => `<span>${key}: ${value}</span><br />`)
      .join("");

    invoice['companyAccountInfo'] = companyAccountData[0];

    // Client contact info
    if (invoice.clientContact) {
      const clientContactQuery = "SELECT * FROM client_contact WHERE id = ?";
      const [clientContactData] = await db.execute(clientContactQuery, [invoice.clientContact]);
      invoice['clientContactInfo'] = clientContactData[0];
    } else {
      invoice['clientContactInfo'] = {};
    }

    // Directory setup
    const dirPath = path.join(__dirname, '..', 'models', 'creditnotes');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // File path and name
    const fileName = `${invoice_number}.pdf`;
    const pdfPath = path.join(dirPath, fileName);
    const relativePDFUrl = `/creditnotes/${fileName}`; // this is the public URL

    // Generate PDF
    await createPDF(invoice, pdfPath);

    // Optional: Update PDF path in DB
    const updatePDFQuery = "UPDATE invoice_info SET pdf_path = ? WHERE invoice_name = ?";
    await db.execute(updatePDFQuery, [relativePDFUrl, invoice_number]);

    // ✅ Return relative URL for frontend to use
    return {
      statusCode: 201,
      message: "PDF generated successfully",
      pdfPath: relativePDFUrl
    };

  } catch (err) {
    console.error("Error generating PDF:", err);
    throw err;
  }
};



// Function to generate PDF using Puppeteer
const createTaxInvoicePDF = async (invoice, pdfPath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.error("companyDataaaa", invoice, pdfPath);

  // Define the HTML content with the invoice details
  const htmlContent =
    `    <html>
      <head></head>
      <body>
        <div style="position: absolute; top: 0; left: 0; background: #00000099; height: 100vh; width: 100vw; z-index: 1; display: flex; justify-content: center; align-items: center; overflow: hidden;" onclick="props?.setDownloadExportPDF(false)">
          <div style="width: 90%; max-width: 750px; height: 90vh; background-color: white; padding: 2rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow-y: auto;" onclick="event.stopPropagation()">

            <img src="http://localhost:5000/${invoice.companyInfo.logopath}" alt="Polestar" style="height: 35px; width: 80px; margin-bottom: 0px; margin-left: 10px;" />
            <h1 style="text-align: center; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Tax Invoice</h1>
            <div style="border: 1px solid black;">
              <div style="display: flex;">
                <div style="display: flex; width: 40%; ">
                  <div style="border: 1px solid black; width: 100%; padding: 4px;">
                    <div style="font-size: 0.875rem;">
                      <span style="font-weight: 600;">${invoice.company_name}</span><br />
                      <span>${invoice.companyLocationInfo.address1}</span><br />
                      <span>${invoice.companyLocationInfo.address2}</span><br />
                      <span>${invoice.companyLocationInfo.address3}</span><br />
                      <span>${invoice.companyLocationInfo.additionalDetailsHtml}</span><br />

                      <span>Website - <a href=${invoice.companyInfo.Website} target="_blank" rel="noopener noreferrer">${invoice.companyInfo.Website}</a></span><br />
                      <span>Email - ${invoice.companyInfo.Email}</span><br />
                      <span>CIN No. - U72900UP2017PTC092242</span>
                    </div>
                  </div>
                </div>
                <div style="display: grid; width: 60%; grid-template-columns: repeat(4, 1fr);">
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">Invoice No:</span>
                    <span>${invoice.invoice_name}</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">Invoice Date:</span>
                    <span>${formatDate(invoice.invoice_date)}</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">Due Date:</span>
                    <span>${formatDate(invoice.due_date) || ''}</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">Terms of Payment:</span>
                    <span>${invoice.terms_of_payment || 0} Days</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">PO Number:</span>
                    <span>${invoice.po_number || ''}</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">PAN:</span>
                    <span>${invoice.companyInfo.pan_number || ''}</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; padding: 4px; border: 1px solid black;">
                    <span style="font-weight: bold; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">GSTN:</span>
                    <span>${invoice.companyLocationInfo.gst_number || ''}</span>
                  </div>
                  
                </div>
              </div>
              <div style="display: flex;">
                <span style="font-weight: 600; padding: 4px; width: 20%; border: 1px solid black;">Client's Details</span>
                <div style="width: 80%; display: grid; grid-template-columns: 1fr 1fr; font-size: 0.875rem;">
                  <div style="border: 1px solid black; padding: 4px;">
                    <span style="font-weight: 600; text-decoration: underline;">Delivery Address:</span><br />
                    <span>${invoice.clientShipAddress_name}</span><br />
                  </div>
                  <div style="border: 1px solid black; padding: 4px;">
                    <span style="font-weight: 600; text-decoration: underline;">Billing Address:</span><br />
                    <span>${invoice.clientBillTo_name}</span><br />
                  </div>

                </div>
              </div>
              <div>
                <div style="fontSize: 14px, padding: 4px, display: flex, justifyContent: center, border: 1px solid black">

                  ${Object.keys(invoice.clientContactInfo).length < 0 ?
      `<div style="font-weight: 800; text-align: center;">
                  Kind Attention ${invoice.clientContactInfo.salutation || ''} 
                  ${invoice.clientContactInfo.first_name || ''} 
                  ${invoice.clientContactInfo.last_name || ''}
                  </div>`
      : ''
    }
                  <div style="font-family: Arial, sans-serif;">
                    <div style="font-size: 14px; padding: 4px; display: flex; justify-content: center; border: 1px solid black;">
                    </div>

                    <div style="overflow-x: auto;">
                      <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <thead>
                          <tr>
                            <th style="border: 1px solid black; padding: 4px; text-align: left;">Description</th>
                            <th style="border: 1px solid black; padding: 4px; text-align: left;">SAC Code</th>
                            <th style="border: 1px solid black; padding: 4px; text-align: right;">Amount (INR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style="border: 1px solid black; padding: 4px; text-align: left;">
                              ${invoice.invoiceTaxInfo.description || "N/A"}
                            </td>
                            <td style="border: 1px solid black; padding: 4px; text-align: left;">
                              ${invoice.invoiceTaxInfo.sacCode || "N/A"}
                            </td>
                            <td style="border: 1px solid black; padding: 4px; text-align: right;">
                              ${invoice.invoiceTaxInfo.amount}
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" style="border: 1px solid black; padding: 4px; text-align: right; font-weight: bold; padding-right: 10px;">
                              Total
                            </td>
                            <td style="border: 1px solid black; padding: 4px; text-align: right;">
                              ${invoice.invoiceTaxInfo.totalAmount}
                            </td>
                          </tr>
                          ${JSON.parse(invoice.invoiceTaxInfo.taxDetails)
      .map(
        (tax) => `
                                <tr>
                                  <td colspan="2" style="border: 1px solid black; padding: 4px; text-align: right; font-weight: bold; padding-right: 10px;">
                                    ${tax.taxFieldName} @ ${tax.taxPercentage}%
                                  </td>
                                  <td style="border: 1px solid black; padding: 4px; text-align: right;">
                                    ${tax.calculatedAmount}
                                  </td>
                                </tr>
                                `
      )
      .join("")}
                          <tr>
                            <td colspan="2" style="border: 1px solid black; padding: 4px; text-align: right; font-weight: bold; padding-right: 10px;">
                              Total Amount After Tax
                            </td>
                            <td style="border: 1px solid black; padding: 4px; text-align: right; font-weight: 600;">
                              ${invoice.invoiceTaxInfo.finalAmount}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div style="border: 1px solid black; padding: 4px; font-size: 12px;">
                      <span style="font-weight: 600;">${convertAmountToWords(invoice.invoiceTaxInfo.finalAmount, invoice.currency)}</span>
                    </div>
                  </div>

                </div>

                <div style="display: flex; justify-content: flex-end; border: 1px solid black; padding: 4px;">
                  <div style="text-align: center;">
                    <div style="margin-bottom: 3rem;"></div>
                    ${invoice.companyInfo.digitalSignPath ? `
                      <img src="http://localhost:5000/${invoice.companyInfo.digitalSignPath}" alt="Polestar" style="height: 30px; width: 100px; margin-bottom: 0px; margin-left: 10px;" />
                    ` : ''}                    
                    <div style="font-weight: 600; font-size: 14px;">Authorised Signatory</div>
                  </div>
                </div>

<div style="border: 1px solid black; font-size: 0.875rem; padding: 4px;">
  <div style="font-weight: 600;">Terms & Conditions:</div>
  <ol style="margin-bottom: 0px; padding-left: 16px;">
    <li style="margin-bottom: 0.25rem;">
      This bill is payable on receipt by Cheque/Wire transfer in favor of Polestar Solutions & Services India Pvt. Ltd. In case payment is made by electronic fund transfer, please send details to 
      <a href="mailto:ajay@polestarllp.com" target="_blank" rel="noopener noreferrer">ajay@polestarllp.com</a>.
    </li>
    <li style="margin-bottom: 0.25rem;">TDS certificate, if applicable is to be sent to the above address.</li>
    <li style="margin-bottom: 0.25rem;">Whether GST is payable on Reverse Charge basis? - No</li>
  </ol>
</div>


<div>
  <div style="font-weight: 600; display: flex; justify-content: space-around; border: 1px solid black; padding: 4px;">Bank Details :</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr;">
    <div style="display: flex; flex-direction: column; border: 1px solid black; padding: 4px;">
      <div><span style="font-weight: bold; flex: 1;">Beneficiary Name : </span><span>${invoice.company_name}</span></div>
      <div><span style="font-weight: bold; flex: 1;">Bank Name : </span><span>${invoice.companyAccountInfo.bankName}</span></div>
      <div><span style="font-weight: bold; flex: 1;">Bank Address : </span><span>${invoice.companyAccountInfo.bankAddress}</span></div>
      <div><span style="font-weight: bold; flex: 1;">Account No. : </span><span>${invoice.companyAccountInfo.accountNumber}</span></div>
    </div>
    <div style="display: flex; flex-direction: column; border: 1px solid black; padding: 4px;">
      <div><span style="font-weight: bold; flex: 1;">${invoice.companyAccountInfo.additionalDetailsHtml}</span></div>
    </div>
  </div>
</div>

              </div>
            </div>
          </div>
        </div>
      </body>
    </html>`


    ;

  // Set the content to the page
  await page.setContent(htmlContent);

  // Generate PDF from HTML content
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
  });

  console.log('PDF generated at:', pdfPath);

  await browser.close();
};


const generateTaxInvoicePDF = async (invoice_number) => {
  try {
    // Fetch invoice data
    const query = "SELECT * FROM invoice_info WHERE invoice_name = ?";
    const [invoiceData] = await db.execute(query, [invoice_number]);

    if (!invoiceData.length) {
      throw new Error("Invoice not found");
    }

    const invoice = invoiceData[0];

    // Company Info
    const companyQuery = "SELECT * FROM company_info WHERE companyName = ?";
    const [companyData] = await db.execute(companyQuery, [invoice.company_name]);
    invoice['companyInfo'] = companyData[0];

    // Company Location Info
    const companyLocationQuery = "SELECT * FROM company_location_info WHERE companyId = ? AND isDefaultAddress = 1";
    const [companyLocationData] = await db.execute(companyLocationQuery, [companyData[0].id]);
    const additionalDetails = JSON.parse(companyLocationData[0].additionalAddressDetails || "{}");

    companyLocationData[0].additionalDetailsHtml = Object.entries(additionalDetails)
      .map(([key, value]) => `<span>${key}: ${value}</span>`)
      .join(", ");

    invoice['companyLocationInfo'] = companyLocationData[0];

    // Company Account Info
    const companyAccountQuery = "SELECT * FROM company_account_info WHERE companyId = ? AND isDefaultAccount = 1";
    const [companyAccountData] = await db.execute(companyAccountQuery, [companyData[0].id]);

    const accountDetails = companyAccountData[0]?.additionalFieldDetails || {};
    companyAccountData[0].additionalDetailsHtml = Object.entries(accountDetails)
      .map(([key, value]) => `<span>${key}: ${value}</span><br />`)
      .join("");

    invoice['companyAccountInfo'] = companyAccountData[0];

    // Client Contact Info
    if (invoice.clientContact) {
      const clientContactQuery = "SELECT * FROM client_contact WHERE id = ?";
      const [clientContactData] = await db.execute(clientContactQuery, [invoice.clientContact]);
      invoice['clientContactInfo'] = clientContactData[0];
    } else {
      invoice['clientContactInfo'] = {};
    }

    // Tax Details Info
    const invoiceTaxQuery = "SELECT * FROM invoice_data WHERE invoice_id = ?";
    const [invoiceTaxData] = await db.execute(invoiceTaxQuery, [invoice.id]);
    invoiceTaxData[0].taxDetails = invoiceTaxData[0].taxBreakdown;
    invoice['invoiceTaxInfo'] = invoiceTaxData[0];

    // Create Directory
    const dirPath = path.join(__dirname, '..', 'models', 'taxinvoices');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Define file path and public URL
    const fileName = `${invoice_number}.pdf`;
    const pdfPath = path.join(dirPath, fileName);
    const relativePDFUrl = `/taxinvoices/${fileName}`;

    // Generate PDF
    await createTaxInvoicePDF(invoice, pdfPath);

    // Update DB with PDF path
    const updatePDFQuery = "UPDATE invoice_info SET pdf_path = ? WHERE invoice_name = ?";
    await db.execute(updatePDFQuery, [relativePDFUrl, invoice_number]);

    // ✅ Return response
    return {
      statusCode: 201,
      message: "Tax Invoice PDF generated successfully",
      pdfPath: relativePDFUrl
    };

  } catch (err) {
    console.error("Error generating Tax Invoice PDF:", err);
    throw err;
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

  // currency services
  createCurrency,
  updateCurrency,
  activateOrDeactivateCurrency,
  getAllCurrencies,
  getCurrencyHistory,

  //  Tax services
  createTax,
  updateTax,
  activateOrDeactivateTax,
  getAllTaxes,

  // client type
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
  getAllInvoices,
  insertCreditNote,
  updateCreditNote,
  activateDeactivateCreditNote,
  getAllCreditNote,
  generateInvoicePDF,
  getInvoicePDFPath,
  generateCreditNotePDF,
  generateTaxInvoicePDF
};
