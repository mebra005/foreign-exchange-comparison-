var RefCompanyService = require('../services/RefCompany.service')
var math = require('mathjs');
var MedianService = require('../services/median.service')
_this = this


exports.getMedian = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    try {
        var median = await MedianService.median();
        return res.status(200).json({ status: 200, data: median, message: "Succesfully Calculate Median rate" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
