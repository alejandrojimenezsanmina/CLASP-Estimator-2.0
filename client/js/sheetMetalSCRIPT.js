

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

/******************************************* mess *******************************/
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
            //console.log(workbook);
            const jsonData = workbook.SheetNames.map(sheet =>{
                return XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet])
            })
            // jsonData[0] = sheet metal jsonData[1] = plastics .. etc
            console.log(jsonData[0], googleSheet);
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
