const chai = require('chai');
const request = require('supertest');
const app = require('../../index');
const ERROR_MSG = require('../../errormsg');
const expect = chai.expect;

describe('server integration tests', function () {
   it('should return 404 when requesting on an invalid path', (done) => {
      request(app)
         .get('/invalidpath')
         .set('Accept', 'application/json')
         .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.deep.equal({
               "error": ERROR_MSG.NOT_FOUND
            });
            done();
         });
   });

   it('should return error when location is invalid', (done) => {
      request(app)
         .get('/weather/sdklfj')
         .set('Accept', 'application/json')
         .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.deep.equal({
               "error": ERROR_MSG.INVALID_LOCATION
            });
            done();
         });
   });

   it('should return error when weekday is invalid', (done) => {
      request(app)
         .get('/weather/sydney/sdl')
         .set('Accept', 'application/json')
         .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.deep.equal({
               "error": ERROR_MSG.INVALID_WEEKDAY
            });
            done();
         });
   });

   it('should return weather forecast for sydney', (done) => {
      request(app)
         .get('/weather/sydney')
         .set('Accept', 'application/json')
         .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.not.be.undefined;
            expect(res.body.location).to.equal('sydney');
            done();
         });
   });

   it('should return weather forecast for sydney on Tuesday', (done) => {
      request(app)
         .get('/weather/sydney/tuesday')
         .set('Accept', 'application/json')
         .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.not.be.undefined;
            expect(res.body.location).to.equal('sydney');
            expect(res.body.weekday).to.equal('tuesday');
            done();
         });
   });

   it('should return today weather forecast for sydney', (done) => {
      request(app)
         .get('/weather/sydney/today')
         .set('Accept', 'application/json')
         .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.not.be.undefined;
            expect(res.body.location).to.equal('sydney');
            expect(res.body.weekday).to.equal('today');
            done();
         });
   });
});