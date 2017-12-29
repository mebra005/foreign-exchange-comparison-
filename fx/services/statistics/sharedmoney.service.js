var CompanyService = require('../../services/company.service')
var MedianService = require('../median.service')

_this = this

var feeIncludedBoolean = false;
var feeIncluded = '';
var youPay = 0;
var sendAmount = 0;
var fee = 3.99;
var trueCost = 0;
var trueCostPercentage = 0;
const SHAREDMONEY_ID = '5a32c4d07dcf541fac579867'
const CREDIT_CHARGE = 0.03;



exports.calculateStats = async function (userInputs) {
    var page = 1
    var limit = 10;

    var median = await MedianService.median({}, page, limit);
    var company = await CompanyService.findCompanyByID(SHAREDMONEY_ID)


    // Validation
    if (!(company.deliveryMethod.includes(userInputs.deliveryMethod) && company.source.includes(userInputs.source)) || userInputs.amount > company.maxLimit) {
        return
    } else {


        // Calculate fees
        if (userInputs.source == 'Debit Card') {
            _this.fee = fee;
        } else {
            _this.fee = (userInputs.amount * CREDIT_CHARGE) + 2.99;
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


