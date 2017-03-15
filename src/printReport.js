
function printCurrentReport(data){
  const current = data.currently;
  let alerts = ''
  , message = '';

  if (data.alerts){
    alerts = printAlerts(data.alerts);
  }

  const hourlyReport = printHourlyReport(data);
  const dailyReport = printDailyReport(data);

  const location = data.geolocation;
  message = `
    ${formatDate(current.time)}

    Currently, in ${location.formatted_address}:
    ${current.summary}, ${current.temperature}°F - Feels like ${current.apparentTemperature}°F 
    ${percentage(current.precipProbability)} chance of rain
    ${hourlyReport}
    ${dailyReport}
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

  const hourlyReport = hours.data.map((hour, i) => {
    let t = formatDate(hour.time);
    if (i <= 11){
      return `
    ${t.getHours()}:${('0' + t.getMinutes()).slice(-2)}
    ${summary}${hour.precipProbability ? 
        '\n' + percentage(hour.precipProbability) + ' chance of ' + hour.precipType : 
        '' }
    Winds ${Math.floor(hour.windSpeed)}mph, ${calculateWindDirection(hour.windBearing)}
      `;
    }
  }).join('');

  return `
    HOURLY:
    ${hourlyReport}
    ...
    `;
}

function printDailyReport(data){
  const days = data.daily;
  const summary = days.summary;

  const week = days.data.map(day => {
    return `
    ${formatDay(day.time)}
    ${day.summary}
    Sunrise ${formatTime(day.sunriseTime)}, Sunset ${formatTime(day.sunsetTime)}
    `;
  }).join('');

  return `
    REST OF THE WEEK:
    ${summary}
    ${week}
  `;
}

function calculateWindDirection(bearing){
  const maxDeg = 360; // full circle
  const cardinals = [
    "N","N-NE", "NE", "E-NE", "E",
    "E-SE", "SE", "S-SE", "S", "S-SW", 
    "SW", "W-SW", "W", "W-NW", "NW", "N-NW"
  ];
  // how much of the pie consitutes a region?
  const region = maxDeg / cardinals.length; // 22.5°
  // add half a region amount to the bearing
  let adjustedBearing = bearing + (region / 2);
  // if greater than max, then subtract max
  if (adjustedBearing >= maxDeg){
    adjustedBearing = adjustedBearing - maxDeg;
  }
  // return the region we're blowing at
  return cardinals[Math.floor((adjustedBearing / region))];

}

function printAlerts(alerts){
  // const 
  const alertList =  alerts.map(alert => {
    const starts = formatDate(alert.time);
    const expires = formatDate(alert.expires);
    return `
    ${alert.title} - ${alert.regions.join(', ')}
    ${starts} - ${expires}
    ${alert.description}
  `;
  }).join('\n');

  return `ALERTS
  ${alertList}
  `;
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

function formatTime(timestamp){
  const d = formatDate(timestamp);
  const hr = d.getHours();
  const min = d.getMinutes();
  return `${hr}:${min}`;
}

function formatDay(timestamp){
  const d = formatDate(timestamp);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mons = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May','Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.' ];
  const day = days[d.getDay()]; // day of week
  const date = d.getDate(); // day of month
  const mon = mons[d.getMonth()];
  const yr = d.getFullYear();

  return `${day}, ${mon} ${date}, ${yr}`;
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