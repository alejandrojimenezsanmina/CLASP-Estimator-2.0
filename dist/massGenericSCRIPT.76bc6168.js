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
})({"gCHb":[function(require,module,exports) {
//Get XLS from input and listen for submit file
var uploadFileForm = document.querySelector("#uploadFileForm");
var massUploadSubmit = document.querySelector("#massUploadSubmit");
var myfile = document.querySelector("#myfile");
var data;
var googleSheet = localStorage.getItem("url");
var loaderRight = document.querySelector('.loaderRight');
uploadFileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  e.stopPropagation();
  loaderRight.style.display = 'block';
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
    google.script.run.withSuccessHandler(unhideSegmet).withFailureHandler(FailedToLoad).estimate(jsonData[0], googleSheet, "Sheet Metal");
  };
});

function unhideSegmet() {
  uploadFileForm.style.display = 'block';
  loaderRight.style.display = 'none';
}

function FailedToLoad() {
  alert("Please review your input data");
  uploadFileForm.style.display = 'block';
  loaderRight.style.display = 'none';
}
},{}]},{},["gCHb"], null)