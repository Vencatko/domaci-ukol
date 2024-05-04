const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const companyFolderPath = path.join(__dirname, "storage", "companyList");

// Method to read an company from a file
function get(companyId) {
  try {
    const filePath = path.join(companyFolderPath, `${companyId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadCompany", message: error.message };
  }
}

// Method to write an company to a file
function create(company) {
  try {
    company.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(companyFolderPath, `${company.id}.json`);
    const fileData = JSON.stringify(company);
    fs.writeFileSync(filePath, fileData, "utf8");
    return company;
  } catch (error) {
    throw { code: "failedToCreateCompany", message: error.message };
  }
}

// Method to update company in a file
function update(company) {
  try {
    const currentCompany = get(company.id);
    if (!currentCompany) return null;
    const newCompany = { ...currentCompany, ...company };
    const filePath = path.join(companyFolderPath, `${company.id}.json`);
    const fileData = JSON.stringify(newCompany);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newCompany;
  } catch (error) {
    throw { code: "failedToUpdateCompany", message: error.message };
  }
}

// Method to remove an company from a file
function remove(companyId) {
  try {
    const filePath = path.join(companyFolderPath, `${companyId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveCompany", message: error.message };
  }
}

// Method to list companys in a folder
function list() {
  try {
    const files = fs.readdirSync(companyFolderPath);
    const companyList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(companyFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return companyList;
  } catch (error) {
    throw { code: "failedToListCompanys", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
