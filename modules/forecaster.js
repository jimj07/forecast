const _ = require('lodash');
const weekday = require('./weekday');
const ERROR_MSG = require('../errormsg');
const DAILY_ARR_LENGTH = 8;

module.exports = (darkSky) => {
   // Private
   const options = {
      exclude: 'minutely,hourly,flags,alert',
      units: 'auto'
   };

   const getIndexByDay = (curDay, forecastDay) => {
      let diff = forecastDay - curDay;
      return diff > 0 ? diff : DAILY_ARR_LENGTH + diff - 1;
   };

   // Public
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