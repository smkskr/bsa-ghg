const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const elementsSchema = new Schema({
    name:{
        type: String
    },
    value:{
        type: Number
    }
 });
 
 module.exports = elementsSchema;