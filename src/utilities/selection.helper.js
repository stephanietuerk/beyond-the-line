export function getMarginVar(date, race) {
    if (date === '2016') {
        if (race === 'potus') {
          return 'USP_MARGIN_2016';
        }
        if (race === 'senate') {
          return 'USS_MARGIN_2016';
        }
        if (race === 'house') {
          return 'USC_MARGIN_2016';
        }
      }
    if (date === '2012') {
        if (race === 'potus') {
            return 'USP_MARGIN_2012';
        }
        if (race === 'senate') {
            return 'USS_MARGIN_2012';
        }
        if (race === 'house') {
            return 'USC_MARGIN_2012';
        }
    }
    if (date === 'change') {
        if (race === 'potus') {
          return 'USP_MARGIN_CHANGE';
        }
        if (race === 'senate') {
          return 'USS_MARGIN_CHANGE';
        }
        if (race === 'house') {
          return 'USC_MARGIN_CHANGE';
        }
    } 
}

export function getDemoVar(demo, change) {
    if (demo === 'popden') {
        return change ? 'POPDEN_CHANGE' : 'POPDEN_2015';
      }
      if (demo === 'nonwhite') {
        return change ? 'NONWHITE_CHANGE' : 'NONWHITE_2015';
      }
      if (demo === 'unemployed') {
        return change ? 'UNEMPLOY_CHANGE' : 'UNEMPL0Y_2015';
      }
      if (demo === 'college') {
        return change ? 'COLLEGE_CHANGE' : 'COLLEGE_2015';
      }
      if (demo === 'income') {
        return change ? 'INC_CHANGE' : 'INC_2015';
      }
}
