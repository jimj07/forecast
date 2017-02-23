'use strict';

module.exports = (forecaster, geocode) => {
   const getWeather = (query) => {
      return geocode.getGeocode(query.location)
         .then((coordinates) => {
            if (query.weekday) {
               return forecaster.getByDay(
                  coordinates.latitude,
                  coordinates.longtitude,
                  query.weekday
               );
            } else {
               return forecaster.getAll(
                  coordinates.latitude,
                  coordinates.longtitude
               );
            }
         });
   };

   return {
      getWeather: getWeather
   };
};