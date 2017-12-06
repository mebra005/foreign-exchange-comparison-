var express = require('express')

var router = express.Router()
var refCompanies = require('./api/refCompany.route')
var companies = require('./api/company.route')
var median = require('./api/median.route')

router.use('/companies', companies);
router.use('/refCompanies', refCompanies);
router.use('/median', median);

module.exports = router;