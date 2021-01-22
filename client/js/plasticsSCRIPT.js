
document.addEventListener('DOMContentLoaded', function() {
  $(".dropdown-trigger").dropdown();
  $('.modal').modal();
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

var qims;

if(localStorage.getItem("projNum")){
  qims = localStorage.getItem("projNum");
}

var objValues = {};
var density = 0;
let volumeValues = {};
let unitsValue = 0;
let imagesObj = {};

var brandLogo = document.querySelector(".brand-logo");
brandLogo.innerText = qims;


function getSheetInfo (plastSheetValues){
     objValues = JSON.parse(plastSheetValues);
       objValues.material.forEach( elem => {
               if (elem[0] === materialID.value){
                 density = elem[4];
               }
              });
                     volumeValues.total = Math.ceil(((volumeValues.length * volumeValues.height * volumeValues.width )/ volumeValues.thickness)*(density/1000)) ;   
                       weightValue.value = volumeValues.total; 

                           M.updateTextFields();           
 }


let googleSheetURL = localStorage.getItem("url");
console.log(localStorage);

let partNumber = document.querySelector('#partNumber');
let weight = document.querySelector('.weight');
let surfaceArea = document.querySelector('.surfaceArea');
let material = document.querySelector('.material');
let materialID = document.querySelector('#materialID');
let checkboxSurface = document.querySelector('#checkboxSurface');
let checkbox = document.querySelector('.checkbox');
let strokes = document.querySelector('.strokes');
let weightOnHand = document.querySelector('.weightOnHand');
let volume = document.querySelector('.volume');
let switchButton = document.querySelector('#switchButton');
let meassures = document.querySelector('.meassures');
let units = document.querySelector('#units');
switchButton.checked = true;
let weightValue = document.querySelector('#weight');
let shapeType = document.querySelector('#shapeType');
let shapeImg = document.querySelector('#shapeImg');
let loadingCalc = document.querySelector('.loadingCalc');



volume.style.display ='none';
loadingCalc.style.display = 'none';






//Toggle finishCheckbox option
checkboxSurface.addEventListener('click', ()=>{
  if (surfaceArea.style.display === 'none'){   
            surfaceArea.style.display = 'block';
            strokes.style.display = 'block';
  }else{
    surfaceArea.style.display = 'none';
    strokes.style.display = 'none';
  }
});


// Weight on hand switch
switchButton.addEventListener('change',(e)=>{

        if(e.target.checked === false){
            volume.style.display = 'block';
                
                //Get all input values in the calculation of volume sectoin (units, length, width...)
                let measInputs = Array.from(volume.getElementsByTagName('input'));
              
                    measInputs.forEach(elem =>{elem.addEventListener('change',e =>{
                      volumeValues[elem.id] = elem.value;
                      
                        if(Object.keys(volumeValues).length >= 4){
                          
                        //Run loadSourceCostPlastics in the server to get materials density
                          google.script.run.withSuccessHandler(getSheetInfo).loadSourceCostPlastics();
                              // Plastic sheet info on hand (objValues), get material denstity to match with selected material:
                        }
                        
                    })});       
        }else{
            volume.style.display = 'none'
            
        }
});


switchButton.addEventListener('change', function(e){
   if (! e.target.checked){
     loadingCalc.style.display = 'block';
     volume.style.display = 'none';
     google.script.run.withSuccessHandler(returnedImgs).imageURLs();
   }
  
});

function returnedImgs (imgIDs){

  loadingCalc.style.display = 'none';
  volume.style.display = 'block';
  imagesObj = imgIDs;
  console.log(imagesObj);
}


shapeType.addEventListener('change',function(e){
  shapeImg.src = 'https://drive.google.com/uc?export=download&id=' +  imagesObj[e.target.value];
  console.log(e.target.value);
  console.log(imagesObj[e.target.value]);
  
  
});