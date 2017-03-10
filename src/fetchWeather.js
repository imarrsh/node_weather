const https = require('https');
const http = require('http');
const api = require('./api.json').darkSky;

function fetchWeather(location){

  const gps = location.geometry.location;
  const position = `${gps.lat},${gps.lng}`;
  const options = {
    hostname: 'api.darksky.net',
    path: '/forecast/' + api.key + '/' + position,
    method: 'GET'
  };

  return new Promise(function(resolve, reject){

    try {
      var req = https.request(options, (res) => {
        const status = res.statusCode;

        if (res.statusCode === 200){
          let body = "";

          // listen for data event
          res.on('data', (d) => {
            // convert from Buffer to string
            body += d.toString();
          })
          // when the data has fully downloaded,
          // parse into object and console.dir it
          res.on('end', () => {
            try {
              // try to parse body
              const report = JSON.parse(body);
              //attach location info to report
              report.geolocation = location;
              resolve(report);
            } catch(err) {
              // invalid JSON, print message
              reject(err.message);
            }
          });
        } else {
          // handle 404s
          const message = `There was a problem getting the weather. (${http.STATUS_CODES[status]})`;
          const statusCodeError = new Error(message);
          reject(statusCodeError);
        }

      });

      req.on('error', (err) => {
        reject(err.message);
      })

      req.end();

    } catch(err) {
      reject(err.message);
    }

  });
}

// const address = process.argv.slice(2);
// // const address = [33.518840, -82.120223];
// fetchWeather(address[0], address[1]);

module.exports = {
  fetchWeather: fetchWeather
}
