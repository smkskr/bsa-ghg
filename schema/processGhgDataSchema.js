const mongoose = require('mongoose');
const YearsSchema = require('./yearsSchema');
const Schema = mongoose.Schema;


const processGhgDataSchema = new Schema({
    countryId:String,
    country: String,
    years:[YearsSchema]
 });
 
 module.exports = processGhgDataSchema;

