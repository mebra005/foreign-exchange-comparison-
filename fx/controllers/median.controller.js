var RefCompanyService = require('../services/RefCompany.service')
var math = require('mathjs');

_this = this
var rateList = [];


exports.getMedian = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    try {
        var refCompanies = await RefCompanyService.getRefCompanies({}, page, limit)

        for (i = 0; i < refCompanies.docs.length; i++) {
            rateList.push(refCompanies.docs[i].rate);
        }

        var median = math.median(rateList);


        return res.status(200).json({ status: 200, data: median, message: "Succesfully Calculate Median rate" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.getRefCompanies = async function(req, res, next){
    
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        console.log(page, limit)
    
        try{
            var refCompanies = await RefCompanyService.getRefCompanies({}, page, limit)
            return res.status(200).json({status: 200, data: refCompanies, message: "Succesfully reference companies received"});
        }catch(e){
            return res.status(400).json({status: 400, message: e.message});
        }
    }


/*
        rateList.sort((a, b) => a - b);
        var lowMiddle = Math.floor((rateList.length - 1) / 2);
        var highMiddle = Math.ceil((rateList.length - 1) / 2);
        var median = (rateList[lowMiddle] + rateList[highMiddle]) / 2;
*/