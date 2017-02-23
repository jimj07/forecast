const _ = require('lodash');
const DarkSky = require('forecast.io');
const MapBox = require('mapbox');
const json2html = require('json2html')
const ForecastCtrl = require('../controllers/forecastCtrl');
const Forecaster = require('../../modules/forecaster');
const Geocode = require('../../modules/geocode');
const env = require('../../env');

const mapbox = new MapBox(env.MAP_BOX_API_KEY);
const darkSky = new DarkSky({
    APIKey: env.DARK_SKY_API_KEY,
    timeout: env.DARK_SKY_TIMEOUT
});


const forecaster = Forecaster(darkSky);
const geocode = Geocode(mapbox);
const forecastCtrl = ForecastCtrl(forecaster, geocode);

const response = (req, res, data) => {
    if (req.accepts('html')) {
        res.send(json2html.render(data));
    } else if (req.accepts('json')) {
        res.json(data);
    }
}

module.exports = (extraQuery) => {
    return (req, res) => {
        let query = req.params;
        if (extraQuery) {
            query = _.merge(query, extraQuery);
        }
        forecastCtrl.getWeather(query)
            .then((data) => {
                data = _.merge(query, data);
                res.status(200);
                response(req, res, data);
            })
            .catch(err => {
                res.status(400);
                response(req, res, {
                    "error": err
                });
            });
    }

};