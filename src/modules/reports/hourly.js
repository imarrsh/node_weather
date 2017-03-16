const windDirection = require('./wind');
const percentage = require('./percentage');
const time = require('./time');

module.exports = function hourlyReport(data){
  const hours = data.hourly;
  const summary = hours.summary;

  const hourlyReport = hours.data.map((hour, i) => {
    let t = time.formatDate(hour.time);
    if (i <= 11){
      return `
    ${t.getHours()}:${('0' + t.getMinutes()).slice(-2)} ${hour.precipProbability ? 
        '\n' + percentage(hour.precipProbability) + ' chance of ' + hour.precipType : 
        '' }
    Winds ${Math.floor(hour.windSpeed)}mph, ${windDirection(hour.windBearing)}
      `;
    }
  }).join('');

  return `
    HOURLY:
    ${summary}
    ${hourlyReport}
    ...
    `;
};
