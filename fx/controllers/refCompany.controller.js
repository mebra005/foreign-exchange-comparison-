var RefCompanyService = require('../services/RefCompany.service')

_this = this


exports.getRefCompanies = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    console.log(page, limit)

    try{
        var refCompanies = await RefCompanyService.getRefCompanies({}, page, limit)
        return res.status(200).json({status: 200, data: refCompanies, message: "Succesfully reference companies received"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createRefCompany = async function(req, res, next){
    var refCompany = {
        name: req.body.name,
        rate: req.body.rate
    }

    try{
        var createdRefCompany = await RefCompanyService.createRefCompany(refCompany)
        return res.status(201).json({status: 201, data: createdRefCompany, message: "Succesfully Created Reference Company"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Reference Company Creation was Unsuccesfull"})
    }
}

exports.updateRefCompany = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var refCompany = {
        id,
        name: req.body.name ? req.body.name : null,
        rate: req.body.rate ? req.body.rate : null
    }

    try{
        var updatedRefCompany = await RefCompanyService.updateRefCompany(refCompany)
        return res.status(200).json({status: 200, data: updatedRefCompany, message: "Succesfully Updated Reference Company"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeRefCompany = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await RefCompanyService.deleteRefCompany(id)
        return res.status(204).json({status:204, message: "Succesfully Reference Company Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}

