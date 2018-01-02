var express = require('express')

var router = express.Router()

var RefCompanyController = require('../../controllers/refCompany.controller');

router.get('/', RefCompanyController.getRefCompanies)
router.post('/', RefCompanyController.createRefCompany)
router.put('/', RefCompanyController.updateRefCompany)
router.delete('/:id',RefCompanyController.removeRefCompany)





module.exports = router;