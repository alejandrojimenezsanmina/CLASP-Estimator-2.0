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
})({"yHiL":[function(require,module,exports) {
var downloadXls = document.getElementById('downloadXls');
var openGSheets = document.getElementById("openGSheets");
var googleSheetURL;

if (localStorage.getItem("url")) {
  googleSheetURL = localStorage.getItem("url");
}

if (googleSheetURL) {
  var copyLink = document.querySelector('#copyLink');
  var projNumHeader = document.querySelector('#projNumHeader');
  var projNum = localStorage.getItem('projNum');
  projNumHeader.innerText = projNum;
  openGSheets.href = googleSheetURL;
  openGSheets.target = "_blank";
  var indexof = googleSheetURL.indexOf("edit?");
  var substr = googleSheetURL.slice(0, indexof);
  var downloadRoute = substr + "export?format=xlsx";
  downloadXls.href = downloadRoute;
}

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
}); //import{uploadFileForm, progress} from './massGenericSCRIPT';

var arr = [];
var myForm = document.querySelector('#myForm');
var hdw = document.getElementById("hdw");
hdw.style.display = "none";
var loader = document.querySelector('.loader');
loader.style.display = 'none';
var operation = document.querySelector('.operation');
var operationInput = document.getElementById('operationInput');
var addedOperations = document.querySelector('.addedOperations');
document.getElementById("infoMsg").style.display = "block";
document.getElementById("infoMsg").style.display = "none";
var hide = document.querySelector('#hide');
operation.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.nodeName === 'BUTTON') {
    addOperation(operationInput.value);
  }
});

var addOperation = function addOperation(operation) {
  if (operation === 'Select') {
    return false;
  }

  switch (operation) {
    case "Weld":
      return createWithRange(operation);

    case "Paint":
      return createWithRange(operation);

    case "Bend":
      return createWithInput(operation);

    case "Punch":
      return createElem(operation);

    case "Stamp":
      return createElem(operation);

    case "Assembly":
      return createWithInput(operation);

    default:
      return console.log('what?');
  }
};

var createElem = function createElem(operation) {
  var tag = document.createElement('div');
  tag.id = operation;
  var newDiv = document.createElement('div');
  newDiv.classList.add('percentages');
  var innerText = tag.innerText = "✔️" + String(operation) + ' operation has been added to the item.';
  newDiv.appendChild(tag);
  addedOperations.appendChild(newDiv);
};

var createWithRange = function createWithRange(operation) {
  var tag = document.createElement('div');
  var newDiv = document.createElement('div');
  newDiv.classList.add('percentages');
  var innerText = tag.innerText = "✔️" + String(operation);
  newDiv.appendChild(tag);
  var addedinner = newDiv.innerHTML += "\n  <form action=\"#\">\n  <p class=\"range-field\"  >\n      <label for=\"".concat(operation, "\">Percentage of part affected by this process:</label>\n      <input type=\"range\" id=\"").concat(operation, "\" min=\"5\" max=\"80\" />\n      <div class=\"rangePercentage\">\n        <div>5%</div>\n        <div>15%</div>\n        <div>30%</div>\n        <div>40%</div>\n        <div>50%</div>\n        <div>60%</div>\n        <div>70%</div>\n        <div>80%</div>\n      </div>\n    </p>\n  </form>\n  ");
  addedOperations.appendChild(newDiv);
  addListeners();
};

var createWithInput = function createWithInput(operation) {
  var tag = document.createElement('div');
  var newDiv = document.createElement('div');
  newDiv.classList.add('percentages');
  var innerText = tag.innerText = "✔️" + String(operation);
  newDiv.appendChild(tag);
  var addedinner = newDiv.innerHTML += "\n      <div class=\"col s12\">\n          <div class=\"input-field col s2\">\n            <input id=\"".concat(operation, "\" type=\"number\" class=\"validate s-2\">\n            <label for=\"").concat(operation, "\">N\xB0 of operations</label>\n          </div>\n      </div>\n  ");
  addedOperations.appendChild(newDiv);
  addListeners();
};

var addListeners = function addListeners() {
  addedOperations.addEventListener('change', function (e) {
    console.log(e.target.value);
  });
};

hide.addEventListener("click", toggle);

function toggle() {
  if (hdw.style.display === 'block') {
    hdw.style.display = 'none';
  } else {
    hdw.style.display = 'block';
  }
} //Show Information square


document.getElementById('complexity').addEventListener("change", toggleInfoSqr);

function toggleInfoSqr() {
  var value = document.getElementById('complexity').value;

  if (value === 'Simple') {
    document.getElementById("infoMsg").innerHTML = "ⓘ   Simple to install items such as screws.";
    document.getElementById("infoMsg").style.display = "inline-block";
  } else if (value === 'Medium') {
    document.getElementById("infoMsg").innerHTML = "ⓘ    Medium complexity items, rivetting.";
    document.getElementById("infoMsg").style.display = "inline-block";
  } else if (value === 'Complex') {
    document.getElementById("infoMsg").innerHTML = "ⓘ Complex items including soldering.";
    document.getElementById("infoMsg").style.display = "inline-block";
  }
} //     ESTIMATE BUTTON , SUBMIT OBJECT WITH VALUE TO SERVER


document.getElementById('submit').addEventListener("click", estimate);
var sheet = "Sheet Metal";
var sheetHeader = ["Part Number", "Units(mm/in)", "Length", "Width", "Thickness", "Material", "Finish Type", "Finish Type 2", "Bendings(#)", "EAU", "Hardware qty", "Hdw complexity", "Material cost", "Finish cost", "Hardware cost", "Labor cost", "PRICE /each"];

function estimate(e) {
  myForm.style.display = 'none';
  loader.style.display = 'block';
  e.preventDefault();
  var ids = Array.from(myForm.querySelectorAll('*[id]'));
  var singleEstData = {
    operations: {}
  };
  ids.map(function (element) {
    //singleEstHeaders.find(elemId => element.id === elemId)
    switch (element.id) {
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

      case "Assembly":
        return singleEstData.operations["Assembly"] = {
          "Assembly count": element.value
        };

      case "Bend":
        return singleEstData.operations["Bend"] = {
          "Bend count": element.value
        };

      case "Punch":
        return singleEstData.operations["Punch"] = {
          "Punch count": 1
        };

      case "Weld":
        return singleEstData.operations["Weld"] = {
          "Weld count": Number(element.value) / 100
        };

      default:
        return {};
    }
  });
  console.log([singleEstData]);
  google.script.run.withSuccessHandler(printEstimate).withFailureHandler(onFailure).estimate([singleEstData], googleSheetURL, sheet);
}

function printEstimate() {
  uploadFileForm.style.display = 'block';
  progress.style.display = 'none';
  var dollar = document.querySelector('#slideCeption');
  dollar.classList.add('glowGreen');
  loader.style.display = 'none';
  myForm.style.display = 'block';
  myForm.reset();
}

function onFailure() {
  alert("Please review your input data");
  loader.style.display = 'none';
  myForm.style.display = 'block';
} //export default printEstimate;

/******************************************* Mas upload *******************************/
//massGenericScript
//Get XLS from input and listen for submit file


var uploadFileForm = document.querySelector("#uploadFileForm");
var massUploadSubmit = document.querySelector("#massUploadSubmit");
var myfile = document.querySelector("#myfile");
var data;
var googleSheet = localStorage.getItem("url");
var progress = document.querySelector('.progress');
var slideCeption = document.querySelector('#slideCeption');
progress.style.display = 'none';
uploadFileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  e.stopPropagation();
  progress.style.display = 'block';
  uploadFileForm.style.display = 'none';
  var file = myfile.files[0];
  var pNum = localStorage.getItem("projNum") || "test123";
  var fileReader = new FileReader();
  fileReader.readAsBinaryString(file);

  fileReader.onload = function (e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: "binary"
    }); //console.log(workbook);

    var jsonData = workbook.SheetNames.map(function (sheet) {
      return XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
    }); // jsonData[0] = sheet metal jsonData[1] = plastics .. etc

    console.log(jsonData[0], googleSheet);
    google.script.run.withSuccessHandler(printEstimate).withFailureHandler(FailedToLoad).estimate(jsonData[0], googleSheet, "Sheet Metal");
  };
});

function FailedToLoad() {
  alert("Please review your input data");
  uploadFileForm.style.display = 'block';
  progress.style.display = 'none';
}
},{}]},{},["yHiL"], null)