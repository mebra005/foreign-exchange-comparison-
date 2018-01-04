var express = require('express')

var router = express.Router()


var MoniesController = require('../../controllers/statistics/monies.controller');
var TransferwiseController = require('../../controllers/statistics/transferwise.controller');
var XoomController = require('../../controllers/statistics/xoom.controller');
var MoneygramController = require('../../controllers/statistics/moneygram.controller');
var OfxController = require('../../controllers/statistics/ofx.controller');
var PaysendController = require('../../controllers/statistics/paysend.controller');
var RemitlyController = require('../../controllers/statistics/remitly.controller');
var SendwyreController = require('../../controllers/statistics/sendwyre.controller');
var WesternunionController = require('../../controllers/statistics/westernunion.controller');
var XoomController = require('../../controllers/statistics/xoom.controller');
var SharedmoneyController = require('../../controllers/statistics/sharedmoney.controller');

var StatisticsController  = require('../../controllers/statistic.controller');

// Calculate the fx rate of each company separatly in different requests
router.post('/monies', MoniesController.calculateStats)
router.post('/transferwise', TransferwiseController.calculateStats)
router.post('/xoom', XoomController.calculateStats)
router.post('/moneygram', MoneygramController.calculateStats)
router.post('/ofx', OfxController.calculateStats)
router.post('/paysend', PaysendController.calculateStats)
router.post('/remitly', RemitlyController.calculateStats)
router.post('/sendwyre', SendwyreController.calculateStats)
router.post('/sharedmoney', SharedmoneyController.calculateStats)
router.post('/westernunion', WesternunionController.calculateStats)

// Calculate the fx rate of all the company in one request
router.post('/', StatisticsController.calculateStats)

module.exports = router;