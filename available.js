const data = require('./data');

function seeAvailability(numberTotalCars, arrayCarsDates, input) {

  let arrayConverted = arrayCarsDates.map(rent => {
    return {
      start: new Date(rent.start).getTime(),
      end: (new Date(rent.end).getTime() + data.preparationTime)
    }
  })

  let carsAvailable = arrayConverted.map(dateIndex => {
    if (compareRanges(input, dateIndex)) {
      numberTotalCars--;
    }
  });

  if (numberTotalCars !== 0) {

    let n = 0;
    let map = arrayConverted.map((date) => {

      for (x in arrayConverted) {
        if (date.end <= arrayConverted[x].start) {
          n++;
        }
      }
    });

    console.log(`Cars Available ${numberTotalCars + n} 😎 `);
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

function compareRanges(rangeOne, rangeTwo) {

  if (rangeOne.end > rangeTwo.start && rangeOne.start < rangeTwo.end) {

    return true;
  }
  else {
    return false;
  }
}

function createRent(input, arrayCarsDates, numberTotalCars) {

  if (seeAvailability(numberTotalCars, arrayCarsDates, input)) {

    addRent(input, arrayCarsDates);

    return console.log(`Reserved Car, thanks 🤠 `);
  }
  else {
    return console.log('No cars available, Sorry');
  }
}


createRent(inputRentConverted(data.inputRent), data.rentedCars, data.cars);
