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
})({"RXAm":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(document).ready(function () {
  M.updateTextFields();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
  google.script.run.withSuccessHandler(gotMtlData).loadMaterialData();
});
var workpiece = document.querySelector('#workpiece');
var materialfilter = document.querySelector('#materialfilter');
var myForm = document.querySelector('#myForm');
var loadingCircle = document.querySelector('.loadingCircle');
var material = document.querySelector('#material');
var millingOperation = document.querySelector('#millingOperation');
var turningOperation = document.querySelector('#turningOperation');
var drillingOperation = document.querySelector('#drillingOperation');
var machineRate = document.querySelector('#machineRate');
var finalVolume = document.querySelector('#finalVolume');
var millingInput = document.querySelector('#millingInput');
var latheInput = document.querySelector('#latheInput');
var drillingInput = document.querySelector('#drillingInput');
var machinedRateInput = document.querySelector('#machinedRateInput');
var finalVolumeInput = document.querySelector('#finalVolumeInput');
var calculators = document.querySelector('.calculators');
var calcArray = Array.from(calculators.querySelectorAll('div'));
calcArray.forEach(function (element) {
  return element.classList.add('hide');
});
calculators.addEventListener('click', function (e) {
  if (e.target.nodeName === "BUTTON") {
    switch (e.target.id) {
      case "millingCalc":
        e.target.classList.remove('glow');
        e.target.innerHTML = e.target.innerHTML === "+" ? '-' : '+';
        document.querySelector('#millingCalculator').classList.toggle('hide');
        break;

      case "turningCalc":
        e.target.classList.remove('glow');
        e.target.innerHTML = e.target.innerHTML === "+" ? '-' : '+';
        document.querySelector('#turningCalculator').classList.toggle('hide');
        break;

      case "drillingCalc":
        e.target.classList.remove('glow');
        e.target.innerHTML = e.target.innerHTML === "+" ? '-' : '+';
        document.querySelector('#drillingCalculator').classList.toggle('hide');
        break;

      default:
        console.log('nuffin');
        break;
    }
  }
});
millingOperation.addEventListener('change', function (e) {
  return millingInput.value = e.target.value + whatUnitsText;
});
turningOperation.addEventListener('change', function (e) {
  return latheInput.value = e.target.value + whatUnitsText;
});
drillingOperation.addEventListener('change', function (e) {
  return drillingInput.value = e.target.value + whatUnitsText;
});
machineRate.addEventListener('change', function (e) {
  return machinedRateInput.value = "$" + e.target.value + " (usd/hr)";
});
finalVolume.addEventListener('change', function (e) {
  return finalVolumeInput.value = e.target.value + "%";
});
myForm.addEventListener("change", function (e) {
  return changeTrigger(e);
});
var whatUnits;
var whatUnitsText;
millingOperation;
myForm.style.display = 'none';

function changeTrigger(e) {
  console.log('changeTrigger fired, change in "myForm"');

  switch (e.target.id) {
    case "units":
      updateUnits(e.target.value);
      break;

    case "material":
      clearFilter(workpiece);
      filterByMaterial(e.target.value);
      fillSelectOptions(materialObject, workpiece);
      break;

    default:
      console.log('no id selected');
      break;
  }
}

myForm.addEventListener('submit', function (e) {
  e.preventDefault();
  variables = {};
  var drillingCheckbox = document.querySelector('#drillingCheckbox');
  var turningCheckbox = document.querySelector('#turningCheckbox');
  var millingCheckbox = document.querySelector('#millingCheckbox');
  var arrayForm = Array.from(myForm.querySelectorAll('*[id]'));
  arrayForm.forEach(function (element) {
    if (element.id.length < 25) {
      switch (element.id) {
        //complete me !!
        case "partNumber":
          return variables["partNumber"] = element.value;

        case "units":
          return variables["units"] = element.value;

        case "material":
          return variables["material"] = element.value;

        case "workpieceModal":
          return variables["workpieceModal"] = element.value;

        case "length":
          return variables["length"] = element.value;

        case "width":
          return variables["width"] = element.value;

        case "height":
          return variables["height"] = element.value;

        case "workpiece":
          return variables["workpiece"] = element.value;

        case "finishOne":
          return variables["finishOne"] = element.value;

        case "EAU":
          return variables["EAU"] = element.value;

        case "roughStockVol":
          return variables["roughStockVol"] = element.value;

        case "finalVolume":
          return variables["finalVolume"] = element.value;

        case "finalVolumeInput":
          return variables["finalVolumeInput"] = element.value;

        case "mrrModal":
          return variables["mrrModal"] = element.value;

        case "millingOperation":
          return variables["millingOperation"] = element.value;

        case "millingInput":
          return variables["millingInput"] = element.value;

        case "turningOperation":
          return variables["turningOperation"] = element.value;

        case "latheInput":
          return variables["latheInput"] = element.value;

        case "drillingOperation":
          return variables["drillingOperation"] = element.value;

        case "drillingInput":
          return variables["drillingInput"] = element.value;

        case "shopRate":
          return variables["shopRate"] = element.value;

        case "machineRate":
          return variables["machineRate"] = element.value;

        case "machinedRateInput":
          return variables["machinedRateInput"] = element.value;

        case "drillingCheckbox":
          return variables["drillingCheckbox"] = element.checked;

        case "turningCheckbox":
          return variables["turningCheckbox"] = element.checked;

        case "millingCheckbox":
          return variables["millingCheckbox"] = element.checked;

        default:
          return;
      }
    }
  });

  if (!drillingCheckbox.checked && !turningCheckbox.checked && !millingCheckbox.checked) {
    alert('Please select at least one machining operation (MRR)');
    return;
  }

  if (variables["length"] === "" || variables["width"] === "" || variables["height"] === "" || variables["EAU"] === "" || variables["finishOne"] === "" || variables["partNumber"] === "") {
    alert(" Please make sure all fields are filled in");
    return;
  }

  console.log(variables); // google.script.run.withSuccessHandler(gotEstimation).estimateMachined(variables)

  estimateMachined(variables);
});

function estimateMachined(variablesObj) {
  var estimationData = {};
  var average = 0;

  if (variablesObj['units'] === 'inches') {
    variablesObj['length'] = variablesObj['length'] * 2.54;
    variablesObj['width'] = variablesObj['width'] * 2.54;
    variablesObj['height'] = variablesObj['height'] * 2.54;

    if (variablesObj['millingCheckbox']) {
      variablesObj['millingOperation'] = variablesObj['millingOperation'] * 16.387;
    }

    if (variablesObj['turningCheckbox']) {
      variablesObj['turningOperation'] = variablesObj['turningOperation'] * 16.387;
    }

    if (variablesObj['drillingCheckbox']) {
      variablesObj['drillingOperation'] = variablesObj['drillingOperation'] * 16.387;
    }
  }

  estimationData['Part surface (cm2)'] = variablesObj['workpiece'] === 'Round' ? Math.pow(variablesObj['width'] / 2, 2) * Math.PI : variablesObj['width'] * variablesObj['height'];

  var _iterator = _createForOfIteratorHelper(fromGS),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;

      if (element !== null) {
        if (element['Shape'] === variablesObj['workpiece'] && element['Surface cm2'] >= estimationData['Part surface (cm2)']) {
          estimationData['workpiece weigth'] = element["Kg/cm (lineal)"] * element["Lengt cm"];
          estimationData['Workpiece volume each'] = element['Surface cm2'] * element["Lengt cm"];
          estimationData['Lengt cm'] = element['Lengt cm'];
          estimationData['Price per Kg'] = element['Price per Kg'];
          estimationData['workpiece selected surface cm2'] = element['Surface cm2'];
          break;
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  estimationData['number of workpieces'] = Math.ceil(variablesObj['EAU'] * variablesObj['length'] / estimationData["Lengt cm"]);

  if (!estimationData['Workpiece volume each']) {
    alert("There's no ".concat(variablesObj['workpiece'], " workpiece with the required meassures, try with another workpiece shape"));
    return;
  }

  estimationData['total raw mtl weight'] = estimationData['number of workpieces'] * estimationData['workpiece weigth'];
  estimationData['Cut pieces adder'] = variablesObj['EAU'] * 1.5; // Volume of rough stock

  estimationData['Vr'] = estimationData['Workpiece volume each'] * estimationData['number of workpieces']; // Final volume

  estimationData['Vm'] = estimationData['Vr'] * (variablesObj['finalVolume'] / 100);
  estimationData['Tm'] = 0;

  if (variablesObj['millingCheckbox']) {
    estimationData['Tm'] += variablesObj['millingOperation'];
    average++;
  }

  if (variablesObj['turningCheckbox']) {
    estimationData['Tm'] += variablesObj['turningOperation'];
    average++;
  }

  if (variablesObj['drillingCheckbox']) {
    estimationData['Tm'] += variablesObj['drillingOperation'];
    average++;
  }

  console.log('Tm before average', estimationData['Tm']);
  estimationData['Tm'] /= average;
  estimationData['raw volume part'] = variablesObj['workpiece'] === 'Round' ? Math.pow(variablesObj['width'] / 2, 2) * Math.PI * variablesObj['length'] : variablesObj['width'] * variablesObj['height'] * variablesObj['length'];
  estimationData['final volume part'] = variablesObj['finalVolume'] / 100 * estimationData['raw volume part'];
  estimationData['removed material cm3'] = estimationData['raw volume part'] - estimationData['final volume part'];
  estimationData['time per part'] = estimationData['removed material cm3'] / estimationData['Tm'];
  estimationData['machining cost ea'] = estimationData['time per part'] * variablesObj['machineRate'] + 1.50;
  estimationData['total mtl cost'] = estimationData['total raw mtl weight'] * estimationData['Price per Kg'];
  estimationData['part cost each'] = estimationData['total mtl cost'] / variablesObj['EAU'] + estimationData['machining cost ea'] + 1.50;
  estimationData['sheetURL'] = localStorage.getItem('url');
  estimationData['Input values'] = variablesObj;
  console.log('variablesObj', variablesObj);
  console.log('estimationData', estimationData);
  google.script.run.withSuccessHandler(completed).loadToGoogleSheet(estimationData);
  estimationData = {};
}

function completed() {
  var sheetNewUrl = localStorage.getItem('url');
  var dollar = document.querySelector('#slideCeption');
  dollar.classList.add('glowGreen');
  var openGSheets = document.querySelector('#openGSheets');
  openGSheets.href = sheetNewUrl;
  openGSheets.target = '_blank';
  var downloadXls = document.querySelector('#downloadXls');
  var indexof = sheetNewUrl.indexOf("edit?");
  var substr = sheetNewUrl.slice(0, indexof);
  var downloadRoute = substr + "export?format=xlsx";
  downloadXls.href = downloadRoute;
}

function updateUnits(units) {
  whatUnits = units === "inches" ? "(in<sup>3</sup>/min)" : "(cm<sup>3</sup>/min)";
  whatUnitsText = whatUnits === "(in<sup>3</sup>/min)" ? " in3/min" : " cm3/min";
  var mrrUnits = document.querySelectorAll('#mrrUnits');
  mrrUnits.forEach(function (element) {
    return element.innerHTML = whatUnits;
  });
  millingOperation.min = units === "inches" ? 0.5 : 8.2;
  millingOperation.max = units === "inches" ? 500 : 8194;
  turningOperation.min = units === "inches" ? 0.5 : 8.2;
  turningOperation.max = units === "inches" ? 50 : 820;
  drillingOperation.min = units === "inches" ? 0.3 : 4.9;
  drillingOperation.max = units === "inches" ? 36 : 590;
}

function clearFilter(filterName) {
  var options = filterName.querySelectorAll('option');
  options.forEach(function (option, index) {
    filterName.options[index];
    filterName.remove([filterName.index]);
  });
}

function gotMtlData(data) {
  console.log('data', data);
  fillMaterialFilter(data);
  loadingCircle.style.display = 'none';
  myForm.style.display = 'block';
}

var variables = [];
var cutCharge = {
  "Cut charge": 1.50
};
variables.push(cutCharge);
var workPieces;
var workPiecesWords = [];
var materials;
var materialsWords = [];
var fromGS;
var materialObject = [];

function filterByMaterial(material) {
  materialObject = [];
  fromGS.map(function (element) {
    if (element !== null && element["Material"] === material) {
      if (!materialObject.includes(element["Shape"])) {
        materialObject.push(element["Shape"]);
      }
    }
  });
  console.log(materialObject);
}

function fillMaterialFilter(data) {
  fromGS = data;
  materials = data.map(function (elem) {
    return elem !== null && elem["Material"];
  });
  getWords(materials, materialsWords);
  fillSelectOptions(materialsWords, material);
  $('select').formSelect();
}

function fillWorkpieceFilter(fromGS) {
  workPieces = fromGS.map(function (elem) {
    return elem !== null && elem["Shape"];
  });
  getWords(workPieces, workPiecesWords);
  console.log(workPiecesWords);
  fillSelectOptions(workPiecesWords, workpiece);
  $('select').formSelect();
}

function getWords(inArray, outArray) {
  inArray.forEach(function (elem) {
    if (!outArray.includes(elem)) {
      outArray.push(elem);
    }
  });
}

function fillSelectOptions(options, filterName) {
  var disabledOption = document.createElement('option');
  disabledOption.text = 'Select :';
  disabledOption.disabled = true;
  filterName.add(disabledOption);
  options.map(function (option) {
    var opt = document.createElement('option');
    opt.text = option;
    opt.value = option;
    filterName.add(opt);
  });
  $('select').formSelect();
}

var milling = {
  information: "They are usually used to machine flat surfaces, but can also produce irregular surfaces. They can also be used to drill, bore, cut gears, and produce slots."
};
var Turning = {
  information: "\n        Turning is a machining process in which a cutting tool, typically a non-rotary tool bit, describes a helix toolpath by moving more or less linearly while the workpiece rotates.\n        Usually the term \"turning\" is reserved for the generation of external surfaces by this cutting action, whereas this same essential cutting action when applied to internal surfaces (holes, of one kind or another) is called \"boring\".\n   "
}; //Part Lot Cost =  N x [ ( Vr – Vm ) x Tm x Rt x (1hr/60min) ] + Ohm + Sc 
// Vr = Volume of Rough Stock (in3, mm3 )
// Vm = Volume of Final Machined Part (in3 , mm3 )
// Tm = Material Removal minutes per unit volume (min/in3 , min/mm3 )
// Rt = Machine shop rate ($/ hr )
// Ohm = Machine shop overhead ($)
// Sc = Lot manufacturing setup costs ($)
// N = Lot built quantity
// Metal removal rates vary as follows:
// Milling operations: 0.5 in3 / min ( 2 min/in3 ) to 500 in3 / min ( 0.002 min/in3 )
// Small dia. end mill – Shell insert cutter
// Lathe turning: from 0.5 ( 2 min/in3 ) to 50 in3 / min ( 0.02 min/in3 )
// Drilling: from 0.3 ( 3.33 min/in3 ) to 36 in3 / min ( 0.028 min/in3 )

var wrapperXYZ = {
  x: 0,
  y: 0,
  z: 0
};
},{}]},{},["RXAm"], null)