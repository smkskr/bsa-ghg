const GHGDataModel = require('../models/ghgDataModel');


const countryIdMap = (countries) => {
    var result = {};
    for(var index = 0;index < countries.length;index++){
        result[countries[index]] = index + 1;
    }
    return result;
}


async function createCountryIdMapService(myCache){

    
    if(!myCache.has("countryIdMap")){
        try{
            const countries =  await GHGDataModel.find().distinct("country_or_area").exec();
            if(countries !== null || countries.length > 0){
                const countryMap = countryIdMap(countries);
                const success = myCache.set( "countryIdMap", countryMap);
                if(success == true)console.log("Saved in cache");
                else console.log("Cannot save in cache"); 
            } 
        }catch (err) {
            handleError(err);
        }
       
    }  
   
    function handleError(err){
        console.error(err);
    }
    
    
}

module.exports = createCountryIdMapService;
