
//Initialize floating Action Button    
 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, 
            {direction: 'bottom', hoverEnabled: false },
            );
  });
var downloadXls = document.getElementById('downloadXls');
var openGSheets = document.getElementById("openGSheets");
var googleSheetURL = localStorage.getItem("url");
let copyLink = document.querySelector('#copyLink');

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

var arr = [];
var myForm = document.querySelector('#myForm');

var hdw = document.getElementById("hdw");
hdw.style.display = "none";

var loader = document.querySelector('.loader');
loader.style.display = 'none'


document.getElementById("infoMsg").style.display = "block";
document.getElementById("infoMsg").style.display = "none";

var hide = document.querySelector('#hide');

hide.addEventListener("click",toggle);
       
         function toggle(){
        if(hdw.style.display === 'block'){
          hdw.style.display = 'none'
        }else{
          hdw.style.display = 'block';
         }
        }  
       
//Show Information square
  document.getElementById('complexity').addEventListener("change",toggleInfoSqr);
  
            function toggleInfoSqr (){
            var value = document.getElementById('complexity').value;
            if(value ==='Simple'){
                document.getElementById("infoMsg").innerHTML = "ⓘ   Simple to install items such as screws.";
                document.getElementById("infoMsg").style.display = "inline-block";  
               }else if  (value ==='Medium'){
                    document.getElementById("infoMsg").innerHTML = "ⓘ    Medium complexity items, rivetting.";
                    document.getElementById("infoMsg").style.display = "inline-block";   
                     }else if(value ==='Complex'){
                         document.getElementById("infoMsg").innerHTML = "ⓘ Complex items including soldering.";
                          document.getElementById("infoMsg").style.display = "inline-block";
                         }
                }            
            

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

function estimate(e){

 myForm.style.display = 'none';
 loader.style.display = 'block';

   e.preventDefault();
     var ids = Array.from(myForm.querySelectorAll('*[id]'))
     let singleEstData = {}  
     
     ids.map(element => {
       //singleEstHeaders.find(elemId => element.id === elemId)
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
                return singleEstData["Hardware qty"] = element.value;     
              case "complexity":
                return singleEstData["Hdw complexity"] = element.value;     
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
  let dollar = document.querySelector('#slideCeption');
  dollar.classList.add('glowGreen')
  loader.style.display = 'none';
  myForm.style.display = 'block';
  myForm.reset();
  openGSheets.href = googleSheetURL;
  openGSheets.target = "_blank";
  console.log(googleSheetURL);
  let indexof = googleSheetURL.indexOf("edit#")
  let substr = googleSheetURL.slice(1, indexof);
  let downloadRoute = substr + "export?format=xlsx";
  downloadXls.href = downloadRoute;

  }

function onFailure(){
  alert("Please review your input data")
  loader.style.display = 'none';
  myForm.style.display = 'block';
}
