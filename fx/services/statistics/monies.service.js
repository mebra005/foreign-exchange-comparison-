var Company = require('../../models/company.model')
var CompanyService = require('../../services/company.service')
var CompanyController = require('../../controllers/company.controller')
var moniesController = require('../../controllers/median.controller')
var MedianService = require('../median.service')

_this = this

var feeIncludedBoolean = false;
var feeIncluded = '';
var youPay = 0;
var fee = 4.99;
var trueCost = 0;
var trueCostPercentage = 0;
const MONIES_ID = '5a29a5c03793b721dc4b9083'
const CREDIT_CHARGE = 0;


exports.calculateStats = async function (userInputs) {
    var page = 1
    var limit = 10;

    var median = await MedianService.median({}, page, limit);
    var monies = await CompanyService.findCompanyByID(MONIES_ID)




    // Validation
    if (!(monies.deliveryMethod.includes(userInputs.deliveryMethod) && monies.source.includes(userInputs.source)) || userInputs.amount > monies.maxLimit) {
        return
    } else {

        //check for currency switch of if statement
        switch (userInputs.currency) {
            //MXN CURRENCY
            case "mxn":

                // Calculate fees
                if (userInputs.source == 'credit card') {
                    _this.fee = fee + (userInputs.amount * CREDIT_CHARGE);
                } else {
                    _this.fee = fee;
                }

                // checks to see if the fee is included in the amount the user pays or user has to pay fees on top of the amount.
                if (!feeIncludedBoolean) {
                    _this.feeIncluded = "No";
                    _this.youPay = userInputs.amount + _this.fee;
                } else {
                    _this.feeIncluded = "Yes"
                    _this.youPay = userInputs.amount;
                }

                _this.theyGet = userInputs.amount * monies.currency.mxn;

                // Calculates the True Cost
                _this.trueCost = await (((_this.youPay * median.median.mxn) - (userInputs.amount * monies.currency.mxn)) / median.median.mxn);

                // Calculates the True Cost Percentage
                _this.trueCostPercentage = await (_this.trueCost / (_this.youPay - trueCost)) * 100;



                var result = {
                    youPay: _this.youPay,
                    theyGet: userInputs.amount * monies.currency.mxn,
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
            case "php":
                // Calculate fees
                if (userInputs.source == 'credit card') {
                    _this.fee = fee + (userInputs.amount * CREDIT_CHARGE);
                } else {
                    _this.fee = fee;
                }

                // checks to see if the fee is included in the amount the user pays or user has to pay fees on top of the amount.
                if (!feeIncludedBoolean) {
                    _this.feeIncluded = "No";
                    _this.youPay = userInputs.amount + _this.fee;
                } else {
                    _this.feeIncluded = "Yes"
                    _this.youPay = userInputs.amount;
                }

                _this.theyGet = userInputs.amount * monies.currency.php;

                // Calculates the True Cost
                _this.trueCost = await (((_this.youPay * median.median.php) - (userInputs.amount * monies.currency.php)) / median.median.php);

                // Calculates the True Cost Percentage
                _this.trueCostPercentage = await (_this.trueCost / (_this.youPay - trueCost)) * 100;



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


