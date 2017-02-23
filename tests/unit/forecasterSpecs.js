const Forecaster = require('../../modules/forecaster');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const chai = require('chai');
const sinon = require('sinon');

const forecastData = require('./testData/forecastData');

chai.use(chaiAsPromised);

describe('forecaster unit tests', () => {
    let darksky = {
        get: () => { }
    };
    let darkskyGetStub;

    beforeEach(() => {
        darkskyGetStub = sinon.stub(darksky, 'get');
    });

    afterEach(() => {
        darkskyGetStub.restore();
    });

    describe('getAll()', () => {
        it('should return data', () => {
            darkskyGetStub.onCall(0).callsArgWith(3, undefined, 'res', 'data');
            let forecaster = Forecaster(darksky);
            let result = forecaster.getAll('lat', 'long');
            return expect(result).to.eventually.equals('data');
        });

        it('should reject error', () => {
            darkskyGetStub.onCall(0).callsArgWith(3, 'err');
            let forecaster = Forecaster(darksky);
            let result = forecaster.getAll('lat', 'long');
            return expect(result).to.eventually
                .be.rejectedWith('err');
        });
    });

    describe('getByDay()', () => {
        it('should return Tuesday data (forecastData.daily.data[5])', () => {
            darkskyGetStub.onCall(0).callsArgWith(3, undefined, 'res', forecastData);
            let forecaster = Forecaster(darksky);
            let result = forecaster.getByDay('lat', 'long', 'Tuesday');
            return expect(result).to.eventually
                .deep.equal(forecastData.daily.data[5]);
        });

        it('should return Friday data (forecastData.daily.data[1])', () => {
            darkskyGetStub.onCall(0).callsArgWith(3, undefined, 'res', forecastData);
            let forecaster = Forecaster(darksky);
            let result = forecaster.getByDay('lat', 'long', 'fRiDay');
            return expect(result).to.eventually
                .deep.equal(forecastData.daily.data[1]);
        });

        it('should return today data (forecastData.daily.data[0])', () => {
            darkskyGetStub.onCall(0).callsArgWith(3, undefined, 'res', forecastData);
            let forecaster = Forecaster(darksky);
            let result = forecaster.getByDay('lat', 'long', 'today');
            return expect(result).to.eventually
                .deep.equal(forecastData.daily.data[0]);
        });

        it('should reject error: Invalid Weekday', () => {
            darkskyGetStub.onCall(0).callsArgWith(3, undefined, 'res', forecastData);
            let forecaster = Forecaster(darksky);
            let result = forecaster.getByDay('lat', 'long', 'abc');
            return expect(result).to.eventually
                .be.rejectedWith('Invalid Weekday');
        });

        it('should reject error', () => {
            darkskyGetStub.onCall(0).callsArgWith(3, 'err');
            let forecaster = Forecaster(darksky);
            let result = forecaster.getByDay('lat', 'long', 'abc');
            return expect(result).to.eventually
                .be.rejectedWith('err');
        });
    });
});