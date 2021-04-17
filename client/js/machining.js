
  $(document).ready(function() {
    M.updateTextFields();
    $('.dropdown-trigger').dropdown();
    $('select').formSelect();
    google.script.run.withSuccessHandler(gotMtlData).loadMaterialData()
  });

  let workpiece = document.querySelector('#workpiece')
  let materialfilter = document.querySelector('#materialfilter')
  let myForm = document.querySelector('#myForm')
  let loadingCircle = document.querySelector('.loadingCircle')
  let material = document.querySelector('#material')
  
  let millingOperation = document.querySelector('#millingOperation')
  let turningOperation = document.querySelector('#turningOperation')
  let drillingOperation = document.querySelector('#drillingOperation')
  let machineRate = document.querySelector('#machineRate')
  let finalVolume = document.querySelector('#finalVolume')

  
  let millingInput = document.querySelector('#millingInput')
  let latheInput = document.querySelector('#latheInput')
  let drillingInput = document.querySelector('#drillingInput')
  let machinedRateInput = document.querySelector('#machinedRateInput')
  let finalVolumeInput = document.querySelector('#finalVolumeInput')

  let calculators = document.querySelector('.calculators')
  let calcArray =  Array.from(calculators.querySelectorAll('div'))
  calcArray.forEach(element => element.classList.add('hide'))

  calculators.addEventListener('click', e => {
    if(e.target.nodeName === "BUTTON"){
      switch (e.target.id) {
        case "millingCalc":
          e.target.classList.remove('glow')
          e.target.innerHTML = e.target.innerHTML === "+" ? '-' : '+' 
          document.querySelector('#millingCalculator').classList.toggle('hide')
          break;
        case "turningCalc":
          e.target.classList.remove('glow')
          e.target.innerHTML = e.target.innerHTML === "+" ? '-' : '+' 
          document.querySelector('#turningCalculator').classList.toggle('hide')
          break;
        case "drillingCalc":
          e.target.classList.remove('glow')
          e.target.innerHTML = e.target.innerHTML === "+" ? '-' : '+' 
          document.querySelector('#drillingCalculator').classList.toggle('hide')
          break;      
        default: console.log('nuffin');
          break;
      }
    }
  })

  millingOperation.addEventListener('change', e=>  millingInput.value = e.target.value + whatUnitsText )
  turningOperation.addEventListener('change', e=>  latheInput.value = e.target.value +whatUnitsText)
  drillingOperation.addEventListener('change', e=>  drillingInput.value = e.target.value +whatUnitsText )
  machineRate.addEventListener('change', e=>  machinedRateInput.value = "$" + e.target.value + " (usd/hr)")
  finalVolume.addEventListener('change', e=>  finalVolumeInput.value = e.target.value + "%")

  myForm.addEventListener("change", e=> changeTrigger(e))

  let whatUnits;
  let whatUnitsText;
  millingOperation


  myForm.style.display = 'none'

  function changeTrigger(e){
    console.log('changeTrigger fired, change in "myForm"');
    switch (e.target.id) {
        case "units":
          updateUnits(e.target.value)
          break;
        case "material":
          clearFilter(workpiece)
          filterByMaterial(e.target.value)
          fillSelectOptions(materialObject, workpiece)
          break;
        default: console.log('no id selected');
        break;
          }
  }
  
myForm.addEventListener('submit', e => {
  
  e.preventDefault();  
  variables = {}

  let drillingCheckbox = document.querySelector('#drillingCheckbox')
  let turningCheckbox = document.querySelector('#turningCheckbox')
  let millingCheckbox = document.querySelector('#millingCheckbox')

  let arrayForm = Array.from(myForm.querySelectorAll('*[id]'))
  
  arrayForm.forEach(element => {
    if(element.id.length < 25){
      switch (element.id) { //complete me !!
        case "partNumber":
          return variables["partNumber"] = element.value
        case "units":
          return variables["units"] = element.value
        case "material":
          return variables["material"] = element.value
        case "workpieceModal":
          return variables["workpieceModal"] = element.value
        case "length":
          return variables["length"] = element.value
        case "width":
          return variables["width"] = element.value
        case "height":
          return variables["height"] = element.value
        case "workpiece":
          return variables["workpiece"] = element.value
        case "finishOne":
          return variables["finishOne"] = element.value
        case "EAU":
          return variables["EAU"] = element.value
        case "roughStockVol":
          return variables["roughStockVol"] = element.value
        case "finalVolume":
          return variables["finalVolume"] = element.value
        case "finalVolumeInput":
          return variables["finalVolumeInput"] = element.value
        case "mrrModal":
          return variables["mrrModal"] = element.value
        case "millingOperation":
          return variables["millingOperation"] = element.value
        case "millingInput":
          return variables["millingInput"] = element.value
        case "turningOperation":
          return variables["turningOperation"] = element.value
        case "latheInput":
          return variables["latheInput"] = element.value
        case "drillingOperation":
          return variables["drillingOperation"] = element.value
        case "drillingInput":
          return variables["drillingInput"] = element.value
        case "shopRate":
          return variables["shopRate"] = element.value
        case "machineRate":
          return variables["machineRate"] = element.value
        case "machinedRateInput":
          return variables["machinedRateInput"] = element.value
        case "drillingCheckbox":
          return variables["drillingCheckbox"] = element.checked
        case "turningCheckbox":
          return variables["turningCheckbox"] = element.checked
        case "millingCheckbox":
          return variables["millingCheckbox"] = element.checked

        default: return;
      }
    } 
  })

  if( !drillingCheckbox.checked && !turningCheckbox.checked && !millingCheckbox.checked){
    alert('Please select at least one machining operation (MRR)')
    return;
  }

  if( variables["length"] === "" || variables["width"] === "" || variables["height"] === "" ||
      variables["EAU"] === "" || variables["finishOne"] ==="" || variables["partNumber"] === ""
      ){
        alert(" Please make sure all fields are filled in");
        return;
      }

  console.log(variables);
  
  // google.script.run.withSuccessHandler(gotEstimation).estimateMachined(variables)
  estimateMachined(variables)
  
})

function estimateMachined(variablesObj){
  var estimationData = {};
  let average= 0

  if(variablesObj['units'] === 'inches'){
    variablesObj['length'] = variablesObj['length'] * 2.54;
    variablesObj['width']  = variablesObj['width'] * 2.54;
    variablesObj['height'] = variablesObj['height'] * 2.54;
    if (variablesObj['millingCheckbox']) {variablesObj['millingOperation'] = variablesObj['millingOperation'] * 16.387;}
    if (variablesObj['turningCheckbox']) {variablesObj['turningOperation'] = variablesObj['turningOperation'] * 16.387;}
    if (variablesObj['drillingCheckbox']) {variablesObj['drillingOperation'] = variablesObj['drillingOperation'] * 16.387;}
  }

  estimationData['Part surface (cm2)'] = variablesObj['workpiece'] === 'Round' 
    ? (Math.pow((variablesObj['width']/2),2)) * Math.PI
    : variablesObj['width'] * variablesObj['height']

  for (const element of fromGS){
    if(element !== null){
      if( (element['Shape'] === variablesObj['workpiece']) && (element['Surface cm2'] >= (estimationData['Part surface (cm2)'])) ){
        estimationData['workpiece weigth'] = element["Kg/cm (lineal)"] * element["Lengt cm"]
        estimationData['Workpiece volume each'] = element['Surface cm2'] * element["Lengt cm"]
        estimationData['Lengt cm'] = element['Lengt cm']
        estimationData['Price per Kg'] = element['Price per Kg']
        estimationData['workpiece selected surface cm2'] = element['Surface cm2']
        break;
      }
    }
  }

  estimationData['number of workpieces'] = Math.ceil((variablesObj['EAU'] * variablesObj['length']) / estimationData["Lengt cm"] )

  if(!estimationData['Workpiece volume each']){
    alert( `There's no ${variablesObj['workpiece']} workpiece with the required meassures, try with another workpiece shape`)
    return
  }
  
  estimationData['total raw mtl weight'] = estimationData['number of workpieces'] * estimationData['workpiece weigth']

  estimationData['Cut pieces adder'] = variablesObj['EAU'] * 1.5

  // Volume of rough stock
  estimationData['Vr'] =  estimationData['Workpiece volume each'] * estimationData['number of workpieces'] 
  // Final volume
  estimationData['Vm'] = estimationData['Vr'] *  (variablesObj['finalVolume']/100)
  estimationData['Tm'] = 0

  if(variablesObj['millingCheckbox']){
    estimationData['Tm'] += variablesObj['millingOperation']
    average++ 
  }
  if(variablesObj['turningCheckbox']){
    estimationData['Tm'] += variablesObj['turningOperation']
    average++
  }
  if(variablesObj['drillingCheckbox'] ){ 
    estimationData['Tm'] += variablesObj['drillingOperation']
    average++
  }
  console.log('Tm before average',estimationData['Tm'])
  estimationData['Tm'] /= average

  estimationData['raw volume part'] = variablesObj['workpiece'] === 'Round' 
    ? (Math.pow((variablesObj['width']/2),2)) * Math.PI * variablesObj['length']
    : variablesObj['width'] * variablesObj['height'] * variablesObj['length']

  estimationData['final volume part'] =  (variablesObj['finalVolume']/100) * estimationData['raw volume part']
  estimationData['removed material cm3'] = estimationData['raw volume part'] - estimationData['final volume part']
  estimationData['time per part'] = estimationData['removed material cm3'] / estimationData['Tm'] 
  estimationData['machining cost ea'] = estimationData['time per part'] * variablesObj['machineRate'] + 1.50
  estimationData['total mtl cost'] = estimationData['total raw mtl weight'] * estimationData['Price per Kg']
  estimationData['part cost each'] = (estimationData['total mtl cost'] / variablesObj['EAU']) 
    + estimationData['machining cost ea'] + 1.50
  estimationData['sheetURL'] = localStorage.getItem('url')
  estimationData['Input values'] = variablesObj

  console.log('variablesObj', variablesObj)
  console.log('estimationData', estimationData)
  google.script.run.withSuccessHandler(completed).loadToGoogleSheet(estimationData)
  estimationData = {}
  
}


function completed(){
  console.log('completed!');
}

function updateUnits(units){

  whatUnits = units === "inches" ?  `(in<sup>3</sup>/min)` : `(cm<sup>3</sup>/min)`
  
  whatUnitsText = whatUnits === "(in<sup>3</sup>/min)" ? " in3/min" : " cm3/min"

  let mrrUnits = document.querySelectorAll('#mrrUnits')
  mrrUnits.forEach(element => element.innerHTML = whatUnits )

  millingOperation.min = units === "inches" ? 0.5 : 8.2
  millingOperation.max = units === "inches" ? 500 : 8194

  turningOperation.min = units === "inches" ? 0.5 : 8.2
  turningOperation.max = units === "inches" ? 50 : 820

  drillingOperation.min = units === "inches" ? 0.3 : 4.9
  drillingOperation.max = units === "inches" ? 36 : 590

  
}

function clearFilter(filterName){
    var options = filterName.querySelectorAll('option')    
    options.forEach((option, index) => {
      filterName.options[index]
      filterName.remove([filterName.index])
    })
}
        
function gotMtlData(data){
  console.log('data', data);
  fillMaterialFilter(data)
  loadingCircle.style.display = 'none';
  myForm.style.display = 'block';
} 

let variables = [];
let cutCharge = {"Cut charge" : 1.50}
variables.push(cutCharge)

 let workPieces; 
 let workPiecesWords = [];
 let materials;
 let materialsWords = [];
 let fromGS ;
 let materialObject =[];

 function filterByMaterial(material){
  materialObject = [];
  fromGS.map(element => {
    if(element !== null && element["Material"] === material){
      if(!materialObject.includes(element["Shape"])){
        materialObject.push(element["Shape"])
      }
    }
  })
  console.log(materialObject);
 }

 function fillMaterialFilter(data){
  fromGS = data;
  materials = data.map(elem => elem !==null && elem["Material"])
  getWords(materials, materialsWords)
  fillSelectOptions(materialsWords, material)
  $('select').formSelect();
 }

 function fillWorkpieceFilter(fromGS){
  workPieces = fromGS.map(elem => elem !==null && elem["Shape"]);
  getWords(workPieces, workPiecesWords)
  console.log(workPiecesWords);
  fillSelectOptions(workPiecesWords, workpiece)
  $('select').formSelect();
 }

 function getWords (inArray, outArray){
  inArray.forEach(elem => {
    if(!outArray.includes(elem)){
      outArray.push(elem)
    }
  })
 }

function fillSelectOptions(options, filterName){
  let disabledOption = document.createElement('option')
  disabledOption.text = 'Select :'
  disabledOption.disabled = true;
  filterName.add(disabledOption)
  options.map(option => {
    let opt = document.createElement('option')
    opt.text = option
    opt.value = option
    filterName.add(opt)
  })
  $('select').formSelect();
}



const milling = {
    information : "They are usually used to machine flat surfaces, but can also produce irregular surfaces. They can also be used to drill, bore, cut gears, and produce slots.",
}


const Turning = {
   information: `
        Turning is a machining process in which a cutting tool, typically a non-rotary tool bit, describes a helix toolpath by moving more or less linearly while the workpiece rotates.
        Usually the term "turning" is reserved for the generation of external surfaces by this cutting action, whereas this same essential cutting action when applied to internal surfaces (holes, of one kind or another) is called "boring".
   `
}


//Part Lot Cost =  N x [ ( Vr – Vm ) x Tm x Rt x (1hr/60min) ] + Ohm + Sc 

// Vr = Volume of Rough Stock (in3, mm3 )
// Vm = Volume of Final Machined Part (in3 , mm3 )
// Tm = Material Removal minutes per unit volume (min/in3 , min/mm3 )
// Rt = Machine shop rate ($/ hr )
// Ohm = Machine shop overhead ($)
// Sc = Lot manufacturing setup costs ($)
// N = Lot built quantity
// Metal removal rates vary as follows:

// Milling operations: 0.5 in3 / min ( 2 min/in3 ) to 500 in3 / min ( 0.002 min/in3 )
// Small dia. end mill – Shell insert cutter
// Lathe turning: from 0.5 ( 2 min/in3 ) to 50 in3 / min ( 0.02 min/in3 )
// Drilling: from 0.3 ( 3.33 min/in3 ) to 36 in3 / min ( 0.028 min/in3 )


let wrapperXYZ = {
    x: 0, y:0, z:0
}

