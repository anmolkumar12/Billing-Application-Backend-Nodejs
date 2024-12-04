const { createCompany,updateCompanyDetails } = require("../models/masterModel");

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
      logopath
    );
    res.status(201).json({ message: "Company created successfully" });
  } catch (err) {
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

module.exports = {
  addCompany,
  updateCompany,
  activateDeactivateCompany,
};
