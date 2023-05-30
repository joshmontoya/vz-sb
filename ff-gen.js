// Helper functions

/** FIXME 
 * functions for entered USWIN temp variable storage, element restrict
 * need future API incorporation of hashed login, and ID attachment/reference 
 * to stored scenarios in db
**/
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
    const s = document.querySelector(query);
    let o;
    s.length = 1;
    arr.forEach(function(item){
        o = document.createElement("option");
        o.text = item;
        o.value = item;
        s.appendChild(o);
    });
}


function addToScenario(ele, key){
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
    scenario.scenarioLog();
    console.log("Scenario updated");
}   


function dropDownNums(query, min, max){
    const s = document.querySelector(query);
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


function remTooltip(tooltip, tooltipText){
    $(tooltip).removeClass("tooltip");
    $(tooltipText).remove();
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
    const newAalVal = document.querySelector("#func-dtls-1-sel").value;
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
    $(document).on("change", function(event){
        let target = event.target;
        if($(target).parents().hasClass("container-3-3")){
            funcDtlsDoneBtnEnable();
        }
    });
    const f = scenario.func;
    if(f.includes("New Activation") || f.includes("Add-A-Line")){
        $("#func-dtls-1").show();
        dropDownNums("#func-dtls-1-sel", 1, 5);
        $("#func-dtls-2").show();
        // $("#func-dtls-6").show();
    }
    if(f.includes("Upgrade") && !f.includes("Add-A-Line")){
        $("#func-dtls-3").show();
        $("#func-dtls-3-sel").prop("disabled", false);
        remTooltip('.newAal-func-tooltip', '.newAal-func-tooltip-text');
        dropDownNums("#func-dtls-3-sel", 1, 5);
    }else if(f.includes("Upgrade")){
        $("#func-dtls-3").show();
        dropDownNums("#func-dtls-1-sel", 1, 4);
        dropDownNums("#func-dtls-3-sel", 1, 5);
    }
    if(f.includes("Accessory")){
        $("#func-dtls-4").show();
        dropDownNums("#func-dtls-4-sel", 1, 5);
    }
    if(f.includes("Trade-in")){
        $("#func-dtls-5").show();
        dropDownNums("#func-dtls-5-sel", 1, 5);
    }
    if(f.includes("Plan Change")){
        if(!f.includes("Add-A-Line")){
            remTooltip('.newAal-func-tooltip', '.newAal-func-tooltip-text');
            $("#func-dtls-6-sel").prop("disabled", false);
        }
        $("#func-dtls-6").show();
        dropDownNums("#func-dtls-6-sel", 1, 5);
    }
    if(f.includes("Feature Change")){
        $("#func-dtls-7").show();
        dropDownNums("#func-dtls-7-sel", 1, 5);
    }
    $("#btn-done-func-dtls").show();
}


// Initialize Account Type selector based on Application selection
function initAcctTypes(){
    dropDownSelections("#sel-acct-type", dataObj.applications[$("#sel-application").val()].acctTypes);
    $("#sel-acct-type").prop("disabled", false);
    remTooltip("#sel-acct-type-tooltip", "#sel-acct-type-tooltip-text");
    console.log("Available account types populated for selected application")
}


// Initialize functionalities selector based on Application selection
function initFunc(){
    dropDownSelections("#sel-func", dataObj.applications[$("#sel-application").val()].functionalities);
    $("#sel-func").prop("disabled", false);
    remTooltip("#sel-func-tooltip", "#sel-func-tooltip-text");
    console.log("Available functionalities populated for selected application")
}

// Enable reset button based on Application selection
function enableReset(){
    $("#btn-reset").prop("disabled", false);
}


function addFunc(){
    const selection = document.querySelector("#sel-func").value;
    const newFuncList = [];
    const newActFunc = ["New Activation", "Promotions", "Accessory", "Feature Change", "Trade-in"];
    const existingFunc = ["Add-A-Line", "Upgrade", "Promotions", "Accessory", "Plan Change", "Feature Change", "Trade-in"];
    const retExchgFunc = ["Return w/ Exchange", "Accessory", "Trade-in"];
    const accTradeFunc = ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change", "Trade-in", "Return w/ Exchange"];
    const featChgFunc = ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change", "Trade-in"];
    const appFunc = dataObj.applications[scenario.application].functionalities;

    function createNewFuncList(funcArr){
        funcArr.forEach(function(item){
            if(!scenario.func.includes(item) && appFunc.includes(item)){
                newFuncList.push(item);
            }
        })
    }

    scenario.func.push(selection);
    scenario.scenarioLog();
    console.log("Scenario updated");
    dispFunc();

    if(scenario.func.includes("New Activation")){
        createNewFuncList(newActFunc);
    }else if(scenario.func.includes("Return w/ Exchange")){
        createNewFuncList(retExchgFunc);
    }else if((scenario.func.includes("Upgrade") || scenario.func.includes("Add-A-Line") || scenario.func.includes("Plan Change") || scenario.func.includes("Promotions")) ||
                (scenario.func.includes("Upgrade") || scenario.func.includes("Add-A-Line") || scenario.func.includes("Plan Change")) &&
                (scenario.func.includes("Accessory") || scenario.func.includes("Feature Change") || scenario.func.includes("Trade-in")
                || scenario.func.includes("Promotions"))){
        createNewFuncList(existingFunc);
    }else if((scenario.func.includes("Accessory") || scenario.func.includes("Trade-in")) &&
                (!scenario.func.includes("New Activation") && !scenario.func.includes("Add-A-Line") && !scenario.func.includes("Upgrade") && !scenario.func.includes("Feature Change")) ){
        createNewFuncList(accTradeFunc);
    }else if(scenario.func.includes("Feature Change")){
        createNewFuncList(featChgFunc);
    }else{}

    // document.querySelector("#sel-func").length = 1;
    dropDownSelections("#sel-func", newFuncList);
    console.log("Available functionalities updated");
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
            $("#btn-func-clear").prop("disabled", true)
            console.log("Functionality selection done");
            if(funcArrayComp(dataObj.standaloneFunc) || (scenario.func.length == 1 && scenario.func[0] == "Return w/ Exchange")){
                console.log("Functionality details selection not required for chosen functionalities");
                initTypeDtls();
            }else{
                initFuncDetails();
            }
        }
    }    
}


function funcDtlsDoneBtnEnable(){
    for(let i=1; i<=numFuncDtlsSel; i++){
        if($(document.querySelector("#func-dtls-" + `${i}`)).css("display") != "none" && !funcDtlsExemptEle.includes(i)){
            if((document.querySelector("#func-dtls-" + `${i}` + "-sel").value) == "Select"){
                return;
            }
        }
    }
    $("#btn-done-func-dtls").prop("disabled", false);
    remTooltip("#btn-done-func-dtls-tooltip", "#btn-done-func-dtls-tooltip-text");
}

function doneFuncDtls(){
    let c = confirm("Are you sure you are done selecting functionality details?");
    if(c){
        console.log("Functionality details selection done");
        $("#btn-done-func-dtls").prop("disabled", true);
        for(let i=0; i<=numFuncDtlsSel; i++){
            if($(document.querySelector("#func-dtls-" + `${i}`)).css("display") != "none"){
                $("#func-dtls-" + `${i}` + "-sel").prop("disabled", true);
            }
        }
        $(document).off("change");
        initTypeDtls();
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

// Payment type selection removal function (for no-cost device type(s))
function isNoPmtElig(){
    let newAal, upg, i;

    for(i=1; i<=scenario.numNewAal; i++){
        if(!dataObj.nonPayDevTypes.includes(scenario.lineLvlType[i].devTypeNewAal)){
            return false;
        }
    }
    for(i=1; i<=scenario.numUpg; i++){
        if(!dataObj.nonPayDevTypes.includes(scenario.lineLvlType[i].devTypeUpg)){
            return false;
        }
    }
    console.log("Payment Type column updated. No payment required for device type(s) selected");
    $("#pmt-type").css("display", "none");
    $("#pmt-type-na-msg").text("No payment required for the device type(s) selected");
    $("#pmt-type-na-msg").show();
    scenario.pmtType = null;
    scenario.scenarioLog();
    return true;
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
    const deplPmtTypeFuncs = ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Return w/ Exchange"];
    let pmtTypes = dataObj.applications[scenario.application].pmtTypes;
    if(!funcArrayComp(deplPmtTypeFuncs)){
        $("#depl-type-na-msg").show();
        $("#pmt-type-na-msg").show();
        $("#pmt-type-sel").removeClass("requiredEle");
        console.log("Deployment & Payment Type selections not applicable for chosen functionalities");
    }else{
        $("#depl-type").show();
        $("#depl-type-sel").addClass("requiredEle");
        dropDownSelections("#depl-type-sel", dataObj.applications[scenario.application].deplTypes);
        if(!dataObj.applications[scenario.application].pmtTypes.length){
            $("#pmt-type-na-msg").text("Not applicable for chosen application");
            $("#pmt-type-na-msg").show();
            $("#pmt-type-sel").removeClass("requiredEle");
            console.log("Payment Type selections not applicable for chosen application");
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
            dropDownSelections("#dev-type-retEx-sel", dataObj.applications[scenario.application].devTypes);
            dropDownSelections("#contr-type-retEx-sel", dataObj.contrTypes);
            $("#dev-type-retEx-sel").addClass("requiredEle");
            $("#contr-type-retEx-sel").addClass("requiredEle");
        }else{
            let n;
            if(scenario.func.includes("New Activation") || scenario.func.includes("Add-A-Line")){
                $(".dev-contr-type-newAal").show();
                n = scenario.numNewAal;
                for(let i=1; i<=n; i++){
                    dropDownSelections("#dev-type-" + `${i}` + "-sel", dataObj.applications[scenario.application].devTypes);
                    dropDownSelections("#contr-type-" + `${i}` + "-sel", dataObj.contrTypes);
                    $(".dev-contr-type-" + `${i}`).show();
                    $("#dev-type-" + `${i}` + "-sel").addClass("requiredEle");
                    $("#contr-type-" + `${i}` + "-sel").addClass("requiredEle");
                }
                hasNewAal = true;
            }
            if(scenario.func.includes("Upgrade")){
                if(hasNewAal){ $(".upg-split").show() }
                $(".dev-contr-type-upg").show();
                n = (scenario.numUpg) + 5;
                for(let i=6; i<=n; i++){
                    dropDownSelections("#dev-type-" + `${i}` + "-sel", dataObj.applications[scenario.application].devTypes);
                    dropDownSelections("#contr-type-" + `${i}` + "-sel", dataObj.contrTypes);
                    $(".dev-contr-type-" + `${i}`).show();
                }
            }
        }
    }
    // Init Trade-in Type column
    if(!dataObj.applications[scenario.application].tradeTypes.length){
        $("#trade-type-na-msg").text("Not applicable for chosen application");
        $("#trade-type-na-msg").show();
        console.log("Trade-in Type selections not applicable for chosen application");
    }else if(!scenario.func.includes("Trade-in")){
        $("#trade-type-na-msg").text("Not applicable for chosen functionalities");
        $("#trade-type-na-msg").show();
        console.log("Trade-in Type selections not applicable for chosen functionalities");
    }else{
        for(let i=1; i<=scenario.numTradeIn; i++){
            dropDownSelections("#trade-type-" + `${i}` + "-sel", dataObj.applications[scenario.application].tradeTypes);
            $("#container-trade-type").show();
            $("#trade-type-" + `${i}` + "-sel").show();
            $("#trade-type-" + `${i}` + "-sel").addClass("requiredEle");
        }
    }

    // Init Plan Type column
    if(scenario.func.includes("New Activation")){
        $("#plan-type").show();
        dropDownSelections("#plan-type-sel", dataObj.planTypes);
        $("#plan-type-sel").val("MDN Lvl - On Demand");
        $("#plan-type-sel").prop("disabled", true);
        scenario.planType = "MDN Lvl - On Demand";
    }else if(scenario.func.includes("Add-A-Line") || (scenario.func.includes("Add-A-Line") && scenario.func.includes("Upgrade"))){
        let aalUpgPlanOpts = [dataObj.planTypes[0], dataObj.planTypes[4]];
        $("#plan-type").show();
        remTooltip("#plan-type-tooltip", "#plan-type-tooltip-text");
        dropDownSelections("#plan-type-sel", aalUpgPlanOpts);
        $("#plan-type-sel").addClass("requiredEle");
    }else if(scenario.func.includes("Plan Change")){
        $("#plan-type").show();
        remTooltip("#plan-type-tooltip", "#plan-type-tooltip-text");
        dropDownSelections("#plan-type-sel", dataObj.planTypes);
        $("#plan-type-sel").addClass("requiredEle");
    }else{
        $("#plan-type-na-msg").show();
        console.log("Plan Type selections not applicable for chosen functionalities");
    }
    console.log("Applicable Type details columns/selections populated");
}

// Device & Contract Type details add to scenario object
function addDvcContrTypeDtls(ele, key){
    subKey = ele.options[0].value.slice(-1);
    let contrEle, contrRef;
    if(key == "devTypeNewAal"){
        contrEle = "#contr-type-" + `${subKey}` + "-sel";
        contrRef = "contrTypeNewAal";
    }else if(key == "devTypeUpg"){
        contrEle = "#contr-type-" + `${Number(subKey) + 5}` + "-sel";
        contrRef = "contrTypeUpg";
    }
    //Remove previously assigned BYOD/FWA contract selection & restriction (if appl)
    if($(contrEle).prop("disabled") == true){
        $(contrEle).prop("disabled", false);
        $(contrEle).find("[value=0]").remove();
        }
    //Auto-assign BYOD & FWA contract & restrict selection
    if(dataObj.nonPayDevTypes.includes(ele.value)){
        $(contrEle).append("<option value=0>n/a</option>");
        $(contrEle).val(0);
        $(contrEle).prop("disabled", true);
        scenario.lineLvlType[subKey][contrRef] = null;
    }
    scenario.lineLvlType[subKey][key] = ele.value;
    console.log("Scenario updated");
    scenario.scenarioLog();

}


function reset(){
    let c = confirm("Are you sure you want to reset all scenario selections?");
    if(c){
        const tempScenarioCopy = jQuery.extend(true, {}, defaultScenario);
        scenario = tempScenarioCopy;
        $(".container-home").replaceWith(defaultPage);
        console.log("Scenario selections reset to default");
        if(uswinId != null){
            uswinRetain();
        }
        defaultPage = $(".container-home").clone();
    }
}


function addToCart(){
    let c = confirm("Are you sure you want to add this scenario to cart and build a new one?");
    if(c){
        scenarioObj.push(scenario);
        console.log(scenarioObj[0]); //FIXME
        console.log("Scenario added to cart");
        $(document).off("change");
        const tempScenarioCopy = jQuery.extend(true, {}, defaultScenario);
        scenario = tempScenarioCopy;
        $(".container-home").replaceWith(defaultPage);
        console.log("Scenario selections reset to default");
        uswinRetain();
        defaultPage = $(".container-home").clone();
    }
}


function finalBtnEnable(){
    console.log("finalBtnEnable test"); //FIXME
    const reqElements = $(document).find(".requiredEle");
    console.log(reqElements); //FIXME 
    const defaultOpts = ["", "Select", "New/AAL Line 1", "New/AAL Line 2", "New/AAL Line 3", 
    "New/AAL Line 4", "New/AAL Line 5", "Upgrade Line 1", "Upgrade Line 2", "Upgrade Line 3",
    "Upgrade Line 4", "Upgrade Line 5",];
    for(let i=0; i<reqElements.length; i++){
        if(defaultOpts.includes(reqElements[i].value)){
            $("#btn-next").prop("disabled", true);
            $("#btn-add-to-cart").prop("disabled", true);
            console.log("failed");
            return;
        }

    }
    $("#btn-add-to-cart").prop("disabled", false);
    remTooltip("#btn-atc-tooltip", "#btn-atc-tooltip-text");
    console.log("Add to cart button enabled");
    $("#btn-next").prop("disabled", false);
    remTooltip("#btn-next-tooltip", "#btn-next-tooltip-text");
    console.log("Next button enabled"); 
}


function test(){ //FIXME
    finalBtnEnable();
}





// Initialize OmniChannel objects (in place of database request)
const dataObj = 
{
    // Attributes that apply across all Applications
    "contrTypes" : ["36 Monthly Payments", "Full Retail Price"],
    "planTypes" : 
        [
            "MDN Lvl - On Demand", "MDN Lvl - Future Date", "MDN Lvl - Backdate", "MDN Lvl - Verify Plan Detail",
            "Acct Lvl - On Demand", "Acct Lvl - Future Date", "Acct Lvl - Backdate", "Acct Lvl - Verify Plan Detail"
        ],
    // Application dependent
    "applications" : 
    {
        "Telesales" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "ME", "SL"],
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade",  "Promotions", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Suspend", "Reconnect", "TYS", "Remarks"],
            "deplTypes" : ["Shipment", "ISPU", "SDD"],
            "devTypes" : ["5G/4G Home Internet", "Tablets", "Smartphones", "BYOD", "Netbooks & Notebooks",
                            "Internet Devices", "Connected Devices", "Basic Phones", "Connected Cars"],
            "tradeTypes" : ["Promo", "Instant"],
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "Secure Pay"],
        },
        "Retail" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD"],
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade", "Promotions", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Return Only", "Return w/ Exchange", "Suspend", "Reconnect", "TYS", "Remarks"],
            "deplTypes" : ["Shipment", "Local"],
            "devTypes" : ["5G/4G Home Internet", "Tablets", "Smartphones", "BYOD", "Netbooks & Notebooks",
                            "Internet Devices", "Connected Devices", "Basic Phones"],
            "tradeTypes" : ["Promo", "Instant"],          
            "pmtTypes" : ["BTA", "Cash", "Credit Card", "Gift Card", "Combo Payment", "BPK"],
        },
        "Retail mPOS" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "ME"],
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade",  "Promotions", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Return Only", "Return w/ Exchange", "Suspend", "Reconnect", "TYS", "Remarks"],
            "deplTypes" : ["Shipment", "Local"],
            "devTypes" : ["5G/4G Home Internet", "Tablets", "Smartphones", "BYOD", "Netbooks & Notebooks",
                            "Internet Devices", "Connected Devices", "Basic Phones"],
            "tradeTypes" : ["Promo", "Instant"],  
            "pmtTypes" : ["BTA", "Cash", "Credit Card", "Gift Card", "Combo Payment", "BPK"],
        },
        "ACSS-Flex" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "ME", "SL"],
            "functionalities" : ["Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Equipment Return", "Suspend", "Reconnect", "TYS", "Remarks"],
            "deplTypes" : ["Shipment", "ISPU", "SDD"],
            "devTypes" : ["5G/4G Home Internet", "Tablets", "Smartphones", "BYOD", "Netbooks & Notebooks",
                            "Internet Devices", "Connected Devices", "Basic Phones"],
            "tradeTypes" : ["Promo", "Instant"],
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment"],
        },
        "Indirect" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "SL"],
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade",  "Promotions", "Plan Change", "Feature Change"],
            "deplTypes" : ["Shipment", "Local"],
            "devTypes" : ["5G/4G Home Internet", "Tablets", "Smartphones", "BYOD", "Netbooks & Notebooks",
                            "Internet Devices", "Connected Devices", "Basic Phones"],
            "tradeTypes" : [],
            "pmtTypes" : [],
        },
        "Indirect mPOS" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "SL"],
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade",  "Promotions", "Plan Change", "Feature Change"],
            "deplTypes" : ["Shipment", "Local"],
            "devTypes" : ["5G/4G Home Internet", "Tablets", "Smartphones", "BYOD", "Netbooks & Notebooks",
                            "Internet Devices", "Connected Devices", "Basic Phones"],
            "tradeTypes" : [],
            "pmtTypes" : [],
        },
        "MVO" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "ME", "SL"],
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Return Only", "Return w/ Exchange", "Suspend", "Reconnect", "TYS"],
            "deplTypes" : ["Shipment", "ISPU", "SDD"],
            "devTypes" : ["Smartphones", "BYOD", "Tablets & Laptops", "Connected Smart Watches", "Hotspots & Internet Devices", "Basic Phones", "5G/4G Home Internet"],
            "tradeTypes" : ["Promo", "Instant"], 
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "Paypal", "Verizon Dollars"],
        },
        "MVA" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "ME", "SL"],
            "functionalities" : ["Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Return Only", "Return w/ Exchange", "Suspend", "Reconnect"],
            "deplTypes" : ["Shipment", "ISPU", "SDD"],
            "devTypes" : ["Smartphones", "BYOD", "Tablets & Laptops", "Connected Smart Watches", "Hotspots & Internet Devices", "Basic Phones", "5G/4G Home Internet"],
            "tradeTypes" : ["Promo", "Instant"],
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "No Payment", "Paypal", "Verizon Dollars"],
        },
        "Chatbot" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "ME", "SL"],
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Suspend", "Reconnect", "TYS"],
            "deplTypes" : ["Shipment", "ISPU", "SDD"],
            "devTypes" : ["Smartphones", "BYOD", "Tablets & Laptops", "Connected Smart Watches", "Hotspots & Internet Devices", "Basic Phones", "5G/4G Home Internet"],
            "tradeTypes" : ["Promo", "Instant"],
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "No Payment", "Paypal", "Verizon Dollars"],
        },
        "Chatstore" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "ME", "SL"],
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade",  "Promotions", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Suspend", "Reconnect", "TYS", "Remarks"],
            "deplTypes" : ["Shipment", "ISPU", "SDD"],
            "devTypes" : ["5G/4G Home Internet", "Tablets", "Smartphones", "BYOD", "Netbooks & Notebooks",
                            "Internet Devices", "Connected Devices", "Basic Phones", "Connected Cars"],
            "tradeTypes" : ["Promo", "Instant"],
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "Secure Pay"],
        }, 
    },

    // Supplementary attributes for intuitive customization
    "standaloneFunc" : ["Return Only", "Suspend", "Reconnect", "TYS", "Remarks"],
    "nonPayDevTypes" : ["BYOD", "5G/4G Home Internet", "Connected Cars"]
};

// console.log(JSON.stringify(dataObj));
// let dataJson = ;
// let fieldData = JSON.parse(dataJson);




// Initialize 'carts' for scenario object & reference storage
const scenarioObj = [];
const scenarios = [];

// Initialize global variables

// For required Functionality details selection validation
const numFuncDtlsSel = 8, funcDtlsExemptEle = [2]; 

let uswinId = null; // FIXME pending API for login details logging and scenario history storage

// Initialize scenario for application
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
    "lineLvlType" : 
    {
        "1" : 
        {
            "devTypeNewAal" : null,
            "devTypeUpg" : null,
            "contrTypeNewAal" : null,
            "contrTypeUpg" : null,

        },
        "2" : 
        {
            "devTypeNewAal" : null,
            "devTypeUpg" : null,
            "contrTypeNewAal" : null,
            "contrTypeUpg" : null
        },
        "3" : 
        {
            "devTypeNewAal" : null,
            "devTypeUpg" : null,
            "contrTypeNewAal" : null,
            "contrTypeUpg" : null
        },
        "4" : 
        {
            "devTypeNewAal" : null,
            "devTypeUpg" : null,
            "contrTypeNewAal" : null,
            "contrTypeUpg" : null
        },
        "5" : 
        {
            "devTypeNewAal" : null,
            "devTypeUpg" : null,
            "contrTypeNewAal" : null,
            "contrTypeUpg" : null
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


// Onload: Initialize Application dropdown menu & clone page default state for reset button
dropDownSelections("#sel-application", Object.keys(dataObj.applications));
console.log("OmniChannel applications populated");
let defaultPage = $(".container-home").clone();


