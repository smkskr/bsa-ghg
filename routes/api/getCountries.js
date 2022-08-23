const ProcessedDataModel = require('../../models/processGhgDataModel');
const cache = require('../../utils/cache');

async function getCountries(req,res){

    if(cache.has('countries')){
        return res.status(200).send(cache.get('countries'));
    }
    try{

        const processGhgData = await ProcessedDataModel.find().exec();
        if(processGhgData.length > 0){
           cache.set('countries',JSON.stringify(processGhgData));
           res.status(200).send(processGhgData);
        }else{
            res.status(200).send("No data found");
        }
    }catch (err) {
        handleError(err);
        res.status(500).send(err.message);
    }
}
    
function handleError(err){
    console.error(err);
}

module.exports = getCountries;