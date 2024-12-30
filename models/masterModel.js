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
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
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
      countryId,
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
      updatedBy,
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
    throw new Error("Error updating state details");
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
      updatedBy,
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
      regionId,
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
  countryId,
  companyName,
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
       countryId, companyName, Website, Email, logopath, description, companyAddtionalFields, isactive, updated_by, 
        independent, parentCompanyId, digitalSignPath, updated_at
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      countryId,
      companyName,
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
    throw new Error("Error creating company");
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

    throw new Error("Company not found");
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching company details");
  }
};

const updateCompanyDetails = async (
  countryId,
  companyId,
  companyName,
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
    throw new Error("Error updating company details");
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
    throw new Error("Error activating/deactivating company");
  }
};

const getCompanies = async () => {
  try {
    // Define the base query to fetch all company details, including parent company info and country name
    const query = `
      SELECT 
        company_info.*, 
        parent_company.companyName AS parentCompanyName,
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
        company_info.countryId = country_info.id`;

    // Execute the query with no additional filtering
    const [companies] = await db.execute(query);
    return companies;
  } catch (err) {
    console.error("Error retrieving companies list:", err);
    throw new Error("Error retrieving companies list");
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
    throw new Error("Error inserting company location");
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
    throw new Error("Error updating company location details");
  }
};

const getLocations = async (companyId = null) => {
  try {
    let query = `
      SELECT 
        company_location_info.*, 
        country_info.name AS countryName,
        state_info.stateName AS stateName,
        company_info.companyName  -- Include the company name here
      FROM 
        company_location_info
      LEFT JOIN 
        country_info ON company_location_info.countryId = country_info.id
      LEFT JOIN 
        state_info ON company_location_info.stateId = state_info.id
      LEFT JOIN 
        company_info ON company_location_info.companyId = company_info.id  -- Join with company_info table
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
    throw new Error("Error retrieving company locations list");
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
    throw new Error("Error activating/deactivating company location");
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
    throw new Error("Error inserting bank account type");
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
    throw new Error("Error updating bank account type details");
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
    throw new Error("Error activating/deactivating bank account type");
  }
};

const getBankAccountTypesList = async (countryId = null) => {
  try {
    let query = `
      SELECT 
        bank_account_type_info.*, 
        country_info.name AS countryName
      FROM 
        bank_account_type_info
      LEFT JOIN 
        country_info ON bank_account_type_info.countryId = country_info.id
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
    throw new Error("Error retrieving bank account types list");
  }
};

// Company Account Master
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
    throw new Error("Error inserting company account");
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
    throw new Error("Error updating company account details");
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
    throw new Error("Error activating/deactivating company account");
  }
};

const getCompanyAccountsList = async (companyId = null) => {
  try {
    let query = `
      SELECT 
        company_account_info.*, 
        company_info.companyName,
        bank_account_type_info.accountTypeName,
        country_info.name AS countryName
      FROM 
        company_account_info
      LEFT JOIN 
        company_info ON company_account_info.companyId = company_info.id
      LEFT JOIN 
        bank_account_type_info ON company_account_info.bankAccountTypeId = bank_account_type_info.id
      LEFT JOIN 
        country_info ON company_account_info.countryId = country_info.id
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
    throw new Error("Error retrieving company accounts list");
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
    throw new Error("Error inserting production type");
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
    throw new Error("Error updating production type details");
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
    throw new Error("Error updating production type status");
  }
};

const getProductionTypesList = async () => {
  try {
    const query = `SELECT * FROM production_type_info`;
    const [productionTypes] = await db.execute(query);
    return productionTypes;
  } catch (err) {
    console.error("Error retrieving production types:", err);
    throw new Error("Error retrieving production types list");
  }
};

// Industry Master
const insertIndustryMaster = async (
  industryName,
  productionTypeId,
  updatedBy,
  isActive
) => {
  try {
    const query = `
      INSERT INTO industry_master_info 
      (industryName, productionTypeId, updated_by, isActive, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.execute(query, [
      industryName,
      productionTypeId,
      updatedBy,
      isActive,
    ]);

    return result;
  } catch (err) {
    console.error("Error inserting industry master:", err);
    throw new Error("Error inserting industry master");
  }
};

const updateIndustryMasterDetails = async (
  industryMasterId,
  industryName,
  productionTypeId,
  updatedBy,
  isActive
) => {
  try {
    const query = `
      UPDATE industry_master_info
      SET 
        industryName = ?, 
        productionTypeId = ?, 
        updated_by = ?, 
        isActive = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      industryName,
      productionTypeId,
      updatedBy,
      isActive,
      industryMasterId,
    ]);

    return result;
  } catch (err) {
    console.error("Error updating industry master:", err);
    throw new Error("Error updating industry master details");
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
    throw new Error("Error updating industry master status");
  }
};

const getIndustryMastersList = async () => {
  try {
    const query = `
      SELECT industry_master_info.*, 
             production_type_info.productionTypeName
      FROM industry_master_info
      LEFT JOIN production_type_info 
      ON industry_master_info.productionTypeId = production_type_info.id
    `;
    const [industryMasters] = await db.execute(query);
    return industryMasters;
  } catch (err) {
    console.error("Error retrieving industry masters:", err);
    throw new Error("Error retrieving industry masters");
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
    throw new Error("Error inserting group industry");
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
    throw new Error("Error updating group industry");
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
    throw new Error("Error updating Group Industry status");
  }
};

const getGroupIndustriesList = async () => {
  try {
    const query = `
      SELECT group_industry_info.*, 
             (SELECT GROUP_CONCAT(industry_master_info.industryName) 
              FROM industry_master_info 
              WHERE FIND_IN_SET(industry_master_info.id, group_industry_info.industryIds)) AS industryNames
      FROM group_industry_info
    `;

    const [groupIndustries] = await db.execute(query);
    return groupIndustries;
  } catch (err) {
    console.error("Error retrieving Group Industries:", err);
    throw new Error("Error retrieving Group Industries");
  }
};

// Industry Head Master
const insertIndustryHead = async (
  industryHeadName,
  industryIds,
  isRegionWise,
  countryId,
  regionId,
  stateId,
  startDate,
  endDate,
  updatedBy,
  isActive
) => {
  try {
    const query = `
      INSERT INTO industry_head_master 
      (industryHeadName, industryIds, isRegionWise, countryId, regionId, stateId, startDate, endDate, updated_by, isActive, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    await db.execute(query, [
      industryHeadName,
      industryIds,
      isRegionWise,
      isRegionWise ? countryId : null,
      isRegionWise ? regionId : null,
      !isRegionWise ? stateId : null,
      startDate,
      endDate,
      updatedBy,
      isActive,
    ]);
  } catch (err) {
    console.error("Error inserting industry head:", err);
    throw new Error("Error inserting industry head");
  }
};

const updateIndustryHeadDetails = async (
  industryHeadId,
  industryHeadName,
  industryIds,
  isRegionWise,
  countryId,
  regionId,
  stateId,
  startDate,
  endDate,
  updatedBy,
  isActive
) => {
  try {
    const query = `
      UPDATE industry_head_master
      SET industryHeadName = ?, industryIds = ?, isRegionWise = ?, countryId = ?, regionId = ?, stateId = ?, startDate = ?, endDate = ?, updated_by = ?, isActive = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await db.execute(query, [
      industryHeadName,
      industryIds,
      isRegionWise,
      isRegionWise ? countryId : null,
      isRegionWise ? regionId : null,
      !isRegionWise ? stateId : null,
      startDate,
      endDate,
      updatedBy,
      isActive,
      industryHeadId,
    ]);
  } catch (err) {
    console.error("Error updating industry head:", err);
    throw new Error("Error updating industry head");
  }
};

const updateIndustryHeadStatus = async (
  industryHeadId,
  isActive,
  updatedBy
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
    throw new Error("Error updating Industry Head status");
  }
};

const getIndustryHeadsList = async () => {
  try {
    const query = `
      SELECT industry_head_master.*, 
             (SELECT GROUP_CONCAT(industry_master_info.industryName) 
              FROM industry_master_info 
              WHERE FIND_IN_SET(industry_master_info.id, industry_head_master.industryIds)) AS industryNames
      FROM industry_head_master
    `;

    const [industryHeads] = await db.execute(query);
    return industryHeads;
  } catch (err) {
    console.error("Error retrieving Industry Heads:", err);
    throw new Error("Error retrieving Industry Heads");
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
};
