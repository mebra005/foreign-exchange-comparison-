var express = require('express')

var router = express.Router()

var CompanyController = require('../../controllers/company.controller');

router.get('/', CompanyController.getCompanies)
router.post('/', CompanyController.createCompany)
router.put('/', CompanyController.updateCompany)
router.delete('/:id',CompanyController.removeCompany)

module.exports = router;