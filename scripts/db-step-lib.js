
const library = {
    "gherkin" : {
        "1" : "Given I ",
        "2" : "When I ",
        "3" : "When I click ",
        "4" : "When I choose ",
        "5" : "When I click on ",
        "6" : "When I select ",
        "7" : "When I enter ",
        "8" : "Then I ",
        "9" : "Then I should ",
        "10" : "Then I should see ",
    },
    "field" : {
        "1" : "userid",
        "2" : "password",
        "3" : "cancun",
        "4" : "url",
        "5" : "title",
        "6" : "storyid",
        "7" : "address",
        "8" : "ssn",
        "9" : "dob",
        "10" : "mdn",
        "11" : "firstname",
        "12" : "lastname",
        "13" : "devicetype",
        "14" : "pin",
        "15" : "email",
        "16" : "salesintent",
        "17" : "address1",
        "18" : "application",
        "19" : "functionality",
        "20" : "",
        "21" : "",
        "22" : "",
        "23" : "",
        "24" : "",
        "25" : "",
        "26" : "",
        "27" : "",
        "28" : "",
        "29" : "",
        "30" : "",
        "31" : "",
        "32" : "",
    },
}


const steps = {

    "navUrl" : {
        "field" : library.field[4],
        "fieldApplyScenario" : false,
        "fieldUsrEntry" : false,
        "gherkin" : library.gherkin[1],
        "condition" : "navigate to url as "
    },
    "accessApp" : {
        "field" : library.field[18],
        "fieldApplyScenario" : true,
        "fieldUsrEntry" : false,
        "gherkin" : library.gherkin[2],
        "condition" : "access application "
    },
    "userIdEnter" : {
        "field" : library.field[1],
        "fieldApplyScenario" : false,
        "fieldUsrEntry" : false,
        "gherkin" : library.gherkin[7],
        "condition" : "userid as "
    },
    "pwdEnter" : {
        "field" : library.field[2],
        "fieldApplyScenario" : false,
        "fieldUsrEntry" : false,
        "gherkin" : library.gherkin[7],
        "condition" : "password as "
    },
    "clickSignIn" : {
        "field" : null,
        "gherkin" : library.gherkin[5],
        "condition" : "SignIn"
    },
    "clickSales" : {
        "field" : null,
        "gherkin" : library.gherkin[5],
        "condition" : "Sales"
    },
    "chooseSalesIntent" : {
        "field" : library.field[16],
        "fieldApplyScenario" : false,
        "fieldUsrEntry" : true,
        "gherkin" : library.gherkin[4],
        "condition" : "sales intent as "
    },
    "enterMDN" : {
        "field" : library.field[10],
        "fieldApplyScenario" : false,
        "fieldUsrEntry" : true,
        "gherkin" : library.gherkin[7],
        "condition" : "mdn as "
    },
    "clickAssist" : {
        "field" : null,
        "gherkin" : library.gherkin[5],
        "condition" : "Assist"
    },
    "clickPhotoId" : {
        "field" : null,
        "gherkin" : library.gherkin[5],
        "condition" : "Photo ID verified"
    },
    "clickProceed" : {
        "field" : null,
        "gherkin" : library.gherkin[5],
        "condition" : "Proceed"
    },
    "clickOrder" : {
        "field" : null,
        "gherkin" : library.gherkin[5],
        "condition" : "Order"
    },
    "clickAddALine" : {
        "field" : null,
        "gherkin" : library.gherkin[5],
        "condition" : "Add a line"
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
        "steps" : [steps.clickSales, steps.chooseSalesIntent, steps.enterMDN, steps.clickAssist, steps.clickPhotoId]
    },
    "accessExistingAcctTelesales" : {
        "applications" : ["Telesales", "Chatstore"],
        "isLoginStepGroup" : false,
        "isDuplicateElig" : false,
        "stepOrder" : 2,
        "func" : ["Add-A-Line", "Upgrade", "Promotions - Existing", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Suspend", "Reconnect", "TYS", "Remarks"],
        "steps" : [steps.enterMDN, steps.clickAssist, steps.clickProceed]
    },
    "initiateAalAssisted" : {
        "applications" : ["Retail", "Retail mPOS", "Indirect", "Indirect mPOS", "Telesales", "Chatstore", "ACSS-Flex"],
        "isLoginStepGroup" : false,
        "isDuplicateElig" : false,
        "stepOrder" : 6,
        "func" : ["Add-A-Line"],
        "steps" : [steps.clickAddALine]
    },
    "initiateExistingOrderPos" : {
        "applications" : ["Retail", "Retail mPOS", "Indirect", "Indirect mPOS", "Telesales", "Chatstore"],
        "isLoginStepGroup" : false,
        "isDuplicateElig" : false,
        "stepOrder" : 4,
        "func" : ["Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change", "Trade-in"],
        "steps" : [steps.clickOrder]
    },
}



// FIXME: Move to ff-gen file? 

function test3(){ //FIXME
    console.log(outputStepsAllScenarios[1][2]); //FIXME
}


function getStepGroups(scenario){
    Object.entries(stepGroups).forEach(function(entry){
        if(entry[1].applications.includes(scenario.application)){
            if(entry[1].isLoginStepGroup){
                outputSteps.push(writeOutputStep(scenario, entry));
            }else{
                for(func of scenario.func){
                    if(entry[1].func.includes(func)){
                        for(func of scenario.func){
                            if(!entry[1].func.includes(func)){
                                break;
                            }
                        }
                        outputSteps.push(writeOutputStep(scenario, entry));
                        break;
                    }
                }
            }
        }
    });
}


function writeOutputStep(scenario, stepGroup){
    const stepGroupCopy = jQuery.extend(true, {}, stepGroup);
    stepGroupCopy[1].steps.forEach(function(step){
        if(step.field){
            if(step.fieldApplyScenario){
                const keys = Object.keys(scenario);
                for(index in keys){
                    if(keys[index] == step.field){
                        step.field = Object.values(scenario)[index];
                        // console.log("field found within single key value"); //FIXME
                        break;
                    }else if(keys[index] == "func"){
                        // console.log("field found within func list"); //FIXME
                        const funcs = Object.values(scenario)[index];
                        step.field = funcs[fieldFuncCount];
                        fieldFuncCount++;
                        break;
                    }else if(keys[index] == "lineLvlType"){
                        // console.log("Pending steps for line level type details write steps") // Stub FIXME
                    }else if(keys[index] == "tradeType"){
                        // console.log("Pending steps for trade type details write steps") // Stub FIXME
                    }else{
                        // console.log("field not found"); //FIXME
                    }
                }
            }
        }
    })
    return stepGroupCopy;
}


function finalizeOutputSteps(scenario, index){
    //FIXME ***"Test Case" is default / uneditable TC name, need to figure out way to edit this***
    outputSteps.push("@TC" + (index+1) +"- " + scenario.userStoryId + "_" + scenario.application + "_" + scenario.acctType + "_" + "Test Case");
    //
    outputSteps.sort((a, b) => (a[1].stepOrder > b[1].stepOrder ? 1 : -1));
    const scenarioIdx = outputStepsAllScenarios.push(outputSteps);
    dispSteps(outputSteps, (scenarioIdx - 1));
    outputSteps = [];
    fieldFuncCount = 0;
}


function dispSteps(displaySteps, scenarioIdx){
    displaySteps.forEach(function(item, index){
        // console.log(outputStepsAllScenarios[1][1].steps[2].field); //FIXME
        if(index == 0){
            $("#scenario-steps-table").append("<tr><td style='text-align: left; font-weight: bold; font-size: 18px'>" + `${item}` + "</td>" + 
                    "<td></td><td></td>")
        }else{
                item[1].steps.forEach(function(step){
                    if(step.field){
                        if(step.fieldUsrEntry){
                            $("#scenario-steps-table").append("<tr id='outputStepsAllScenarios[" + `${scenarioIdx}` + "][" + `${index}` + "]'><td style='text-align: left'>" + `${step.gherkin + step.condition}` + `"${step.field}"` + "</td>" + 
                            "<td style='text-align: left'><input type='text' class='input-type-2' style='padding-left: 10px' maxlength='1000' placeholder='update " + 
                            `"${step.field}"` + "'onchange='updateStepField(this)'></td><td></td>");
                        }else{
                            $("#scenario-steps-table").append("<tr><td style='text-align: left'>" + `${step.gherkin + step.condition}` + `"${step.field}"` + "<td></td><td></td>");
                        }
                    }else{
                        $("#scenario-steps-table").append("<tr><td style='text-align: left'>" + `${step.gherkin + step.condition}` + "</td>" + 
                        "<td></td><td></td>")
                    }
                });
        }
    });
}


function updateStepField(ele){
    const field = $(ele).attr("placeholder").slice(8, -1);
    const scenarioSteps = (eval($(ele).parent().parent().attr("id")))[1].steps;
    for(index in scenarioSteps){
        if(scenarioSteps[index].field == field){
            scenarioSteps[index].field = $(ele).val();
            $("#scenario-steps-table").empty();
            for(index in outputStepsAllScenarios){
                dispSteps(outputStepsAllScenarios[index], index);
            }
            return;
        }
    }
}






/** Manual Steps section **/


function makeSteps(scenario){
    Object.entries(manualStepGroups).forEach(function(entry){
        if(entry[1].applications.includes(scenario.application)){
            if(entry[1].isLoginStepGroup){
                manualOutputSteps.push(writeOutputStep(scenario, entry));
            }else{
                for(func of scenario.func){
                    if(entry[1].func.includes(func)){
                        manualOutputSteps.push(writeOutputStep(scenario, entry));
                    }
                }
            }
        }
    });
}


function finalizeManualOutputSteps(scenario, index){
    // manualOutputSteps.sort((a, b) => (a.stepOrder > b.stepOrder ? 1 : -1));
    let tempSteps = [];
    manualOutputSteps.forEach(function(group){
        group[1].steps.forEach(function(step){
            if(step.field){
                tempSteps.push(`${step.gherkin + step.condition}` + `"${step.field}"`);
            }else{
                tempSteps.push(`${step.gherkin + step.condition}`);
            }               
        });
    });
    manualOutputSteps = tempSteps;
    //FIX ME ***"Manual Test Steps" is default / uneditable TC name, need to figure out way to edit this***
    manualOutputSteps.unshift("@TC" + (index+1) +"- " + scenario.userStoryId + "_" + scenario.application + "_" + scenario.acctType + "_" + "Manual Test Steps");
    //
    manualOutputStepsAllScenarios.push(manualOutputSteps);
    dispManualSteps();
    manualOutputSteps = [];
    fieldFuncCount = 0;
}


function dispManualSteps(){
    manualOutputSteps.forEach(function(item, index){
        if(index == 0){
            $("#scenario-steps-table").append("<tr><td style='text-align: left; font-weight: bold; font-size: 18px'>" + `${item}` + "</td>" + 
                    "<td></td><td></td>")
        }else{
            $("#scenario-steps-table").append("<tr><td style='text-align: left'>" + `${item}` + "</td><td></td><td></td>")
        }
    })
}


const manualTestSteps = {
    
    "accessApp" : {
        "field" : library.field[18],
        "fieldApplyScenario" : true,
        "gherkin" : library.gherkin[1],
        "condition" : "access application "
    },
    "funcStep" : {
        "field" : library.field[19],
        "fieldApplyScenario" : true,
        "gherkin" : library.gherkin[2],
        "condition" : "complete test steps for "
    },
}

const manualStepGroups = {
    
    "accessApp" : {
        "applications" : ["Telesales", "Retail", "Retail mPOS", "ACSS-Flex", "Indirect", "Indirect mPOS", "MVO", "MVA", "Chatbot", "Chatstore"],
        "isLoginStepGroup" : true,
        "isDuplicateElig" : false,
        "stepOrder" : 0,
        "steps" : [manualTestSteps.accessApp]
    },
    "existingNonPromo" : {
        "applications" : ["Telesales", "Retail", "Retail mPOS", "ACSS-Flex", "Indirect", "Indirect mPOS", "MVO", "MVA", "Chatbot", "Chatstore"],
        "isLoginStepGroup" : false,
        "isDuplicateElig" : true,
        "stepOrder" : 2,
        "func" : ["Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change", "Trade-in"],
        "steps" : [manualTestSteps.funcStep]
    },
    "service" : {
        "applications" : ["Telesales", "Retail", "Retail mPOS", "ACSS-Flex", "Indirect", "Indirect mPOS", "MVO", "MVA", "Chatbot", "Chatstore"],
        "isLoginStepGroup" : false,
        "isDuplicateElig" : false,
        "stepOrder" : 2,
        "func" : ["Suspend", "Reconnect", "TYS", "Remarks"],
        "steps" : [manualTestSteps.funcStep]
    },
    "newNonPromo" : {
        "applications" : ["Telesales", "Retail", "Retail mPOS", "Indirect", "Indirect mPOS", "MVO", "Chatbot", "Chatstore"],
        "isLoginStepGroup" : false,
        "isDuplicateElig" : false,
        "stepOrder" : 2,
        "func" : ["New Activation"],
        "steps" : [manualTestSteps.funcStep]
    },
    "existingPromo" : {
        "applications" : ["Telesales", "Retail", "Retail mPOS", "ACSS-Flex", "Indirect", "Indirect mPOS", "MVO", "MVA", "Chatbot", "Chatstore"],
        "isLoginStepGroup" : false,
        "isDuplicateElig" : true,
        "stepOrder" : 1,
        "func" : ["Promotions - Existing"],
        "steps" : [manualTestSteps.funcStep]
    },
    "newPromo" : {
        "applications" : ["Telesales", "Retail", "Retail mPOS", "ACSS-Flex", "Indirect", "Indirect mPOS", "MVO", "MVA", "Chatbot", "Chatstore"],
        "isLoginStepGroup" : false,
        "isDuplicateElig" : true,
        "stepOrder" : 1,
        "func" : ["Promotions - New"],
        "steps" : [manualTestSteps.funcStep]
    },
}
