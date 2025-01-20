const db = require("../config/db");

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
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?)
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
      fromDate, // Pass fromDate as a parameter
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
      fromDate ?? null, // Include fromDate in the update
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
        fromDate = ?
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
  digitalSignPath
) => {
  try {
    const query = `
      INSERT INTO company_info (
        countryId, companyName, companyCode, Website, Email, logopath, description, companyAddtionalFields, isactive, 
        updated_by, independent, parentCompanyId, digitalSignPath, updated_at
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
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

// Compnay location master
const insertCompanyLocation = async (
  companyId,
  countryId,
  stateId,
  address1,
  address2,
  address3,
  additionalAddressDetails,
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO company_location_info (companyId, countryId, stateId, address1, address2, address3, additionalAddressDetails, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      companyId,
      countryId,
      stateId,
      address1,
      address2,
      address3,
      additionalAddressDetails,
      updatedBy,
    ]);

    return result;
  } catch (err) {
    console.log("Error inserting company location:", err);
    throw err;
  }
};

const updateLocationDetails = async (
  locationId,
  companyId,
  countryId,
  stateId,
  address1,
  address2,
  address3,
  additionalAddressDetails,
  updatedBy
) => {
  try {
    const sanitizedValues = [
      companyId ?? null,
      countryId ?? null,
      stateId ?? null,
      address1 ?? null,
      address2 ?? null,
      address3 ?? null,
      additionalAddressDetails ?? null,
      updatedBy ?? null,
      locationId,
    ];

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
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, sanitizedValues);
    return result;
  } catch (err) {
    console.log("Error updating company location:", err);
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

const activateDeactivateLocation = async (locationId, isActive, updatedBy) => {
  try {
    const query = `
      UPDATE company_location_info
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive, // 1 for active, 0 for inactive
      updatedBy ?? null, // Updated by user, default to null if not provided
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
      subIndustryCategory,
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
      subIndustryCategory,
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

    // Convert regionIds and stateIds to arrays for comparison
    const regionIdArray = regionIds ? String(regionIds).split(",").map(id => id.trim()) : [];
    const stateIdArray = stateIds ? String(stateIds).split(",").map(id => id.trim()) : [];
    console.log('regionIdArray', regionIdArray, stateIdArray);

    // Check for existing regionIds
    if (isRegionWise && regionIdArray.length > 0) {
      const [existingRegions] = await db.execute(
        `SELECT regionIds, industryHeadName, r.id AS regionId, r.regionName
        FROM industry_head_master 
        JOIN region_info r ON FIND_IN_SET(r.id, industry_head_master.regionIds)
        WHERE isRegionWise = 1 
        AND companyId = ?`,
        [companyId]
      );

      console.log('overlapRegions111---->>>>>', [existingRegions]);
      for (const record of existingRegions) {
        const existingRegionIds = record.regionIds ? record.regionIds.split(",").map(id => id.trim()) : [];
        const overlapRegions = regionIdArray.filter(id => existingRegionIds.includes(id));


        if (overlapRegions.length > 0) {
          return { status: 'existing', conflictMessage: `Region ${record.regionName} already allocated to ${record.industryHeadName}` }
        }
      }
    }

    // Check for existing stateIds
    if (!isRegionWise && stateIdArray.length > 0) {
      const [existingStates] = await db.execute(
        `SELECT stateIds, industryHeadName FROM industry_head_master WHERE isRegionWise = 0 AND companyId = ?`,
        [companyId]
      );

      for (const record of existingStates) {
        const existingStateIds = record.stateIds ? record.stateIds.split(",").map(id => id.trim()) : [];
        const overlapStates = stateIdArray.filter(id => existingStateIds.includes(id));
        console.log('overlapStates', overlapStates);

        if (overlapStates.length > 0) {
          return { status: 'existing', conflictMessage: `State ID(s) ${overlapStates.join(", ")} already allocated to ${record.industryHeadName}` }
        }
      }
    }

    const query = `
      INSERT INTO industry_head_master 
      (companyId, industryHeadName, industryIds, isRegionWise, countryIds, regionIds, stateIds, startDate, endDate, updated_by, isActive, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    await db.execute(query, [
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
    ]);
  } catch (err) {
    console.error("Error inserting industry head:", err);
    throw err;
  }
};

const updateIndustryHeadDetails = async (
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
    const query = `
      UPDATE industry_head_master
      SET companyId = ?, industryHeadName = ?, industryIds = ?, isRegionWise = ?, countryIds = ?, regionIds = ?, stateIds = ?, startDate = ?, endDate = ?, updated_by = ?, isActive = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await db.execute(query, [
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
  } catch (err) {
    console.error("Error updating industry head:", err);
    throw err;
  }
};

const updateIndustryHeadStatus = async (
  industryHeadId,
  isActive,
  updatedBy,
) => {
  try {
    const query = `
      UPDATE industry_head_master
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      isActive,
      updatedBy,
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
             (SELECT GROUP_CONCAT(industry_master_info.industryName) 
              FROM industry_master_info 
              WHERE FIND_IN_SET(industry_master_info.id, industry_head_master.industryIds)) AS industryNames,
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

const updateSalesManagerStatus = async (
  salesManagerId,
  isActive,
  updatedBy,
  deactivationDate
) => {
  try {
    const query = `
      UPDATE sales_manager_master
      SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP,deactivationDate = ?
      WHERE id = ?
    `;

    await db.execute(query, [isActive, updatedBy,deactivationDate, salesManagerId]);
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

const activateOrDeactivateAccountManager = async (id, isActive, updatedBy,deactivationDate) => {
  try {
    const query = `
            UPDATE account_manager_master
            SET isActive = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP,deactivationDate = ?
            WHERE id = ?
        `;
    await db.execute(query, [isActive, updatedBy,deactivationDate, id]);
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

    const existingOverlaps = await checkRegionHeadOverlap(regionId, companyId);
    console.log('ooooooooo', existingOverlaps);

    if (existingOverlaps) {
      const conflictMessage = existingOverlaps.map((conflict) => `Region ${conflict.regionName} is already assigned to ${conflict.regionHeadName}`).join(", ");
      return {
        status: "existing",
        conflictMessage: conflictMessage,
      };
    }

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
    const conflictQuery = `
        SELECT rhi.regionHeadName, r.regionName
        FROM region_head_info rhi
        JOIN region_info r ON FIND_IN_SET(r.id, rhi.regionId)
        WHERE rhi.companyId = ? 
          AND rhi.id != ? 
          AND (
            ${regionId.split(',').map(() => "FIND_IN_SET(?, rhi.regionId)").join(" OR ")}
          )
      `;

    const regionIdArray = regionId.split(',').map(id => id.trim());
    const conflictValues = [companyId, regionHeadId, ...regionIdArray];

    const [conflictRows] = await db.execute(conflictQuery, conflictValues);
    const conflictingRegions = conflictRows
      .map(row => `Region ${row.regionName} is already assigned to ${row.regionHeadName}`)
      .join(", ");
    console.log('conflictRows', conflictingRegions);
    if (conflictRows.length > 0) {
      return { status: 'existing', conflictMessage: conflictingRegions }
      // res.status(400).json({
      //   statusCode: 400,
      //   message: `Region already assigned to ${conflictRows[0].regionHeadName}`,
      // });
    }
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

const createTax = async (countryCode, taxType, taxFieldName, taxPercentage, updatedBy) => {
  try {
    const query = `
      INSERT INTO tax_master (countryCode, taxType, taxFieldName, taxPercentage, updated_by, created_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await db.execute(query, [
      countryCode,
      taxType,
      taxFieldName,
      taxPercentage,
      updatedBy,
    ]);
    return result;
  } catch (err) {
    console.log("Error inserting Tax:", err);
    throw new Error("Error inserting Tax");
  }
};

const updateTax = async (id, countryCode, taxType, taxFieldName, taxPercentage, updatedBy) => {
  try {
    const query = `
      UPDATE tax_master
      SET 
        countryCode = ?, 
        taxType = ?, 
        taxFieldName = ?, 
        taxPercentage = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      countryCode,
      taxType,
      taxFieldName,
      taxPercentage,
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
        IndustryGroupId, IndustrySubGroupId, salesMangerId, accountManagerId, msa_start_date, 
        msa_end_date, msa_flag, nda_flag, non_solicitation_clause_flag, 
        use_logo_permission_flag, msaFilePath, ndaFilePath, msa_document_id, updated_by, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
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
      msa_start_date ?? null,
      msa_end_date ?? null,
      msa_flag ?? null,
      nda_flag ?? null,
      non_solicitation_clause_flag ?? null,
      use_logo_permission_flag ?? null,
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
  try {
    const query = `
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

    const [result] = await db.execute(query, [
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
      msaFilePath,
      ndaFilePath,
      updated_by,
      clientId,
    ]);

    return result;
  } catch (err) {
    console.error("Error updating client:", err);
    throw err;
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
              WHERE FIND_IN_SET(industry_master_info.id, client_info.IndustryGroupId)) AS industryGroupNames,
        (SELECT GROUP_CONCAT(industry_master_info.subIndustryCategory) 
              FROM industry_master_info 
              WHERE FIND_IN_SET(industry_master_info.id, client_info.IndustrySubGroupId)) AS industrySubGroupNames,
        (SELECT GROUP_CONCAT(industry_head_master.industryHeadName) 
              FROM industry_head_master 
              WHERE FIND_IN_SET(industry_head_master.id, client_info.IndustryHeadId)) AS industryHeadName,
        (SELECT GROUP_CONCAT(group_industry_info.groupIndustryName) 
              FROM group_industry_info 
              WHERE FIND_IN_SET(group_industry_info.id, client_info.industryId)) AS industryName,
        (SELECT GROUP_CONCAT(country_info.name) 
              FROM country_info 
              WHERE FIND_IN_SET(country_info.id, client_info.countryId)) AS countryName,
        (SELECT GROUP_CONCAT(account_manager_master.name) 
              FROM account_manager_master 
              WHERE FIND_IN_SET(account_manager_master.id, client_info.accountManagerId)) AS accountManagerNames
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
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO client_bill_to_info 
      (clientId, countryId, address1, address2, address3, additionalAddressDetails, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      clientId,
      countryId,
      address1,
      address2,
      address3,
      JSON.stringify(additionalAddressDetails),
      updatedBy,
    ]);

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
  address1,
  address2,
  address3,
  additionalAddressDetails,
  updatedBy
) => {
  try {
    const query = `
      UPDATE client_bill_to_info
      SET 
        clientId = ?, 
        address1 = ?, 
        address2 = ?, 
        address3 = ?, 
        additionalAddressDetails = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      clientId,
      address1,
      address2,
      address3,
      JSON.stringify(additionalAddressDetails),
      updatedBy,
      id,
    ]);

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
  updatedBy
) => {
  try {
    const query = `
      INSERT INTO client_ship_to_info 
      (clientId, countryId, address1, address2, address3, additionalAddressDetails, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      clientId,
      countryId,
      address1,
      address2,
      address3,
      JSON.stringify(additionalAddressDetails),
      updatedBy,
    ]);

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
  address1,
  address2,
  address3,
  additionalAddressDetails,
  updatedBy
) => {
  try {
    const query = `
      UPDATE client_ship_to_info
      SET 
        clientId = ?, 
        address1 = ?, 
        address2 = ?, 
        address3 = ?, 
        additionalAddressDetails = ?, 
        updated_by = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      clientId,
      address1,
      address2,
      address3,
      JSON.stringify(additionalAddressDetails),
      updatedBy,
      id,
    ]);

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

  updateClientMSA
};
