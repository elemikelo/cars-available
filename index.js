"use strict";

const data = require('./data');
require('./MongoConnect/connect');
const rentals = require('./controllers');
var mongoose = require('mongoose');
var RentedCar = require('./MongoConnect/model');


function seeAvailability(numberTotalCars, input) {

  return new Promise((resolve, reject) => {

    rentals.findRentals((err, rentalsFound) => {
      if (err) {
        return reject(err)
      }

      var arrayCarsDates = rentalsFound;
      var sameCarUsed = 0;
      var carsAvailable = 0;

      /*  See if don't exist rentals */
      if (arrayCarsDates.length === 0) {
        console.log(`Cars Available ${numberTotalCars} 😎 `);
        resolve(true);
      }

      /* Converts start and end dates values in milliseconds in new array to compare. 
         The preparation time was also added to the final date */
      let newArrayCarsDates = arrayCarsDates.map(date => {
        return {
          start: new Date(date.start).getTime(),
          end: (new Date(date.end).getTime() + data.preparationTime)
        }
      });

      /* Returns a new filtered array for rents contained of the date input */
      let arrayFiltered = newArrayCarsDates.filter(date => {
        if (compareIntervals(input, date)) {
          return date;
        }
      });

      if (arrayFiltered.length == 0) {
        console.log(`Cars Available ${numberTotalCars} 😎 `);
        resolve(true);
      }

      /* Calculate how many same cars are used for different  rents in the total  rentals array */
      let calculateSameCars = arrayFiltered.reduce((a, b) => {
        if (!compareIntervals(a, b)) {
          sameCarUsed += 1;
          return b;
        }
        return a;
      });

      carsAvailable = numberTotalCars - arrayFiltered.length + sameCarUsed;

      if (carsAvailable > 1) {
        console.log(`Cars Available ${carsAvailable} 🤘🏽 😎 🤘🏽 `)
        resolve(true);
      }
      else {
        resolve(false);
      }

    })

  })
}

/* add new rental into array */
function addRental(input) {

  var newRental = RentedCar({
    start: input.start,
    end: input.end
  });

  // save 
  newRental.save(function (err) {
    if (err) throw err;

    console.log('Rentals saved in Mongo');
  });

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
function createRent(input, numberTotalCars) {

  if (input.end < input.start) {
    return console.log('Date Invalid ⛔️ ');
  }

  if (seeAvailability(numberTotalCars, input)) {

    addRental(input);

    return console.log(`Reserved Car, thanks 😘  `);
  }
  else {
    return console.log('No cars available, Sorry 😩 ');
  }
}


createRent(convertToNumbers(data.inputRent), data.cars);


