'use strict';
const moment = require('moment');
const ISO_DAY = {
   'monday': 1,
   'tuesday': 2,
   'wednesday': 3,
   'thursday': 4,
   'friday': 5,
   'saturday': 6,
   'sunday': 7
};

const getCurDay = (unixtime, timezone) => {
   let day = moment.unix(unixtime).utcOffset(timezone);
   return day.isoWeekday();
};

const getISODay = (day) => {
   if (day === undefined || typeof day !== 'string') {
      return undefined;
   }

   return ISO_DAY[day.toLowerCase()];
};

module.exports.getCurDay = getCurDay;
module.exports.getISODay = getISODay;