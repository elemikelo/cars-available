"use strict";
const data = require('./data');

function availability(numberTotalCars, arrayCarsDates, input) {

  var sameCarUsed = 0;
  var carsAvailable = 0;

  // don't exist rentals
  if (arrayCarsDates.lenght === 0) {
    console.log(`Cars Available ${numberTotalCars} 😎 `);
    return true;
  }

  // string elements to number **  preparation time = 1h = 3600000
  let newArrayCarsDates = arrayCarsDates.map(date => {
    return {
      start: new Date(date.start).getTime(),
      end: (new Date(date.end).getTime() + data.preparationTime)
    }
  });

  // sort array by start dates
  newArrayCarsDates.sort(function (a, b) { return a.start - b.start });

  // Filter rents array with input 
  let filterRents = newArrayCarsDates.filter(date => {
    if (date.start >= input.start && (date.end - data.preparationTime) <= input.end) {
      return date;
    }
  });

  // see if used the same car for rents differents
  let viewCarUsed = filterRents.reduce((a, b) => {
    if (!compareRangesDates(a, b)) {
      sameCarUsed += 1;
      return b;
    }
    return a;
  });

  // Compare input with cars stock
  let arrayReservedDates = newArrayCarsDates.map(dateIndex => {
    if (compareRangesDates(input, dateIndex)) {
      carsAvailable--;
    }
  });

  carsAvailable = (numberTotalCars - filterRents.length) + sameCarUsed;


  if (carsAvailable > 1) {
    console.log(`Cars Available ${carsAvailable} 🤘🏽 😎 🤘🏽 `)
    return true;
  }
  else {
    return false;
  }
}


function addRent(input, arrayCarsDates) {

  return arrayCarsDates.concat(input)

}

function inputRentConverted(input) {
  return { start: new Date(input.start).getTime(), end: new Date(input.end).getTime() }
}

function compareRangesDates(rangeOne, rangeTwo) {

  if (rangeOne.end > rangeTwo.start && rangeOne.start < rangeTwo.end) {
    // need new car
    return true;
  }
  else {
    return false;
  }
}

function createRent(input, arrayCarsDates, numberTotalCars) {

  if (input.end < input.start) {
    return console.log('Date Invalid ⛔️ ');
  }

  if (availability(numberTotalCars, arrayCarsDates, input)) {

    addRent(input, arrayCarsDates);

    return console.log(`Reserved Car, thanks 😘  `);
  }
  else {
    return console.log('No cars available, Sorry 😩 ');
  }
}


createRent(inputRentConverted(data.inputRent), data.rentedCars, data.cars);

