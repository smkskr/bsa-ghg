const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const countryIdMapSchema = new Schema({
   map:{
        type:Object
   }
 });
 
 const CountryIdMapModel = mongoose.model('countryIdMap', countryIdMapSchema,'country_id_map');
 
 module.exports = CountryIdMapModel;