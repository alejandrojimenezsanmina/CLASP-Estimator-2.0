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
})({"rc9d":[function(require,module,exports) {
var restart = document.querySelector("#restart");
restart.addEventListener("click", function () {
  localStorage.clear();
});
$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
  $('.modal').modal();
  alert("Hello there");
});
var singleEstURL;
var MassURL;
var qims;

if (localStorage.getItem("url")) {
  singleEstURL = localStorage.getItem("url");
}

if (localStorage.getItem("MassURL")) {
  MassURL = localStorage.getItem("MassURL");
}

if (localStorage.getItem("projNum")) {
  qims = localStorage.getItem("projNum");
} else {
  qims = "";
} //Project Number DIV = Input Proj #


var projectNumber = document.querySelector('.projectNumber');
var brandLogo = document.querySelector('.brand-logo');
var body = document.body;
var loading = document.querySelector('.loading');
loading.style.display = 'none'; // Hiding Loader

var loader = document.querySelector('.loader'); //loader.style.display = 'none';
//Hiding buttons in home

var homeButtons = document.querySelector('.HomeButtons');
homeButtons.style.display = 'none'; //hiding start button

var startButton = document.querySelector('.startButton');
startButton.style.display = 'none';
body.style.background = '#EFEFEF'; //Project number in navbar

var brandLogo = document.querySelector(".brand-logo");
brandLogo.innerText = qims; //If Project # > 5 show Start button

var project = document.querySelector('.project');
project.addEventListener("input", function (e) {
  if (e.target.value.length >= 5) {
    startButton.style.display = 'block';
    qims = e.target.value;
  }
}); //Project Number DIV = Input Proj #

var projectNumber = document.querySelector('.projectNumber'); //Start Button clicked, show all buttons, replace for Actual proj # when clicked // Call start() in order to create a new Google Sheet to paste all the info

startButton.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  body.style.background = '#EFEFEF';
  loading.style.display = 'block'; //homeButtons.style.display = 'block'; --Moved to function returnGSUrl. This will display until google sheet is loaded
  //projectNumber.innerHTML = `<h5> Proj#: ${qims} </h5>`;

  localStorage.setItem("projNum", qims); //projectNumber.style.display = 'block';             

  google.script.run.withSuccessHandler(returnGSUrl).start(qims);
}); // This funciton returns the URL of the Google Sheet where the estimations are put into.

function returnGSUrl(url) {
  var sheetUrl = url;
  localStorage.setItem("url", sheetUrl);
  loading.style.display = 'none';
  homeButtons.style.display = 'block';
  body.style.background = 'whitesmoke';
  projectNumber.style.display = 'none';
  brandLogo.innerText = qims;
}

if (singleEstURL || MassURL) {
  projectNumber.style.display = "none";
  startButton.style.display = "none";
  body.style.background = '#EFEFEF'; //loading.style.display = 'block';
  //homeButtons.style.display = 'block'; --Moved to function returnGSUrl. This will display until google sheet is loaded
  //projectNumber.innerHTML = `<h5> Proj#: ${qims} </h5>`;

  localStorage.setItem("projNum", qims);
  homeButtons.style.display = 'block';
  body.style.background = 'whitesmoke';
}
},{}]},{},["rc9d"], null)