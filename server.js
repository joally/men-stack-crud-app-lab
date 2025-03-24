const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose"); 
const Car = require('./models/car.js');
const methodOverride = require('method-override');
const morgan = require('morgan');


const app = express();
dotenv.config();
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use (morgan('dev'));




app.get('/', async (req, res) => {
    res.render('index.ejs');
  });

app.get('/cars/new',(req, res) => {
  res.render('cars/new.ejs');
});

app.post('/cars', async (req, res) =>{
  if (req.body.isReadyToSell === "on") {
    req.body.isReadyToSell = true;
  } else {
    req.body.isReadyToSell = false;
  }

await Car.create(req.body);

res.redirect('/cars/new');
});

app.get('/cars', async (req, res) =>{
  const allCars = await Car.find({});
 
  res.render('cars/index.ejs',{cars: allCars});

});

app.get('/cars/:carId', async (req, res) =>{
 
  const foundCar = await Car.findById(req.params.carId);
 res.render('cars/show.ejs', {car: foundCar});
});

app.delete('/cars/:carId', async (req, res) => {
await Car.findByIdAndDelete(req.params.carId);
 res.redirect('/cars');
});

app.get('/cars/:carId/edit', async(req, res) => {
const foundCar = await Car.findById(req.params.carId);

res.render('cars/edit.ejs',{car:foundCar,});
});

app.put('/cars/:carId', async (req, res)=>{
  if(req.body.isReadyToSell === 'on'){
    req.boby.isReadyToSell = true;
  }else{
    req.body.isReadyToSell =false;
  }
  await Car.findByIdAndUpdate(req.params.carId,req.body);

  res.redirect(`/cars/${req.params.carId}`);
});






 





app.listen(3000, () => {
    console.log('Listening on port 3000');
  });