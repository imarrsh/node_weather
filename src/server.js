var express = require('express');
var app = express(); // init express
var bodyParser = require('body-parser');

const gimmeWeather = require('./app').gimmeWeather;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.port || 3000; // set port

// ROUTER  -----------------------------
var router = express.Router();

// middleware to use for all requests
// handle logging to console when a request happens
var myLogger = function (req, res, next) {
  console.log('LOG: request happened!');
  next();
};
router.use(myLogger); 

// test route for the app
router.get('/hello', function (req, res) {
  res.json({ message: 'Hello World!' });
});

// forecast endpoint that expects a location
router.get('/forecast/:location', function (req, res) {
  const address = req.params.location;
  gimmeWeather(address)
    .then(data => {
      res.json( data );
    });
});

// Register Routes  --------------------
app.use('/api', router); // prefix with /api

// listen!
app.listen(port, function () {
  console.log(`Test app listening on port ${port}!`);
});
