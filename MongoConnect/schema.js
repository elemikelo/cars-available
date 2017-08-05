const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  start: String,
  end: String
})


module.exports = mongoose.model('RentedCar', schema);

