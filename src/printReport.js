const hourlyReport = require('./modules/reports/hourly');
const dailyReport = require('./modules/reports/daily');
const weatherAlerts = require('./modules/reports/alerts');
const percentage = require('./modules/reports/percentage');
const formatDate = require('./modules/reports/time').formatDate;
const formatDay = require('./modules/reports/time').formatDay;

function printCurrentReport(data){
  const current = data.currently;
  let alerts = ''
  , message = '';

  if (data.alerts){
    alerts = weatherAlerts(data.alerts);
  }


  const location = data.geolocation;
  message = `
    ${formatDate(current.time)}

    Currently, in ${location.formatted_address}:
    ${current.summary}, ${current.temperature}°F - Feels like ${current.apparentTemperature}°F 
    ${percentage(current.precipProbability)} chance of rain
    ${hourlyReport(data)}
    ${dailyReport(data)}
    ${alerts}
    
   ${poweredBy()}
  `;
  
  console.log(message); 
}

function poweredBy(){
  return '⚡️ Powered By Dark Sky & Google Geocoding';
}

module.exports = {
  printCurrentReport: printCurrentReport
};