const MapBox = require('mapbox');
const Geocode = require('../../modules/geocode');
const env = require('../../env');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiAsPromised);

describe('geocode integration tests', () => {
    let mapbox = new MapBox(env.MAP_BOX_API_KEY);

    let sydCoord = {
        latitude: -33.868,
        longtitude: 151.21
    }

    describe('getGeocode', () => {
        it('should return geo code for sydney', () => {
            let geocode = Geocode(mapbox);
            return geocode.getGeocode('Sydney')
                .then((res) => {
                    expect(res).deep.equal(sydCoord);
                })
        });

        it('should reject error: Invalid Location', () => {
            let geocode = Geocode(mapbox);
            let result = geocode.getGeocode('sdfjkl');
            return expect(result).to.eventually.be.rejectedWith('Invalid Location');
        });
    });
});