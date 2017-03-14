const expect = require('chai').expect;
const calculateWindDirection = require('../src/printReport.js').calculateWindDirection;

describe('calculateWindDirection', function(){
  it('should return `NNE` when the wind direction is `12`', function(){
    const value = calculateWindDirection(12);
    expect(value).to.equal('NNE');
  });
});