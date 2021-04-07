
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

  myForm.addEventListener("change", e=> changeTrigger(e))

  myForm.style.display = 'none'

  
  function changeTrigger(e){
    console.log('changeTrigger fired, change in "myForm"');
    switch (e.target.id) {
        case "partNumber":
        variables.push({"partNumber": e.target.value})
          break;
        case "units":
          updateUnits(e.target.value)
          variables.push({"units": e.target.value})
          break;
        case "material":
          clearFilter(workpiece)
          filterByMaterial(e.target.value)
          fillSelectOptions(materialObject, workpiece)
          variables.push({"material": e.target.value});
          break;
        case "length":
          variables.push({"length": e.target.value})
          break;
        case "width":
          variables.push({"width": e.target.value})
          break;
        case "height":
          variables.push({"height": e.target.value})
          break;
        case "finishOne":
          variables.push({"finishOne": e.target.value})
          break;
        case "EAU":
          variables.push({"EAU": e.target.value})
          break;
        case "roughStockVol":
          variables.push({"roughStockVol": e.target.value})
          break;
        case "workpiece":
          variables.push({"workpiece": e.target.value})
          break;          
        case "finalVolume":
          variables.push({"finalVolume": e.target.value})
          break;          

        default: console.log('no id selected');
        break;
          }
        }

function updateUnits(units){
  // document.querySelector('#mrrUnits').innerHTML = units ==="inches" ?  `(in<sup>3</sup>/min)` : `(mm<sup>3</sup>/min)`
  let mrrUnits = document.querySelectorAll('#mrrUnits')
  mrrUnits.forEach(element => element.innerHTML = units ==="inches" ?  `(in<sup>3</sup>/min)` : `(cm<sup>3</sup>/min)`)
  let millingOperation = document.querySelector('#millingOperation')
  let turningOperation = document.querySelector('#turningOperation')
  let drillingOperation = document.querySelector('#drillingOperation')

  millingOperation.min = units === "inches" ? 0.5 : 8.2
  millingOperation.max = units === "inches" ? 500 : 8194

  turningOperation.min = units === "inches" ? 0.5 : 8.2
  turningOperation.max = units === "inches" ? 50 : 820

  drillingOperation.min = units === "inches" ? 0.3 : 4.9
  drillingOperation.max = units === "inches" ? 36 : 590
}

function minMax(input, minimum, maximum){
  input.min = minimum
  input.max = maximum
}

function clearFilter(filterName){
    var options = filterName.querySelectorAll('option')    
    options.forEach((option, index) => {
      filterName.options[index]
      filterName.remove([filterName.index])
    })
}
        
function gotMtlData(data){
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

