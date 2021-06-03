

var downloadXls = document.getElementById('downloadXls');
var openGSheets = document.getElementById("openGSheets");
var googleSheetURL;
if(localStorage.getItem("url")){
 googleSheetURL =  localStorage.getItem("url");
} 

if (googleSheetURL ){
  let copyLink = document.querySelector('#copyLink');
  let projNumHeader = document.querySelector('#projNumHeader');
  let projNum = localStorage.getItem('projNum')
  projNumHeader.innerText = projNum


  openGSheets.href = googleSheetURL;
  openGSheets.target = "_blank";
  let indexof = googleSheetURL.indexOf("edit?")
  let substr = googleSheetURL.slice(0, indexof);
  let downloadRoute = substr + "export?format=xlsx";
  downloadXls.href = downloadRoute;

}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

//import{uploadFileForm, progress} from './massGenericSCRIPT';

var arr = [];
var myForm = document.querySelector('#myForm');

var loader = document.querySelector('.loader');
loader.style.display = 'none'

let operation = document.querySelector('.operation');
let operationInput = document.getElementById('operationInput')
let addedOperations = document.querySelector('.addedOperations')

// document.getElementById("infoMsg").style.display = "block";
// document.getElementById("infoMsg").style.display = "none";

var hide = document.querySelector('#hide');
let ownHdwDiv = document.querySelector('.ownHdwDiv')
let addOwnHdwBtn = document.querySelector('#addOwnHdwBtn')

let ownHdwList = document.querySelector('.ownHdwList')

let whatUnits;
let units = document.querySelector('#units')
units.addEventListener('change', e=> whatUnits = e.target.value)

ownHdwDiv.addEventListener('click', e=> { 
  if(e.target.nodeName === 'BUTTON'){
    let inputsArray = Array.from(ownHdwDiv.getElementsByTagName('input'))
      // let list = ownHdwList.getElementsByTagName('ul')[0]
      // let li = document.createElement('li')
      // li.innerHTML = `Hdw: ${inputsArray[0].value} Qty:${inputsArray[1].value} Price:$${inputsArray[2].value}`
      // li.classList.add('hdwListItem')
      // list.appendChild(li) 
      if(inputsArray[0].value !='' && inputsArray[1].value !='' && inputsArray[2].value != ''){
        M.toast({
          html: `✔️ Added ${inputsArray[2].value} ${inputsArray[0].value} @ ${inputsArray[1].value}`,
          inDuration:1500, 
          displayLength: 3000,
          outDuration: 2000,
          classes: 'bottom'
        })
      }
    singleEstData['User added hardware'].push(
      {'Description' : inputsArray[0].value, 'Price' : inputsArray[1].value, 'Qty' : inputsArray[2].value}
      )
    inputsArray.forEach(element => element.value = '')
  }
})

operation.addEventListener('click', e =>{
    e.preventDefault()
    if(e.target.nodeName === 'BUTTON'){
      addOperation(operationInput.value)
    }
})

const addOperation = operation => { 
  if(operation ==='Select'){return false} 
  switch(operation){
    case "Paint" :
        return createWithInput(operation)
    case "Assembly" :
        return createWithInput(operation)
    case "Bend" :
        return createWithInput(operation)
    case "Punch":
        return createWithInput(operation)
    case "Stamp":
        return createElem(operation)
    case "Aluminum weld":
        return createWithInput(operation)
    case "SS/Steel weld":
        return createWithInput(operation)
    case "Threaded hole":
        return createWithInput(operation)
    case "Countersunk hole":
        return createWithInput(operation)
      
    default: return console.log('what?');
  }
}

const createElem = operation =>{
  let tag = document.createElement('div')
  tag.id = operation
  let newDiv = document.createElement('div')
  newDiv.classList.add('percentages')
  let innerText = tag.innerText = "✔️" + String(operation) + ' operation has been added to the item.'
  newDiv.appendChild(tag)
  addedOperations.appendChild(newDiv)
}

const createWithRange = (operation) =>{
  let tag = document.createElement('div')
  let newDiv = document.createElement('div')
  newDiv.classList.add('percentages')
  let innerText = tag.innerText = "✔️" + String(operation)
  newDiv.appendChild(tag)
  let addedinner = newDiv.innerHTML +=(`
  <form action="#">
  <p class="range-field"  >
      <label for=\"${operation}\">Percentage of part affected by this process:</label>
      <input type="range" id=\"${operation}\" min="5" max="80" />
      <div class="rangePercentage">
        <div>5%</div>
        <div>15%</div>
        <div>30%</div>
        <div>40%</div>
        <div>50%</div>
        <div>60%</div>
        <div>70%</div>
        <div>80%</div>
      </div>
    </p>
  </form>
  `)
  addedOperations.appendChild(newDiv)
  addListeners()
}

const createWithInput = (operation) =>{
  let tag = document.createElement('div')
  let newDiv = document.createElement('div')
  newDiv.classList.add('percentages')
  let innerText = tag.innerText = String(operation)
  newDiv.appendChild(tag)
  if(!operation.includes('weld') ){
    newDiv.innerHTML +=(`
        <div class="col s12">
            <div class="input-field col s2">
              <input id=\"${operation}\" type="number" min="1" class="validate s-2">
              <label for=\"${operation}\">N° of operations</label>
            </div>
        </div>
        <div class="remove" style="color:red"> 🗙 </div>
    `)
  }else{
    newDiv.innerHTML +=(`
        <div class="col s12">
            <div class="input-field col s2">
              <input id=\"${operation}\" type="number" min="1" class="validate s-2">
              <label for=\"${operation}\">Lineal ${whatUnits}</label>
            </div>
        </div>
        <div class="remove" style="color:red">🗙</div>
    `)
  }
  addedOperations.appendChild(newDiv)
  addListeners()
}

const addListeners = ()=>{
  addedOperations.addEventListener('change', e=>{
    console.log(e.target.value)
  })
}

 hide.addEventListener('click', (e)=>{
   if(hide.checked === false){
    if(hdw.classList.contains('show')){
      hdw.classList.remove('show')
    }
   }else if(!hdw.classList.contains('show')){
     hdw.classList.add('show')
   }
   console.log(hide.checked)
 })       
 
 addedOperations.addEventListener('click', e =>{
   if(e.target.classList.contains('remove')){
     addedOperations.removeChild(e.target.parentNode)
     
   }
 })
       


//     ESTIMATE BUTTON , SUBMIT OBJECT WITH VALUE TO SERVER
document.getElementById('submit').addEventListener("click",estimate);

var sheet = "Sheet Metal"
 
  let sheetHeader = [
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

let singleEstData = { operations: {}}    
singleEstData['User added hardware'] = []



function estimate(e){

 myForm.style.display = 'none';
 loader.style.display = 'block';

   e.preventDefault();
     var ids = Array.from(myForm.querySelectorAll('*[id]'))
    //  let singleEstData = { operations: {}}     ----MOVED 5 LINES UP ^^^
     ids.map(element => {
       
            switch(element.id){
              case "partNumber":
                return singleEstData["Part Number"] = element.value;
              case "units":
                return singleEstData["Units(mm/in)"] = element.value;
              case "length":
                return singleEstData["Length"] = element.value; 
              case "width":
                return singleEstData["Width"] = element.value; 
              case "thickness":
                return singleEstData["Thickness"] = element.value;    
              case "material":
                return singleEstData["Material"] = element.value;     
              case "finishOne":
                return singleEstData["Finish Type"] = element.value;     
              case "finishTwo":
                return singleEstData["Finish Type 2"] = element.value;   
              case "bending":
                return singleEstData["Bendings(#)"] = element.value;     
              case "EAU":
                return singleEstData["EAU"] = element.value;     
              case "qtyHdw":
                return singleEstData["Hardware qty"] = Number(element.value);     
              case "complexity":
                return singleEstData["Hdw complexity"] = element.value;     
              case "Assembly":
                return singleEstData.operations["Assembly"] = {"Assembly count" : element.value} ;
              case "Bend":
                return singleEstData.operations["Bend"] = {"Bend count" : element.value}
              case "Punch":
                return singleEstData.operations["Punch"] = {"Punch count" : 1}
              case "Stamp":
                return singleEstData.operations["Stamp"] = {"Stamp count" : 1}
              case "Aluminum weld":
                return singleEstData.operations["Aluminum weld"] = {"Aluminum weld count" : element.value}
              case "SS/Steel weld":
                return singleEstData.operations["SS/Steel weld"] = {"SS/Steel weld count" : element.value}
              case "Threaded hole":
                return singleEstData.operations["Threaded hole"] = {"Threaded hole count" : element.value}
              case "Countersunk hole":
                return singleEstData.operations["Countersunk hole"] = {"Countersunk hole count" : element.value}

              default: return{};
              
              }
        });

    
    console.log([singleEstData]);
    google.script.run
      .withSuccessHandler(printEstimate)
      .withFailureHandler(onFailure)
      .estimate([singleEstData], googleSheetURL, sheet);   
   }
   

function printEstimate (){
  //Clear estimation data
  hide.checked = false
  singleEstData = { operations: {}}    
  singleEstData['User added hardware'] = []
  addedOperations. innerHTML = ''

  uploadFileForm.style.display = 'block';
  progress.style.display = 'none';
  let dollar = document.querySelector('#slideCeption');
  dollar.classList.add('glowGreen')
  loader.style.display = 'none';
  myForm.style.display = 'block';
  myForm.reset(); 
  }


function onFailure(){
  alert("Please review your input data")
  loader.style.display = 'none';
  myForm.style.display = 'block';
}

//export default printEstimate;

/******************************************* Mas upload *******************************/
//massGenericScript

        //Get XLS from input and listen for submit file
    let uploadFileForm = document.querySelector("#uploadFileForm");
    let massUploadSubmit = document.querySelector("#massUploadSubmit");
    let myfile = document.querySelector("#myfile");
    let data;
    let googleSheet = localStorage.getItem("url")
    let progress = document.querySelector('.progress');
    let slideCeption = document.querySelector('#slideCeption')

    progress.style.display= 'none'


    uploadFileForm.addEventListener('submit', e =>{
        e.preventDefault();
        e.stopPropagation();
        
        progress.style.display = 'block';
        uploadFileForm.style.display = 'none'

        const file = myfile.files[0]
        const pNum = localStorage.getItem("projNum") || "test123";
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(file)
        fileReader.onload = (e)=>{
            let data = e.target.result;
            let workbook = XLSX.read(data, {type: "binary"})
            const jsonData = workbook.SheetNames.map(sheet =>{
                return XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet])
            })
            // jsonData[0] = sheet metal , jsonData[1] = plastics .. etc
            console.log("json[0] is:", jsonData[0]);
            jsonData[0].map(row => {
              row["operations"] = {}

              if (row["Assembly count"]) { 
               row.operations["Assembly"] = {"Assembly count" : row["Assembly count"]}
              }
              if (row["Bend count"]) { 
               row.operations["Bend"] = {"Bend count" : row["Bend count"]}
              }
              if (row["Punch count"]) { 
                row.operations["Punch"] = {"Punch count" : row["Punch count"]}
               }
              if (row["Stamp count"]) { 
              row.operations["Stamp"] = {"Stamp count" : row["Stamp count"]}
              }
              if (row["Weld count"]) { 
                row.operations["Weld"] = {"Weld count" : row["Weld count"]}
               }

            })

            console.log("json[0] is:", jsonData[0]);
            google.script.run
            .withSuccessHandler(printEstimate)
            .withFailureHandler(FailedToLoad)
            .estimate(jsonData[0], googleSheet, "Sheet Metal");   
        };

        })

    function FailedToLoad(){
        alert("Please review your input data");
        uploadFileForm.style.display = 'block'
        progress.style.display = 'none';
    }
