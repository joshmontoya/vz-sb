

const steps = {

    "navUrl" : {
        "fieldValIfAppl" : '"url"',
        "fieldValUsrEntry" : false,
        "stepDescrip" : "Given I navigate to url as "
    },
    "accessApp" : {
        "fieldValIfAppl" : '"application"',
        "fieldValUsrEntry" : false,
        "stepDescrip" : "Given I access application "
    },
    "userIdEnter" : {
        "fieldValIfAppl" : '"userid"',
        "fieldValUsrEntry" : false,
        "stepDescrip" : "When I enter userid as "
    },
    "pwdEnter" : {
        "fieldValIfAppl" : '"password"',
        "fieldValUsrEntry" : false,
        "stepDescrip" : "When I enter password as "
    },
    "clickSignIn" : {
        "fieldValIfAppl" : null,
        "stepDescrip" : "When I click on SignIn"
    },
    "clickSales" : {
        "fieldValIfAppl" : null,
        "stepDescrip" : "When I click on Sales"
    },
    "chooseIntent" : {
        "fieldValIfAppl" : '"intent"',
        "fieldValUsrEntry" : true,
        "stepDescrip" : "When I choose intent as "
    },
    "enterMDN" : {
        "fieldValIfAppl" : '"mdn"',
        "fieldValUsrEntry" : false,
        "stepDescrip" : "When I enter mdn as "
    },
    "clickAssist" : {
        "fieldValIfAppl" : null,
        "stepDescrip" : "When I click on Assist"
    },
    "clickPhotoId" : {
        "fieldValIfAppl" : null,
        "stepDescrip" : "When I click on Photo ID verified"
    },
    "clickOrder" : {
        "fieldValIfAppl" : null,
        "stepDescrip" : "When I click on Order"
    },
    "clickAddALine" : {
        "fieldValIfAppl" : null,
        "stepDescrip" : "When I click on Add a line"
    },
}


const stepGroups = {
    
    "loginPosDesktop" : {
        "applications" : ["Retail", "Telesales", "Indirect", "Chatstore"],
        "isLoginStepGroup" : true,
        "isDuplicateElig" : false,
        "stepOrder" : 0,
        "steps" : [steps.navUrl, steps.accessApp, steps.userIdEnter, steps.pwdEnter, steps.clickSignIn]
    },
    "loginPosMobile" : {
        "applications" : ["Retail mPOS", "Indirect mPOS"],
        "isLoginStepGroup" : true,
        "isDuplicateElig" : false,
        "stepOrder" : 0,
        "steps" : [steps.accessApp, steps.userIdEnter, steps.pwdEnter, steps.clickSignIn]
    },
    "accessExistingAcctRtlInd" : {
        "applications" : ["Retail", "Retail mPOS", "Indirect", "Indirect mPOS"],
        "isLoginStepGroup" : false,
        "isDuplicateElig" : false,
        "stepOrder" : 2,
        "func" : ["Add-A-Line", "Upgrade", "Promotions - Existing", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Return Only", "Return w/ Exchange", "Suspend", "Reconnect", "TYS", "Remarks"],
        "steps" : [steps.clickSales, steps.chooseIntent, steps.enterMDN, steps.clickAssist, steps.clickPhotoId]
    },
    "initiateAalAssisted" : {
        "applications" : ["Retail", "Retail mPOS", "Indirect", "Indirect mPOS", "Telesales", "Chatstore", "ACSS-Flex"],
        "isLoginStepGroup" : false,
        "isDuplicateElig" : false,
        "stepOrder" : 6,
        "func" : ["Add-A-Line"],
        "steps" : [steps.clickAddALine]
    },
    "initiateOrderPos" : {
        "applications" : ["Retail", "Retail mPOS", "Indirect", "Indirect mPOS", "Telesales", "Chatstore"],
        "isLoginStepGroup" : false,
        "isDuplicateElig" : false,
        "stepOrder" : 4,
        "func" : ["Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change", "Trade-in"],
        "steps" : [steps.clickOrder]
    },
}



// FIXME: Move to ff-gen file? 
function writeOutputStep(stepGroup){
    outputSteps.push(stepGroup);
    outputSteps.sort((a, b) => (a.stepOrder > b.stepOrder ? 1 : -1));
}


function updateField(ele){
    $("#curr-td").append(' "' + $(ele).val() + '"');
}


function getStepGroups(){
    scenarios.forEach(function(scenario){
        Object.keys(stepGroups).forEach(function(group){
            if(stepGroups[group].applications.includes(scenario.application)){
                if(stepGroups[group].isLoginStepGroup){
                    writeOutputStep(stepGroups[group]);
                }else{
                    scenario.func.forEach(function(step){
                        if(stepGroups[group].func.includes(step)){
                            writeOutputStep(stepGroups[group]);
                        }
                    });
                }
            }
        });
    });
}


function dispSteps(scenarioStepGroups){
    Object.keys(scenarioStepGroups).forEach(function(group){
        scenarioStepGroups[group].steps.forEach(function(step){
            if(step.fieldValIfAppl){
                if(step.fieldValUsrEntry){
                    $("#scenario-steps-table").append("<tr><td style='text-align: left'>" + `${step.stepDescrip}` + "</td><td style='text-align: left'><input type='text' class='input-type-1' "
                    + "style='padding-left: 10px' maxlength='1000' placeholder='enter " + 
                    `${step.fieldValIfAppl}` + "'onchange='updateField(this)'></td><td></td>");
                }else{
                    $("#scenario-steps-table").append("<tr><td style='text-align: left'>" + `${step.stepDescrip}` + `${step.fieldValIfAppl}` +  "<td></td><td></td>");
                }
            }else{
                $("#scenario-steps-table").append("<tr><td style='text-align: left'>" + `${step.stepDescrip}` + "</td>" + 
                "<td></td><td></td>")
            }
        });
    });
}






const manualTestSteps = {

}