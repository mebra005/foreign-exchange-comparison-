var RefCompany = require('../models/refCompany.model')

_this = this


exports.getRefCompanies = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var refCompanies = await RefCompany.paginate(query, options)
        return refCompanies;
    } catch (e) {
        throw Error('Error while Paginating reference companies')
    }
}

exports.createRefCompany = async function(refCompany){

    var newRefCompany = new RefCompany({
        name: refCompany.name,
        rate: refCompany.rate,
        date: new Date()
    })

    try{
        var savedRefCompany = await newRefCompany.save()
        return savedRefCompany;
    }catch(e){
        throw Error("Error while Creating Reference Company")
    }
}


exports.updateRefCompany = async function(refCompany){
    var id = refCompany.id

    try{
        var oldRefCompany = await RefCompany.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Reference Company")
    }

    if(!oldRefCompany){
        return false;
    }

    console.log(oldRefCompany)

    oldRefCompany.name = refCompany.name
    oldRefCompany.rate = refCompany.rate
    oldRefCompany.date = new Date()



    console.log(oldRefCompany)

    try{
        var savedRefCompany = await oldRefCompany.save()
        return savedRefCompany;
    }catch(e){
        throw Error("And Error occured while updating the Reference Company");
    }
}

exports.deleteRefCompany = async function(id){
    
    try{
        var deleted = await RefCompany.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Reference Company Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Reference Company")
    }
}

