const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const companyDao = require("../../dao/company-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let company = req.body;

    // validate input
    const valid = ajv.validate(schema, company);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const companyList = companyDao.list();
    const emailExists = companyList.some(
      (u) => u.email === company.email && u.id !== company.id
    );
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Company with email ${company.email} already exists`,
      });
      return;
    }

    const updatedCompany = companyDao.update(company);
    if (!updatedCompany) {
      res.status(404).json({
        code: "companyNotFound",
        message: `Company ${company.id} not found`,
      });
      return;
    }

    res.json(updatedCompany);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
