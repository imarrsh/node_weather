# Node Weather App 
###### Runs on Node v7.7.2

Super simple Node weather app that runs on the command line. 

Location data is fetched from the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) and then approximate gps coordinates are fed to the [DarkSky](https://darksky.net/dev/) API to fetch the weather for that location. The request functions return [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and uses a then-chain to collect information as the api calls are made.



The following command will give the current weather report:
```bash
# from the root directory
$ node src/app.js Augusta, Ga

# or via yarn/npm run
$ yarn run weather 30907
```

API Keys are not included for obvious resions, but one could plug their own API keys in to get it working locally. An example:
```json
{
  "<api-alias>": { "key": "<api-key>"}
}
```

This is just a small pet project that I wanted to do to explore Node and Promises in JS