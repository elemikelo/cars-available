var mongoose = require('mongoose');
var RentedCar = require('./MongoConnect/model');
const data = require('./data')

const inputRent = {
  start: '06/19/2017 16:00',
  end: '06/21/2017 16:00'
}


function seeAvailability(n, array, input) {

  // let rentedCars = RentedCar.find(function (err, rentedcars) {
  //   if (err) return console.error(err);
  // })

  let arrayConverted = array.map(rent => { return { start: new Date(rent.start).getTime(), end: new Date(rent.end).getTime() } })

  let carsAvailable = arrayConverted.map(dateIndex => {

    if (compareRanges(input, dateIndex)) { n-- }
  });

  if (n !== 0) { return true }

  else { return false, n }

  // let rentedCars = RentedCar.find(function (err, rentedcars) {
  //   if (err) return console.error(err);
  // })
}

function addRent(input, array) {

  // RentedCar.create(inputRent, function (err, rent) {
  //   if (err) return console.log(`Error: ${err}`);
  //   console.log('saved');
  // })

  return array.concat(input)

}

function createRent(input, array, n) {

  if (seeAvailability(n, array, input)) {

    addRent(input, array);
    return console.log('Reserved Car, thanks');
  }
  else {
    return console.log('No cars available, Sorry');
  }
  ;
}

function inputRentConverted(input) {
  return { start: new Date(input.start).getTime(), end: new Date(input.end).getTime() }
}

function compareRanges(rangeOne, rangeTwo) {

  if (rangeOne.end > rangeTwo.start && rangeOne.start < rangeTwo.end) {

    return true;
  }
  else {
    return false;
  }
}


console.log(RentedCar.find(function (err, rentedcars) {
  if (err) return console.error(err);
})
)


//createRent(inputRentConverted(inputRent), data.rentedCars, data.cars)

