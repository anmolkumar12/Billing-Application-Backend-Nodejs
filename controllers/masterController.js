const {
  createCompany,
  updateCompanyDetails,
  getCompanies,
  createIndustry,
  updateIndustryDetails,
  toggleIndustryActiveStatusDetails,
  getIndustryListDetails
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
    res.status(201).json({ message: "Company created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCompany = async (req, res) => {
  const {
    companyId, // The company to be updated
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
    // Pass the companyId, updatedBy, and other fields to the updateCompany function
    await updateCompanyDetails(
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
    res.status(200).json({ message: "Company updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const activateDeactivateCompany = async (req, res) => {
  const { companyId, isActive, updatedBy } = req.body; // `isActive` will be a boolean or 0/1

  try {
    // Call the model function to activate or deactivate the company
    await activateDeactivateCompanyDetails(companyId, isActive, updatedBy);
    res.status(200).json({
      message: `Company ${isActive ? "activated" : "deactivated"} successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getCompaniesList = async (req, res) => {
  try {
    const companies = await getCompanies();
    res.status(200).json({ companies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Industry Master
const addIndustry = async (req, res) => {
  const { industryName, description, industryHead, updatedBy } = req.body; // Added updatedBy

  try {
    await createIndustry(industryName, description, industryHead, updatedBy);
    res.status(201).json({ message: "Industry added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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
    res.status(200).json({ message: "Industry updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const toggleIndustryActiveStatus = async (req, res) => {
  const { industryId, isActive, updatedBy } = req.body; // `industryId` and `updatedBy` are required

  try {
    // Call the model function to activate or deactivate the industry, including updatedBy
    await toggleIndustryActiveStatusDetails(industryId, isActive, updatedBy);
    res.status(200).json({
      message: `Industry ${
        isActive ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getIndustryList = async (req, res) => {
  try {
    // Call the model function to fetch the list of industries
    const industries = await getIndustryListDetails();
    res.status(200).json({ industries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addCompany,
  updateCompany,
  activateDeactivateCompany,
  getCompaniesList,
  addIndustry,
  updateIndustry,
  toggleIndustryActiveStatus,
  getIndustryList
};
