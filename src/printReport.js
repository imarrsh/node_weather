module.exports = function printCurrentReport(data){
  // TODO: build up a better report
  const current = data.currently;
  const location = data.geolocation;
  const message = `
    \t${location.formatted_address}
    \tCurrently, it is ${current.summary.toLowerCase()} at ${current.temperature}°F with a ${current.precipProbability}% chance of rain.\n
    \t- Powered By Dark Sky & Google Geocoding
  `;
  
  console.log(message);
}