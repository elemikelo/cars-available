var mongoose = require('mongoose');
var RentedCar = require('./MongoConnect/model');

exports.findRentals = function findRentals(callback) {
  RentedCar.find({}, function (err, rentals) {
    if (err) {
      return callback(err);
    } else if (rentals) {
      return callback(null, rentals);
    } else {
      return callback();
    }
  })

}