// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Nnv0":[function(require,module,exports) {
$(document).ready(function () {
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
  $('.modal').modal();
  google.script.run.withSuccessHandler(ready).loadPartCatalogueData();
  filters.style.display = 'none';
  progressBar.style.display = 'block';
});
var quoteData;

function ready(data) {
  quoteData = JSON.parse(data);
  filters.style.display = 'flex';
  progressBar.style.display = 'none';
}

var filters = document.querySelector('.filters');
var progressBar = document.querySelector('.progressBar');
progressBar.style.display = 'block';
var table = document.querySelector('.table');
var modals = document.querySelector('.modals');
var materialfilter = document.querySelector('#materialfilter');
var selections = document.querySelector('.selections');
filters.addEventListener('change', function (e) {
  e.stopPropagation();
  console.log(e.target.value);

  switch (e.target.value) {
    case "plastics":
      loadOptions("plastics");
      break;

    case "sheetMetal":
      loadOptions("sheetMetal");
      break;

    case "gaskets":
      loadOptions("gaskets");
      break;

    case "heatsinks":
      loadOptions("heatsinks");
      break;

    case "extrusions":
      loadOptions("extrusions");
      break;
      loadOptions("machined");
      break;

    default:
      console.log('default case');
      break;
  }
}); // catalogueData.plastics = getData(plasticsValues)
// catalogueData.sheetMetal = getData(sheetMetalValues)
// catalogueData.gaskets = getData(gasketsValues)
// catalogueData.heatsinks = getData(heatsinksValues)
// catalogueData.extrusions = getData(extrusionsValues)

function loadOptions(commodity) {
  table.innerHTML = "";
  var header = "\n        <div class=\"header\">\n            <h6>Image</h6>\n            <h6>Quoted Price</h6>\n            <h6>Material</h6>\n            <h6>Volume</h6>\n            <h6>Units</h6>\n            <h6><span class=\"material-icons\">zoom_in</span></h6>\n        </div>\n    ";
  table.innerHTML += header;
  console.log(quoteData[commodity]);
  quoteData[commodity].map(function (element, index) {
    if (element !== null) {
      var div = document.createElement('div');
      div.classList.add('row');
      var paragraph = document.createElement('p');
      var imgUrl = element['Image url'];
      id = imgUrl.split("d/")[1].split("/")[0];
      var newImg = document.createElement('img');
      newImg.src = "https://drive.google.com/thumbnail?id=" + id;
      newImg.style.display = 'block';
      paragraph.appendChild(newImg);
      div.appendChild(paragraph);
      var price = document.createElement('p');
      price.innerText = "$" + element['Quoted price'];
      div.appendChild(price);
      var material = document.createElement('p');
      material.innerText = element['Material'];
      div.appendChild(material);
      var partWeight = document.createElement('p');
      partWeight.innerText = element['Part weight'];
      div.appendChild(partWeight);
      var units = document.createElement('p');
      units.innerText = element['Units(grams/ounces)'];
      div.appendChild(units); // let quoteNumber = document.createElement('p')
      // quoteNumber.innerText = element['Project number']
      // div.appendChild(quoteNumber)

      var fileP = document.createElement('p');
      var viewButton = document.createElement('a');
      viewButton.innerHTML = "<span class=\"material-icons\">zoom_in</span>";
      viewButton.href = "#" + element['Part Number'] + element['Project number'];
      viewButton.target = '_blank';
      viewButton.classList.add('btn', 'btn-waves', 'modal-trigger');
      var addToCart = document.createElement('a');
      addToCart.innerHTML = "<span class=\"material-icons\">shopping_cart</span>";
      addToCart.classList.add('btn', 'btn-waves', 'yellow', 'accent-4');
      fileP.appendChild(viewButton);
      fileP.appendChild(addToCart);
      div.appendChild(fileP);
      table.appendChild(div);
      var modalDiv = "\n        <div id=".concat(element['Part Number'] + element['Project number'], " class=\"modal\">\n            <div class=\"modal-content\">\n                <h5>Part Number: <span class=\"spanParagraph\">").concat(element['Part Number'], "</span></h5>\n                <img src=").concat("https://drive.google.com/thumbnail?id=" + id, ">\n                <p>Part description: <span class=\"spanParagraph\">").concat(element['Part description'], "</span></p>\n                <p>Commodity: <span class=\"spanParagraph\">").concat(element['Commodity'], "</span></p>\n                <p>Material: <span class=\"spanParagraph\">").concat(element['Material'], "</span></p>\n                <p>Finish: <span class=\"spanParagraph\">").concat(element['Finish'], "</span></p>\n                <p>Process: <span class=\"spanParagraph\">").concat(element['Process'], "</span></p>\n                <p>Part Weight: <span class=\"spanParagraph\">").concat(element['Part weight']).concat(element['Units(grams/ounces)'], "</span></p>\n                <p>XYZ wrapper measure: <span class=\"spanParagraph\">").concat(element['XYZ wrapper measure']).concat(element['Units(cm/inch)'], "</span></p>\n                <p>Volume quoted: <span class=\"spanParagraph\">").concat(element['Volume'], "</span></p>\n                <p>Project Number where quoted: <span class=\"spanParagraph\">").concat(element['Project number'], "</span></p>\n                <p>Best price supplier: <span class=\"spanParagraph\">").concat(element['Best Price Supplier'], "</span></p>\n                <p>Quoted price: <span class=\"spanParagraph\">").concat(element['Quoted price'], "</span></p>\n                <p>Date quoted: <span class=\"spanParagraph\">").concat(element['Date quoted'], "</span></p>\n                <a href=").concat(element['File path'], " target=_blank> File name: ").concat(element['File names'], "</a>\n            </div>\n            <div class=\"modal-footer\">\n                <a class=\"modal-close waves-effect waves-green btn\">Add to cart</a>\n            </div>\n        </div>\n        ");
      modals.innerHTML += modalDiv;
      $('.modal').modal();
    }
  });
  $('.modal').modal();
  loadSelect(commodity, 'Material');
  $('select').formSelect();
}

function loadSelect(commodity, filterType) {
  var options = materialfilter.querySelectorAll('option');
  console.log(options);
  options.forEach(function (option, index) {
    materialfilter.options[index];
    materialfilter.remove([materialfilter.index]);
  });
  quoteData[commodity].map(function (element) {
    if (element !== null) {
      console.log(element);
      var option = document.createElement('option');
      option.text = element[filterType];
      option.value = element[filterType];
      materialfilter.add(option);
    }
  });
}

selections.getElementsByTagName('INPUT')[0].style.height = '2rem';
selections.getElementsByTagName('INPUT')[0].style.border = '0';
selections.getElementsByTagName('INPUT')[0].style.padding = '0px 0px 0px 5px';
},{}]},{},["Nnv0"], null)