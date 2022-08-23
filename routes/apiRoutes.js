const express = require("express");
const router = express.Router();
const testServer = require("./api/testServer");
const ghgData = require("./api/ghgData");
const getCountries = require("./api/getCountries");
const getCountry = require("./api/getCountry");

router.get("/test",testServer)
router.get("/data",ghgData);
router.get("/countries",getCountries);
router.get("/country/:id/",getCountry);

module.exports = router;

