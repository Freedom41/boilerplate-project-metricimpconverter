function ConvertHandler() {

  var metricUnits = ["kg", "lbs", "km", "mi", "gal", "l"];

  this.getNum = function (input) {
    var result;
    for (let i = 0; i < input.length; i++) {
      if (input[i] != Number(input[i]) && input[i] != "." && input[i] != "/") {
        result = input.slice(0, i)
        break;
      } else {
        result = "INVALID";
      }
    }
    if (result.includes("/") && (result.indexOf("/") == result.lastIndexOf("/"))) {
      result = result.split("/")
      result = result[0] / result[1]
    }
    if (result == 0) {
      result = 1;
      return result;
    }
    if (result != Number(result)) {
      result = "INVALID"
    }
    return result;
  };

  this.getUnit = function (input) {
    var result;
    for (let i = 0; i < input.length; i++) {
      if (input[i] != Number(input[i]) && input[i] != "." && input[i] != "/") {
        let unit = input.slice(i);
        if (unit == unit.toUpperCase()) {
          unit = unit.toLowerCase();
        }
        if (metricUnits.includes(unit)) {
          result = unit;
          if (result == "l") {
            result = "L"
          }
        } else {
          result = "INVALID"
        }
        break;
      }
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    var result;
    if (initUnit == "km") {
      result = "mi"
    }
    if (initUnit == "kg") {
      result = "lbs"
    }
    if (initUnit == "mi") {
      result = "km"
    }
    if (initUnit == "lbs") {
      result = "kg"
    }
    if (initUnit == "gal") {
      result = "L"
    }
    if (initUnit == "L") {
      result = "gal"
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    var result = {
      "lbs": "pounds",
      "gal": "gallons",
      "L": "liters",
      "km": "kilometers",
      "mi": "miles",
      "kg": "kilograms"
    }

    return result[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;

    if (initUnit == "km") {
      result = initNum / miToKm;
    }
    if (initUnit == "kg") {
      result = initNum / lbsToKg;
    }
    if (initUnit == "mi") {
      result = initNum * miToKm;
    }
    if (initUnit == "lbs") {
      result = initNum * lbsToKg;
    }
    if (initUnit == "gal") {
      result = initNum * galToL;
    }
    if (initUnit == "L") {
      result = initNum / galToL
    }
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    var result;

    if (initNum == "INVALID" && initUnit == "INVALID") {
      result = "Invalid Number and unit"
    }
    else if (initUnit == "INVALID") {
      result = "Invalid unit"
    }
    else if (initNum == "INVALID") {
      result = "Invalid Number"
    }
    else {
      result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`
    }
    return result;
  };

}

module.exports = ConvertHandler;
