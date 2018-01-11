var CompanyService = require('../../services/company.service')
var MedianService = require('../median.service')

_this = this

var feeIncludedBoolean = true;
var feeIncluded = '';
var youPay = 0;
var sendAmount = 0;
var fee = 3; // less than 300
var trueCost = 0;
var trueCostPercentage = 0;
const TRANSFERWISE_ID = '5a32c35e7dcf541fac579861'
const LESS_THAN_10000 = 0.009901; // 300 < amount < 10000
const MORE_THAN_10000 = 0.0069546; // amount > 10000
const CARD_LIMIT = 1000;
const ACH_LIMIT = 10000;


exports.calculateStats = async function (userInputs) {
    var page = 1
    var limit = 10;

    var median = await MedianService.median({}, page, limit);
    var company = await CompanyService.findCompanyByID(TRANSFERWISE_ID)


    // Validation
    if (!(company.deliveryMethod.includes(userInputs.deliveryMethod) && company.source.includes(userInputs.source)) || userInputs.amount > company.maxLimit) {
        return
    } else if (userInputs.deliveryTime == 'Same Day') {
        return
    } else if (userInputs.deliveryTime == 'Less than 2 days' && userInputs.source == 'Bank Account') {
        return
    } else {


        // Calculate fees
        if (userInputs.amount > CARD_LIMIT && (userInputs.source == 'Debit Card'|| userInputs.source == 'Credit Card')){
            return
        } else if ((userInputs.amount > 300 && userInputs.amount <= CARD_LIMIT) && userInputs.source == 'Credit Card') {
            _this.fee = (userInputs.amount * 0.01961) + (userInputs.amount * 0.00971 );
        } else if ((userInputs.amount > 300 && userInputs.amount <= CARD_LIMIT) && userInputs.source == 'Debit Card') {
            _this.fee = (userInputs.amount * 0.009901);
        } else if ((userInputs.amount > 300 && userInputs.amount <= 10000) && userInputs.source == 'Bank Account') {
            _this.fee = (userInputs.amount * 0.009901);
        } else if (userInputs.amount > 10000 && userInputs.source == 'Bank Account') {
            _this.fee = ((userInputs.amount - 10000) * 0.00696) + 99.01;
        } else if (userInputs.amount <= 300) {
            _this.fee = fee;
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


