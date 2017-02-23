const _ = require('lodash');
const weekday = require('./weekday');
const ERROR_MSG = require('../errormsg');
const DAILY_ARR_LENGTH = 8;

module.exports = (darkSky) => {
   // Private

   // options for darkSky
   const options = {
      exclude: 'minutely,hourly,flags,alert',
      units: 'auto'
   };

   // Get the index of daily.data array for the forecast day 
   const getIndexByDay = (curDay, forecastDay) => {
      let diff = forecastDay - curDay;
      return diff > 0 ? diff : DAILY_ARR_LENGTH + diff - 1;
   };

   // Public

   // Get all the weather forecast data for the location
   const getAll = (lat, long) => {
      return new Promise((resolve, reject) => {
         darkSky.get(lat, long, options, (err, res, data) => {
            if (err) {
               reject(err);
            } else {
               resolve(data);
            }
         });
      });
   };

   // Get the weather forecast data for the location on a specific day
   const getByDay = (lat, long, day) => {
      return new Promise((resolve, reject) => {
         getAll(lat, long)
            .then(res => {
               if (day.toLowerCase() === 'today') {
                  resolve(_.get(res, 'daily.data.0'));
               } else {
                  let forecastDay = weekday.getISODay(day);
                  if (forecastDay === undefined) {
                     reject(ERROR_MSG.INVALID_WEEKDAY);
                  }

                  // Finding the data in the right position of daily.data array
                  let curtime = _.get(res, 'currently.time');
                  let timezone = _.get(res, 'offset');
                  let curDay = weekday.getCurDay(curtime, timezone);
                  let index = getIndexByDay(curDay, forecastDay);
                  let weather = _.get(res, `daily.data.${index}`);
                  resolve(weather);
               }

            })
            .catch(err => {
               reject(err);
            });
      });
   };

   return {
      getAll: getAll,
      getByDay: getByDay,
   };
};