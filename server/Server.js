var Route = {};

Route.path = function (route,callback){
  Route[route] = callback;
  
}

//LOAD WEB APP
function doGet(e) {
//DriveApp.getRootFolder();
//UrlFetchApp.fetch("");
//UrlFetchApp.fetch("")
//Session.getActiveUser()

Logger.log(Route);
console.log(Route);

    Route.path('plastics',loadPlastics);
    Route.path('sheet',loadSheetMetal);
    Route.path('uploadFile',loadUploadFile);
    Route.path('partcatalogue',loadPartCatalogue);
    Route.path('machined',loadMachined);
    Route.path('home',loadHome)
  
  if(Route[e.parameters.v] ){
  
      return Route[e.parameters.v]();
    
    } else{
      
      return loadHome()
    }
}

function loadHome(){
    
   return HtmlService.createTemplateFromFile('Home').evaluate();  
}

function loadPlastics(){
    
   return HtmlService.createTemplateFromFile('plasticsHTML').evaluate();  
}

function loadSheetMetal(){
    
   return HtmlService.createTemplateFromFile('sheetMetalHTML').evaluate();    
}

function loadUploadFile(){

   return HtmlService.createTemplateFromFile('uploadFile').evaluate();    
}
 
function loadPartCatalogue(){

  return HtmlService.createTemplateFromFile('PartCatalogue').evaluate();    
}

function loadMachined(){

  return HtmlService.createTemplateFromFile('Machined').evaluate();    
}

//ESTIMATE FUNCTION triggered with click. Will estimate pricing based on the information input
function estimate(data, googleSheet, sheetName) {

  var ws = SpreadsheetApp.openByUrl(googleSheet);
  var sheet = ws.getSheetByName(sheetName);
  
  
  //Set values 
  data.forEach(function(row){
    var lastRow = sheet.getLastRow();
    var headerValues = sheetName === "Sheet Metal" ? sheet.getRange(1,1,1, 12).getValues() : sheet.getRange(1, 1, 1, 27).getValues();

    function getKeyIndex (key){   
      var keyIndex;
      headerValues[0].forEach(function(elem,index){
        if (elem === key){
             keyIndex = index + 1;
             return keyIndex
        }
      }) 
      return null;
    }

    Object.keys(row).forEach(function (key){
      var column = getKeyIndex(key);
      var value = row.key
      if (column){
        sheet.getRange(lastRow + 1, column ).setValue(row[key]) 
      }
    })

    var estimatedPrice

    if (sheetName === 'Sheet Metal'){
      estimatedPrice= calculate(row)
    }else if (sheetName === 'Plastics'){
      estimatedPrice = [
        row["Calculated Number of cavities"],
        row["Cycle Time (Seconds)"],
        row["Press size per Cavity"],
        row["Parts per Hour"],
        row["Press Cost ($/hour)"],
        row["Processing Cost Per Part"],
        row["Contingencies/Overhead Costs"],
        row["Total Estimated Cost per Part:"]
      ];
    }
    
    var initCol = sheetName === "Sheet Metal" ? 13 : 20

    estimatedPrice.forEach(function (element, index){
      sheet.getRange(lastRow + 1, initCol + index).setValue(estimatedPrice[index])
    })

    if(sheetName === "Sheet Metal"){
      headerValues[0].forEach(function (element, index){
        if(row[element]){
          sheet.getRange(lastRow + 1, index + 1).setValue(row[element])
        }
      })
    
    }
    
  })
     //return; 
}


// Load source sheet information --GLOBAL
var materialPriceSheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1kFtNEVhIQr3mMaFbXXP8hMTl_nhTr-7pHtprRf4zf5U/edit#gid=0");
var sheet = materialPriceSheet.getSheetByName('Sheet Metal');
var ratesSheet = materialPriceSheet.getSheetByName('Production Costs')
var ratesArr = ratesSheet.getRange(2, 1, 8, 3).getValues();


////////////////////Calculate prices and costs for SHEET METAL ////////////////////
function calculate(row){

  if( row["Units(mm/in)"] === "inches"){
    row["Width"] =  row["Width"] * 25.4;
    row["Length"] =  row["Length"] * 25.4 ;
    row["Thickness"] =  row["Thickness"] * 25.4 ;
  }
  
  var materialCosts = sheet.getRange(5, 1, 8, 5).getValues();
  var finishCosts = sheet.getRange(16, 1, 6, 4).getValues();
  var bendingCost = sheet.getRange(25, 2).getValue();
  var costFactor = sheet.getRange(30, 1, 6, 3).getValues();
  var hardwareCost = sheet.getRange(39, 1, 13, 2).getValues();

  //Get cost factor
  costFactor.forEach(function (elem){
      if ( row["EAU"] >= elem[0] && row["EAU"] <= elem[1] ){
      row["costFactorValue"] = elem[2]
      }
  })

  //Material density
  materialCosts.forEach(function (elem){
    if (elem[0] === row["Material"]){
    row["materialDensity"] = elem[4]
    }
})
  
  //Cost of material
  materialCosts.forEach(function (elem){
      if (elem[0] === row["Material"]){
      row["materialCost"] = elem[2]
      }
  })

  //Get finish costs
  finishCosts.forEach(function (elem){
      if (elem[0] === row["Finish Type"]){
        row["finishPrice1"] = elem[2]
      }
      if (elem[0] === row["Finish Type 2"]){
        row["finishPrice2"] = elem[2]
      } 
  })

  //Get cost factor
  costFactor.forEach(function (elem){
      if ( row["EAU"] >= elem[0] && row["EAU"] <= elem[1] ){
      row["costFactorValue"] = elem[2]
      }
  })

  //Get hardware price
  hardwareCost.forEach(function (elem){
    if (elem[0] === row["Hdw complexity"]){
    row["hardwareCost"] = elem[1]
    }
  })
  
  // formula: Weight = L/1000 * W/1000 * Thickness * Density
  var partWeight = (row["Length"]/1000) *  (row["Width"]/1000) *  row["Thickness"] * row["materialDensity"];
  var partSurfaceSqMt = (row["Length"]/1000) *  (row["Width"]/1000);

  if (row["Length"] >= 1000 || (row["Width"] >= 1000)){
    row["Time Factor"] = 1.5
  }else{
    row["Time Factor"] = 1
  }

  //Make object from ratesArray

    var rates = {}
    ratesArr.forEach(function (element) {
    rates[element[0]] = { 'usd/hr' : element[1], 'timeFactor' : element[2] }
    })

    row['Total operation costs'] = 0
   
    
    for( var operation in row.operations){
        row['Total operation costs'] += rates[operation]['timeFactor'] * rates[operation]['usd/hr'] * row.operations[operation][operation + " count"]
    }
    
    row["Material cost"] = (partWeight * row["materialCost"]).toFixed(4);
    row["Finish cost"] = ((partSurfaceSqMt * row["finishPrice1"] *2 ) + (partSurfaceSqMt * row["finishPrice2"] * 2)).toFixed(4);
    row["Labor cost"] = row['Total operation costs']
    if(row["Hardware qty"]){
      row["Hardware cost"]= row["hardwareCost"] * row["Hardware qty"];
    }else{
      row["Hardware cost"] = 0;
    }
    row["PRICE /each"] = Number(row["Material cost"]) + Number(row["Finish cost"]) + Number(row["Labor cost"]) + Number(row["Hardware cost"]) + Number(row["costFactorValue"])
  // formula: Weight = L/1000 * W/1000 * Thickness * Density  
 
  
  return [ row["Material cost"], row["Finish cost"],row["Hardware cost"],row["Labor cost"], row["PRICE /each"] ]
}



/////////////////// PLASTIC INJECTION INSERT INTO GOOGLE SHEETS ///////////////

function plasitcPriceToGoogleSheet(data, googleSheet, sheet){
  
}






/*********************************************** START **************************************/
//Create new Google Sheet for this Project Number
function start (qims){
  
  var qims =  qims + ' Integrated Estimator';
  var newSheet = SpreadsheetApp.create(qims);
  var sheetMetalSheet = newSheet.insertSheet('Sheet Metal');
  var PlasticsSheet = newSheet.insertSheet('Plastics');
  var PCBSheet = newSheet.insertSheet('Machined');
  var Sheet1  = newSheet.getSheetByName('Sheet1');
  newSheet.deleteSheet(Sheet1);
  
  var id = newSheet.getId();
  var origin = DriveApp.getFileById(id);
  var folder = DriveApp.getFolderById('1xKkZ7H4J8S6aKEBsSYffxp6pIzHsMV0V');
  var fileCopied = origin.makeCopy(folder);
  var fileCopiedUrl = fileCopied.getUrl();

  DriveApp.getFileById(id).setTrashed(true);

  var sheetHeader = [
      "Part Number",
      "Units(mm/in)",
      "Length","Width",
      "Thickness",
      "Material",
      "Finish Type",
      "Finish Type 2",
      "Bendings(#)",
      "EAU",
      "Hardware qty",
      "Hdw complexity",
      "Material cost",
      "Finish cost",
      "Hardware cost",
      "Labor cost",
      "PRICE /each"]

  var plasticHeader =[
    "Part Number",
    "Units",
    "Material",
    "Material Gravity",
    "Material volume (cm3 / in3)",
    "Part Weight",
    "Cost of Material",
    "Estimated cost per part",
    "EAU",
    "Wall thickness (in / mm)",
    "Projected area of part (in 2 / cm 2)",
    "Press size",
    "Press size cost ($/hr)",
    "Cavities",
    "Number of cavities",
    "Overhead contingencies",
    "Cycle time",
    "Seconds per cycle",
    "Number of cavities",
    "Calculated Number of cavities",
    "Cycle Time (Seconds)",
    "Press size per Cavity",
    "Parts per Hour",
    "Press Cost ($/hour)",
    "Processing Cost Per Part",
    "Contingencies/Overhead Costs",
    "Total Estimated Cost per Part:"
  ]

  
      var ws = SpreadsheetApp.openByUrl(fileCopiedUrl);
      var sheetMetalSheet = ws.getSheetByName("Sheet Metal");
      sheetHeader.forEach(function(elem, index){
        sheetMetalSheet.getRange(1,index + 1).setValue(elem)
        if(index + 1 <= 12){
          sheetMetalSheet.getRange(1,index + 1).setBackground("#333").setFontColor("#fff").setFontSize(11).setFontWeight(800)
        }else{
          sheetMetalSheet.getRange(1,index + 1).setBackground("orange").setFontColor("#fff").setFontSize(11).setFontWeight(800)
        }
      })

      var plasticSheet = ws.getSheetByName("Plastics");
      plasticHeader.forEach(function(elem, index){
        plasticSheet.getRange(1,index + 1).setValue(elem)
        if(index + 1 <= 19){
          plasticSheet.getRange(1,index + 1).setBackground("#333").setFontColor("#fff").setFontSize(11).setFontWeight(800)
        }else{
          plasticSheet.getRange(1,index + 1).setBackground("orange").setFontColor("#fff").setFontSize(11).setFontWeight(800)
        }

      })

    return (fileCopiedUrl);

}
//end of START

 
 //LOAD GSM - Material cost SHEET TO GET COST SOURCES
 
  function loadSourceCostPlastics (){
 
      
       var plastSheetValues = {};
       var plasticsSheet = ss.getSheetByName('Plastics');
       plastSheetValues.material = plasticsSheet.getRange(5,1,8,6).getValues();
       plastSheetValues.finsih = plasticsSheet.getRange(19,1,6,5).getValues();  
       plastSheetValues.printing = plasticsSheet.getRange(29,1,3,5).getValues();  
       plastSheetValues.hardware = plasticsSheet.getRange(35,1,3,2).getValues();  
       
       var jsonVals = JSON.stringify(plastSheetValues);
   
   return jsonVals;
   
   
 }

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

var plastics;
var sheetMetal;
var gaskets;
var heatsinks;
var extrusions;

var plasticsData;

function loadPartCatalogueData(){
    var wb = SpreadsheetApp.openById('1jSO1Kiq-JNFJC-2H3ECiFCe26235hzleju2zviGSniA');
    plastics = wb.getSheetByName('Plastics');
    sheetMetal = wb.getSheetByName('Sheet metal');
    gaskets = wb.getSheetByName('Gaskets');
    heatsinks = wb.getSheetByName('Heatsinks');
    extrusions = wb.getSheetByName('Extrusion');
    var lastColumn = plastics.getLastColumn();
    
    var header = plastics.getRange(1,1,1,lastColumn).getValues();
    var plasticsValues = plastics.getDataRange().offset(1,0).getValues();
    var sheetMetalValues = sheetMetal.getDataRange().offset(1,0).getValues();
    var gasketsValues = gaskets.getDataRange().offset(1,0).getValues();
    var heatsinksValues = heatsinks.getDataRange().offset(1,0).getValues();
    var extrusionsValues = extrusions.getDataRange().offset(1,0).getValues();

    var catalogueData = {}
   
    catalogueData.plastics = getData(plasticsValues)
    catalogueData.sheetMetal = getData(sheetMetalValues)
    catalogueData.gaskets = getData(gasketsValues)
    catalogueData.heatsinks = getData(heatsinksValues)
    catalogueData.extrusions = getData(extrusionsValues)
    

    return JSON.stringify(catalogueData);
    
}

function getData(values){
  var data = values.map(function(element){
    if(element[0] !== ""){
      return{
       "Image url" : element[0],
       "Project number" : element[1],
       "Part Number" : element[2],
       "Date quoted" : element[3],
       "Best Price Supplier" : element[4],
       "Quoted price" : element[5],
       "Volume" : element[6],
       "Part weight" : element[7],
       "Units(grams/ounces)" : element[8],
       "XYZ wrapper measure" : element[9],
       "Units(cm/inch)" : element[10],
       "Commodity" : element[11],
       "Material" : element[12],
       "Process" : element[13],
       "Finish" : element[14],
       "Part description" : element[15],
       "File names" : element[16],
       "File path" : element[17],
       "Tooling" : element[18]
      }
    }
  })
  return data
}

var machinedData;

function getMachinedData (workPieceType){
  // get material workbook
  var wb = SpreadsheetApp.openById('1kFtNEVhIQr3mMaFbXXP8hMTl_nhTr-7pHtprRf4zf5U');
  var machinedInfosheet = wb.getSheetByName('Machined');
  var dataArrFormat = machinedInfosheet.getDataRange().getValues();

    machinedData = dataArrFormat.map(function(element, index){
    
      if (index != 0 && element[1] === workPieceType ){
        return {
          "Material" : element[0],
          "Shape" : element[1],
          "Kg/cm (lineal)" : element[2],
          "A (cm)" : element[3],
          "B (cm)" : element[4],
          "Surface cm2" : element[5],
          "Image" : element[6],
          "Lengt cm" : element[7],
          "Price per Kg" : element[8],
          "Price per workpiece" : element[9]
        }
      }
    })
}

function loadMaterialData(){
  // get material workbook
  var wb = SpreadsheetApp.openById('1kFtNEVhIQr3mMaFbXXP8hMTl_nhTr-7pHtprRf4zf5U');
  var machinedInfosheet = wb.getSheetByName('Machined');
  var dataArrFormat = machinedInfosheet.getDataRange().getValues();
  
   machinedData = dataArrFormat.map(function(element, index){
    if (index !== 0){
      return {
        "Material" : element[0],
        "Shape" : element[1],
        "Kg/cm (lineal)" : element[2],
        "A (cm)" : element[3],
        "B (cm)" : element[4],
        "Surface cm2" : element[5],
        "Image" : element[6],
        "Lengt cm" : element[7],
        "Price per Kg" : element[8],
        "Price per workpiece" : element[9]
      }
    }
  })
  return machinedData
}

function estimateMachined(variables){

  getMachinedData(variables['workpiece'])

  var estimationData = {};
  Logger.log("variables : ")
  Logger.log(variables)
  if(variables['units'] === 'inches'){
    variables['length'] = Number(variables['length']) * 2.54;
    variables['width']  = Number(variables['length']) * 2.54;
    variables['height'] = Number(variables['length']) * 2.54;
    if (variables['millingOperation']) {variables['millingOperation'] = Number(variables['length']) * 16.387;}
    if (variables['turningOperation']) {variables['turningOperation'] = Number(variables['length']) * 16.387;}
    if (variables['drillingOperation']) {variables['drillingOperation'] = Number(variables['length']) * 16.387;}
  }
  
  estimationData['single part length'] = variables['length']
  estimationData['number of workpieces'] = (Number(variables['EAU']) * Number(variables['length']))/ Number(machinedData["Lengt cm"]) + 1
  estimationData['Part surface (cm2)'] = Number(variables['width']) * Number(variables['height'])
  estimationData['Single part volume']; 
  
  machinedData.forEach(function(element){
    if(element['Surface cm2'] >= estimationData['Part surface (cm2)']){
      estimationData['workpiece weigth'] = Number(element["Kg/cm (lineal)"]) * Number(element["Lengt cm"])
      estimationData['Workpiece volume each'] = Number(element['Surface cm2']) * Number(element["Lengt cm"])
    }
  })

  estimationData['Cut pieces adder'] = Number(variables['EAU']) * 1.5
  estimationData['Vr'] =  Number(estimationData['Workpiece volume each']) * estimationData['number of workpieces'] 
  estimationData['Vm'] = estimationData['Vr'] *  Number(variables['finalVolume']/100)
  estimationData['Tm'] = 0

  if(variables['millingOperation'] != ""){
    estimationData['Tm'] += 1 / Number(variables['millingOperation'])
  }
  if(variables['turningOperation'] != ""){
    estimationData['Tm'] += 1 / Number(variables['turningOperation'])
  }
  if(variables['drillingOperation'] != ""){
    estimationData['Tm'] += 1 / Number(variables['drillingOperation'])
  }

  estimationData['Rt'] = Number(variables['machineRate'])
  
  estimationData['Part Lot Cost'] = Number(variables['EAU']) * 
   ( (estimationData['Vr'] - estimationData['Vm'] ) * estimationData['Tm'] * estimationData['Rt'] * (1/60))

   Logger.log(estimationData)
   
   return estimationData

}

// 1  .05
// 2 : 1
// 1 inch per 2min
// 0.5 per min

// Milling operations: 0.5 in3 / min ( 2 min/in3 ) to 500 in3 / min ( 0.002 min/in3 )
// Small dia. end mill – Shell insert cutter
// Lathe turning: from 0.5 ( 2 min/in3 ) to 50 in3 / min ( 0.02 min/in3 )
// Drilling: from 0.3 ( 3.33 min/in3 ) to 36 in3 / min ( 0.028 min/in3 )

//Part Lot Cost =  N x [ ( Vr – Vm ) x Tm x Rt x (1hr/60min) ] + Ohm + Sc 

// Vr = Volume of Rough Stock (in3, mm3 )
// Vm = Volume of Final Machined Part (in3 , mm3 )
// Tm = Material Removal minutes per unit volume (min/in3 , min/mm3 )
// Rt = Machine shop rate ($/ hr )
// Ohm = Machine shop overhead ($)
// Sc = Lot manufacturing setup costs ($)
// N = Lot built quantity
// Metal removal rates vary as follows:

function getUserInfo(){
  var user = Session.getEffectiveUser().getEmail();
  return user;
}

function loadToGoogleSheet (estimationData) {
  var wb = SpreadsheetApp.openByUrl(estimationData['sheetURL'])
  var ss = wb.getSheetByName('Machined')
  var header = [
    'Part number',
    'Units',
    'Lenght',
    'Widht',
    'Height',
    'EAU',
    'Material',
    'Work piece',
    'Milling -material removal rate',
    'Lathe turning -material removal rate',
    'Drilling -material removal rate',
    'Shop rate ($/hr)',
    'Machining cost ea',
    'Cut piece adder',
    'Part cost each'

    // estimationData.variablesObj['partNumber'],
    // estimationData.variablesObj['units'],
    // estimationData.variablesObj['length'],
    // estimationData.variablesObj['width'],
    // estimationData.variablesObj['height'],
    // estimationData.variablesObj['EAU'],
    // estimationData.variablesObj['material'],
    // estimationData.variablesObj['workpiece'],
    // estimationData.variablesObj['millingInput'],
    // estimationData.variablesObj['latheInput'],
    // estimationData.variablesObj['drillingInput'],
    // estimationData.variablesObj['machineRate'],
  ]

  header.forEach(function (element, index){
    ss.getRange( 1,index + 1 ).setValue(element)
  })

  ss.getRange(1,1,1,12).setBackground("#333").setFontColor("#fff").setFontSize(11).setFontWeight(800)  
  ss.getRange(1,13,1,3).setBackground("orange").setFontColor("#fff").setFontSize(11).setFontWeight(800)
  
  var lastRow = ss.getLastRow();

  ss.getRange(lastRow + 1, 1).setValue(estimationData['Input values']['partNumber'])
  ss.getRange(lastRow + 1, 2).setValue(estimationData['Input values']['units'])
  ss.getRange(lastRow + 1, 3).setValue(estimationData['Input values']['length'])
  ss.getRange(lastRow + 1, 4).setValue(estimationData['Input values']['width'])
  ss.getRange(lastRow + 1, 5).setValue(estimationData['Input values']['height'])
  ss.getRange(lastRow + 1, 6).setValue(estimationData['Input values']['EAU'])
  ss.getRange(lastRow + 1, 7).setValue(estimationData['Input values']['material'])
  ss.getRange(lastRow + 1, 8).setValue(estimationData['Input values']['workpiece'])
  ss.getRange(lastRow + 1, 9).setValue(estimationData['Input values']['millingInput'])
  ss.getRange(lastRow + 1, 10).setValue(estimationData['Input values']['latheInput'])
  ss.getRange(lastRow + 1, 11).setValue(estimationData['Input values']['drillingInput'])
  ss.getRange(lastRow + 1, 12).setValue(estimationData['Input values']['machineRate'])
  ss.getRange(lastRow + 1, 13).setValue(estimationData['machining cost ea'])
  ss.getRange(lastRow + 1, 14).setValue(1.50)
  ss.getRange(lastRow + 1, 15).setValue(estimationData['part cost each'])
  
}

