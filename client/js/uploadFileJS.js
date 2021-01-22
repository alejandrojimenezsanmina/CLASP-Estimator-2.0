  var restart = document.querySelector("#restart")

  restart.addEventListener("click", function (){
    localStorage.clear()
  })
    
    $( document ).ready(function(){
      $(".dropdown-trigger").dropdown();
      $('.modal').modal();
    })
    
   var qims;
   if(localStorage.getItem("projNum")){
     qims = localStorage.getItem("projNum");
   }

   var loader = document.querySelector(".loading")
   var iframe = document.querySelector("#ifr")
   var projNum = localStorage.getItem("projNum");
   var brandLogo = document.querySelector(".brand-logo")
   var estimateBtn = document.querySelector("#estimateBtn")
   var loader2 = document.querySelector("#loader2")
   var toastElem = document.querySelector(".toast")
   var openInGS = document.querySelector("#openInGS")
   var url;
   
   loader2.style.display = "none";
   
   brandLogo.innerText= qims;
   iframe.style.display= "none";
   
   if(!localStorage.getItem("MassURL")){
     google.script.run.withSuccessHandler(showIframe).createSheetforUpload(projNum);
   }else{
     url = localStorage.getItem("MassURL");
     showIframe(url);
   }
   
   estimateBtn.addEventListener("click", function (){
      var url = localStorage.getItem("MassURL");
      google.script.run.withSuccessHandler(actionCompleted).estimateMassSheet(url); //////CONTINUE HERE!!!!
      loader2.style.display = "block";
  })
   

   function showIframe(sheetUrl) {
      url = sheetUrl
     // Save URL to localStorage Google sheet for mass upload 
     localStorage.setItem("MassURL",url)
     //Set button href to the url for
     openInGS.href = url
     iframe.src = url
     loader.style.display= "none";
     iframe.style.display= "block";
   }
   
   function actionCompleted(){
     loader2.style.display = "none";
     console.log("action completed!")
   }

  //Open link in google sheets
  openInGS.target = "_blank"
