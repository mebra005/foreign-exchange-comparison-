var CompanyService = require('../../services/company.service')
var MedianService = require('../median.service')

_this = this

var feeIncludedBoolean = true; 
var feeIncluded = '';
var youPay = 0;
var fee = 2; // less than 300
var trueCost = 0;
var trueCostPercentage = 0;
const PAYSEND_ID = '5a32c4bb7dcf541fac579866'


exports.calculateStats = async function (userInputs) {
    var page = 1
    var limit = 10;

    var median = await MedianService.median({}, page, limit);
    var company = await CompanyService.findCompanyByID(PAYSEND_ID)


    // Validation
    if (!(company.deliveryMethod.includes(userInputs.deliveryMethod) && company.source.includes(userInputs.source)) || userInputs.amount > company.maxLimit) {
        return
    } else {

        _this.fee = fee;

        // checks to see if the fee is included in the amount the user pays or user has to pay fees on top of the amount.
        if (!feeIncludedBoolean) {
            _this.feeIncluded = "No";
            _this.youPay = userInputs.amount + _this.fee;
        } else {
            _this.feeIncluded = "Yes"
            _this.youPay = userInputs.amount;
        }

        //check for currency 
        switch (userInputs.currency) {
            //MXN CURRENCY
            case "MXN":

                _this.theyGet = (userInputs.amount - _this.fee) * company.currency.mxn;

                // Calculates the True Cost
                _this.trueCost = await (((_this.youPay * median.median.mxn) - ((userInputs.amount - _this.fee) * company.currency.mxn)) / median.median.mxn);

                // Calculates the True Cost Percentage
                _this.trueCostPercentage = await (_this.trueCost / (_this.youPay - _this.trueCost)) * 100;



                var result = {
                    youPay: _this.youPay,
                    theyGet: _this.theyGet,
                    fee: _this.fee,
                    feeIncluded: _this.feeIncluded,
                    trueCost: _this.trueCost,
                    trueCostPercentage: _this.trueCostPercentage
                }

                try {
                    var stats = await result
                    return stats
                } catch (e) {
                    throw Error('Error while Calculating the FX')
                }
                break;

            //PHP CURRENCY    
            case "PHP":
  
                _this.theyGet = userInputs.amount * company.currency.php;

                // Calculates the True Cost
                _this.trueCost = await (((_this.youPay * median.median.php) - (userInputs.amount * company.currency.php)) / median.median.php);

                // Calculates the True Cost Percentage
                _this.trueCostPercentage = await (_this.trueCost / (_this.youPay - _this.trueCost)) * 100;



                var result = {
                    youPay: _this.youPay,
                    theyGet: _this.theyGet,
                    fee: _this.fee,
                    feeIncluded: _this.feeIncluded,
                    trueCost: _this.trueCost,
                    trueCostPercentage: _this.trueCostPercentage
                }

                try {
                    var stats = await result
                    return stats
                } catch (e) {
                    throw Error('Error while Calculating the FX')
                }
                break;
        }


    }
}


