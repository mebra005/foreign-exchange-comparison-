var Moneygram = require('../services/statistics/moneygram.service')
var Monies =  require('../services/statistics/monies.service')
var Ofx =  require('../services/statistics/ofx.service')
var Paysend = require('../services/statistics/paysend.service')
var Remitly = require('../services/statistics/remitly.service')
var Sendwyre = require('../services/statistics/sendwyre.service')
var Sharedmoney = require('../services/statistics/sharedmoney.service')
var Transferwise = require('../services/statistics/transferwise.service')
var Westernunion = require('../services/statistics/westernunion.service')
var Xoom = require('../services/statistics/xoom.service')


_this = this

exports.calculateStats = async function (userInputs) {
    var page = 1
    var limit = 10;

    var moneygram = await Moneygram.calculateStats(userInputs);
    var monies = await Monies.calculateStats(userInputs);
    var ofx = await Ofx.calculateStats(userInputs);
    var paysend = await Paysend.calculateStats(userInputs);
    var remitly = await Remitly.calculateStats(userInputs);
    var sendwyre = await Sendwyre.calculateStats(userInputs);
    var sharedmoney = await Sharedmoney.calculateStats(userInputs);
    var transferwise = await Transferwise.calculateStats(userInputs);
    var westernunion = await Westernunion.calculateStats(userInputs);
    var xoom = await Xoom.calculateStats(userInputs);

    var temp = [moneygram, monies, ofx, paysend,remitly, sendwyre ,sharedmoney ,transferwise, westernunion, xoom];
    var fxList = [];

    // push the non empty object to fxList
    for (i = 0; i < temp.length; i++) {
        if (temp[i] != null){
            fxList.push(temp[i])
        }
    }

    try {
        var stats = await fxList
        return stats
    } catch (e) {
        throw Error('Error while Calculating the FX')
    }


    

}
