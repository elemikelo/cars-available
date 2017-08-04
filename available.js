//const mongoose = require('mongoose');
const RentedCar = mongoose.model('RentedCar', schema);
const data = require('./data')


function seeAvailability(cars, rentedCars, inputRent) {
  let arrayConverted = rentedCars.map(rent => { return { start: new Date(rent.start).getTime(), end: new Date(rent.end).getTime() } })

  let carsAvailable = arrayConverted.map(arrayDate => {
    dateContent(inputRent, arrayDate);
    if (arrayConverted) cars--;
  })

  if (cars !== 0) {
    return true;
  }
  else {
    return false;
  }

  // Mongo
  // RentedCar.find(function (err, rentedcars) {
  //   if (err) {
  //     console.log('Error find all:', err)
  //   }
  //   // ok
  // });
}


function addRent(input, rentedCars) {

  return rentedCars.concat(input)

  // Mongo 
  // RentedCar.create({ startDate: startDate, endDate: endDate }, function (err, saved) {
  //   if (err) return console.log(err);
  // })

}

function createRent(input, rentedCars, cars) {

  if (seeAvailability(cars, rentedCars, input)) {
    addRent(input, rentedCars);
    return 'Car Reserved, thanks';
  }
  else {
    return 'No cars available';
  }
  ;
}


function inputRentConverted(input) {
  return { start: new Date(inputRent.start).getTime(), end: new Date(inputRent.end).getTime() }
}


function dateContent(data1, data2) {
  if (data1.start < data2.start && data1.end < data2.end) {
    return true;
  }
  else {
    return false;
  }
}

const inputRent = {
  start: '06 / 19 / 2017 16: 00',
  end: '06/21/2017 16:00'
}


console.log(createRent(inputRentConverted(inputRent), data.rentedCars, data.cars));



function showMongo() {
  RentedCar.find(function (err, rentedcars) {
    if (err) {
      console.log('Error find all:', err)
    }
    // ok
  });
}