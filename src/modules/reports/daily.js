const formatDay = require('./time').formatDay;
const formatTime = require('./time').formatTime;

module.exports = function dailyReport(data){
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
};
