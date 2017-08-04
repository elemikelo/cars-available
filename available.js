//const mongoose = require('mongoose');
//const RentedCar = mongoose.model('RentedCar', schema);
const data = require('./data')

const inputRent = {
  start: '06/19/2017 16:00',
  end: '06/21/2017 16:00'
}


function seeAvailability(n, array, input) {
  let arrayConverted = array.map(rent => { return { start: new Date(rent.start).getTime(), end: new Date(rent.end).getTime() } })

  let carsAvailable = arrayConverted.map(dateIndex => {

    if (compareRanges(input, dateIndex)) { n-- }
  });

  if (n !== 0) { return true }

  else { return false, n }
}

function addRent(input, array) {

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

createRent(inputRentConverted(inputRent), data.rentedCars, data.cars)

