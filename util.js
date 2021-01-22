const fs = require("fs")

const distHtmlFiles = fs.readdirSync("./dist")
distHtmlFiles.forEach(file=>{
    if(file.split(".")[1] === "html"){
       fs.copyFileSync(`./dist/${file}`,`./appsscript/${file}`) 
    }
})

const serverFiles = fs.readdirSync("./server")
serverFiles.forEach(file =>{
    fs.copyFileSync(`./server/${file}`, `./appsscript/${file}`)
})
