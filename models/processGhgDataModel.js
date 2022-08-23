const mongoose = require('mongoose');
const processGhgDataSchema = require('../schema/processGhgDataSchema');

const ProcessedDataModel = mongoose.model('processedData', processGhgDataSchema,'processed_data');
 
module.exports = ProcessedDataModel;