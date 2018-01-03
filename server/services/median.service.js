var RefCompanyService = require('./RefCompany.service')
var math = require('mathjs');
var RefCompany = require('../models/refCompany.model')

_this = this


exports.median = async function (query, page, limit) {

    var mxnRateList = [];
    var phpRateList = [];
    var highMxnRateList = [];
    var highPhpRateList = [];
    var lowMxnRateList = [];
    var lowPhpRateList = [];

    var page = 1
    var limit = 10; 

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
        /** MXN */
        if (mxnRateList.length % 2 != 0) { //odd
            var middle = (mxnRateList.length) / 2;
            mxnRateList.sort((a, b) => a - b);
            for (i = 0; i < middle - 1; i++) {
                lowMxnRateList.push(mxnRateList[i]);
            }
        } else { //even
            var middle = (mxnRateList.length / 2) - 1
            for (i = 0; i < middle; i++) {
                lowMxnRateList.push(mxnRateList[i]);
            }
        }
        /**PHP */
        if (phpRateList.length % 2 != 0) { //odd
            var middle = (phpRateList.length) / 2;
            for (i = 0; i < middle - 1; i++) {
                lowPhpRateList.push(phpRateList[i]);
            }
        } else { //even
            var middle = (phpRateList.length / 2) - 1
            for (i = 0; i < middle; i++) {
                lowPhpRateList.push(phpRateList[i]);
            }
        }

        /**Calculate median, High, low*/
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
        return median;

    } catch (e) {
        throw Error("Error while calculating Median")
    }
}