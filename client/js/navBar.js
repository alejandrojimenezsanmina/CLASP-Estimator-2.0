//Load navbar drowpdown menu
$( document ).ready(function(){
    
    $(".dropdown-trigger").dropdown();
    $('.modal').modal();
    $('.sidenav').sidenav();

    let projectURL;

    if(localStorage.getItem('url')){
      projectURL = localStorage.getItem('url')
    }

    if(!projectURL){
      if(document.querySelector('#dropDownMenu')){
        document.querySelector('#dropDownMenu').style.display = 'none';
      }
    }
    
    var restart = document.querySelector("#restart")
    restart.addEventListener("click", function (){
    localStorage.clear()
      })

        //Info Button turn off glow
    if(document.querySelector("#infoButton")){
      var infoButton = document.querySelector("#infoButton");
      infoButton.addEventListener("click", function (e){ e.target.classList.remove("glow")})
    }
      
      var dollarSign = document.querySelector('#slideCeption');
      dollarSign.addEventListener("click", function (e) { 
        if(dollarSign.classList.contains('glowGreen')){
          dollarSign.classList.remove("glowGreen")
        }
      })

    

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
  






