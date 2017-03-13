
function printCurrentReport(data){
  const current = data.currently;
  let alerts = ''
  , message = '';

  if (data.alerts){
    alerts = printAlerts(data.alerts);
  }

  const hourlyReport = printHourlyReport(data);

  const location = data.geolocation;
  message = `
    ${Date(current.time)}

    Currently, in ${location.formatted_address}:
    ${current.summary}, ${current.temperature}°F - Feels like ${current.apparentTemperature}°F 
    ${percentage(current.precipProbability)} chance of rain
    ${hourlyReport}
    ${alerts}
  
   ${poweredBy()}
  `;
  
  console.log(message);
}

function printMinutelyReport(data){
  const minutes = data.minutely;
  const summary = minutes.summary;
}

function printHourlyReport(data){
  const hours = data.hourly;
  const summary = hours.summary;

  const hourlyReport = hours.data.map(hour => {
      let t = new Date(hour.time * 1000);
      return `
    ${t.getHours()}:${('0' + t.getMinutes()).slice(-2)}
    ${summary}${hour.precipProbability ? 
        ', ' + percentage(hour.precipProbability) + ' chance of ' + hour.precipType : 
        '' }
      `;
  }).join('');

  return hourlyReport;
}

function printDailyReport(data){
  const days = data.daily;
  const summary = days.summary;
}

function printAlerts(alerts){
  return alerts.map(alert => {
    return `
    ALERTS
    
    ${alert.title}
    ${Date(alert.time)} - ${Date(alert.expires)}
    ${alert.description}
    `;
  }).join('\n');
}

function percentage(float){
  return Math.round(float * 100) + '%';
}

function printErrors(error){
  const errMsg = `\n  ${error}\n`;
  console.error(errMsg);
}

function poweredBy(){
  return '⚡️ Powered By Dark Sky & Google Geocoding';
}

module.exports = {
  printCurrentReport: printCurrentReport,
  printErrors: printErrors
}