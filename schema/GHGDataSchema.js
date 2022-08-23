const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ghgDataSchema = new Schema({
    country_or_area:{
        type: String
    },
    year:{
        type: Number
    },
    value:{
        type: Number
    },
    category_shortcode:{
        type: String
    },
    category:{
        type: String
    }   
 });

 module.exports = ghgDataSchema;