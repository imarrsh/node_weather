const expect = require('chai').expect;
const windDirection = require('../src/modules/reports/wind.js');


describe('CONSOLE REPORTING HELPERS:', function(){
  describe('windDirection', function(){
    it('should return `NNE` when the wind bearing is `12` degrees', function(){
      const value = windDirection(12);
      expect(value).to.equal('N-NE');
    });
  });
});