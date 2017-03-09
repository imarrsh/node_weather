const https = require('https');
const http = require('http');
const api = require('./api.json').googleGeo;

function fetchGeocode(address){
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  const key = '&key=' + api.key;
  
  return new Promise(function(resolve, reject){
    try {

      const req = https.request(url + address + key, (resp) => {
        // console.log(resp.statusCode);
        if (resp.statusCode === 200){

          let body = "";
          resp.on('data', d => {
            body += d.toString();
          });

          resp.on('end', () => {
            try {
              const data = JSON.parse(body).results[0];
              resolve(data);
            } catch(err){
              reject(err.message + 'poo poo');
            }
          });

        } else {
          const message = `There was a problem getting the location. (${http.STATUS_CODES[resp.statusCode]})`;
          const statusCodeError = new Error(message);
          reject(statusCodeError);
        }

      });

      req.on('error', err => {
        reject(err.message);
      });

      req.end();

    } catch (err){
      reject(err.message);
    }

  });

}

module.exports = {
  fetchGeocode: fetchGeocode
}