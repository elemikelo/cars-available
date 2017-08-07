"use strict";

const data = require('./data');

function availability(numberTotalCars, arrayCarsDates, input) {

  var sameCarUsed = 0;
  var carsAvailable = 0;

  // Don't exist rentals
  if (arrayCarsDates.length === 0) {
    console.log(`Cars Available ${numberTotalCars} 😎 `);
    return true;
  }

  // String elements to number **  preparation time = 1h = 3600000
  let newArrayCarsDates = arrayCarsDates.map(date => {
    return {
      start: new Date(date.start).getTime(),
      end: (new Date(date.end).getTime() + data.preparationTime)
    }
  });

  // Sort array by start dates
  newArrayCarsDates.sort(function (a, b) { return a.start - b.start });

  // Return array rentals with input  
  let filterRents = newArrayCarsDates.filter(date => {
    if (date.start >= input.start && (date.end - data.preparationTime) <= input.end) {
      return date;
    }
  });

  // Calculates how many cars you need for existing rentals
  let calculeCarUsed = filterRents.reduce((a, b) => {
    if (!compareRangesDates(a, b)) {
      sameCarUsed += 1;
      return b;
    }
    return a;
  });

  carsAvailable = (numberTotalCars - filterRents.length) + sameCarUsed;

  // Compare input with the number of cars in stock
  let arrayReservedDates = newArrayCarsDates.map(date => {
    if (!compareRangesDates(input, date)) {
      carsAvailable--;
    }
  });

  if (carsAvailable > 1) {
    console.log(`Cars Available ${carsAvailable} 🤘🏽 😎 🤘🏽 `)
    return true;
  }
  else {
    return false;
  }
}

function addRental(input, arrayCarsDates) {

  return arrayCarsDates.concat(input)

}

function inputDatesConverted(input) {
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

    addRental(input, arrayCarsDates);

    return console.log(`Reserved Car, thanks 😘  `);
  }
  else {
    return console.log('No cars available, Sorry 😩 ');
  }
}

createRent(inputDatesConverted(data.inputRent), data.rentedCars, data.cars);

