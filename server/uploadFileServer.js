
function createSheetforUpload(projNum) {
  
  var columnNames = ["Part Number","Units(mm/in)","Length","Width","Thickness","Material","Finish Type","Finish Type 2","Bendings(#)","EAU","Hardware qty","Hdw complexity","ESTIMATION" ]
  var newSheet = SpreadsheetApp.create("Mass estimation " + projNum)
  var sheetUrl = newSheet.getUrl();
  
  var sheet = newSheet.getSheetByName("Sheet1")
  sheet.setName("Sheet metal")
  var header=  sheet.getRange(1, 1, 1 , 12)
  // Get Material Cost sheet
  var materialCostSheet = SpreadsheetApp.openById("1kFtNEVhIQr3mMaFbXXP8hMTl_nhTr-7pHtprRf4zf5U");
  var materialSheet = materialCostSheet.getSheetByName("Sheet Metal")
  var materials = ["CRS/SPCC",	"Zinc pre-plating/SECC",	"Hot dipped Gal /SGCC",	"Tin pre-plating /SPTE",	"Brass /copper",	"Stainless steel (Sus304/Sus301)",	"Alu alloy 5052",	"Alu alloy 6061"];
  var finishes = ["Zinc plating ( all types)",	"Chromate/alodine/anodized", "Painting (Powder/oil)", "No finish required (degrease)",	"Nickel/tin plating",	"Silkscreen /printing"];
  var hwdComplexity = ["Simple", "Medium", "Complex"];
  var units = ["mm", "in"];
  
  //Material column in google sheet
  var materialCol = sheet.getRange(1, 6, 50, 1);  
  var materialRule = SpreadsheetApp.newDataValidation().requireValueInList(materials).build();
  materialCol.setDataValidation(materialRule);
  
  //Finish column in google sheet
  var finishCol = sheet.getRange(1, 7, 50, 1);  
  var finishRule = SpreadsheetApp.newDataValidation().requireValueInList(finishes).build();
  finishCol.setDataValidation(finishRule);
  
   //Finish2 column in google sheet
  var finishCol2 = sheet.getRange(1, 8, 50, 1);  
  var finishRule2 = SpreadsheetApp.newDataValidation().requireValueInList(finishes).build();
  finishCol2.setDataValidation(finishRule2);
  
  //Hdw complexity column in google sheet
  var hdwCompCol = sheet.getRange(1, 12, 50, 1);  
  var hdwCompRule = SpreadsheetApp.newDataValidation().requireValueInList(hwdComplexity).build();
  hdwCompCol.setDataValidation(hdwCompRule);
  
  //Units column in google sheet
  var unitsCol = sheet.getRange(1, 2, 50, 1);  
  var unitsColRule = SpreadsheetApp.newDataValidation().requireValueInList(units).build();
  unitsCol.setDataValidation(unitsColRule);
  
  
  columnNames.forEach(function(elem, index){
    sheet.getRange(1, index + 1).setValue(String(elem))
  })
  
  header.setBackground("gray").setFontColor("white").setFontSize(11);
  sheet.getRange(1, 13).setBackground("green").setFontColor("white").setFontSize(12);
  
  return sheetUrl;
}

function estimateMassSheet (url){

    var ss = SpreadsheetApp.openByUrl(url)
    var sheet = ss.getSheetByName("Sheet metal");
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var dataRange = sheet.getRange(2, 1, Number(lastRow) - 1, Number(lastColumn) - 1)
    var dataValues = dataRange.getValues();
    var initialRow = 2
    var initialColumn = 13;    
    var estimations = dataValues.map( function(elem) {
      return calculate(elem)
    })
    
    estimations.forEach(function(element, index){
      if(isNaN(element)){
        sheet.getRange(initialRow + index, initialColumn).setValue("Error. Please review your input data");
      }else{
        sheet.getRange(initialRow + index, initialColumn).setValue(element);
      }
    })
}


// function calculate(element){

//   var materialPriceSheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1kFtNEVhIQr3mMaFbXXP8hMTl_nhTr-7pHtprRf4zf5U/edit#gid=0");
//   var sheet = materialPriceSheet.getSheetByName('Sheet Metal');
//   var meassures = [element[2],element[3], element[4]];
  
//   if(element[1] === "in"){
//     meassures = convertToMm(element[2],element[3], element[4])
//   }
  
//   var materialCosts = sheet.getRange(5, 1, 8, 5).getValues();
//   var finishCosts = sheet.getRange(16, 1, 6, 4).getValues();
//   var bendingCost = sheet.getRange(25, 2).getValue();
//   var costFactor = sheet.getRange(30, 1, 6, 3).getValues();
  
//   var materialInfo;
//   var finishInfo;
//   var finishInfo2;
//   var costFactorValue;
  
//   costFactor.forEach(function (elem){
//     if(element[0] !== ""){
//       if ( element[9] >= elem[0] && element[9] <= elem[1] ){
//       costFactorValue = elem[2]
//       }
//     }
//   })
  
  
//   materialCosts.forEach(function (elem){
//     if(element[0] !== ""){
//       if (elem[0] === element[5]){
//       materialInfo = elem
//       }
//     }
//   })
  
//   finishCosts.forEach(function (elem){
//     if(element[0] !== ""){
//       if (elem[0] === element[6]){
//       finishInfo = elem
//       }
//       if (elem[0] === element[7]){
//       finishInfo2 = elem
//       }
//     }
//   })
  
//   // formula: Weight = L/1000 * W/1000 * Thickness * Density
//   var partWeight = (meassures[0]/1000) *  (meassures[1]/1000) *  meassures[2] * materialInfo[4];
//   var partSurfaceSqMt = (meassures[0]/1000) *  (meassures[1]/1000)
  
  
//     var itemMtlCost = partWeight * materialInfo[2];
//     var itemFinishCost = partSurfaceSqMt * finishInfo[2];
//     var itemFinishCost2 = partSurfaceSqMt * finishInfo2[2];
//     var itemBendingCost = element[8] * bendingCost;
    
//     try {
//       var estimationPrice = (itemMtlCost + itemFinishCost + itemFinishCost2 + itemBendingCost )* costFactorValue;
//       return estimationPrice.toFixed(2);
//     }
//     catch(err) {
//       return "Something went wrong. Please review columns";
//     }
  
// }


function convertToMm(length, width, thickness){
  length = (length * 25.4).toFixed(4);
  width = (width * 25.4).toFixed(4) ;
  thickness = (thickness * 25.4).toFixed(4);
  
  return [length, width, thickness];
}

