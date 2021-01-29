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
function estimate(data, googleSheet, sheet) {

  var ws = SpreadsheetApp.openByUrl(googleSheet);
  var sheet = ws.getSheetByName(sheet);
  
  
  //Set values 
  data.forEach(function(row){
    var lastRow = sheet.getLastRow();
    var headerValues = sheet.getRange(1,1,1, 12).getValues();

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

    var estimatedPrice = calculate(row)
    estimatedPrice.forEach(function (element, index){
      sheet.getRange(lastRow + 1, 13 + index).setValue(estimatedPrice[index])
    })
    
  })
     //return; 
}

// Load source sheet information
var materialPriceSheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1kFtNEVhIQr3mMaFbXXP8hMTl_nhTr-7pHtprRf4zf5U/edit#gid=0");
var sheet = materialPriceSheet.getSheetByName('Sheet Metal');

////////////////////Calculate prices and costs////////////////////
function calculate(row){

  if( row["Units(mm/in)"] === "in"){
    row["Width"] =  convertToMm(row["Width"]);
    row["Length"] =  convertToMm(row["Length"]);
    row["Thickness"] =  convertToMm(row["Thickness"]);
  }
  
  var materialCosts = sheet.getRange(5, 1, 8, 5).getValues();
  var finishCosts = sheet.getRange(16, 1, 6, 4).getValues();
  var bendingCost = sheet.getRange(25, 2).getValue();
  var costFactor = sheet.getRange(30, 1, 6, 3).getValues();
  var hardwareCost = sheet.getRange(39, 1, 3, 2).getValues();
  
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
    row["hardwareCost"] = elem[2]
    }
  })
  
  // formula: Weight = L/1000 * W/1000 * Thickness * Density
  var partWeight = (row["Length"]/1000) *  (row["Width"]/1000) *  row["Thickness"] * row["materialDensity"];
  var partSurfaceSqMt = (row["Length"]/1000) *  (row["Width"]/1000);

    row["Material cost"] = (partWeight * row["materialCost"]).toFixed(4);
    row["Finish cost"] = ((partSurfaceSqMt * row["finishPrice1"] *2 ) + (partSurfaceSqMt * row["finishPrice2"] * 2)).toFixed(4);
    row["Labor cost"] = row["Bendings(#)"] * bendingCost;
    if(row["Hardware qty"]){
      row["Hardware cost"]= row["hardwareCost"] * row["Hardware qty"];
    }else{
      row["Hardware cost"] = 0;
    }
    row["PRICE /each"] = Number(row["Material cost"]) + Number(row["Finish cost"]) + Number(row["Labor cost"]) + Number(row["Hardware cost"]) + Number(row["costFactorValue"])
  // formula: Weight = L/1000 * W/1000 * Thickness * Density  
  
  return [ row["Material cost"], row["Finish cost"],row["Hardware cost"],row["Labor cost"], row["PRICE /each"] ]
}

//Convert inches to mm
function convertToMm(input){
  return (input * 25.4).toFixed(4)
}



// Parse JSON strings to objects and push to newArr. Create new Google sheet and set all objects in the sheet.
function toGS (arr,googleSheetURL){
    Logger.log(googleSheetURL);
    
   //OPEN GOOGLE SHEET BY URL
   var ss = SpreadsheetApp.openByUrl(googleSheetURL);
   var sheet = ss.getSheetByName('Sheet Metal');
   sheet.getRange(1, 1).setValue('Sheet Metal').setFontSize(14);
   var lastRow = sheet.getLastRow() + 1;
   var i = 2; 
   var j = 1;
   var initRange = sheet.getRange(lastRow, 1);
   var row = 3;
    
    var newArr = [];
    
    //ARRAY CONTAINING HEADER IN GOOGLE SHEETS FOR SHEET METAL ESTIMATIONS
    var index = [
    ["Part Number","Strategy","Units","Material","Length","Width","Thickness","Weight","Area","Part density","Cost of material","Finish type 1","Finish 1 cost","Finish type 2","Finish 2 cost","Number of bendindgs","Cost per bending","EAU","Hardware qty","Hardware complexity","Cost per hardware unit","Total hardware cost","Part estimatation in USD"]
    
        ];
    // OBJECT CONTAINING KEYS TO BE MATCHED AGAINST HEADER BY INDEX NUMBER     
    var indexObj = { partNumber:1,strategy:2, units:3,	material:4,	length:5, width:6, thickness:7,	weight:8, surfaceArea:9, density:10, mtlPrice:11, finishOne:12,	totalFinishPrice1:13, finishTwo:14,	totalFinishPrice2:15, bending:16, bendingCost:17, EAU:18, qtyHdw:19, complexity:20,	hardwareCost:21, totalHdwCost:22, estimation:23
    };
    
    arr.forEach(function (element){
        newArr.push(JSON.parse(element));
    });
    
 
   
   index[0].forEach(function (element){
       sheet.getRange(2,j).setValue(element)
       j++;
   });
   
   //Loop through each Object's keys and find its index vs indexObj, assign that index as the column number.
   newArr.forEach(function(obj){ 
     Object.keys(obj).forEach(function (elem){
          Object.keys(indexObj).forEach(function (indxObjKey){
              if (indxObjKey === elem){
                     var column = indexObj[indxObjKey] ;
                     sheet.getRange(row, column).setValue(obj[elem]);
                   }
              });         
         });
         
    row++;
   });
 
 
 
   // return address;
 
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

    return fileCopiedUrl;

}//end of START

 
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

