const Geocode = require('../../modules/geocode');
const env = require('../../env');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const geoData = require('./testData/geoData');

chai.use(chaiAsPromised);

describe('geocode unit tests', () => {
    let mapbox = {
        geocodeForward: () => { }
    };
    let mapboxGetgeocodeStub;

    let sydCoord = {
        latitude: -33.868,
        longtitude: 151.21
    };

    beforeEach(() => {
        mapboxGetgeocodeStub = sinon.stub(mapbox, 'geocodeForward');
    });

    afterEach(() => {
        mapboxGetgeocodeStub.restore();
    });

    describe('getGeocode()', () => {
        it('should return geo code for sydney', () => {
            let geocode = Geocode(mapbox);
            mapboxGetgeocodeStub.onCall(0).callsArgWith(1, undefined, geoData);
            return geocode.getGeocode('Sydney')
                .then((res) => {
                    expect(res).deep.equal(sydCoord);
                });
        });

        it('should reject error: Invalid Location', () => {
            let geocode = Geocode(mapbox);
            mapboxGetgeocodeStub.onCall(0).callsArgWith(1, undefined, {});
            let result = geocode.getGeocode('sdfjkl');
            return expect(result).to.eventually.be.rejectedWith('Invalid Location');
        });

        it('should reject error: err', () => {
            let geocode = Geocode(mapbox);
            mapboxGetgeocodeStub.onCall(0).callsArgWith(1, 'err');
            let result = geocode.getGeocode('sdfjkl');
            return expect(result).to.eventually.be.rejectedWith('err');
        });
    });
});