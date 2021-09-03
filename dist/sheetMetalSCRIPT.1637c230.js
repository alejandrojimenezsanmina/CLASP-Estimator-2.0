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
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var loader = document.querySelector('.loader');
loader.style.display = 'none';
var operation = document.querySelector('.operation');
var operationInput = document.getElementById('operationInput');
var addedOperations = document.querySelector('.addedOperations'); // document.getElementById("infoMsg").style.display = "block";
// document.getElementById("infoMsg").style.display = "none";

var hide = document.querySelector('#hide');
var ownHdwDiv = document.querySelector('.ownHdwDiv');
var addOwnHdwBtn = document.querySelector('#addOwnHdwBtn');
var ownHdwList = document.querySelector('.ownHdwList');
var whatUnits;
var units = document.querySelector('#units');
units.addEventListener('change', function (e) {
  return whatUnits = e.target.value;
});
ownHdwDiv.addEventListener('click', function (e) {
  if (e.target.nodeName === 'BUTTON') {
    var inputsArray = Array.from(ownHdwDiv.getElementsByTagName('input')); // let list = ownHdwList.getElementsByTagName('ul')[0]
    // let li = document.createElement('li')
    // li.innerHTML = `Hdw: ${inputsArray[0].value} Qty:${inputsArray[1].value} Price:$${inputsArray[2].value}`
    // li.classList.add('hdwListItem')
    // list.appendChild(li) 

    if (inputsArray[0].value != '' && inputsArray[1].value != '' && inputsArray[2].value != '') {
      M.toast({
        html: "\u2714\uFE0F Added ".concat(inputsArray[2].value, " ").concat(inputsArray[0].value, " @ ").concat(inputsArray[1].value),
        inDuration: 1500,
        displayLength: 3000,
        outDuration: 2000,
        classes: 'bottom'
      });
    }

    singleEstData['User added hardware'].push({
      'Description': inputsArray[0].value,
      'Price': inputsArray[1].value,
      'Qty': inputsArray[2].value
    });
    inputsArray.forEach(function (element) {
      return element.value = '';
    });
  }
});
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
    case "Paint":
      return createWithInput(operation);

    case "Assembly":
      return createWithInput(operation);

    case "Bend":
      return createWithInput(operation);

    case "Punch":
      return createWithInput(operation);

    case "Stamp":
      return createElem(operation);

    case "Aluminum weld":
      return createWithInput(operation);

    case "SS/Steel weld":
      return createWithInput(operation);

    case "Threaded hole":
      return createWithInput(operation);

    case "Countersunk hole":
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
  var innerText = tag.innerText = String(operation);
  newDiv.appendChild(tag);

  if (!operation.includes('weld')) {
    newDiv.innerHTML += "\n        <div class=\"col s12\">\n            <div class=\"input-field col s2\">\n              <input id=\"".concat(operation, "\" type=\"number\" min=\"1\" class=\"validate s-2\">\n              <label for=\"").concat(operation, "\">N\xB0 of operations</label>\n            </div>\n        </div>\n        <div class=\"remove\" style=\"color:red\"> \uD83D\uDDD9 </div>\n        <div class=\"removeTag\"> Remove ").concat(operation, "</div>\n    ");
  } else {
    newDiv.innerHTML += "\n        <div class=\"col s12\">\n            <div class=\"input-field col s2\">\n              <input id=\"".concat(operation, "\" type=\"number\" min=\"1\" class=\"validate s-2\">\n              <label for=\"").concat(operation, "\">Lineal ").concat(whatUnits, "</label>\n            </div>\n        </div>\n        <div class=\"remove\" style=\"color:red\">\uD83D\uDDD9</div>\n        <div class=\"removeTag\"> Remove ").concat(operation, " </div>\n    ");
  }

  addedOperations.appendChild(newDiv);
  addListeners();
};

var addListeners = function addListeners() {
  addedOperations.addEventListener('change', function (e) {
    console.log(e.target.value);
  });
};

hide.addEventListener('click', function (e) {
  if (hide.checked === false) {
    if (hdw.classList.contains('show')) {
      hdw.classList.remove('show');
    }
  } else if (!hdw.classList.contains('show')) {
    hdw.classList.add('show');
  }

  console.log(hide.checked);
});
addedOperations.addEventListener('click', function (e) {
  if (e.target.classList.contains('remove')) {
    addedOperations.removeChild(e.target.parentNode);
  }
}); //     ESTIMATE BUTTON , SUBMIT OBJECT WITH VALUE TO SERVER

document.getElementById('submit').addEventListener("click", estimate);
var sheet = "Sheet Metal";
var sheetHeader = ["Part Number", "Units(mm/in)", "Length", "Width", "Thickness", "Material", "Finish Type", "Finish Type 2", "Bendings(#)", "EAU", "Hardware qty", "Hdw complexity", "Material cost", "Finish cost", "Hardware cost", "Labor cost", "PRICE /each"];
var singleEstData = {
  operations: {}
};
singleEstData['User added hardware'] = [];

function estimate(e) {
  myForm.style.display = 'none';
  loader.style.display = 'block';
  e.preventDefault();
  var ids = Array.from(myForm.querySelectorAll('*[id]')); //  let singleEstData = { operations: {}}     ----MOVED 5 LINES UP ^^^

  ids.map(function (element) {
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
        return singleEstData["Hardware qty"] = Number(element.value);

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

      case "Stamp":
        return singleEstData.operations["Stamp"] = {
          "Stamp count": 1
        };

      case "Aluminum weld":
        return singleEstData.operations["Aluminum weld"] = {
          "Aluminum weld count": element.value
        };

      case "SS/Steel weld":
        return singleEstData.operations["SS/Steel weld"] = {
          "SS/Steel weld count": element.value
        };

      case "Threaded hole":
        return singleEstData.operations["Threaded hole"] = {
          "Threaded hole count": element.value
        };

      case "Countersunk hole":
        return singleEstData.operations["Countersunk hole"] = {
          "Countersunk hole count": element.value
        };

      default:
        return {};
    }
  });
  console.log([singleEstData]);
  google.script.run.withSuccessHandler(printEstimate).withFailureHandler(onFailure).estimate([singleEstData], googleSheetURL, sheet);
}

function printEstimate(serverData) {
  console.log(serverData);
  hide.checked = false;

  if (hdw.classList.contains('show')) {
    hdw.classList.remove('show');
  }

  singleEstData = {
    operations: {}
  };
  singleEstData['User added hardware'] = [];
  addedOperations.innerHTML = '';
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
    var data = e.target.result; // XLSX is a 3rd party library (LOADED FROM CDN SEE SCRIPT TAG AT THE HEADER OF HTML)
    // let workbook = XLSX.read(data, {type: "binary"})
    // const jsonData = workbook.SheetNames.map(sheet =>{
    //     return XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet])
    // })
    //Vertical xlsx template

    var workbook = XLSX.read(data, {
      type: "binary"
    });
    var jsonData = workbook.SheetNames.map(function (sheet) {
      return XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    }); // jsonData[0] = sheet metal , jsonData[1] = plastics .. etc

    console.log("json[0] is:", jsonData[0]); // GET JSON AND ARRANGE INTO ROW FORMAT

    var arrangedJson = transformData(jsonData[0]); // jsonData[0].map(row => {
    //   row["operations"] = {}
    //   if (row["Assembly count"]) { 
    //    row.operations["Assembly"] = {"Assembly count" : row["Assembly count"]}
    //   }
    //   if (row["Bend count"]) { 
    //    row.operations["Bend"] = {"Bend count" : row["Bend count"]}
    //   }
    //   if (row["Punch count"]) { 
    //     row.operations["Punch"] = {"Punch count" : row["Punch count"]}
    //    }
    //   if (row["Stamp count"]) { 
    //   row.operations["Stamp"] = {"Stamp count" : row["Stamp count"]}
    //   }
    //   if (row["Weld count"]) { 
    //     row.operations["Weld"] = {"Weld count" : row["Weld count"]}
    //    }
    // })

    console.log("arrangedJson is ", arrangedJson);
    google.script.run.withSuccessHandler(printEstimate).withFailureHandler(FailedToLoad) // .estimate(jsonData[0], googleSheet, "Sheet Metal");   
    .estimate(arrangedJson, googleSheet, "Sheet Metal");
  };
});

function FailedToLoad() {
  alert("Please review your input data");
  uploadFileForm.style.display = 'block';
  progress.style.display = 'none';
} // TRANSFORM into rows


function transformData(data) {
  var numOfParts = getNumberOfParts(data);
  var rowObj = {
    operations: {},
    "User added hardware": [{}]
  };
  var objArray = [];

  var _loop = function _loop(i) {
    data.forEach(function (row) {
      row["Parameter / Part"] === "Part Number" ? rowObj["Part Number"] = Object.values(row)[i] : row["Parameter / Part"] === "EAU" ? rowObj["EAU"] = Object.values(row)[i] : row["Parameter / Part"] === "Units(mm/in)" ? rowObj["Units(mm/in)"] = Object.values(row)[i] : row["Parameter / Part"] === "Material" ? rowObj["Material"] = Object.values(row)[i] : row["Parameter / Part"] === "Length" ? rowObj["Length"] = Object.values(row)[i] : row["Parameter / Part"] === "Width" ? rowObj["Width"] = Object.values(row)[i] : row["Parameter / Part"] === "Thickness" ? rowObj["Thickness"] = Object.values(row)[i] : row["Parameter / Part"] === "Finish Type" ? rowObj["Finish Type"] = Object.values(row)[i] : row["Parameter / Part"] === "Finish Type 2" ? rowObj["Finish Type 2"] = Object.values(row)[i] : row["Parameter / Part"] === "Hardware qty" ? rowObj["Hardware qty"] = Object.values(row)[i] : row["Parameter / Part"] === "Hdw complexity" ? rowObj["Hdw complexity"] = Object.values(row)[i] : row["Parameter / Part"] === "Assembly count" ? rowObj.operations["Assembly"] = {
        "Assembly count": Object.values(row)[i] || 0
      } : row["Parameter / Part"] === "Bend count" ? rowObj.operations["Bend"] = {
        "Bend count": Object.values(row)[i] || 0
      } : row["Parameter / Part"] === "Punch count" ? rowObj.operations["Punch"] = {
        "Punch count": Object.values(row)[i] || 0
      } : row["Parameter / Part"] === "Stamp" ? rowObj.operations["Stamp"] = {
        "Stamp count": Object.values(row)[i] || 0
      } : row["Parameter / Part"] === "Aluminum weld (in/mm)" ? rowObj.operations["Aluminum weld"] = {
        "Aluminum weld count": Object.values(row)[i] || 0
      } : row["Parameter / Part"] === "SS/Steel weld (in/mm)" ? rowObj.operations["SS/Steel weld"] = {
        "SS/Steel weld count": Object.values(row)[i] || 0
      } : row["Parameter / Part"] === "Threaded hole count" ? rowObj.operations["Threaded hole"] = {
        "Threaded hole count": Object.values(row)[i] || 0
      } : row["Parameter / Part"] === "Countersunk hole count" ? rowObj.operations["Countersunk hole"] = {
        "Countersunk hole count": Object.values(row)[i] || 0
      } : row["Parameter / Part"] === "Own Hardware quantity" ? // Here starts user added hardware 
      rowObj["User added hardware"][0]["Qty"] = Object.values(row)[i] || 0 : row["Parameter / Part"] === "Own Hdw description" ? rowObj["User added hardware"][0]["Description"] = Object.values(row)[i] || 0 : row["Parameter / Part"] === "Own Hdw price" ? rowObj["User added hardware"][0]["Price"] = Object.values(row)[i] || 0 : row["Parameter / Part"] === "Hardware description" && row.hasOwnProperty(String('Part ' + Number(i))) ? rowObj["Hdw complexity"] = row[String("Part " + Number(i))] || 0 : row["Parameter / Part"] === "Hardware quantity" && row.hasOwnProperty(String('Part ' + Number(i))) ? rowObj["Hardware qty"] = row[String("Part " + Number(i))] || 0 : null;
    });

    if (rowObj["Part Number"] !== "Part Number") {
      var obj = _objectSpread({}, rowObj);

      objArray = [].concat(_toConsumableArray(objArray), [obj]);
    }

    rowObj = {
      operations: {},
      "User added hardware": [{}]
    };
  };

  for (var i = 0; i < numOfParts; i++) {
    _loop(i);
  }

  console.log("objArray is : ", objArray);
  return objArray;
}

function getNumberOfParts(data) {
  var numOfParts;
  data.forEach(function (element, index) {
    if (element["Parameter / Part"] === "Part Number") {
      numOfParts = Object.keys(data[index]).length;
    }
  });
  return numOfParts;
}
},{}]},{},["yHiL"], null)