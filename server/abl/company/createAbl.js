const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const companyDao = require("../../dao/company-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
  },
  required: ["name", "email"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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
    const emailExists = companyList.some((u) => u.email === company.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Company with email ${company.email} already exists`,
      });
      return;
    }

    company = companyDao.create(company);
    res.json(company);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
