

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name:{
    type :String,
    isReadyToSell: Boolean,
    }
  });
  const Car = mongoose.model("Car", carSchema);

  module.exports = Car;