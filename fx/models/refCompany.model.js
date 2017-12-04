var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var RefCompanySchema = new mongoose.Schema({
    name: String,
    rate: Number,
    date: Date
})

RefCompanySchema.plugin(mongoosePaginate)
const RefCompany = mongoose.model('RefCompany', RefCompanySchema)

module.exports = RefCompany;