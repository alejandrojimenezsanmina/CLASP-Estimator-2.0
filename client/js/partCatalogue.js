$(document).ready(function(){
    $('.carousel').carousel();
    $('.dropdown-trigger').dropdown();
    $('select').formSelect();
    google.script.run.withSuccessHandler(ready).loadPartCatalogueData()
    filters.style.display = 'none'
    progressBar.style.display = 'block'
  });  
  
  let quoteData;

  function ready(data){
    quoteData = JSON.parse(data);
    filters.style.display = 'flex'
    progressBar.style.display = 'none'
  }


let filters = document.querySelector('.filters');
let progressBar = document.querySelector('.progressBar')
progressBar.style.display = 'block'
let carouselDiv = document.querySelector('.carouselDiv')
let table = document.querySelector('.table')

filters.addEventListener('change', (e)=>{
    e.stopPropagation();
    console.log(e.target.value);

    switch (e.target.value) {
        case "plastics": 
        loadOptions("plastics")
            break;
        default:
            console.log('default case');
            break;
    }
})

function loadOptions(commodity){
    console.log(quoteData[commodity]);
    quoteData[commodity].map(element =>{
        let a = document.createElement("a")
        a.classList.add("carousel-item")
        a.href = '#'
        
        let image = document.createElement("img")
        a.appendChild(image)
            let string = element["Image url"].split("d/")[1];
            let id = string.split("/")[0];
        console.log(id)
        image.src = "https://drive.google.com/thumbnail?id=" + id
        carouselDiv.appendChild(a)
        let text = document.createElement('div')
        text.classList.add('imageOverText')
        text.innerText = element["Material"]
        a.appendChild(text)

        let div = document.createElement('div')
        div.classList.add('row')
        
        let paragraph = document.createElement('p')

        let newImg = document.createElement('img')
        newImg.src = "https://drive.google.com/thumbnail?id=" + id
        newImg.style.display = 'block'
        paragraph.appendChild(newImg)
        div.appendChild(paragraph)

        let price = document.createElement('p')
        price.innerText = element['Quoted price']
        div.appendChild(price)

        let material = document.createElement('p')
        material.innerText = element['Material']
        div.appendChild(material)
        
        let partWeight = document.createElement('p')
        partWeight.innerText = element['Part weight']
        div.appendChild(partWeight)

        let units = document.createElement('p')
        units.innerText = element['Units(grams/ounces)']
        div.appendChild(units)
        
        // let quoteNumber = document.createElement('p')
        // quoteNumber.innerText = element['Project number']
        // div.appendChild(quoteNumber)
        
        let file = document.createElement('a')
        file.innerText = 'File link'
        file.href = element['File path']
        file.target = '_blank'
        div.appendChild(file)
        
        table.appendChild(div)


        $('.carousel').carousel();
    })





}

