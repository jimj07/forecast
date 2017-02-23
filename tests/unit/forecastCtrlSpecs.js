const ForecastCtrl = require('../../server/controllers/forecastCtrl');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const chai = require('chai');
const sinon = require('sinon');
require('sinon-as-promised');

const forecastData = require('./testData/forecastData');
const geoData = require('./testData/geoData');

chai.use(chaiAsPromised);

describe('forecastCtrl unit tests', () => {
   let geocodeStub, forecastGetByDayStub, forecastGetAllStub;

   let geocode = {
      getGeocode: (location) => { }
   };

   let forecast = {
      getAll: () => { },
      getByDay: () => { }
   }

   let sydCoord = {
      latitude: -33.868,
      longtitude: 151.21
   }

   beforeEach(() => {
      geocodeStub = sinon.stub(geocode, 'getGeocode');
      forecastGetByDayStub = sinon.stub(forecast, 'getByDay');
      forecastGetAllStub = sinon.stub(forecast, 'getAll');
   })

   afterEach(() => {
      geocodeStub.restore();
      forecastGetByDayStub.restore();
      forecastGetAllStub.restore();
   });

   describe('getWeather()', () => {
      it('should return forecast data', () => {
         let forecastData = { data: "data" };
         let forecastCtrl = ForecastCtrl(forecast, geocode);

         geocodeStub.onCall(0).resolves(sydCoord);
         forecastGetAllStub.onCall(0).resolves(forecastData);

         return forecastCtrl.getWeather({
            location: "Sydney"
         }).then((data) => {
            expect(data).deep.equal(forecastData);
         })
      });

      it('should return forecast data for Tuesday', () => {
         let forecastData = { data: "data" };
         let forecastCtrl = ForecastCtrl(forecast, geocode);

         geocodeStub.onCall(0).resolves(sydCoord);
         forecastGetByDayStub.onCall(0).resolves(forecastData);

         return forecastCtrl.getWeather({
            location: "Sydney",
            weekday: 'Tuesday'
         }).then((data) => {
            expect(data).deep.equal(forecastData);
         })
      });

      it('should reject error: invalid location', () => {
         let error = 'Invalid Location';
         let forecastCtrl = ForecastCtrl(forecast, geocode);

         geocodeStub.onCall(0).rejects(error);

         let result = forecastCtrl.getWeather({
            location: "Sydney"
         });

         return expect(result).to.eventually.be.rejectedWith(error);
      });

      it('should reject error: invalid day', () => {
         let error = 'Invalid Day';
         let forecastCtrl = ForecastCtrl(forecast, geocode);

         geocodeStub.onCall(0).resolves(sydCoord);
         forecastGetAllStub.onCall(0).rejects(error);

         let result = forecastCtrl.getWeather({
            location: "Sydney"
         });

         return expect(result).to.eventually.be.rejectedWith(error);
      });
   });
});
