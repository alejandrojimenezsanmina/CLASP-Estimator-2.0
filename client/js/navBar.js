//Load navbar drowpdown menu
$( document ).ready(function(){
    
    $(".dropdown-trigger").dropdown();
    $('.modal').modal();
    $('.sidenav').sidenav();

    let queryString = window.location.search;
    console.log(queryString);
    
    var restart = document.querySelector("#restart")
    restart.addEventListener("click", function (){
    localStorage.clear()
      })

        //Info Button turn off glow
    var infoButton = document.querySelector("#infoButton");
    infoButton.addEventListener("click", function (e){ e.target.classList.remove("glow")})

    if (document.querySelector('#slideCeption')){
      
      var dollarSign = document.querySelector('#slideCeption');
      dollarSign.addEventListener("click", function (e) { 
        if(dollarSign.classList.contains('glowGreen')){
          dollarSign.classList.remove("glowGreen")
        }
      })

    }

    var qims;
    if (localStorage.getItem("projNum")){
    qims = localStorage.getItem("projNum");
    }else{
      qims = "New Project"
    }

    //Project number in navbar
    var brandLogo = document.querySelector(".brand-logo");
    brandLogo.innerText = qims

  })
  






