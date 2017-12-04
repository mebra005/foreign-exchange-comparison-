var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var CompanySchema = new mongoose.Schema({
    name: String,
    rate: Number,
    source: [String],
    deliveryMethod: [String],
    date: Date
})


CompanySchema.plugin(mongoosePaginate)
const Company = mongoose.model('Company', CompanySchema)

module.exports = Company;