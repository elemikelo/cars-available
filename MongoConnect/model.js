const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  start: String,
  end: String
})


module.exports = mongoose.model('RentedCar', schema);

