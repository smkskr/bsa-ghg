const mongoose = require('mongoose');
const ghgDataSchema = require('../schema/GHGDataSchema');

 
const GHGDataModel = mongoose.model('ghgData', ghgDataSchema,'ghg_data');
 
module.exports = GHGDataModel;