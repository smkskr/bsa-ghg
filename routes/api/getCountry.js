const ProcessGhgDataModel = require('../../models/processGhgDataModel');


async function getCountry(req,res){

  
    try{

      if(isNaN(req.params.id))return res.status(400).send("Country ID must be a number");
      if(!req.query.hasOwnProperty('startYear') || req.query.startYear.length == 0 || req.query.startYear == null || req.query.startYear == undefined){
        return res.status(400).send("Start Year cannot be null or empty");
      }
      if(req.query.startYear > req.query.endYear)return res.status(400).send("Start Year cannot be greater than End Year");
      
        const startYear = req.query.startYear;
        const endYear = req.query.endYear == null ? req.query.endYear = (new Date().getFullYear()).toString() : req.query.endYear;
        
        const aggregateQuery = [
          {
            '$match': {
              'countryId': req.params.id
            }
          }, {
            '$addFields': {
              'years': {
                '$filter': {
                  'input': '$years', 
                  'cond': {
                    '$and': [
                      {
                        '$gte': [
                          '$$year.year', startYear
                        ]
                      }, {
                        '$lte': [
                          '$$year.year', endYear
                        ]
                      }
                    ]
                  }, 
                  'as': 'year'
                }
              }
            }
          }];

        const conditions = [];
        if(req.query.elements != undefined){
            const elements = req.query.elements.split(",");
          elements.forEach(element => {
            conditions.push({'$eq': ['$$elements.name',element]})
          });
          
          aggregateQuery.push({
          '$addFields': {
            'years': {
              '$map': {
                'input': '$years', 
                'as': 'years', 
                'in': {
                  'year': '$$years.year', 
                  'elements': {
                    '$filter': {
                      'input': '$$years.elements', 
                      'as': 'elements', 
                      'cond': {'$or': conditions}
                      }
                    }
                  }
                }
              }
            }
          });
        }
        
        
        
        
        const processGhgData = await ProcessGhgDataModel.aggregate(aggregateQuery);    
        if(processGhgData.length > 0){
            res.status(200).send(processGhgData);
        }else{
            res.status(200).send("No data found!");
        }
        
      
    }catch (err) {
        handleError(err);
        res.status(500).send(err.message);
    }
}
function handleError(err){
    console.error(err);
    }

module.exports = getCountry;