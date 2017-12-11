var RefCompanyService = require('../services/RefCompany.service')
var math = require('mathjs');

_this = this


exports.getMedian = async function (req, res, next) {

    var mxnRateList = [];
    var phpRateList = [];
    var highMxnRateList = [];
    var highPhpRateList = [];
    var lowMxnRateList = [];
    var lowPhpRateList = [];
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    try {
        var refCompanies = await RefCompanyService.getRefCompanies({}, page, limit)

        /**Median */
        for (i = 0; i < refCompanies.docs.length; i++) {
            mxnRateList.push(refCompanies.docs[i].currency.mxn);
            phpRateList.push(refCompanies.docs[i].currency.php);
        }


        mxnRateList.sort((a, b) => a - b);
        phpRateList.sort((a, b) => a - b);

        /*High Median*/
        /** MXN */
        if (mxnRateList.length % 2 != 0) { //odd
            var middle = (mxnRateList.length + 1) / 2;
            for (i = middle; i < mxnRateList.length; i++) {
                highMxnRateList.push(mxnRateList[i]);
            }
        } else { //even
            var middle = (mxnRateList.length / 2) + 1
            for (i = middle; i < mxnRateList.length; i++) {
                highMxnRateList.push(mxnRateList[i]);
            }
        }

        /**PHP */
        if (phpRateList.length % 2 != 0) { //odd
            var middle = (phpRateList.length + 1) / 2;
            for (i = middle; i < phpRateList.length; i++) {
                highPhpRateList.push(phpRateList[i]);
            }
        } else { //even
            var middle = (phpRateList.length / 2) + 1
            for (i = middle; i < phpRateList.length; i++) {
                highPhpRateList.push(phpRateList[i]);
            }
        }

        /*Low Median*/
        if (mxnRateList.length % 2 != 0) { //odd
            var middle = (mxnRateList.length) / 2;
            mxnRateList.sort((a, b) => a - b);
            for (i = 0; i < middle - 1; i++) {
                lowMxnRateList.push(mxnRateList[i]);
            }
        } else { //even
            var middle = (mxnRateList.length / 2) - 1
            for (i = 0; i < middle ; i++) {
                lowMxnRateList.push(mxnRateList[i]);
            }
        }

        if (phpRateList.length % 2 != 0) { //odd
            var middle = (phpRateList.length) / 2;
            for (i = 0; i < middle -1; i++) {
                lowPhpRateList.push(phpRateList[i]);
            }
        } else { //even
            var middle = (phpRateList.length / 2) - 1
            for (i = 0; i < middle; i++) {
                lowPhpRateList.push(phpRateList[i]);
            }
        }


        var median = {
            median: {
                mxn: math.median(mxnRateList),
                php: math.median(phpRateList)
            },
            lowMedian: {
                mxn: math.median(lowMxnRateList),
                php: math.median(lowPhpRateList)
            }, 
            highMedian: {
                mxn: math.median(highMxnRateList),
                php: math.median(highPhpRateList)
            }
        }


        return res.status(200).json({ status: 200, data: median, message: "Succesfully Calculate Median rate" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.getRefCompanies = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    try {
        var refCompanies = await RefCompanyService.getRefCompanies({}, page, limit)
        return res.status(200).json({ status: 200, data: refCompanies, message: "Succesfully reference companies received" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


/*
        rateList.sort((a, b) => a - b);
        var lowMiddle = Math.floor((rateList.length - 1) / 2);
        var highMiddle = Math.ceil((rateList.length - 1) / 2);
        var median = (rateList[lowMiddle] + rateList[highMiddle]) / 2;
*/