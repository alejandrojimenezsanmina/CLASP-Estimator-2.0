//Load navbar drowpdown menu
$( document ).ready(function(){
    
    $(".dropdown-trigger").dropdown();
    $('.modal').modal();
    $('.sidenav').sidenav();
    
    var restart = document.querySelector("#restart")
    restart.addEventListener("click", function (){
    localStorage.clear()
      })

        //Info Button turn off glow
    var infoButton = document.querySelector("#infoButton");
    infoButton.addEventListener("click", function (e){ e.target.classList.remove("glow")})

    var qims;
    if (localStorage.getItem("projNum")){
    qims = localStorage.getItem("projNum");
    }

    //Project number in navbar
    var brandLogo = document.querySelector(".brand-logo");
    brandLogo.innerText = qims

  })
  






