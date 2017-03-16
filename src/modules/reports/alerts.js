const formatDay = require('./time').formatDay;
const formatTime = require('./time').formatTime;

module.exports = function printAlerts(alerts){
  // const 
  const alertList =  alerts.map(alert => {
    const starts = alert.time;
    const expires = alert.expires;
    return `
    ${alert.title} - ${alert.regions.join(', ')}
    ${formatDay(starts)} ${formatTime(starts)} - ${formatDay(expires)} ${formatTime(expires)}
    ${alert.description}
  `;
  }).join('\n');

  return `ALERTS
  ${alertList}
  `;
};
