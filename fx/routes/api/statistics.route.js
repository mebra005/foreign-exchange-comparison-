var express = require('express')

var router = express.Router()

var MoniesController = require('../../controllers/statistics/monies.controller');

router.post('/monies', MoniesController.calculateStats)

module.exports = router;