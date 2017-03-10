const fetchGeocode = require('./fetchGeocode').fetchGeocode;
const fetchWeather = require('./fetchWeather').fetchWeather;
const reports = require('./printReport');

function gimmeWeather(address){

  fetchGeocode(address)
    .then(function(data){
      return data;
    })
    .then(function(loacationData){
      return fetchWeather(loacationData);
    })
    .then(function(data){
      reports.printCurrentReport(data);
    })
    .catch(function(err) {
      reports.printErrors(err.message);
    });

}

// get the cli args:
const address = process.argv.slice(2).join('+');
// start the hunt with those args!
gimmeWeather(address);