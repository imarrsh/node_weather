
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
    ${formatDate(current.time)}

    Currently, in ${location.formatted_address}:
    ${current.summary}, ${current.temperature}°F - Feels like ${current.apparentTemperature}°F 
    ${percentage(current.precipProbability)} chance of rain
    ${hourlyReport}
    
  
   ${poweredBy()}
  `;
  //${alerts}
  
  console.log(message);
}

function printMinutelyReport(data){
  const minutes = data.minutely;
  const summary = minutes.summary;
}

function printHourlyReport(data){
  const hours = data.hourly;
  const summary = hours.summary;

  const hourlyReport = hours.data.map((hour, i) => {
    let t = formatDate(hour.time);
    if (i <= 11){
      return `
    ${t.getHours()}:${('0' + t.getMinutes()).slice(-2)}
    ${summary}
    ${hour.precipProbability ? 
        percentage(hour.precipProbability) + ' chance of ' + hour.precipType : 
        '' }
    ${hour.windSpeed}mph ${calculateWindDirection(hour.windBearing)}
      `;
    }
  }).join('');

  return `
    HOURLY:
    ${hourlyReport}
    `;
}

function printDailyReport(data){
  const days = data.daily;
  const summary = days.summary;
}

function calculateWindDirection(bearing){
  const maxDeg = 360; // full circle
  const cardinals = ["N","NNE", "NE", "ENE", 
    "E", "ESE", "SE", "SSE", "S", "SSW", 
    "SW", "WSW", "W", "WNW", "NW", "NNW"];
  // how much of the pie consitutes a region?
  const region = maxDeg / cardinals.length; // 22.5°
  // add half a region amount to the bearing
  let adjustedBearing = bearing + (region / 2);
  // if greater than max, then subtract max
  if (adjustedBearing >= maxDeg){
    adjustedBearing = adjustedBearing - maxDeg;
  }

  return cardinals[Math.floor((adjustedBearing / region))];

  // return `
  //   Direction: ${cardinals[windDirection]}, 
  //   Index: ${(Math.floor(bearing / region))} 
  //   Orginal: ${bearing}° 
  //   windDirection: ${windDirection}`;
}

function printAlerts(alerts){
  // const 
  return alerts.map(alert => {
    const starts = formatDate(alert.time);
    const expires = formatDate(alert.expires);
    return `
    ALERTS
    
    ${alert.title} - ${alert.regions.join(', ')}
    ${starts} - ${expires}
    ${alert.description}
    `;
  }).join('\n');
}

function percentage(float){
  return Math.round(float * 100) + '%';
}

// Darksky automatically converts to seconds for us -
// this just converts the timestamp back to ms and 
// calls new date on it
function formatDate(timestamp){
  return new Date(timestamp * 1000);
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
  printErrors: printErrors,
  calculateWindDirection: calculateWindDirection
};