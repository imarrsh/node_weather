const https = require('https');
const http = require('http');
const api = require('./api.json').googleGeo;

function fetchGeocode(address){
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  const key = '&key=' + api.key;
  let message, data, resultsError, statusCodeError;
  
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
              data = JSON.parse(body);
              // check the status property on the data
              if(data.status === 'OK'){
                resolve(data.results[0]);
              } else {
                // if input doesnt resolve an actual location
                // create new Error
                message = 'No results matched location.';
                resultsError = new Error(message);
                reject(resultsError);
              }
            } catch(err){
              reject(err.message);
            }
          });

        } else {
          message = `There was a problem getting the location. (${http.STATUS_CODES[resp.statusCode]})`;
          statusCodeError = new Error(message);
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
};