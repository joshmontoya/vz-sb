// Initialize OmniChannel objects (in place of database request)
const omnichannelDb = 
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
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade",  "Promotions - New", "Promotions - Existing", "Accessory", "Plan Change", "Feature Change",
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
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade", "Promotions - New", "Promotions - Existing", "Accessory", "Plan Change", "Feature Change",
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
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade",  "Promotions - New", "Promotions - Existing", "Accessory", "Plan Change", "Feature Change",
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
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade",  "Promotions - New", "Promotions - Existing", "Plan Change", "Feature Change"],
            "deplTypes" : ["Shipment", "Local"],
            "devTypes" : ["5G/4G Home Internet", "Tablets", "Smartphones", "BYOD", "Netbooks & Notebooks",
                            "Internet Devices", "Connected Devices", "Basic Phones"],
            "tradeTypes" : [],
            "pmtTypes" : [],
        },
        "Indirect mPOS" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "SL"],
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade",  "Promotions - New", "Promotions - Existing", "Plan Change", "Feature Change"],
            "deplTypes" : ["Shipment", "Local"],
            "devTypes" : ["5G/4G Home Internet", "Tablets", "Smartphones", "BYOD", "Netbooks & Notebooks",
                            "Internet Devices", "Connected Devices", "Basic Phones"],
            "tradeTypes" : [],
            "pmtTypes" : [],
        },
        "MVO" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "ME", "SL"],
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade", "Promotions - New", "Promotions - Existing", "Accessory", "Plan Change", "Feature Change",
                                    "Trade-in", "Return Only", "Return w/ Exchange", "Suspend", "Reconnect", "TYS"],
            "deplTypes" : ["Shipment", "ISPU", "SDD"],
            "devTypes" : ["Smartphones", "BYOD", "Tablets & Laptops", "Connected Smart Watches", "Hotspots & Internet Devices", "Basic Phones", "5G/4G Home Internet"],
            "tradeTypes" : ["Promo", "Instant"], 
            "pmtTypes" : ["BTA", "Credit Card", "Gift Card", "Combo Payment", "Paypal", "Verizon Dollars"],
        },
        "MVA" : 
        {
            "acctTypes" : ["PE", "PE w/ ECPD", "BE w/o ECPD", "ME", "SL"],
            "functionalities" : ["Add-A-Line", "Upgrade",  "Promotions - Existing", "Accessory", "Plan Change", "Feature Change",
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
            "functionalities" : ["New Activation", "Add-A-Line", "Upgrade",  "Promotions - New", "Promotions - Existing", "Accessory", "Plan Change", "Feature Change",
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

// console.log(JSON.stringify(omnichannelDB));
// let dataJson = ;
// let fieldData = JSON.parse(dataJson);

// For functionality stackability reference
const stackability = {
    "New Activation" : ["Promotions - New", "Accessory", "Feature Change", "Trade-in"],
    "Upgrade" : ["Add-A-Line", "Promotions - Existing", "Accessory", "Plan Change", "Feature Change", "Trade-in"],
    "Add-A-Line" : ["Upgrade", "Promotions - Existing", "Accessory", "Plan Change", "Feature Change", "Trade-in"],
    "Return w/ Exchange" : ["Accessory"],
    "Accessory" : ["New Activation", "Add-A-Line", "Upgrade", "Promotions - New", "Promotions - Existing", "Plan Change", "Feature Change", "Trade-in", "Return w/ Exchange"],
    "Trade-in" : ["New Activation", "Add-A-Line", "Upgrade", "Promotions - New", "Promotions - Existing", "Accessory", "Plan Change", "Feature Change"],
    "Feature Change" : ["New Activation", "Add-A-Line", "Upgrade", "Promotions - New", "Promotions - Existing", "Accessory", "Plan Change", "Trade-in"],
    "Plan Change" : ["Add-A-Line", "Upgrade", "Promotions - Existing", "Accessory", "Feature Change", "Trade-in"],
    "Promotions - New" : ["New Activation", "Accessory", "Feature Change", "Trade-in"],
    "Promotions - Existing" : ["Add-A-Line", "Upgrade", "Promotions - Existing", "Accessory", "Plan Change", "Feature Change", "Trade-in"]
}



// For required Functionality details selection validation
const numFuncDtlsSel = 8;