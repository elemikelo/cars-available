require('./connect');
const RentedCar = require('./model');
const fs = require('fs');


function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, content) => {
      if (err) {
        return reject(err)
      }
      return resolve(content)
    })
  })
}

function jsonBuffer(buffer) {
  return new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(buffer.toString()))
    } catch (err) {
      reject(err)
    }
  })
}

function insertMongo(json) {
  return new Promise((resolve, reject) => {
    console.log(json.rentals)
    resolve(RentedCar.insertMany(json.rentals))
  })
}

Promise.all([RentedCar.deleteMany()])
  .then(() => readFile('./rentals.json'))
  .then(jsonBuffer)
  .then(insertMongo)
  .catch(err => console.log(`Hubo un error: ${err}`))



