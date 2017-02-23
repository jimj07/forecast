const weekday = require('../../modules/weekday');
const expect = require('chai').expect;
const chai = require('chai');

describe('weekday unit tests', () => {
    describe('getCurDay()', () => {
        it('should return 3 as Wednesday', () => {
            let day = weekday.getCurDay(1487772000, 0);
            expect(day).to.equal(3);
        });
    });

    describe('getISODay()', () => {
        it('should return the correct number for valid weekdays', () => {
            expect(weekday.getISODay('monday')).to.equal(1);
            expect(weekday.getISODay('Tuesday')).to.equal(2);
            expect(weekday.getISODay('Wednesday')).to.equal(3);
            expect(weekday.getISODay('Thursday')).to.equal(4);
            expect(weekday.getISODay('Friday')).to.equal(5);
            expect(weekday.getISODay('Saturday')).to.equal(6);
            expect(weekday.getISODay('Sunday')).to.equal(7);
        });

        it('should return undefined for undefined', () => {
            let day = weekday.getISODay();
            expect(day).to.be.undefined;
        });

        it('should return undefined for non-string', () => {
            let day = weekday.getISODay();
            expect(day).to.be.undefined;
        });

        it('should return undefined for invalid data', () => {
            let day = weekday.getISODay('abcdefg');
            expect(day).to.be.undefined;
        });
    });
});