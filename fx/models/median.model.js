var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var MedianSchema = new mongoose.Schema({
    median: Number
})


MedianSchema.plugin(mongoosePaginate)
const Median = mongoose.model('Median', MedianSchema)

module.exports = Median;
