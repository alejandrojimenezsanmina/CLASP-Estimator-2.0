var Route = {};

Route.path = function (route,callback){
  Route[route] = callback;
  
}

//LOAD WEB APP
function doGet(e) {
//DriveApp.getRootFolder();
//UrlFetchApp.fetch("");

Logger.log(Route);
console.log(Route);

    Route.path('plastics',loadPlastics);
    Route.path('sheet',loadSheetMetal);
    Route.path('uploadFile',loadUploadFile);
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
        }
      }) 
      return keyIndex;
    }

    Object.keys(row).forEach(function (key){
      var column = getKeyIndex(key);
      var value = row.key
      sheet.getRange(lastRow + 1, column ).setValue(row[key]) 
    })

    var estimatedPrice

    if (sheetName === 'Sheet Metal'){
      estimatedPrice= calculate(row)
    }else if (sheetName === 'Plastics'){
      Logger.log(row)
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
    
  })
     //return; 
}


// Load source sheet information --GLOBAL
var materialPriceSheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1kFtNEVhIQr3mMaFbXXP8hMTl_nhTr-7pHtprRf4zf5U/edit#gid=0");
var sheet = materialPriceSheet.getSheetByName('Sheet Metal');
var ratesSheet = materialPriceSheet.getSheetByName('Production Costs')
var ratesArr = ratesSheet.getRange(1, 1, 9, 2).getValues();


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

  row["Time Factor"] = function(){
    if (row["Length"] >= 1000 || row["Width"]){
      return 1.5
    }else{
      return 1
    }
  }

  //Calculate cost for each operation and put into an Array
  var operationCosts = row.operations.map(function (element){
    var operation = Object.keys(element)[0]
    var rate = findRate(operation)
    var timeFactor = timeFactor(operation)
    return row[operation.split(" ")[0] + ' cost' ] = Number(timeFactor * rate * row["Time Factor"])
  })

    row["Material cost"] = (partWeight * row["materialCost"]).toFixed(4);
    row["Finish cost"] = ((partSurfaceSqMt * row["finishPrice1"] *2 ) + (partSurfaceSqMt * row["finishPrice2"] * 2)).toFixed(4);
    row["Labor cost"] = 'Pending'
    if(row["Hardware qty"]){
      row["Hardware cost"]= row["hardwareCost"] * row["Hardware qty"];
    }else{
      row["Hardware cost"] = 0;
    }
    row["PRICE /each"] = Number(row["Material cost"]) + Number(row["Finish cost"]) + Number(row["Labor cost"]) + Number(row["Hardware cost"]) + Number(row["costFactorValue"])
  // formula: Weight = L/1000 * W/1000 * Thickness * Density  
  
  return [ row["Material cost"], row["Finish cost"],row["Hardware cost"],row["Labor cost"], row["PRICE /each"] ]
}


function findRate(operation){
  ratesArr.forEach(function(elem){
    if(String(elem[0]).includes(operation)){
      return elem[1]
    }
  })
}

function timeFactor(operation){
  ratesArr.forEach(function(elem){
    if(String(elem[0]).includes(operation)){
      return elem[2]
    }
  })
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

