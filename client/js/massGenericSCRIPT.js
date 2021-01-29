
//Get XLS from input and listen for submit file
let uploadFileForm = document.querySelector("#uploadFileForm");
let massUploadSubmit = document.querySelector("#massUploadSubmit");
let myfile = document.querySelector("#myfile");
let data;
let googleSheet = localStorage.getItem("url")


uploadFileForm.addEventListener('submit', e =>{
    e.preventDefault();
    e.stopPropagation();
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
        console.log(jsonData);
        google.script.run
            .withSuccessHandler(()=>{
                console.log("done");
            })
            .saveFile(jsonData);
    };

    })


