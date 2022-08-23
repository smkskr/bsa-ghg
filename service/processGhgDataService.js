const GHGDataModel = require('../models/ghgDataModel');
const ProcessedDataModel = require('../models/processGhgDataModel');
let ghgData;
let processGhgDataMap = new Map();
let body = new Array();

const processGhgDataService = (myCache) => {

    const countries = myCache.get("countryIdMap");
    getAllData(countries);
           
}


async function getAllData(countries) {

    try{
        const count = await ProcessedDataModel.countDocuments().exec();
        if(count > 0){
            console.log("Processed Data Already Present");
        }else{
            getGhgData(countries);
            console.log("Created Processed Data Collection")
        }
    }catch (err) {
        handleError(err);
    }
   
      
   }

   async function getGhgData(countries){

    try{
        ghgData =  await GHGDataModel.find().exec();
        if(ghgData.length > 0){
            processGhgData(ghgData,countries);
        }   
    }catch (err) {
        handleError(err);
    }
   
   }

  
   function processGhgData(data,countries){
    for(var index = 0;index < data.length;index++){
        var d = data[index];
        let elements,years, obj;
         
        //check whether key is present or not
        if(processGhgDataMap.has(d.country_or_area)){
            var countryObj = processGhgDataMap.get(d.country_or_area);
            var yearsArray = countryObj.years;
            let year = yearsArray.filter((years) => {
                return years.year === d.year;
            });
           
            var element = {
                "name":d.category_shortcode,
                "value":d.value
            }
            //if there is any year
            if(year.length > 0){
                year[0].elements.push(element);
            }else{
                yearsArray.push({
                    "year":d.year,
                    "elements":new Array(element)
                })
            }
        }else{
            elements = {
                "name":d.category_shortcode,
                "value":d.value
              }
           years = {
                "year":d.year,
                 "elements": new Array(elements)
            }
            obj = {
                "countryId":countries[d.country_or_area],
                "country":d.country_or_area,
                "years": new Array(years)
            }            
            processGhgDataMap.set(data[index].country_or_area, obj);
        }
          
        
        
       
    }
    processGhgDataMap.forEach(saveMapElementsToCollection);
    ProcessedDataModel.create(body);
   }


   
 
  function saveMapElementsToCollection(value, key, map){
    body.push(map.get(key));
  }
  
    function handleError(err){
    console.error(err);
    }

module.exports = processGhgDataService;
