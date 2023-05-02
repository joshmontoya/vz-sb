// Helper functions
function dropDownSelections(arr, id){ 
    let o = document.createElement("option");
    o.text = "Select";
    o.value = "";
    id.appendChild(o);
    id.length = 1;
    arr.forEach(function(item){
        o = document.createElement("option");
        o.text = item;
        o.value = item;
        id.appendChild(o);
    });
}

function addToScenario(query, key){
    let ddList = document.querySelector("#" + query);
    let selection = ddList.value;
    let eleTag = document.getElementById(query).tagName;
    if(!isNaN(selection)){
        selection = Number(selection);
    }
    if(key == "func"){
        funcValidation(query, selection, key);
    }else if(Array.isArray(scenario[key])){
        scenario[key].push(selection);
        scenario.scenarioLog();
    }else{
        scenario[key] = selection;
        console.log("Scenario updated");
        scenario.scenarioLog();
        if(eleTag == "SELECT" && ddList.options[0].value == ''){
            ddList.options[0].remove();
        }
    }
}
//***********FIX / FIGURE OUT WHICH ONE
function addToScenario2(select, key){
    let selection = select.value;
    let eleTag = document.getElementById(query).tagName;
    if(!isNaN(selection)){
        selection = Number(selection);
    }
    if(key == "func"){
        funcValidation(query, selection, key);
    }else if(Array.isArray(scenario[key])){
        scenario[key].push(selection);
        scenario.scenarioLog();
    }else{
        scenario[key] = selection;
        console.log("Scenario updated");
        scenario.scenarioLog();
        if(eleTag == "SELECT" && ddList.options[0].value == ''){
            select.options[0].remove();
        }
    }
}

function numDropDown(min, max){
    let s = document.createElement("select")
    let o = document.createElement("option");
    o.text = "Select";
    o.value = "";
    s.appendChild(o);
    for(let i=min; i<=max; i++){
        o = document.createElement("option");
        o.text = i;
        o.value = i;
        s.appendChild(o);
    }
    return s;
}

function funcDetailsPop(id=null, float="right", min=1, max=5){
    const div = document.createElement("div");
    div.style.width = "50%";
    div.style.height = "100px";
    div.style.float = float;
    if(id != null){
        let h5 = document.createElement("h5");
        h5.setAttribute("id", id);
        h5.innerText = funcDetailsHeaders[id];
        let select = numDropDown(min, max);
        div.appendChild(h5);
        div.appendChild(select);
    }
    document.getElementById("funcDetailsDiv").appendChild(div);
}

function funcDetailsCreate(){
    const f = scenario.func;
    function singleSel(id, count){
        if(count % 2 == 0){
            funcDetailsPop(id, "left");
        }else{
            funcDetailsPop(id, "right");
        }
        return count;
    }
    let eleCount = 0, lineCount = 0;
    const d = document.getElementById("funcDetailsSec");
    d.style.display = "block";

    if(f.includes("New Activation") || f.includes("Add-A-Line")){
        funcDetailsPop("numNewAal", "left");
        //******UPDATE FOR NUMBER OF AVAILABLE/REQUIRED SELECTION AMT 
        // MIN MAX OF SELECT OPTIONS AVAILABLE BASED ON PRIOR SELECTIONS*/
        funcDetailsPop("numPort", "right", 1, numNewAal);
        funcDetailsPop("numPlanChg", "left", 2, 5);
        eleCount += 3;
    }
    if(f.includes("Upgrade")){
        singleSel("numUpg", eleCount);
        eleCount += 1;
    }
    if(f.includes("Accessory")){
        singleSel("numAcces", eleCount);
        eleCount += 1;
    }
    if(f.includes("Trade-in")){
        singleSel("numTradeIn", eleCount);
        eleCount += 1;
    }
    if(f.includes("Feature Change")){
        singleSel("numFeatChg", eleCount);
        eleCount += 1;
    }
    if(!eleCount % 2 == 0){
        console.log(eleCount); //FIXME
        funcDetailsPop();
    }
}
    

// Initialize functionalities menu based on Application selection
function initFunc(){
    const app = document.querySelector("#selApplication").value;
    dropDownSelections(Object.values(dataObj.applications[app].functionalities), document.getElementById("selFunc"));
    console.log("Functionalities populated for selected application");
}

function addFunc(){
    let selection = document.querySelector("#selFunc").value;
    let newFuncList = [];


    const newActFunc = ["New Activation", "Accessory", "Feature Change", "Trade-in"];
    let upgAalPlnChgFunc = ["Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change", "Trade-in"];
    let retExchgFunc = ["Return w/ Exchange", "Accessory", "Trade-in"];
    let accTradeFunc = ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change", "Trade-in", "Return w/ Exchange"];
    let featChgFunc = ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change", "Trade-in"];

    if(scenario.acctType == null){
        alert("You must select an Account Type first!");
        console.log("Alert: account type not selected");
        document.getElementById("selFunc").selectedIndex=0;
    }else{
        scenario.func.push(selection);
        scenario.scenarioLog();
        console.log("Scenario updated");
        dispFunc();

        if(scenario.func.includes("New Activation")){
            newActFunc.forEach(function(item){
                if(!scenario.func.includes(item)){
                    newFuncList.push(item);
                }
            })
        }else if(scenario.func.includes("Return w/ Exchange")){
            retExchgFunc.forEach(function(item){
                if(!scenario.func.includes(item)){
                    newFuncList.push(item);
                }
            })
        }else if((scenario.func.includes("Upgrade") || scenario.func.includes("Add-A-Line") || scenario.func.includes("Plan Change")) ||
                    (scenario.func.includes("Upgrade") || scenario.func.includes("Add-A-Line") || scenario.func.includes("Plan Change")) &&
                    (scenario.func.includes("Accessory") || scenario.func.includes("Feature Change") || scenario.func.includes("Trade-in"))){
            upgAalPlnChgFunc.forEach(function(item){
                if(!scenario.func.includes(item)){
                    newFuncList.push(item);
                }
            })
        }else if((scenario.func.includes("Accessory") || scenario.func.includes("Trade-in")) &&
                    (!scenario.func.includes("New Activation") && !scenario.func.includes("Add-A-Line") && !scenario.func.includes("Upgrade") && !scenario.func.includes("Feature Change")) ){
            accTradeFunc.forEach(function(item){
                if(!scenario.func.includes(item)){
                    newFuncList.push(item);
                }
            })
        }else if(scenario.func.includes("Feature Change")){
            featChgFunc.forEach(function(item){
                if(!scenario.func.includes(item)){
                    newFuncList.push(item);
                }
            })
        }else{}
    
        dropDownSelections(newFuncList, document.getElementById("selFunc"));
        console.log("Functionalities updated");
    }
}

function dispFunc(){
    let e = "";
    for(i = 0; i < scenario.func.length; i++){
        e += scenario.func[i] + ", ";
    }
    document.getElementById("result").innerHTML = e;
}

function clearFuncArr(arr){
    let arrLen = arr.length;
    if(arrLen != 0){
        arr.length = 0;
        console.log("Scenario functionality array cleared");
        alert("Functionalities cleared!");
        dispFunc();
    }else{
        alert("No functionalities selected!");
    }

}

function hideFunc(){
    if(!scenario.func.length == 0){
        let c = confirm("Are you sure you are done selecting functionalities?");
        if(c){
            $("#clearFuncMsg").hide();
            $("#clearFuncBtn").hide();
            $("#selFunc").hide();
            $("#funcDoneMsg").hide();
            $("#funcDoneBtn").hide();
        }else{
            c.preventDefault();
        }
    }else{
        alert("You must select at least one functionality!");
    }
}


// Initialize OmniChannel objects (in place of database)

const dataObj = 
{
    // Attributes that apply across all Applications
    "acctTypes" : ["PE", "PEwECPD", "BEwoECPD", "ME", "SL", "BE"],
    "devTypes" : ["5G/4G Home Internet", "Tablets", "Smartphones", "BYOD", "Netbooks/Notebooks",
    "Internet Devices", "Connected Devices", "Basic Phones"],
    "contrTypes" : ["36 Monthly Payments", "Full Retail Price"],
    "tradeTypes" : ["Promo", "Instant"],
    "planChgTypes" : 
        [
            "MDN Lvl - On Demand", "MDN Lvl - Future Dated", "MDN Lvl - Verify Plan Detail",
            "Acct Lvl - On Demand", "Acct Lvl - Future Dated", "Acct Lvl - Verify Plan Detail",
            "No Plan Change"
        ],
    "applications" : 
    {
        "Telesales" : 
        {
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Suspend", "Reconnect", "TYS", "Remarks"],
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "No Payment"],
            "deplTypes" : ['Shipment', 'ISPU', 'SDD']
        },
        "Retail" : 
        {
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Return Only", "Return w/ Exchange", "Suspend", "Reconnect", "TYS", "Remarks"],
            "pmtTypes" : ["BTA", "Cash", "Credit Card", "Gift Card", "Combo Payment", "No Payment", "BPK"],
            "deplTypes" : ['Shipment', 'Local', 'SDD']
        },
        "Retail mPOS" : 
        {
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Return Only", "Return w/ Exchange", "Suspend", "Reconnect", "TYS", "Remarks"],
            "pmtTypes" : ["BTA", "Cash", "Credit Card", "Gift Card", "Combo Payment", "No Payment", "BPK"],
            "deplTypes" : ['Shipment', 'Local', 'SDD']
        },
        "ACSS-Flex" : 
        {
            "functionalities" : ["Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Equipment Return", "Suspend", "Reconnect", "TYS", "Remarks"],
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "No Payment"],
            "deplTypes" : ['Shipment', 'ISPU', 'SDD']
        },
        "Indirect" : 
        {
            "functionalities" : [],
            "pmtTypes" : [],
            "deplTypes" : []
        },
        "Indirect mPOS" : 
        {
            "functionalities" : [],
            "pmtTypes" : [],
            "deplTypes" : []
        },
        "MVO" : 
        {
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Suspend", "Reconnect", "TYS"],
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "No Payment", "Paypal", "Verizon Dollars"],
            "deplTypes" : ['Shipment', 'ISPU', 'SDD']
        },
        "MVA" : 
        {
            "functionalities" : ["Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Suspend", "Reconnect"],
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "No Payment", "Paypal", "Verizon Dollars"],
            "deplTypes" : ['Shipment', 'ISPU', 'SDD']
        },
        "Chatbot" : 
        {
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Suspend", "Reconnect", "TYS"],
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "No Payment", "Paypal", "Verizon Dollars"],
            "deplTypes" : ['Shipment', 'ISPU', 'SDD']
        },
        "Chatstore" : 
        {
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Suspend", "Reconnect", "TYS", "Remarks"],
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "No Payment"],
            "deplTypes" : ['Shipment', 'ISPU', 'SDD']
        }, 
    }
};

// console.log(JSON.stringify(dataObj));
// let dataJson = ;
// let fieldData = JSON.parse(dataJson);

const funcDetailsHeaders =
{
    "numNewAal" : "Number of New/AAL",
    "numPort" : "Number of Port-ins",
    "numUpg" : "Number of Upgrades",
    "numAcces" : "Number of Accessories",
    "numTradeIn" : "Number of Trade-ins",
    "numPlanChg" : "Number of Plan Changes",
    "numFeatChg" : "Number of Feature Changes"
}

const scenarios = [];

// Initialize scenario
let scenario = {
    "userStoryId" : null,
    "application" : null, 
    "acctType" : null,
    "func" : [],
    "numNewAal" : null,
    "numPort" : null,
    "numUpg" : null,
    "numAcces" : null,
    "numTradeIn" : null,
    "numPlanChg" : null,
    "numFeatChg" : null,
    "devTypeNewAAL" : null,
    "devTypeUpg" : null,
    "deplType" : null,
    "contrTypeNewAAL" : null,
    "contrTypeUpg" : null,
    "tradeType" : null,
    "planChgType" : null,
    "pmtType" : null,

    "scenarioLog" : function() {
        console.log(scenario)
    }
};


// Initialize main dropdown menus
dropDownSelections(Object.keys(dataObj.applications), document.getElementById("selApplication"));
console.log("OmniChannel applications populated");
dropDownSelections(Object.values(dataObj.acctTypes), document.getElementById("selAcctType"));
console.log("Customer account types populated");

// Populate functionality details elements
// function funcDetailsPop(idLeft, idRight){
//     const divLeft = document.createElement("div"), divRight = document.createElement("div");
//     divLeft.style.width = "50%";
//     divLeft.style.height = "100px";
//     divLeft.style.float = "left";
//     divRight.style.width = "50%";
//     divRight.style.height = "100px";
//     divRight.style.float = "right";
//     let h5 = document.createElement("h5");
//     h5.setAttribute("id", idLeft);
//     h5.innerText = funcDetailsHeaders[idLeft];
//     let select = numDropDown();
//     divLeft.appendChild(h5);
//     divLeft.appendChild(select);
//     if(idRight != null){
//         h5 = document.createElement("h5");
//         h5.innerText = funcDetailsHeaders[idRight];
//         select = numDropDown();
//         divRight.appendChild(h5);
//         divRight.appendChild(select);
//     }
//     document.getElementById("funcDetailsDiv").appendChild(divLeft);
//     document.getElementById("funcDetailsDiv").appendChild(divRight);
// }

/* Populates div on either left side or right side of Functionalilty Details section
* assigns header value and select dropdown attr
* default is null/blank on right side to allow for extra div in case of odd number divs 
*/


