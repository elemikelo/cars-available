"use strict";

const data = require('./data');

function seeAvailability(numberTotalCars, arrayCarsDates, input) {

  var sameCarUsed = 0;
  var carsAvailable = 0;
  var carsDifferent = 0;

  /*  See if don't exist rentals */
  if (arrayCarsDates.length === 0) {
    console.log(`Cars Available ${numberTotalCars} 😎 `);
    return true;
  }


  /* Converts start and end dates values in milliseconds in new array to compare. 
     The preparation time was also added to the final date */
  let newArrayCarsDates = arrayCarsDates.map(date => {
    return {
      start: new Date(date.start).getTime(),
      end: (new Date(date.end).getTime() + data.preparationTime)
    }
  });

  /* Sorts rentals by start dates to calculate */
  newArrayCarsDates.sort((a, b) => a.start - b.start);
  if (newArrayCarsDates[0].start > input.end) {
    console.log(`Cars Available ${numberTotalCars} 😎 `);
    return true;
  }

  /* Returns a new filtered array for rents contained of the date input */
  let filterRents = newArrayCarsDates.filter(date => {
    if (compareIntervals(input, date)) {
      console.log(new Date(date.start).getDate(), new Date(date.end).getDate(), )
      return date;
    }
    else {
      carsDifferent++;
    }
  });

  if (filterRents.length == 0) {
    console.log(`Cars Available ${numberTotalCars} 😎 `);
    return true;
  }

  /* Calculate how many same cars are used for different  rents in the total  rentals array */
  let calculateSameCars = filterRents.reduce((a, b) => {
    if (!compareIntervals(a, b)) {
      sameCarUsed += 1;
      return b;
    }
    return a;
  });

  carsAvailable = filterRents.length + sameCarUsed + carsDifferent;

  if (carsAvailable > 1) {
    console.log(`Cars Available ${carsAvailable} 🤘🏽 😎 🤘🏽 `)
    return true;
  }
  else {
    return false;
  }
}

/* add new rental into array */
function addRental(input, arrayCarsDates) {

  return arrayCarsDates.concat(input)

}
/* convert "string"  input values to numbers (Milliseconds) */
function convertToNumbers(input) {
  return { start: new Date(input.start).getTime(), end: new Date(input.end).getTime() }
}

/* verify if date intervals are contained */
function compareIntervals(rangeOne, rangeTwo) {

  if (rangeOne.end > rangeTwo.start && rangeOne.start < rangeTwo.end) {
    // need new car
    return true;
  }
  else {
    return false;
  }
}

/* create rentals according cars available */
function createRent(input, arrayCarsDates, numberTotalCars) {

  if (input.end < input.start) {
    return console.log('Date Invalid ⛔️ ');
  }

  if (seeAvailability(numberTotalCars, arrayCarsDates, input)) {

    addRental(input, arrayCarsDates);

    return console.log(`Reserved Car, thanks 😘  `);
  }
  else {
    return console.log('No cars available, Sorry 😩 ');
  }
}

createRent(convertToNumbers(data.inputRent), data.rentedCars, data.cars);

