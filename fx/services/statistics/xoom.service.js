var CompanyService = require('../../services/company.service')
var MedianService = require('../median.service')

_this = this

var feeIncludedBoolean = false;
var feeIncluded = '';
var youPay = 0;
var fee = 4.99; // less than 300
var trueCost = 0;
var trueCostPercentage = 0;
const TRANSFERWISE_ID = '5a32c4387dcf541fac579863'
const LESS_THAN_2800 = 0.0259; // 350 < amount < 2800
const MORE_THAN_2800 = 75.99; // amount > 2800

exports.calculateStats = async function (userInputs) {
    var page = 1
    var limit = 10;

    var median = await MedianService.median({}, page, limit);
    var company = await CompanyService.findCompanyByID(TRANSFERWISE_ID)


    // Validation for source of funding, delivery method, Maximum limit
    if (!(company.deliveryMethod.includes(userInputs.deliveryMethod) && company.source.includes(userInputs.source)) || userInputs.amount > company.maxLimit) {
        return
    } else {

        // Calculate fees
        if (userInputs.source == 'Bank Account') {
            _this.fee = fee;
        } else if (userInputs.amount > 350 && userInputs.amount <= 2800) {
            _this.fee = userInputs.amount * LESS_THAN_2800;
        } else if (userInputs.amount > 2800) {
            _this.fee = MORE_THAN_2800;
        } else if (userInputs.amount <= 250) {
            _this.fee = 4.99;
        } else if (userInputs.amount > 250 && userInputs.amount <= 300) {
            _this.fee = 8.99;
        } else if (userInputs.amount > 300 && userInputs.amount <= 350) {
            _this.fee = 9.99;
        }

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

                // 
                _this.theyGet = userInputs.amount * company.currency.mxn;

                // Calculates the True Cost
                _this.trueCost = await (((_this.youPay * median.median.mxn) - (userInputs.amount * company.currency.mxn)) / median.median.mxn);

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


