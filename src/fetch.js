// in progress...

const https = require('https');
const http = require('http');
const zlib = require('zlib');

module.exports = function fetch(url){
  return new Promise(function(resolve, reject){
    try {
      // request some data
      const req = https.request(url, response => {
        const status = respsone.statusCode;
        if (status === 200){
          let body = '';
          // we need to also determine if gzip headers/option is passed
          
        } else {
          // handle not found
          const message = `There was a problem (${http.STATUS_CODES[status]})`;
          const statusCodeError = new Error(message);
          reject(statusCodeError);
        }
      });

      req.on('error', (err) => {
        reject(err.message);
      });

    } catch (err) {
      // if the whole thing fails
      reject(err.message);
    }
  });
};

