var express = require('express')

var router = express.Router()

var CompanyController = require('../../controllers/company.controller');
var Company = require('../../models/company.model')

router.get('/', CompanyController.getCompanies)
router.post('/', CompanyController.createCompany)
router.put('/', CompanyController.updateCompany)
router.delete('/:id',CompanyController.removeCompany)


router.get('/:id', (req, res, next) => {
    Company.find({_id: req.params.id}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});



module.exports = router;