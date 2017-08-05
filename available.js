//const mongoose = require('mongoose');
//const RentedCar = mongoose.model('RentedCar', schema);
const data = require('./data');

function seeAvailability(n, array, input) {
  let arrayConverted = array.map(rent => { return { start: new Date(rent.start).getTime(), end: (new Date(rent.end).getTime() + 3600000) } })

  let carsAvailable = arrayConverted.map(dateIndex => {
    if (compareRanges(input, dateIndex)) {
      n--;
    }
  });

  if (n !== 0) {
    console.log('Cars available: ', n + (sameCarRented(arrayConverted)))
    return true;
  }

  else {
    return false
  }
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

function sameCarRented(array) {
  let n = 0;
  let map = array.map((date) => {
    for (x in array) {
      if (date.end <= array[x].start) {
        n++;
      }
    }
  })
  return n;
}


createRent(inputRentConverted(data.inputRent), data.rentedCars, data.cars);
