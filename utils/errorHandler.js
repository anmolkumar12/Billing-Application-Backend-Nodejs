// utils/errorHandler.js
const errorHandler = (apiType, err) => {
    let statusCode = 500;
    let message = "An unexpected error occurred.";
  
    switch (apiType) {
      case "country":
        if (err.code === "ER_DUP_ENTRY") {
          if (err.sqlMessage.includes("code_UNIQUE")) {
            message = "Duplicate entry: A country with this code already exists.";
          } else if (err.sqlMessage.includes("name_UNIQUE")) {
            message = "Duplicate entry: A country with this name already exists.";
          }
          statusCode = 409;
        } else {
          message = err.message || "Error processing country data.";
        }
        break;
  
      case "state":
        if (err.code === "ER_DUP_ENTRY") {
          if (err.sqlMessage.includes("stateName_UNIQUE")) {
            message = "Duplicate entry: A state with this name already exists.";
          } else if (err.sqlMessage.includes("stateCode_UNIQUE")) {
            message = "Duplicate entry: A state with this code already exists.";
          }
          statusCode = 409;
        } else {
          message = err.message || "Error processing state data.";
        }
        break;
  
      case "region":
        if (err.code === "ER_DUP_ENTRY") {
            if (err.sqlMessage.includes("regionCode_UNIQUE")) {
                message = "Duplicate entry: A Region with this code already exists.";
              } 
              
              statusCode = 409;
        } else {
          message = err.message || "Error processing company data.";
        }
        break;

        case "company":
            if (err.code === "ER_DUP_ENTRY" && err.sqlMessage.includes("unique_company_name_country")) {
              message = "Duplicate entry: The combination of company name and country already exist ";
              statusCode = 409;
            } else {
              message = err.message || "Error processing region data.";
            }
            break;
  
      case "bankAccountType":
        if (err.code === "ER_DUP_ENTRY" && err.sqlMessage.includes("unique_account_type_country")) {
          message = "Duplicate entry: The combination of account type and country already exists.";
          statusCode = 409;
        } else {    
          message = err.message || "Error processing bank account type data.";
        }
        break;
  
      case "groupIndustry":
        if (err.code === "ER_DUP_ENTRY" && err.sqlMessage.includes("groupIndustryName_UNIQUE")) {
          message = "Duplicate entry: A group industry with this name already exists.";
          statusCode = 409;
        } else {
          message = err.message || "Error processing group industry data.";
        }
        break;
        case "subindustry":
            if (err.code === "ER_DUP_ENTRY" && err.sqlMessage.includes("industryName_UNIQUE")) {
              message = "Duplicate entry: A sub-group industry with this name already exists.";
              statusCode = 409;
            } else {
              message = err.message || "Error processing group industry data.";
            }
            break;
  
      case "technologyGroup":
        if (err.code === "ER_DUP_ENTRY" && err.sqlMessage.includes("name_UNIQUE")) {
          message = "Duplicate entry: A technology group with this name already exists.";
          statusCode = 409;
        } else {
          message = err.message || "Error processing technology group data.";
        }
        break;
  
      case "technologySubgroup":
        if (err.code === "ER_DUP_ENTRY" && err.sqlMessage.includes("unique_tech_group_name")) {
          message = "Duplicate entry: The combination of tech group and name already exists.";
          statusCode = 409;
        } else {
          message = err.message || "Error processing technology subgroup data.";
        }
        break;
  
      case "technologyName":
        if (err.code === "ER_DUP_ENTRY" && err.sqlMessage.includes("unique_tech_group_subgroup_name")) {
          message = "Duplicate entry: The combination of tech group, subgroup, and name already exists.";
          statusCode = 409;
        } else {
            console.log('err.message',err.message);
            console.log('err.sqlMessage',err.sqlMessage);
          message = err.message || "Error processing technology name data.";
        }
        break;
  
      case "oem":
        if (err.code === "ER_DUP_ENTRY" && err.sqlMessage.includes("unique_oem_product")) {
          message = "Duplicate entry: The combination of OEM and product name already exists.";
          statusCode = 409;
        } else {
          message = err.message || "Error processing OEM data.";
        }
        break;
  
      case "polestarProduct":
        if (err.code === "ER_DUP_ENTRY" && err.sqlMessage.includes("productName_UNIQUE")) {
          message = "Duplicate entry: A Polestar product with this name already exists.";
          statusCode = 409;
        } else {
          message = err.message || "Error processing Polestar product data.";
        }
        break;
  
      case "projectService":
        if (err.code === "ER_DUP_ENTRY" && err.sqlMessage.includes("name_UNIQUE")) {
          message = "Duplicate entry: A project service with this name already exists.";
          statusCode = 409;
        } else {
          message = err.message || "Error processing project service data.";
        }
        break;
  
      default:
        message = err.message || "Server error.";
        break;
    }
  
    return { statusCode, message };
  };
  
 module.exports = {
    errorHandler:errorHandler
 }
  