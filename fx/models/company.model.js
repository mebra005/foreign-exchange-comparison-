var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var CompanySchema = new mongoose.Schema({
    name: String,
    currency: {
        mxn: Number,
        php: Number
    },
    source: [String],
    deliveryMethod: [String],
    maxLimit: Number,
    date: Date
})


CompanySchema.plugin(mongoosePaginate)
const Company = mongoose.model('Company', CompanySchema)

module.exports = Company;
