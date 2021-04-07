$(document).ready(function(){

    $('.dropdown-trigger').dropdown();
    $('select').formSelect();
    $('.modal').modal();
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
let table = document.querySelector('.table')
let modals = document.querySelector('.modals')
let materialfilter = document.querySelector('#materialfilter')
let selections = document.querySelector('.selections')

filters.addEventListener('change', (e)=>{
    e.stopPropagation();
    console.log(e.target.value);

    switch (e.target.value) {
        case "plastics": 
        loadOptions("plastics")
            break;
        case "sheetMetal": 
        loadOptions("sheetMetal")
            break;
        case "gaskets": 
        loadOptions("gaskets")
            break;
        case "heatsinks": 
        loadOptions("heatsinks")
            break;
        case "extrusions": 
        loadOptions("extrusions")
            break;
        loadOptions("machined")
            break;
        default:
            console.log('default case');
            break;
    }
})

// catalogueData.plastics = getData(plasticsValues)
// catalogueData.sheetMetal = getData(sheetMetalValues)
// catalogueData.gaskets = getData(gasketsValues)
// catalogueData.heatsinks = getData(heatsinksValues)
// catalogueData.extrusions = getData(extrusionsValues)

function loadOptions(commodity){
    table.innerHTML  = ""
    let header = `
        <div class="header">
            <h6>Image</h6>
            <h6>Quoted Price</h6>
            <h6>Material</h6>
            <h6>Volume</h6>
            <h6>Units</h6>
            <h6><span class="material-icons">zoom_in</span></h6>
        </div>
    `
    table.innerHTML += header
    console.log(quoteData[commodity]);
    quoteData[commodity].map((element,index) =>{
        if(element !== null){

        let div = document.createElement('div')
        div.classList.add('row')
        
        let paragraph = document.createElement('p')

        let imgUrl = element['Image url']
        id = imgUrl.split("d/")[1].split("/")[0]

        let newImg = document.createElement('img')
        newImg.src = "https://drive.google.com/thumbnail?id=" + id
        newImg.style.display = 'block'
        paragraph.appendChild(newImg)
        div.appendChild(paragraph)

        let price = document.createElement('p')
        price.innerText ="$"+ element['Quoted price']
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
        let fileP = document.createElement('p')
        let viewButton = document.createElement('a')
        viewButton.innerHTML = `<span class="material-icons">zoom_in</span>`
        viewButton.href = "#" + element['Part Number']+element['Project number']
        viewButton.target = '_blank'
        viewButton.classList.add('btn', 'btn-waves', 'modal-trigger')
        let addToCart = document.createElement('a')
        addToCart.innerHTML= `<span class="material-icons">shopping_cart</span>`
        addToCart.classList.add('btn', 'btn-waves', 'yellow', 'accent-4')

        fileP.appendChild(viewButton)
        fileP.appendChild(addToCart)
        div.appendChild(fileP)
        
        table.appendChild(div)

        let modalDiv = `
        <div id=${element['Part Number']+element['Project number']} class="modal">
            <div class="modal-content">
                <h5>Part Number: <span class="spanParagraph">${element['Part Number']}</span></h5>
                <img src=${"https://drive.google.com/thumbnail?id=" + id}>
                <p>Part description: <span class="spanParagraph">${element['Part description']}</span></p>
                <p>Commodity: <span class="spanParagraph">${element['Commodity']}</span></p>
                <p>Material: <span class="spanParagraph">${element['Material']}</span></p>
                <p>Finish: <span class="spanParagraph">${element['Finish']}</span></p>
                <p>Process: <span class="spanParagraph">${element['Process']}</span></p>
                <p>Part Weight: <span class="spanParagraph">${element['Part weight']}${element['Units(grams/ounces)']}</span></p>
                <p>XYZ wrapper measure: <span class="spanParagraph">${element['XYZ wrapper measure']}${element['Units(cm/inch)']}</span></p>
                <p>Volume quoted: <span class="spanParagraph">${element['Volume']}</span></p>
                <p>Project Number where quoted: <span class="spanParagraph">${element['Project number']}</span></p>
                <p>Best price supplier: <span class="spanParagraph">${element['Best Price Supplier']}</span></p>
                <p>Quoted price: <span class="spanParagraph">${element['Quoted price']}</span></p>
                <p>Date quoted: <span class="spanParagraph">${element['Date quoted']}</span></p>
                <a href=${element['File path']} target=_blank> File name: ${element['File names']}</a>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-green btn">Add to cart</a>
            </div>
        </div>
        `
        modals.innerHTML += modalDiv
        $('.modal').modal();
        }
    })
    $('.modal').modal();

    loadSelect(commodity, 'Material')
    $('select').formSelect();
}


function loadSelect(commodity, filterType){
    var options = materialfilter.querySelectorAll('option')
    console.log(options)
    options.forEach((option, index) => {
        materialfilter.options[index]
        materialfilter.remove([materialfilter.index])

    })
  quoteData[commodity].map(element =>{
    if(element !== null){
      console.log(element); 
    var option = document.createElement('option')
    option.text  = element[filterType]
    option.value = element[filterType]
    materialfilter.add(option)

     }
    })
}

selections.getElementsByTagName('INPUT')[0].style.height = '2rem'
selections.getElementsByTagName('INPUT')[0].style.border = '0'
selections.getElementsByTagName('INPUT')[0].style.padding = '0px 0px 0px 5px'

