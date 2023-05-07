// const { Postgresql } = require('./Models/postgreSQL');
const { sum } = require('../Models/examples');

describe('sum function', () => {
    test('adds two numbers correctly', () => {
        expect(sum(2, 2)).toEqual(4);
    });

    test('adds a negative number correctly', () => {
        expect(sum(2, -4)).toEqual(-2);
    });

    test('adds two floating-point numbers correctly', () => {
        expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    });
});