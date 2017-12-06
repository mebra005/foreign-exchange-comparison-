var express = require('express')

var router = express.Router()

var MedianController = require('../../controllers/median.controller');

router.get('/', MedianController.getMedian)

module.exports = router;