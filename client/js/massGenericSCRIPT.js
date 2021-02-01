
//Get XLS from input and listen for submit file
let uploadFileForm = document.querySelector("#uploadFileForm");
let massUploadSubmit = document.querySelector("#massUploadSubmit");
let myfile = document.querySelector("#myfile");
let data;
let googleSheet = localStorage.getItem("url")
let progress = document.querySelector('.progress');
let slideCeption = document.querySelector('#slideCeption')

export {uploadFileForm, progress};

progress.style.display= 'none'

import printEstimate from './sheetMetalSCRIPT'

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

function unhideSegmet (){
    slideCeption.classList.add('glowGreen')
    uploadFileForm.style.display = 'block'
    progress.style.display = 'none';

}

function FailedToLoad(){
    alert("Please review your input data");
    uploadFileForm.style.display = 'block'
    progress.style.display = 'none';
}