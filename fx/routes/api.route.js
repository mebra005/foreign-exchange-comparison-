var express = require('express')

var router = express.Router()
var refCompanies = require('./api/refCompany.route')
var companies = require('./api/company.route')


router.use('/companies', companies);
router.use('/refCompanies', refCompanies);


module.exports = router;