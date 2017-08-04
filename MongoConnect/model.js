const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  startDate: String,
  endDate: String
})


module.exports = mongoose.model('RentedCar', schema);

