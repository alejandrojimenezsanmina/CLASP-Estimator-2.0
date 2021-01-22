
//Get XLS from input and listen for submit file
let uploadFileForm = document.querySelector("#uploadFileForm");
let massUploadSubmit = document.querySelector("#massUploadSubmit");
let myfile = document.querySelector("#myfile");

// uploadFileForm.addEventListener('submit', e =>{
//     e.preventDefault();
//     e.stopPropagation();
//     console.log(myfile.files); 
//     const file = myfile.files[0];
//     const fileReader = new FileReader();
//     fileReader.onload = (e)=>{
//         const obj = {
//             filename: file.name,
//             mimeType: file.type,
//             bytes: [... new Int8Array(e.target.result)]
//         };
//         google.script.run.withSuccessHandler(e => console.log(e).saveFile(obj))
//     };
//     fileReader.readAsArrayBuffer(file)
// })

uploadFileForm.addEventListener('submit', e =>{
    e.preventDefault();
    e.stopPropagation();
    const file = myfile.files[0];
    const fileReader= new FileReader();
    const pNum = localStorage.getItem("projNum") || "test123";
    fileReader.onload = ()=>{
    
        google.script.run
            .withSuccessHandler(()=>{
                console.log("done");
            })
            .saveFile(fileReader.result, file.type, pNum + "mass upload");
    };

    fileReader.readAsText(file)
    })


