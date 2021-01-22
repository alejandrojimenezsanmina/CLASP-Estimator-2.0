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
var restart = document.querySelector("#restart");
restart.addEventListener("click", function () {
  localStorage.clear();
}); //Load navbar drowpdown menu

$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
  $('.modal').modal();
  $('.sidenav').sidenav();
}); // Input File - Get file ready to submit

var myfile = document.querySelector("#myfile");
myfile.addEventListener("change", function (e) {
  console.log(myfile.files);
}); //Info Button turn off glow

var infoButton = document.querySelector("#infoButton");
infoButton.addEventListener("click", function (e) {
  e.target.classList.remove("glow");
});
var qims;

if (localStorage.getItem("projNum")) {
  qims = localStorage.getItem("projNum");
} //Initialize floating Action Button    


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'bottom',
    hoverEnabled: false
  });
});
var googleSheetURL = localStorage.getItem("url");
var projNum = localStorage.getItem("projNum");
var copyLink = document.querySelector('#copyLink');
/*
copyLink.addEventListener('click', function(){ 
  let link = $('<input>').val(googleSheetURL).appendTo('body').css('display', 'none').select();
    document.execCommand('copy');
    alert('Google sheet link copied to clipboard!');
});
*/

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
}); //Project number in navbar

var brandLogo = document.querySelector(".brand-logo");
brandLogo.innerText = qims;
var arr = [];
var myForm = document.querySelector('#myForm'); //var addMore = document.querySelector("#addMore");

var hdw = document.getElementById("hdw");
hdw.style.display = "none";
var iframe = document.querySelector(".iframe");
var ifr = document.querySelector("#ifr");
iframe.style.display = "none";
document.getElementById("infoMsg").style.display = "block";
document.getElementById("infoMsg").style.display = "none";
var hide = document.querySelector('#hide');
/*
let openGS = document.querySelector('#openGS');
openGS.href = googleSheetURL;
openGS.target = '_blank';
*/
//Toggle Hardware option    

hide.addEventListener("click", toggle);

function toggle() {
  if (hdw.style.display === 'block') {
    hdw.style.display = 'none';
  } else {
    hdw.style.display = 'block';
  }
}
/*
//Toggle -Add more BTP Button        
 addMore.addEventListener("click",function(){
     if(moreBTP.style.display === 'block'){
         moreBTP.style.display = 'none';
     }else{
       moreBTP.style.display = 'block';
       }
 });     
 */
//Show Information square


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


document.getElementById('submit').addEventListener("click", estimate); //SHOW PRICING AS SUBMITTED

/*
const yourEstimation = document.querySelector('.yourEst');
yourEstimation.style.display = 'none';
*/

var i = 0;

function estimate(e) {
  e.preventDefault();
  var userInfo = {};
  var ids = document.querySelectorAll('*[id]');
  ids.forEach(function (element) {
    if (element.id.length < 15) {
      userInfo[element.id] = element.value;
    }
  }); //ADD THE googleSheet -URL TO THE userInfo OBJECT
  //userInfo.googleSheetURL = googleSheetURL;   

  userInfo.hide = e.target.checked; //  google.script.run.estimate(userInfo);

  i++;
  google.script.run.withSuccessHandler(printEstimate).estimate(userInfo);
} //TOGGLE PRICE ON MASTER RIGHT


var estimation = document.querySelector('.estimation1');
estimation.style.display = 'none';

function printEstimate(userInfo) {
  iframe.style.display = "block";
  yourEstimation.style.display = 'block';
  /*
  estimation.style.display = 'block';
  //exp.style.display = 'block';
   //var googleSheetURL = localStorage.getItem("url");
   //console.log(googleSheetURL)
  var price = document.createElement('div');
  price.classList.add('printEstimation');
        //Material: ${userInfo.material} with ${userInfo.bending} bendings. Hardware: ${userInfo.hide === true ? 'Yes' : 'No'}
        //Sheet Area: ${Math.round(userInfo.surfaceArea *1000 )/1000}m², Total Volume: ${Math.round(userInfo.weight *1000)/1000}Kgs, 
  price.innerText  = `Part Number ${userInfo.partNumber} | Estimated Price$: ${Math.round(userInfo.estimation * 1000)/1000} 
  
  `;
  
  estimation.prepend(price);
  */

  var jason = JSON.stringify(userInfo);
  arr.push(jason);
  console.log(arr); //CALL TOGS

  google.script.run.toGS(arr, googleSheetURL);
  ifr.src = googleSheetURL;
  myForm.reset();
}
},{}]},{},["yHiL"], null)