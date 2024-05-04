const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/company/getAbl");
const ListAbl = require("../abl/company/listAbl");
const CreateAbl = require("../abl/company/createAbl");
const UpdateAbl = require("../abl/company/updateAbl");
const DeleteAbl = require("../abl/company/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
