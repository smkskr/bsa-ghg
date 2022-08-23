const GHGDataModel = require('../../models/ghgDataModel');
const cache = require("../../utils/cache");

async function ghgData(req,res){

    if(cache.has('ghgData')){
        return res.status(200).send(cache.get('ghgData'));
    }else{
        try{
            const ghgData = await GHGDataModel.find().exec();
            if(ghgData.length > 0){
                cache.set('ghgData',ghgData);
                console.log("from api");
                res.status(200).send(ghgData);
            }else{
                res.status(200).send("No data found!");
            }
        }catch(err){
            handleError(err);
            res.status(500).send(err.message);
        }
    }
   
   
}

function handleError(err){
    console.error(err);
}

module.exports = ghgData;