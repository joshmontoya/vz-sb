
// Initialize scenario object
let scenario = {
    "userStoryId" : null,
    "application" : null, 
    "acctType" : null,
    "func" : [],
    "numNewAal" : null,
    "numPortIn" : null,
    "numUpg" : null,
    "numAcces" : null,
    "numTradeIn" : null,
    "numPlanChg" : null,
    "numFeatChg" : null,
    "numPromo" : null,
    "numRetEx" : null,
    "isQuote" : null,
    "lineLvlType" : 
    {
        "1" : 
        {
            "devTypeNewAal" : null,
            "devTypeUpg" : null,
            "contrTypeNewAal" : null,
            "contrTypeUpg" : null,
            "downPmtNewAal" : null,
            "downPmtUpg" : null

        },
        "2" : 
        {
            "devTypeNewAal" : null,
            "devTypeUpg" : null,
            "contrTypeNewAal" : null,
            "contrTypeUpg" : null,
            "downPmtNewAal" : null,
            "downPmtUpg" : null
        },
        "3" : 
        {
            "devTypeNewAal" : null,
            "devTypeUpg" : null,
            "contrTypeNewAal" : null,
            "contrTypeUpg" : null,
            "downPmtNewAal" : null,
            "downPmtUpg" : null
        },
        "4" : 
        {
            "devTypeNewAal" : null,
            "devTypeUpg" : null,
            "contrTypeNewAal" : null,
            "contrTypeUpg" : null,
            "downPmtNewAal" : null,
            "downPmtUpg" : null
        },
        "5" : 
        {
            "devTypeNewAal" : null,
            "devTypeUpg" : null,
            "contrTypeNewAal" : null,
            "contrTypeUpg" : null,
            "downPmtNewAal" : null,
            "downPmtUpg" : null
        }
    },
    
    "devTypeRetEx" : null,
    "contrTypeRetEx" : null,
    "deplType" : null,
    "tradeType" : [],
    "planType" : null,
    "pmtType" : null,
    "scenarioLog" : function() {
        console.log(scenario)
    }
};

// Initialize default scenario for reset reference
const defaultScenario = jQuery.extend(true, {}, scenario);

// Initialize 'cart' for scenario object & reference storage
const scenarios = [];

let uswinId = null; // FIXME pending API for login details logging and scenario history storage

// Onload: Initialize Application dropdown menu & clone page default state for reset button
console.log("SB 2.0 page initialized");
dropDownSelections("#sel-application", Object.keys(omnichannelDb.applications));
console.log("OmniChannel applications populated");
let defaultPage = $(".container-home").clone();




