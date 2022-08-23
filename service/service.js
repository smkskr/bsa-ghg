
const createCountryIdMapService = require("./createCountryIdMapService");
const processGhgDataService = require("./processGhgDataService");

async function service(myCache){

    await createCountryIdMapService(myCache);
    processGhgDataService(myCache);

}

module.exports = service;