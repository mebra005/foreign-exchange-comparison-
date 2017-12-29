var CompanyService = require('../../services/company.service')
var MedianService = require('../median.service')

_this = this

var feeIncludedBoolean = false;
var feeIncluded = '';
var youPay = 0;
var sendAmount = 0;
var fee = 5.87;
var trueCost = 0;
var trueCostPercentage = 0;
const WESTERNUNION_ID = '5a32c53e7dcf541fac579869'

exports.calculateStats = async function (userInputs) {
    var page = 1
    var limit = 10;

    var median = await MedianService.median({}, page, limit); // get median rate
    var company = await CompanyService.findCompanyByID(WESTERNUNION_ID) // find company by ID


    // Validation for Delivery method, source of funding and maximum limit
    if (!(company.deliveryMethod.includes(userInputs.deliveryMethod) && company.source.includes(userInputs.source)) || userInputs.amount > company.maxLimit) {
        return
        // Validation for Delivery time    
    } else if (userInputs.source == 'Bank Account' && !(userInputs.deliveryTime == 'Less than 4 days' || userInputs.deliveryTime == 'Less than 5 days')) {
        return
    } else {
        // Calculate fees
        /* 
        Source - Delivery method
        Agent - Agent
        Agent - Bank Account
        ( Bank Account OR Debit Card OR Credit Card ) - Bank Account
        Bank Account - Agent
        ( Debit Card OR Credit Card ) - Agent
        */
        if (userInputs.source == 'Agent' && userInputs.deliveryMethod == 'Agent') {
            if (userInputs.amout > 4501) { // Max Limit
                return
            } else if (userInputs.amout > 0 && userInputs.amout < 51) {
                _this.fee = 5;
            } else if (userInputs.amout > 50 && userInputs.amout < 1001) {
                _this.fee = 9.99;
            } else if (userInputs.amout > 1000 && userInputs.amout < 4502) {
                _this.fee = (userInputs.amount - 1000) * 0.02 + 21.00;
            }

        } else if (userInputs.source == 'Agent' && userInputs.deliveryMethod == 'Bank Account') {
            if (userInputs.amout > 0 && userInputs.amout < 51) {
                _this.fee = 5;
            } else if (userInputs.amout > 50 && userInputs.amout < 1001) {
                _this.fee = 9.99;
            } else if (userInputs.amout > 1000 && userInputs.amout < 4502) {
                _this.fee = (userInputs.amount - 1000) * 0.01 + 10.00;
            }

        } else if ((userInputs.source == 'Bank Account' || userInputs.source == 'Debit Card' || userInputs.source == 'Credit Card') && userInputs.deliveryMethod == 'Bank Account') {
            if (userInputs.amout > 2000) { // Max Limit
                return
            } else {
                _this.fee = 0;
            }
        } else if (userInputs.source == 'Bank Account' && userInputs.deliveryMethod == 'Agent') {
            if (userInputs.amout > 0 && userInputs.amout < 51) {
                _this.fee = 4.99;
            } else if (userInputs.amout > 50) {
                _this.fee = 4;
            }
        } else if ((userInputs.source == 'Debit Card' || userInputs.source == 'Credit Card' ) && userInputs.deliveryMethod == 'Agent') {
            if (userInputs.amout > 0 && userInputs.amout < 301) {
                _this.fee = 4.99;
            } else if (userInputs.amout > 300 && userInputs.amout < 601) {
                _this.fee = 6.99;
            } else if (userInputs.amout > 601 && userInputs.amout < 4500) {
                _this.fee = 0.99;
            }
        }

        // checks to see if the fee is included in the amount the user pays or user has to pay fees on top of the amount.
        if (!feeIncludedBoolean) {
            _this.feeIncluded = "No";
            _this.youPay = userInputs.amount + _this.fee;
            _this.sendAmount = userInputs.amount;
        } else {
            _this.feeIncluded = "Yes"
            _this.youPay = userInputs.amount;
            _this.sendAmount = userInputs.amount - _this.fee;
        }

        //check for currency switch of if statement
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
                    id: company._id,
                    name: company.name,
                    sendAmount: _this.sendAmount,
                    youPay: _this.youPay,
                    theyGet: userInputs.amount * company.currency.mxn,
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
                    name: company.name,
                    youPay: _this.youPay,
                    sendAmount: _this.sendAmount,
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
