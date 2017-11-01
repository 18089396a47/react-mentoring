import getYear from '../getYear';

describe('GetYear helper', () => {
    it('GetYear helper should return \'unknown\' if invalid format', () => {
        expect(getYear('invalid')).toBe('unknown');
    });

    it('GetYear helper should return full year if valid format', () => {
        expect(getYear('2002-11-1')).toBe(2002);
    });
});
