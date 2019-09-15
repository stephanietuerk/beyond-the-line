export default class SelectionHelper {
  getMarginVar(date, race) {
    if (date === '2016') {
      if (race === 'potus') {
        return 'potus2016';
      }
      if (race === 'senate') {
        return 'senate2016';
      }
      if (race === 'house') {
        return 'house2016';
      }
    }
    if (date === '2012') {
      if (race === 'potus') {
        return 'potus2012';
      }
      if (race === 'senate') {
        return 'senate2012';
      }
      if (race === 'house') {
        return 'house2012';
      }
    }
    if (date === 'change') {
      if (race === 'potus') {
        return 'potusChange';
      }
      if (race === 'senate') {
        return 'senateChange';
      }
      if (race === 'house') {
        return 'houseChange';
      }
    }
  }

  getBarsVar(demo, change) {
    if (demo === 'popDen') {
      return change ? 'popDenChange' : 'popDen';
    }
    if (demo === 'nonWhite') {
      return change ? 'nonWhiteChange' : 'nonWhite';
    }
    if (demo === 'unemployment') {
      return change ? 'unemploymentChange' : 'unemployment';
    }
    if (demo === 'college') {
      return change ? 'collegeChange' : 'college';
    }
    if (demo === 'income') {
      return change ? 'incomeChange' : 'income';
    }
  }
}
