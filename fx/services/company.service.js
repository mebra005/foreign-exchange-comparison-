var Company = require('../models/company.model')

_this = this


exports.getCompanies = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var companies = await Company.paginate(query, options)
        return companies;
    } catch (e) {
        throw Error('Error while Paginating companies')
    }
}

exports.createCompany = async function(company){

    var newCompany = new Company({
        name: company.name,
        currency: {
            mxn: company.currency.mxn,
            php: company.currency.php
        },
        source: company.source,
        deliveryMethod: company.deliveryMethod,
        maxLimit: company.maxLimit,
        date: new Date()
    })

    try{
        var savedCompany = await newCompany.save()
        return savedCompany;
    }catch(e){
        throw Error("Error while Creating Company")
    }
}

exports.updateCompany = async function(company){
    var id = company.id

    try{
        var oldCompany = await Company.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Company")
    }

    if(!oldCompany){
        return false;
    }

    console.log(oldCompany)

    oldCompany.name = company.name
    oldCompany.maxLimit = company.maxLimit
    oldCompany.currency.mxn = company.currency.mxn
    oldCompany.currency.php = company.currency.php
    oldCompany.source = company.source
    oldCompany.deliveryMethod = company.deliveryMethod
    oldCompany.date = new Date()

    console.log(oldCompany)

    try{
        var savedCompany = await oldCompany.save()
        return savedCompany;
    }catch(e){
        throw Error("And Error occured while updating the  Company");
    }
}

exports.deleteCompany = async function(id){
    
    try{
        var deleted = await Company.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Company Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Company")
    }
}