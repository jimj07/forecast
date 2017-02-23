# Forecast
Get weather forecast.
## Design

Third Parties API:
DarkSky - weather forecast
MapBox - get coordinates of a location

**modules/forecaster.js**
Forecaster is responsible for doing API calls to DarkSky to get weather forecast data.
getAll(): get all the data for the location, including currently, 8 days forecast.
getByDay(): only get the data on the specific day for the location.

**modules/geocode.js**
Geocode is responsible for getting the coordinates of the provided location. 
Note: MapBox can return multiple results for the provided location. For the simplicity, Geocode always pick the first one.

**controllers/forecastCtrl.js**
ForecastCtrl is a controller for getting the forecast data by location.

**middlewares/notFound.js**
handle 404 error

**middlewares/processReq.js**
Handling request. Return the weather forecast if the request is valid. Otherwise return error message.

**routes.js**
Routing based on path

## How to run:
#### Start app
npm start
#### Run tests
npm run test
#### Run tests with code coverage tool istanbul
npm run coverage