import { csv } from 'd3-fetch';

export default class DataHelpers {

    processData(d) {
        return {
            tract: d.GEO_ID,
            voteData: {
                potus: {
                    _2016: +d.USP_MARGIN_2016,
                    _2012: +d.USP_MARGIN_2012,
                    change: +d.USP_MARGIN_CHANGE,
                },
                senate: {
                    _2016: +d.USS_MARGIN_2016,
                    _2012: +d.USS_MARGIN_2012,
                    change: +d.USS_MARGIN_CHANGE,
                },
                house: {
                    _2016: +d.USC_MARGIN_2016,
                    _2012: +d.USC_MARGIN_2012,
                    change: +d.USC_MARGIN_CHANGE,
                }
            },
            demoData: {
                popChange: +d.TOTALPOP_CHANGE,
                popDen: +d.POPDEN_2015,
                popDenChange: +d.POPDEN_CHANGE,
                nonWhite: +d.NONWHITE_2015,
                nonWhiteChange: +d.NONWHITE_CHANGE,
                unempl: +d.UNEMPLOY_2015,
                unemplChange: +d.UNEMPLOY_CHANGE,
                college: +d.COLLEGE_2015,
                collegeChange: +d.COLLEGE_CHANGE,
                income: +d.INC_2015,
                incomeChange: +d.INC_CHANGE,
            }
        };
    }
}
