"use strict";

const data = require('./data');

function seeAvailability(numberTotalCars, arrayCarsDates, input) {

  var sameCarUsed = 0;
  var carsAvailable = 0;

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

  /* Copy array and order by the end of dates to see if the date of entry 
  is greater than the final rental date */
  let copyArray = newArrayCarsDates.map(dates => dates);
  let orderByDatesEnd = copyArray.sort((a, b) => a.end + b.end);
  if (orderByDatesEnd[0].end < input.start) {
    console.log(`Cars Available ${numberTotalCars} 😎 `);
    return true;
  }

  /* Sorts rentals by start dates to calculate */
  newArrayCarsDates.sort((a, b) => a.start - b.start);

  /* Returns a new filtered array for rents contained of the date input */
  let filterRents = newArrayCarsDates.filter(date => {
    if (date.start >= input.start && (date.end - data.preparationTime) <= input.end) {
      return date;
    }
  });

  if (filterRents.length == 0) {
    filterRents = newArrayCarsDates;
  }


  /* Calculate how many same cars are used for different  rents in the total  rentals array */
  let calculateSameCars = filterRents.reduce((a, b) => {
    if (!compareIntervals(a, b)) {
      sameCarUsed += 1;
      return b;
    }
    return a;
  });

  carsAvailable = (numberTotalCars - filterRents.length) + sameCarUsed;

  // Compare input with the number of cars in stock

  let calculateStockCars = newArrayCarsDates.map(date => {
    if (!compareIntervals(input, date)) {
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

