const mongoose = require('mongoose');
const ElementsSchema = require('./elementsSchema');
const Schema = mongoose.Schema;


const yearsSchema = new Schema({
    year:{
        type: String
    },
    elements:[ElementsSchema]
 });
 
 module.exports = yearsSchema;