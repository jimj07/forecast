'use strict';
const _ = require('lodash');
const ERROR_MSG = require('../errormsg');

module.exports = (mapbox) => {

   // get the coordinates for the provided location
   const getGeocode = (location) => {
      return new Promise((resolve, reject) => {
         mapbox.geocodeForward(location, function (err, res) {
            if (err) {
               reject(err);
            } else {
               let coordinates = _.get(res, 'features.0.geometry.coordinates');
               if (coordinates === undefined) {
                  reject(ERROR_MSG.INVALID_LOCATION);
               } else {
                  let longtitude = coordinates[0];
                  let latitude = coordinates[1];
                  resolve({
                     longtitude: longtitude,
                     latitude: latitude
                  });
               }
            }
         });
      });
   };

   return {
      getGeocode: getGeocode
   };
};