var CompanyService = require('../services/company.service')

_this = this


exports.getCompanies = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    console.log(page, limit)

    try{
        var companies = await CompanyService.getCompanies({}, page, limit)
        return res.status(200).json({status: 200, data: companies, message: "Succesfully companies received"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createCompany = async function(req, res, next){
    var Company = {
        name: req.body.name,
        rate: req.body.rate,
        source: req.body.source,
        deliveryMethod: req.body.deliveryMethod
    }

    try{
        var createdCompany = await CompanyService.createCompany(Company)
        return res.status(201).json({status: 201, data: createdCompany, message: "Succesfully Created  Company"})
    }catch(e){
        return res.status(400).json({status: 400, message: " Company Creation was Unsuccesfull"})
    }
}

exports.updateCompany = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var company = {
        id,
        name: req.body.name ? req.body.name : null,
        rate: req.body.rate ? req.body.rate : null,
        source: req.body.source ? req.body.source : null,
        deliveryMethod: req.body.deliveryMethod ? req.body.deliveryMethod : null
    }

    try{
        var updatedCompany = await CompanyService.updateCompany(company)
        return res.status(200).json({status: 200, data: updatedCompany, message: "Succesfully Updated  Company"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeCompany = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await CompanyService.deleteCompany(id)
        return res.status(204).json({status:204, message: "Succesfully  Company Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}