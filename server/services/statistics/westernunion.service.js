var CompanyService = require('../../services/company.service')
var MedianService = require('../median.service')

_this = this

var feeIncludedBoolean = false;
var feeIncluded = '';
var youPay = 0;
var sendAmount = 0;
var fee = 4.99;
var trueCost = 0;
var trueCostPercentage = 0;
const WESTERNUNION_ID = '5a451e3544059903f84978ef'

exports.calculateStats = async function (userInputs) {
    var page = 1
    var limit = 10;

    var median = await MedianService.median({}, page, limit); // get median rate
    var company = await CompanyService.findCompanyByID(WESTERNUNION_ID) // find company by ID


    // Validation for Delivery method, source of funding and maximum limit
    if (!(company.deliveryMethod.includes(userInputs.deliveryMethod) && company.source.includes(userInputs.source)) || userInputs.amount > company.maxLimit) {
        return 
    // Validation for Delivery time    
    } else if (userInputs.source == 'Bank Account' && !(userInputs.deliveryTime == 'Less than 4 days' || userInputs.deliveryTime == 'Less than 5 days'  )) {
        return
    } else {
        // Calculate fees
        if (userInputs.deliveryMethod == 'Bank Account' && userInputs.amount < 2751) {
            _this.fee = 0;
        } else if (userInputs.deliveryMethod == 'Bank Account' && userInputs.amount > 2750) {
            return
        } else if (userInputs.deliveryMethod == 'Agent' && userInputs.source == 'Bank Account') {
            if (userInputs.amount < 3001) {
                _this.fee = 5;
            } else if (userInputs.amount > 3000 && userInputs.amount < 4001){
                _this.fee = 14;
            } else {
                _this.fee = 24;
            }
        } else if (userInputs.deliveryMethod == 'Agent' && (userInputs.source == 'Debit Card' || userInputs.source == 'Credit Card')) {
            if (userInputs.amount > 4000) {
                _this.fee = 45;
            } else if (userInputs.amount < 4001 && userInputs.amount > 3000) {
                _this.fee = 35;
            } else if (userInputs.amount < 3001 && userInputs.amount > 2000) {
                _this.fee = 25;
            } else if (userInputs.amount < 2001 && userInputs.amount > 1100) {
                _this.fee = 20;
            } else if (userInputs.amount < 1101 && userInputs.amount > 900) {
                _this.fee = 15;
            } else if (userInputs.amount < 901 && userInputs.amount > 600) {
                _this.fee = 10;
            } else if (userInputs.amount < 601 && userInputs.amount > 500) {
                _this.fee = 9;
            } else if (userInputs.amount < 501 && userInputs.amount > 300) {
                _this.fee = 7;
            } else {
                _this.fee = fee;
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
                    youPay: _this.youPay,
                    sendAmount: _this.sendAmount,
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
