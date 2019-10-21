var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  suite('Function convertHandler.getNum(input)', function () {

    test('Whole number input', function (done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal Input', function (done) {
      var input = "5.2kg";
      assert.equal(convertHandler.getNum(input), 5.2);
      done();
    });

    test('Fractional Input', function (done) {
      var input = "6/2kg";
      assert.equal(convertHandler.getNum(input), 3);
      done();
    });

    test('Fractional Input w/ Decimal', function (done) {
      var input = "5/2kg";
      assert.equal(convertHandler.getNum(input), 2.5);
      done();
    });

    test('Invalid Input (double fraction)', function (done) {
      var input = "5/2/2kg"
      assert.equal(convertHandler.getNum(input), "INVALID");
      done();
    });

    test('No Numerical Input', function (done) {
      var input = "km"
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });

  });

  suite('Function convertHandler.getUnit(input)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      var expect = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg"]
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getUnit(ele), expect[i])
      });
      done();
    });

    test('Unknown Unit Input', function (done) {
      assert.equal(convertHandler.getUnit("125gals"), 'INVALID')
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      var input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      var expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.spellOutUnit(unit)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      var input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      var expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.convert(num, unit)', function () {

    test('Gal to L', function (done) {
      var input = [5, 'gal'];
      var expected = 18.92710;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

    test('L to Gal', function (done) {
      var input = [5, 'L'];
      var expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();

    });

    test('Mi to Km', function (done) {
      var input = [3.1, 'mi'];
      var expected = 4.98895;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

    test('Km to Mi', function (done) {
      var input = [3.1, 'km'];
      var expected = 1.92625;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

    test('Lbs to Kg', function (done) {
      var input = [50, 'lbs'];
      var expected = 22.67960;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

    test('Kg to Lbs', function (done) {
      var input = [50, 'kg'];
      var expected = 110.23122;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

  });

});