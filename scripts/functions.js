// Helper functions

/** FIXME 
 * functions for entered USWIN temp variable storage, element restrict
 * need future API incorporation of hashed login, and ID attachment/reference 
 * to stored scenarios in db
*/
function uswinEntry(){
    uswinId = $("#uswin-in").val();
    $("#uswin-in").prop("disabled", true);
    $("#uswin-in").css("opacity", 0.35);
}
function uswinRetain(){
    $("#uswin-in").val(uswinId);
    $("#uswin-in").prop("disabled", true);
    $("#uswin-in").css("opacity", 0.35);
}


function dropDownSelections(query, arr){
    const s = $(query)[0];
    let o;
    s.length = 1;
    arr.forEach(function(item){
        o = document.createElement("option");
        o.text = item;
        o.value = item;
        s.appendChild(o);
    });
}


function dropDownNums(query, min, max){
    const s = $(query)[0];
    let o;
    s.length = 1;
    if(query == "#func-dtls-2-sel"){
        o = document.createElement("option");
        o.text = "n/a";
        o.value = "n/a";
        s.appendChild(o);
    }
    for(let i=min; i<=max; i++){
        o = document.createElement("option");
        o.text = i;
        o.value = i;
        s.appendChild(o);
    }
}


function addToScenario(ele, key){
    if(!$(ele).is(":checkbox")){
        let input = ele.value;
        if(!isNaN(input)){
            input = Number(input);
        }
        if(input == "n/a"){
            scenario[key] = null;
        }else if(Array.isArray(scenario[key])){
            const idx = (ele.id.replace(/\D/g, '')) - 1; // Extract selector id for array index add/replace
            scenario[key][idx] = input;
        }else{
            scenario[key] = input;
        }
    }else{
        scenario[key] = $(ele).is(":checked");
    }
    scenario.scenarioLog();
    console.log("Scenario updated");
}   


function remTooltip(tooltip, tooltipText){
    $(tooltip).removeClass("tooltip");
    $(tooltipText).css("display", "none");
}


// Array comparison to scenario functionalities function
function funcArrayComp(arr){
    for(let i=0; i<arr.length; i++){
        if(scenario.func.includes(arr[i])){
            return true;
        }
    }
}


function newAalFuncDtlsChg(){
    const newAalVal = $("#func-dtls-1-sel").val();
    remTooltip('.newAal-func-tooltip', '.newAal-func-tooltip-text');
    dropDownNums("#func-dtls-2-sel", 1, newAalVal);
    $("#func-dtls-2-sel").prop("disabled", false);
    dropDownNums("#func-dtls-3-sel", 1, 5 - newAalVal);
    $("#func-dtls-3-sel").prop("disabled", false);
    if(scenario.func.includes("Plan Change")){
        $("#func-dtls-6-sel").prop("disabled", false);
    }
    dropDownNums("#func-dtls-6-sel", newAalVal, 5);
    $("#func-dtls-6-sel").val(newAalVal);
    addToScenario(document.getElementById("func-dtls-6-sel"), "numPlanChg");
}


function initFuncDetails(){
    // Event listener for 'Done' button enable
    $(".container-3-3").on("change", function(){
        doneFuncDtlsBtnEnable();
    });
    const f = scenario.func;
    if(f.includes("New Activation") || f.includes("Add-A-Line")){
        $("#func-dtls-1").show();
        dropDownNums("#func-dtls-1-sel", 1, 5);
        $("#func-dtls-2").show();
        $("#func-dtls-1-sel").addClass("requiredEle");
    }
    if(f.includes("Upgrade") && !f.includes("Add-A-Line")){
        $("#func-dtls-3").show();
        $("#func-dtls-3-sel").prop("disabled", false);
        remTooltip('.newAal-func-tooltip', '.newAal-func-tooltip-text');
        dropDownNums("#func-dtls-3-sel", 1, 5);
        $("#func-dtls-3-sel").addClass("requiredEle");
    }else if(f.includes("Upgrade")){
        $("#func-dtls-3").show();
        dropDownNums("#func-dtls-1-sel", 1, 4);
        dropDownNums("#func-dtls-3-sel", 1, 5);
        $("#func-dtls-3-sel").addClass("requiredEle");
    }
    if(f.includes("Accessory")){
        $("#func-dtls-4").show();
        dropDownNums("#func-dtls-4-sel", 1, 5);
        $("#func-dtls-4-sel").addClass("requiredEle");
    }
    if(f.includes("Trade-in")){
        $("#func-dtls-5").show();
        dropDownNums("#func-dtls-5-sel", 1, 5);
        $("#func-dtls-5-sel").addClass("requiredEle");
    }
    if(f.includes("Plan Change")){
        if(!f.includes("Add-A-Line")){
            remTooltip('.newAal-func-tooltip', '.newAal-func-tooltip-text');
            $("#func-dtls-6-sel").prop("disabled", false);
        }
        $("#func-dtls-6").show();
        dropDownNums("#func-dtls-6-sel", 1, 5);
        $("#func-dtls-6-sel").addClass("requiredEle");
    }
    if(f.includes("Feature Change")){
        $("#func-dtls-7").show();
        dropDownNums("#func-dtls-7-sel", 1, 5);
        $("#func-dtls-7-sel").addClass("requiredEle");
    }
    if(f.includes("Promotions - New") || f.includes("Promotions - Existing")){
        $("#func-dtls-8").show();
        dropDownNums("#func-dtls-8-sel", 1, 5);
        $("#func-dtls-8-sel").addClass("requiredEle");
    }
    if(!f.includes("Return w/ Exchange")){
        $("#quote-checkbox").show();
    }
    $("#btn-func-dtls-done-tooltip").show();
}


// Initialize Account Type selector based on Application selection
function initAcctTypes(){
    dropDownSelections("#sel-acct-type", omnichannelDb.applications[$("#sel-application").val()].acctTypes);
    $("#sel-acct-type").prop("disabled", false);
    remTooltip("#sel-acct-type-tooltip", "#sel-acct-type-tooltip-text");
    console.log("Available account types populated for selected application")
}


// Initialize functionalities selector based on Application selection
function initFunc(){
    $("#sel-application").prop("disabled", false);
    dropDownSelections("#sel-func", omnichannelDb.applications[$("#sel-application").val()].functionalities);
    $("#sel-func").prop("disabled", false);
    remTooltip("#sel-func-tooltip", "#sel-func-tooltip-text");
    console.log("Available functionalities populated for selected application");
    $("#sel-func").off();
    addFunc();
}

// Enable reset button based on Application selection
function enableReset(){
    $("#btn-reset").prop("disabled", false);
}


function addFunc(){
    $("#sel-func").on("change", function(event){
        target = event.target;
        funcSel(target.value, omnichannelDb.applications[scenario.application].functionalities);
    });

    function funcSel(selection, existingList){
        $("#sel-application").prop("disabled", true);
        scenario.func.push(selection);
        scenario.scenarioLog();
        console.log("Scenario updated");
        dispFunc();
        let funcArray = [];
        if(Object.keys(stackability).includes(selection)){
            let availList = stackability[selection];
            availList.forEach(function(item){
                if(existingList.includes(item) && !scenario.func.includes(item)){
                    funcArray.push(item);
                }
            });
            dropDownSelections("#sel-func", funcArray);
            console.log("Available functionalities updated");

            $("#sel-func").off();
            $("#sel-func").on("change", function(event){
                target = event.target;
                funcSel(target.value, funcArray);
            });
        }else{
            dropDownSelections("#sel-func", funcArray);
        }
    }
}


function dispFunc(){
    let e = "";
    const len = scenario.func.length;
    for(i = 0; i < len; i++){
        if(i == len - 1){
            e += scenario.func[i];
        }else{
            e += scenario.func[i] + ", ";
        }  
    }
    $("#func-selected-res").html(e);
    if(len != 0){
        $("#btn-func-done").prop("disabled", false);
        $("#btn-func-clear").prop("disabled", false);
    }else{
        $("#btn-func-done").prop("disabled", true);
        $("#btn-func-clear").prop("disabled", true);
    }
}


function clearFuncArr(arr){
    const c = confirm("Are you sure you want to clear selected functionalities?");
    if(c){
        arr.length = 0;
        console.log("Scenario functionality array cleared");
        dispFunc();
        alert("Functionalities cleared!");
        initFunc();
    }
}


function standAloneTradeValid(){
    if(!(scenario.application == "Telesales" || scenario.application == "ACSS-Flex" || scenario.application == "Chatstore")){
        return true;
    }
    if(scenario.func.includes("Trade-in") && 
        !(scenario.func.includes("New Activation") || scenario.func.includes("Add-A-Line") || scenario.func.includes("Upgrade"))){
        return false;
    }else{
        return true;
    }
}


function doneFunc(){
    if(!standAloneTradeValid()){
        alert("Chosen platform does not permit Trade-in only transactions, please add at least one device functionality (New/AAL/Upg)");
        scenario.func.length = 0;
        dispFunc();
        console.log("Error: ineliglbe trade-in only transaction attempt, functionalities cleared");
        initFunc();
    }else{
        const c = confirm("Are you sure you are done selecting functionalities?");
        if(c){
            $("#sel-func").prop("disabled", true);
            $("#sel-application").prop("disabled", true);
            $("#btn-func-done").prop("disabled", true);
            $("#btn-func-clear").prop("disabled", true);
            // $("#btn-func-done").off();
            $("#sel-func").off();
            console.log("Functionality selection done");
            if(funcArrayComp(omnichannelDb.standaloneFunc) || (scenario.func.length == 1 && scenario.func[0] == "Return w/ Exchange")){
                console.log("Functionality details selection not required for chosen functionalities");
                initTypeDtls();
            }else{
                initFuncDetails();
            }
            finalBtnEnable();
        }
    }    
}


function doneFuncDtlsBtnEnable(){
    if(btnEnable(".container-3-3", "#btn-func-dtls-done")){
        remTooltip("#btn-func-dtls-done-tooltip", "#btn-func-dtls-done-tooltip-text");
        console.log("Functionality Details Done button enabled");
    }
}

function doneFuncDtls(){
    let c = confirm("Are you sure you are done selecting functionality details?");
    if(c){
        console.log("Functionality details selection done");
        $("#btn-func-dtls-done").prop("disabled", true);
        for(let i=0; i<=numFuncDtlsSel; i++){
            if($("#func-dtls-" + `${i}`).css("display") != "none"){
                $("#func-dtls-" + `${i}` + "-sel").prop("disabled", true);
            }
        }
        if($("#quote-checkbox").css("display") != "none"){
            $("#func-dtls-quote").prop("disabled", true);
        }
        $(".container-3-3").off();
        initTypeDtls();
        finalBtnEnable();
    }
}


// Eligible pmt type filter function (for new activations (non-BTA))
function eligPmtType(){

    // Helper function
    function checkDevSel(){
        let i;
        for(i=1; i<=scenario.numNewAal; i++){
            if(scenario.lineLvlType[i].devTypeNewAal == null){
                return true;
            }
        }
        for(i=1; i<=scenario.numUpg; i++){
            if(scenario.lineLvlType[i].devTypeUpg == null){
                return true;
            }
        }
        return false;
    }
    const disabled = checkDevSel();
    if(omnichannelDb.applications[scenario.application].pmtTypes.length){
        if(!isNoPmtElig()){
            // Remove eligibility message if necessary
            if($("#pmt-type").css("display") == "none"){
                $("#pmt-type").show();
                $("#pmt-type-na-msg").css("display", "none");
                scenario.pmtType = $("#pmt-type-sel").val();
            }
            if(!disabled){
                $("#pmt-type-sel").prop("disabled", false);
                remTooltip("#pmt-type", "#pmt-type-tooltip-text");
            }
        }
    } 
}

// Payment type selection removal function (for no-cost device type(s))
function isNoPmtElig(){
    let i;
    if(scenario.numAcces != null){
        return false;
    }else{
        for(i=1; i<=scenario.numNewAal; i++){
            if(!omnichannelDb.nonPayDevTypes.includes(scenario.lineLvlType[i].devTypeNewAal)){
                return false;
            }
        }
        for(i=1; i<=scenario.numUpg; i++){
            if(!omnichannelDb.nonPayDevTypes.includes(scenario.lineLvlType[i].devTypeUpg)){
                return false;
            }
        }
        for(i=1; i<=scenario.numRetEx; i++){
            if(!omnichannelDb.nonPayDevTypes.includes(scenario.devTypeRetEx)){
                return false;
            }
        }
        console.log("Payment Type column updated. No payment required for device type(s) selected");
        $("#pmt-type").css("display", "none");
        $("#pmt-type-na-msg").text("No payment required for the device type(s) selected");
        $("#pmt-type-na-msg").show();
        $("#pmt-type-sel").removeClass("requiredEle");
        scenario.pmtType = null;
        scenario.scenarioLog();
        return true;
    }     
}


// Init Type details section dropdown selections
function initTypeDtls(){
    // Event listener for 'Add to Cart, 'Next' button enable
    $(document).on("change", function(event){
        let target = event.target;
        if($(target).parents().hasClass("container-4") || $(target).parents().hasClass("container-2") 
                || $(target).is("#sel-acct-type")){
            finalBtnEnable();
        }
    });

    // Init Depletion & Payment Type columns
    const deplPmtTypeFuncs = ["New Activation", "Add-A-Line", "Upgrade", "Return w/ Exchange", "Accessory"];
    let pmtTypes = omnichannelDb.applications[scenario.application].pmtTypes;
    if(!funcArrayComp(deplPmtTypeFuncs)){
        $("#depl-type-na-msg").show();
        $("#pmt-type-na-msg").show();
        console.log("Deployment & Payment Type selections not applicable for chosen functionalities");
    }else{
        deplPmtTypeFuncs.pop(); // Pop for accessory only orders
        $("#depl-type").show();
        $("#depl-type-sel").addClass("requiredEle");
        dropDownSelections("#depl-type-sel", omnichannelDb.applications[scenario.application].deplTypes);
        if(!pmtTypes.length){
            $("#pmt-type-na-msg").text("Not applicable for chosen application");
            $("#pmt-type-na-msg").show();
            console.log("Payment Type selections not applicable for chosen application");
        }else if(!funcArrayComp(deplPmtTypeFuncs)){ // Do not restrict payment type selector on accessory only
            dropDownSelections("#pmt-type-sel", pmtTypes);
            remTooltip("#pmt-type", "#pmt-type-tooltip-text");
            $("#pmt-type-sel").prop("disabled", false);
            $("#pmt-type").show();
            $("#pmt-type-sel").addClass("requiredEle");
        }else{
            if(scenario.func.includes("New Activation")){
            pmtTypes = pmtTypes.filter(function(item){
                return item != "BTA";
            });
            }
            dropDownSelections("#pmt-type-sel", pmtTypes);
            $("#pmt-type").show();
            $("#pmt-type-sel").addClass("requiredEle");
        }
    }

    // Init Device and Contract Type columns
    const devContrTypeFuncs = ["New Activation", "Add-A-Line", "Upgrade", "Return w/ Exchange"];
    let hasNewAal = false;
    if(!funcArrayComp(devContrTypeFuncs)){
        $(".dev-contr-type-na-msg").show();
        console.log("Device & Contract Type selections not applicable for chosen functionalities");
    }else{
        $(".container-dev-contr-type-all").show();
        if(scenario.func.includes("Return w/ Exchange")){
            $(".dev-contr-type-retEx").show();
            $("#down-pmt-retEx").css("visibility", "hidden");
            $("#down-pmt-retEx").show();
            dropDownSelections("#dev-type-retEx-sel", omnichannelDb.applications[scenario.application].devTypes);
            dropDownSelections("#contr-type-retEx-sel", omnichannelDb.contrTypes);
            $("#dev-type-retEx-sel").addClass("requiredEle");
            $("#contr-type-retEx-sel").addClass("requiredEle");
            scenario.numRetEx = 1; // ***Default / only 1 Return/exchange device allowed per scenario. Possible revision opportunity***
        }else{
            let n;
            if(scenario.func.includes("New Activation") || scenario.func.includes("Add-A-Line")){
                $(".dev-contr-type-newAal").show();
                n = scenario.numNewAal;
                for(let i=1; i<=n; i++){
                    dropDownSelections("#dev-type-" + `${i}` + "-sel", omnichannelDb.applications[scenario.application].devTypes);
                    dropDownSelections("#contr-type-" + `${i}` + "-sel", omnichannelDb.contrTypes);
                    $(".dev-contr-type-" + `${i}`).show();
                    $("#down-pmt-" + `${i}`).css("visibility", "hidden");
                    $("#down-pmt-" + `${i}`).show();
                    $("#dev-type-" + `${i}` + "-sel").addClass("requiredEle");
                    $("#contr-type-" + `${i}` + "-sel").addClass("requiredEle");
                }
                hasNewAal = true;
            }
            if(scenario.func.includes("Upgrade")){
                if(hasNewAal){ $(".upg-split").show();  $("#down-pmt-split").show();}
                $(".dev-contr-type-upg").show();
                n = (scenario.numUpg) + 5;
                for(let i=6; i<=n; i++){
                    dropDownSelections("#dev-type-" + `${i}` + "-sel", omnichannelDb.applications[scenario.application].devTypes);
                    dropDownSelections("#contr-type-" + `${i}` + "-sel", omnichannelDb.contrTypes);
                    $(".dev-contr-type-" + `${i}`).show();
                    $("#down-pmt-" + `${i}`).css("visibility", "hidden");
                    $("#down-pmt-" + `${i}`).show();
                    $("#dev-type-" + `${i}` + "-sel").addClass("requiredEle");
                    $("#contr-type-" + `${i}` + "-sel").addClass("requiredEle");
                }
            }
        }
    }
    // Init Trade-in Type column
    if(!omnichannelDb.applications[scenario.application].tradeTypes.length){
        $("#trade-type-na-msg").text("Not applicable for chosen application");
        $("#trade-type-na-msg").show();
        console.log("Trade-in Type selections not applicable for chosen application");
    }else if(!scenario.func.includes("Trade-in")){
        $("#trade-type-na-msg").text("Not applicable for chosen functionalities");
        $("#trade-type-na-msg").show();
        console.log("Trade-in Type selections not applicable for chosen functionalities");
    }else{
        for(let i=1; i<=scenario.numTradeIn; i++){
            dropDownSelections("#trade-type-" + `${i}` + "-sel", omnichannelDb.applications[scenario.application].tradeTypes);
            $("#container-trade-type").show();
            $("#trade-type-" + `${i}` + "-sel").show();
            $("#trade-type-" + `${i}` + "-sel").addClass("requiredEle");
        }
    }

    // Init Plan Type column
    if(scenario.func.includes("New Activation")){
        $("#plan-type").show();
        dropDownSelections("#plan-type-sel", omnichannelDb.planTypes);
        $("#plan-type-sel").val("MDN Lvl - On Demand");
        $("#plan-type-sel").prop("disabled", true);
        scenario.planType = "MDN Lvl - On Demand";
    }else if(scenario.func.includes("Add-A-Line") || (scenario.func.includes("Add-A-Line") && scenario.func.includes("Upgrade"))){
        let aalUpgPlanOpts = [omnichannelDb.planTypes[0], omnichannelDb.planTypes[4]];
        $("#plan-type").show();
        remTooltip("#plan-type-tooltip", "#plan-type-tooltip-text");
        dropDownSelections("#plan-type-sel", aalUpgPlanOpts);
        $("#plan-type-sel").addClass("requiredEle");
    }else if(scenario.func.includes("Plan Change")){
        $("#plan-type").show();
        remTooltip("#plan-type-tooltip", "#plan-type-tooltip-text");
        dropDownSelections("#plan-type-sel", omnichannelDb.planTypes);
        $("#plan-type-sel").addClass("requiredEle");
    }else{
        $("#plan-type-na-msg").show();
        console.log("Plan Type selections not applicable for chosen functionalities");
    }
    console.log("Applicable Type details columns/selections populated");
}

// Device & Contract Type details add to scenario object
function addDvcContrTypeDtls(ele, key){ 
    const subKey = ele.options[0].value.slice(-1);
    //Flag for types
    let retEx = false;
    if(key == "devTypeRetEx" || key == "contrTypeRetEx"){
        retEx = true;
    }

    if(key == "contrTypeNewAal" || key == "contrTypeUpg"){
        //Disable/Enable down payment checkbox if applicable
        let downPmtKey;
        if(key == "contrTypeNewAal"){
            downPmtKey = "downPmtNewAal";
        }else if(key == "contrTypeUpg"){
            downPmtKey = "downPmtUpg";
        }
        const downPmtBoxNum = $(ele).attr("id").slice(-5, -4)
        if(ele.value == "36 Monthly Payments"){
            console.log("test"); // FIXME
            console.log(downPmtBoxNum); //FIXME
            $("#down-pmt-label").css("display", "flex");
            $("#down-pmt-" + `${downPmtBoxNum}`).css("visibility", "visible");
        }else{
            $("#down-pmt-" + `${downPmtBoxNum}`).css("visibility", "hidden");
            $("#down-pmt-" + `${downPmtBoxNum}` + "-box").prop("checked", false);
            scenario.lineLvlType[subKey][downPmtKey] = null;
        }  
    }

    //Variables for corresponding contract type element reference on device type selection
    let contrEle, contrRef, downPmtEle, downPmtRef;
    if(key == "devTypeNewAal"){
        contrEle = "#contr-type-" + `${subKey}` + "-sel";
        contrRef = "contrTypeNewAal";
        downPmtEle = "#down-pmt-" + `${subKey}`;
        downPmtRef = "downPmtNewAal"
    }else if(key == "devTypeUpg"){
        contrEle = "#contr-type-" + `${Number(subKey) + 5}` + "-sel";
        contrRef = "contrTypeUpg";
        downPmtEle = "#down-pmt-" + `${Number(subKey) + 5}`;
        downPmtRef = "downPmtUpg"
    }else if(retEx){
        contrEle = "#contr-type-retEx-sel";
    }
    //Remove previously assigned BYOD/FWA contract selection & restrictions (if appl)
    if($(contrEle).prop("disabled") == true){
        $(contrEle).prop("disabled", false);
        $(contrEle).find("[value=0]").remove();
        if(omnichannelDb.applications[scenario.application].pmtTypes.length){
            $("#pmt-type-sel").addClass("requiredEle");
        }
    }
    //Auto-assign BYOD & FWA contract & restrict selection
    if(omnichannelDb.nonPayDevTypes.includes(ele.value)){
        $(contrEle).append("<option value=0>n/a</option>");
        $(contrEle).val(0);
        $(contrEle).prop("disabled", true);
        if(retEx){
            scenario.contrTypeRetEx = null;
        }else{
            scenario.lineLvlType[subKey][contrRef] = null;
            scenario.lineLvlType[subKey][downPmtRef] = null;
            $(downPmtEle).css("visibility", "hidden");
            $(downPmtEle + "-box").prop("checked", false);
        }
    }
    if(retEx){
        scenario.devTypeRetEx = ele.value;
    }else{
        scenario.lineLvlType[subKey][key] = ele.value;
    }
    console.log("Scenario updated");
    scenario.scenarioLog();

}


function addDownPmt(ele, key){
    let val = $(ele).attr("id").slice(-5, -4);
    if(val > 5){ val -= 5; }
    scenario.lineLvlType[val][key] = $(ele).is(":checked");
    console.log("Scenario updated");
    scenario.scenarioLog();
}


function reset(){
    let c = confirm("Are you sure you want to reset all scenario selections?");
    if(c){
        refresh()
    }
}


function refresh(){
    const tempScenarioCopy = jQuery.extend(true, {}, defaultScenario);
    scenario = tempScenarioCopy;
    $(".container-home").replaceWith(defaultPage);
    console.log("Scenario selections reset to default");
    if(uswinId != null){
        uswinRetain();
    }
    defaultPage = $(".container-home").clone();
    $(document).off();
}


function addToCart(){
    let c = confirm("Are you sure you want to add this scenario to cart and build a new one?");
    if(c){
        scenarios.push(scenario);
        console.log("Scenario added to cart");
        alert("Scenario successfully added to cart!")
        refresh();
    }
}


function next(){
    let c = confirm("Are you sure you want to add this scenario to cart and continue to Test Step creation?");
    if(c){
        scenarios.push(scenario);
        console.log("Scenario added to cart");
        localStorage.scenarioData = JSON.stringify(scenarios);
        console.log("Scenarios stored, continuing to test step creation");
        $("#anchor-next").prop("href", "stepCreate.html");
        $("#anchor-next").prop("target", "_blank");
        refresh();
    }
}


function btnEnable(eleArea, btnId){
    const reqElements = $(eleArea).find(".requiredEle");
    const defaultOpts = ["", "Select", "New/AAL Line 1", "New/AAL Line 2", "New/AAL Line 3", 
    "New/AAL Line 4", "New/AAL Line 5", "Upgrade Line 1", "Upgrade Line 2", "Upgrade Line 3",
    "Upgrade Line 4", "Upgrade Line 5", "Exchange"];
    for(let i=0; i<reqElements.length; i++){
        if(defaultOpts.includes(reqElements[i].value)){
            $(btnId).prop("disabled", true);
            return false;
        }
    }
    $(btnId).prop("disabled", false);
    return true;
}


function finalBtnEnable(){
    if(btnEnable(document, "#btn-add-to-cart")){
        remTooltip("#btn-atc-tooltip", "#btn-atc-tooltip-text");
        console.log("Add to cart button enabled");
    }else{
        $("#btn-atc-tooltip").addClass("tooltip");
        $("#btn-atc-tooltip-text").css("display", "block");
    }
    if(btnEnable(document, "#btn-next")){
        remTooltip("#btn-next-tooltip", "#btn-next-tooltip-text");
        console.log("Next button enabled"); 
    }else{
        $("#btn-next-tooltip").addClass("tooltip");
        $("#btn-next-tooltip-text").css("display", "block");
    }
}


function test(){ //FIXME
    getStepGroups();
    $("#feat-steps").show();
    dispSteps(outputSteps);
}



