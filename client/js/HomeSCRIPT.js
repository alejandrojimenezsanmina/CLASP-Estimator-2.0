
var restart = document.querySelector("#restart")
restart.addEventListener("click", function (){
  localStorage.clear()
})

$( document ).ready(function(){
  $(".dropdown-trigger").dropdown();
  $('.modal').modal();
  
})



  var sheetUrl;
  var qims;
      
 if (localStorage.getItem("url")){
        sheetUrl = localStorage.getItem("url");
      }
  
  if (localStorage.getItem("projNum")){
         qims = localStorage.getItem("projNum");
      }else{
        qims = "";
      }
      
 //Project Number DIV = Input Proj #
  var projectNumber = document.querySelector('.projectNumber');
  var brandLogo = document.querySelector('.brand-logo');
  var body = document.body;
  var loading = document.querySelector('.loading');
  loading.style.display = 'none';
  
  // Hiding Loader
  var loader = document.querySelector('.loader');
  //loader.style.display = 'none';
  
  //Hiding buttons in home
  var homeButtons = document.querySelector('.HomeButtons');
  homeButtons.style.display = 'none';
  
  //hiding start button
  var startButton = document.querySelector('.startButton');
  startButton.style.display = 'none';
  
  body.style.background = '#EFEFEF';
  
  //Project number in navbar
  var brandLogo = document.querySelector(".brand-logo");
  brandLogo.innerText = qims

  let projNumHeader = document.querySelector('#projNumHeader');
  let openGSheets = document.querySelector('#openGSheets');
  let downloadXls = document.querySelector('#downloadXls');
  let sendEmail = document.querySelector('#sendEmail');

  if(sheetUrl){
    openGSheets.href = sheetUrl;
    openGSheets.target = "_blank";
    let indexof = sheetUrl.indexOf("edit?")
    let substr = sheetUrl.slice(0, indexof);
    let downloadRoute = substr + "export?format=xlsx";
    downloadXls.href = downloadRoute;
  }

  if(qims){
    projNumHeader.innerText= qims;
  }
  
  
  //If Project # > 5 show Start button
  var project = document.querySelector('.project');
  project.addEventListener("input",(e)=>{
          if(e.target.value.length >= 5){
              startButton.style.display = 'block';
              qims = e.target.value;
      }
  });
  
  //Project Number DIV = Input Proj #
  var projectNumber = document.querySelector('.projectNumber');
  
  //Start Button clicked, show all buttons, replace for Actual proj # when clicked // Call start() in order to create a new Google Sheet to paste all the info
  startButton.addEventListener("click",(e) =>{  
      e.preventDefault();
      e.stopPropagation();
      body.style.background = '#EFEFEF';
      loading.style.display = 'block';
      //homeButtons.style.display = 'block'; --Moved to function returnGSUrl. This will display until google sheet is loaded
      //projectNumber.innerHTML = `<h5> Proj#: ${qims} </h5>`;
      localStorage.setItem("projNum", qims);
      
      //projectNumber.style.display = 'block';             
          google.script.run.withSuccessHandler(returnGSUrl).start(qims);
  });
  


// This funciton returns the URL of the Google Sheet where the estimations are put into.
function returnGSUrl (url){

  sheetUrl = url;
   localStorage.setItem("url", sheetUrl);
   loading.style.display = 'none';
   homeButtons.style.display = 'block';
   body.style.background = 'whitesmoke';
   projectNumber.style.display = 'none';
   brandLogo.innerText = qims;
}
  

  if(sheetUrl ){
      projectNumber.style.display = "none";
      startButton.style.display = "none";
      body.style.background = '#EFEFEF';
      //loading.style.display = 'block';
      //homeButtons.style.display = 'block'; --Moved to function returnGSUrl. This will display until google sheet is loaded
      //projectNumber.innerHTML = `<h5> Proj#: ${qims} </h5>`;
      localStorage.setItem("projNum", qims);
      homeButtons.style.display = 'block';
      body.style.background = 'whitesmoke';
    }
