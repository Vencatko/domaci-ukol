const Ajv = require("ajv");
const ajv = new Ajv();

const companyDao = require("../../dao/company-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read company by given id
    const company = companyDao.get(reqParams.id);
    if (!company) {
      res.status(404).json({
        code: "companyNotFound",
        message: `Company ${reqParams.id} not found`,
      });
      return;
    }

    res.json(company);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
