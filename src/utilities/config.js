export const rColor = '#f4003d';
export const dColor = '#2437ff';
export const dMapColor = '#394bff';
export const oColor = '#f6b500';
export const initialColor = '#cccccc';
export const dkGrey = '#bbbbbb';

export const voteRedRange = ['#f8e5e6', '#dd0035'];
export const voteBlueRange = ['#3c5bff', '#d2e4ff'];
export const changeRedRange = ['#f8e5e6', '#dd0035'];
export const changeBlueRange = ['#3c5bff', '#e6f0ff'];

export const mapWidth = 600;
export const mapHeight = 380;
export const lineWidth = 60;
export const lineHeight = 350;
export const barsContainer = {
  width: 600,
  height: 700,
  margin: { left: 20, top: 20, right: 0, bottom: 0 }
};
export const barsIndex = {
  width: 40,
  height: 700,
  margin: { left: 20, top: 30, right: 0, bottom: 0 }
};
export const bars = {
  width: 400,
  height: 700,
  margin: {
    left: barsIndex.margin.left + barsIndex.width + 50,
    top: barsIndex.margin.top,
    right: 0,
    bottom: 0
  }
};
export const barsZoomLevels = 5;
export const numBarQuantiles = 10;

// export const barsWidth = 400;
// export const barsHeight = 3500;
// export const barsContainerMargin = {left: 20, top: 50, right: 0, bottom: 0};

export const placeNamesOn = true;
export const cityNamesNorth = [
  'Bethlehem',
  'Philadelphia',
  'Pittsburgh',
  'Levittown'
];

export const initDate = '2016';
export const initRace = 'potus';
export const initDemo = 'popDen';
export const initDemoChange = false;
export const initGeoLabels = true;
export const initMarginVar = 'potus2016';
export const initBarsVar = 'popDen';

export const dateOptions = [
  {
    displayText: '2016',
    value: '2016'
  },
  {
    displayText: '2012',
    value: '2012'
  },
  {
    displayText: 'change',
    value: 'change'
  }
];

export const raceOptions = [
  {
    displayText: 'president',
    value: 'potus'
  },
  {
    displayText: 'us senate',
    value: 'senate'
  },
  {
    displayText: 'us house',
    value: 'house'
  }
];

export const demoOptions = [
  {
    displayText: 'population density',
    value: 'popDen'
  },
  {
    displayText: 'percent non-white',
    value: 'nonWhite'
  },
  {
    displayText: 'unemployment rate',
    value: 'unemployment'
  },
  {
    displayText: 'education',
    value: 'college'
  },
  {
    displayText: 'income',
    value: 'income'
  }
];
export const demoChangeOptions = {
  displayText: 'change 2010-2015',
  value: 'demoChange'
};

export const dataOptions = [
  { val: 'potus2016', rawVal: 'USP_MARGIN_2016' },
  { val: 'potus2012', rawVal: 'USP_MARGIN_2012' },
  { val: 'potusChange', rawVal: 'USP_MARGIN_CHANGE' },
  { val: 'senate2016', rawVal: 'USS_MARGIN_2016' },
  { val: 'senate2012', rawVal: 'USS_MARGIN_2012' },
  { val: 'senateChange', rawVal: 'USS_MARGIN_CHANGE' },
  { val: 'house2016', rawVal: 'USC_MARGIN_2016' },
  { val: 'house2012', rawVal: 'USC_MARGIN_2012' },
  { val: 'houseChange', rawVal: 'USC_MARGIN_CHANGE' },
  { val: 'popDen', rawVal: 'POPDEN_2015' },
  { val: 'popDenChange', rawVal: 'POPDEN_CHANGE' },
  { val: 'nonWhite', rawVal: 'NONWHITE_2015' },
  { val: 'nonWhiteChange', rawVal: 'NONWHITE_CHANGE' },
  { val: 'unemployment', rawVal: 'UNEMPLOY_2015' },
  { val: 'unemploymentChange', rawVal: 'UNEMPLOY_CHANGE' },
  { val: 'college', rawVal: 'COLLEGE_2015' },
  { val: 'collegeChange', rawVal: 'COLLEGE_CHANGE' },
  { val: 'income', rawVal: 'INC_2015' },
  { val: 'incomeChange', rawVal: 'INC_CHANGE' }
];
