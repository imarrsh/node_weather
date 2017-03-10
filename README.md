# Node Weather App 
###### (Theres probably hundreds of these)

### Overview
Super simple Node weather app that runs on the command line. 

Location data is fetched from the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) and then approximate gps coordinates are fed to the [DarkSky API](https://darksky.net/dev/) to fetch the weather for that location. The request functions return [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and uses a then-chain to collect information as the api calls are made.


### Running the app
The following commands will give the current weather report:
```bash
# from the root directory
$ node src/app.js Augusta, Ga

# or via yarn/npm run
$ yarn run weather 30907
```
### API Usage
API Keys are not included for obvious resions, but one could plug their own API keys in a json file to get it working locally. An example:
```json
{
  "<api-alias>": { "key": "<api-key>"}
}
```
### Notes
This is just a small project that I wanted to make as a learning tool for exploring Node.js and other concepts, like Promises, in JS. I have a vision for a personal dashboard in the future that may end up rolling this project's code onto a proxy server to interact with the DarkSky API. 

Feel free to clone or fork the project for your own exploration!