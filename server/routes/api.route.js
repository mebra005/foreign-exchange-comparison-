var express = require('express')

var router = express.Router()
var refCompanies = require('./api/refCompany.route')
var companies = require('./api/company.route')
var median = require('./api/median.route')
var statistics = require('./api/statistics.route')

router.use('/companies', companies);
router.use('/refCompanies', refCompanies);
router.use('/median', median);
router.use('/stats', statistics);

module.exports = router;