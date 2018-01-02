var Monies = require('../../services/statistics/monies.service')

exports.calculateStats = async function (req, res, next) {

    var userInputs = {
        amount: req.body.amount,
        source: req.body.source,
        deliveryMethod: req.body.deliveryMethod,
        deliveryTime: req.body.deliveryTime,
        currency: req.body.currency,
    }

    try {
        var stat = await Monies.calculateStats(userInputs)
        if (stat.youpay == 0) {
            return res.status(400).json({ status: 400, message: e.message });
        }
        return res.status(200).json({ status: 200, data: stat, message: "Succesfully Calculate statistics" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
