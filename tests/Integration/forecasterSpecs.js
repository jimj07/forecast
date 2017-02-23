const DarkSky = require('forecast.io');
const Forecaster = require('../../modules/forecaster');
const env = require('../../env');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('forecaster integration test', () => {
    let darkSky = new DarkSky({
        APIKey: env.DARK_SKY_API_KEY,
        timeout: env.DARK_SKY_TIMEOUT
    });

    let sydCoord = {
        lat: 33.8688,
        long: 151.2093,
        offset: 10
    };

    describe('getAll', () => {
        it('should return forecast data', () => {
            let forecaster = Forecaster(darkSky);
            return forecaster.getAll(sydCoord.lat, sydCoord.long)
                .then((result) => {
                    expect(result).not.be.undefined;
                    expect(result.latitude).equal(sydCoord.lat);
                    expect(result.longitude).equal(sydCoord.long);
                    expect(result.offset).equal(sydCoord.offset);
                });
        });
    });

    describe('getByDay', () => {
        it('should return forecast data', () => {
            let forecaster = Forecaster(darkSky);
            return forecaster.getAll(sydCoord.lat, sydCoord.long, 'Friday')
                .then((result) => {
                    expect(result).not.be.undefined;
                    expect(result.latitude).equal(sydCoord.lat);
                    expect(result.longitude).equal(sydCoord.long);
                    expect(result.offset).equal(sydCoord.offset);
                });
        });
    });
});