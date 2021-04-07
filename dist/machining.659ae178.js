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
myForm.addEventListener("change", function (e) {
  return changeTrigger(e);
});
myForm.style.display = 'none';

function changeTrigger(e) {
  console.log('changeTrigger fired, change in "myForm"');

  switch (e.target.id) {
    case "partNumber":
      variables.push({
        "partNumber": e.target.value
      });
      break;

    case "units":
      updateUnits(e.target.value);
      variables.push({
        "units": e.target.value
      });
      break;

    case "material":
      clearFilter(workpiece);
      filterByMaterial(e.target.value);
      fillSelectOptions(materialObject, workpiece);
      variables.push({
        "material": e.target.value
      });
      break;

    case "length":
      variables.push({
        "length": e.target.value
      });
      break;

    case "width":
      variables.push({
        "width": e.target.value
      });
      break;

    case "height":
      variables.push({
        "height": e.target.value
      });
      break;

    case "finishOne":
      variables.push({
        "finishOne": e.target.value
      });
      break;

    case "EAU":
      variables.push({
        "EAU": e.target.value
      });
      break;

    case "roughStockVol":
      variables.push({
        "roughStockVol": e.target.value
      });
      break;

    case "workpiece":
      variables.push({
        "workpiece": e.target.value
      });
      break;

    case "finalVolume":
      variables.push({
        "finalVolume": e.target.value
      });
      break;

    default:
      console.log('no id selected');
      break;
  }
}

function updateUnits(units) {
  // document.querySelector('#mrrUnits').innerHTML = units ==="inches" ?  `(in<sup>3</sup>/min)` : `(mm<sup>3</sup>/min)`
  var mrrUnits = document.querySelectorAll('#mrrUnits');
  mrrUnits.forEach(function (element) {
    return element.innerHTML = units === "inches" ? "(in<sup>3</sup>/min)" : "(cm<sup>3</sup>/min)";
  });
  var millingOperation = document.querySelector('#millingOperation');
  var turningOperation = document.querySelector('#turningOperation');
  var drillingOperation = document.querySelector('#drillingOperation');
  millingOperation.min = units === "inches" ? 0.5 : 8.2;
  millingOperation.max = units === "inches" ? 500 : 8194;
  turningOperation.min = units === "inches" ? 0.5 : 8.2;
  turningOperation.max = units === "inches" ? 50 : 820;
  drillingOperation.min = units === "inches" ? 0.3 : 4.9;
  drillingOperation.max = units === "inches" ? 36 : 590;
}

function minMax(input, minimum, maximum) {
  input.min = minimum;
  input.max = maximum;
}

function clearFilter(filterName) {
  var options = filterName.querySelectorAll('option');
  options.forEach(function (option, index) {
    filterName.options[index];
    filterName.remove([filterName.index]);
  });
}

function gotMtlData(data) {
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