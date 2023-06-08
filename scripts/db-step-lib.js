

const steps = {

    "navUrl" : {
        "fieldValIfAppl" : '"url"',
        "fieldValUsrEntry" : true,
        "stepDescrip" : "Given I navigate to url as "
    },
    "userIdEnter" : {
        "fieldValIfAppl" : '"userid"',
        "fieldValUsrEntry" : true,
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
    }
}


const stepGroups = {
    
    "loginPosDesktop" : {
        "applications" : ["Retail", "Telesales", "Indirect", "Chatstore"],
        "isLoginStepGroup" : true,
        "isDuplicateElig" : false,
        "stepOrder" : 0,
        "steps" : [steps.navUrl, steps.userIdEnter, steps.pwdEnter, steps.clickSignIn]
    }
}



// FIXME: Move to ff-gen file? 
let outputSteps = [];
console.log(outputSteps);


function writeOutputStep(step){
    outputSteps.push(step);
    console.log(outputSteps); //FIXME
}


function updateField(ele){
    $("#curr-td").append(' "' + $(ele).val() + '"');
}

$(document).ready(function(){
    $("#download-ff").click(function (e){
        e.preventDefault();
        window.location.href = "C:/Users/joshp/Downloads/ff.txt";
    });
});

function dispSteps(stepGroup){
    stepGroups[stepGroup].steps.forEach(function(item){
        if(item.fieldValIfAppl){
            if(item.fieldValUsrEntry){
                $("#scenario-steps-table").append("<tr><td style='text-align: left'>" + `${item.stepDescrip}` + "</td><td style='text-align: left'><input type='text' class='input-type-1' "
                + "style='padding-left: 10px' maxlength='1000' placeholder='enter " + 
                `${item.fieldValIfAppl}` + "'onchange='updateField(this)'></td><td></td>");
            }else{
                $("#scenario-steps-table").append("<tr><td style='text-align: left'>" + `${item.stepDescrip}` + `${item.fieldValIfAppl}` +  "<td></td><td></td>");
            }
        }else{
            $("#scenario-steps-table").append("<tr><td style='text-align: left'>" + `${item.stepDescrip}` + "</td>" + 
            "<td></td><td></td>")
        }
        writeOutputStep(item);


    });

        
}

const manualTestSteps = {

}