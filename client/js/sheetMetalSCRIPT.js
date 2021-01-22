
 var restart = document.querySelector("#restart")
  restart.addEventListener("click", function (){
    localStorage.clear()
  })

//Load navbar drowpdown menu
$( document ).ready(function(){
  $(".dropdown-trigger").dropdown();
  $('.modal').modal();
  $('.sidenav').sidenav();
})

// // Input File - Get file ready to submit
// var myfile = document.querySelector("#myfile")

// myfile.addEventListener("change", function (e){
//   console.log(myfile.files)
// });

//Info Button turn off glow
var infoButton = document.querySelector("#infoButton");
infoButton.addEventListener("click", function (e){ e.target.classList.remove("glow")})

var qims;
if (localStorage.getItem("projNum")){
  qims = localStorage.getItem("projNum");
}

//Initialize floating Action Button    
 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, 
            {direction: 'bottom', hoverEnabled: false },
            );
  });

var googleSheetURL = localStorage.getItem("url");
var projNum = localStorage.getItem("projNum");


let copyLink = document.querySelector('#copyLink');
/*
copyLink.addEventListener('click', function(){ 
  let link = $('<input>').val(googleSheetURL).appendTo('body').css('display', 'none').select();
    document.execCommand('copy');
    alert('Google sheet link copied to clipboard!');
});
*/

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});


//Project number in navbar
var brandLogo = document.querySelector(".brand-logo");
brandLogo.innerText = qims


var arr = [];
var myForm = document.querySelector('#myForm');

//var addMore = document.querySelector("#addMore");

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
hide.addEventListener("click",toggle);
       
         function toggle(){
        if(hdw.style.display === 'block'){
          hdw.style.display = 'none'
        }else{
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
  document.getElementById('complexity').addEventListener("change",toggleInfoSqr);
  
            function toggleInfoSqr (){
            var value = document.getElementById('complexity').value;
            if(value ==='Simple'){
                document.getElementById("infoMsg").innerHTML = "ⓘ   Simple to install items such as screws.";
                document.getElementById("infoMsg").style.display = "inline-block";  
               }else if  (value ==='Medium'){
                    document.getElementById("infoMsg").innerHTML = "ⓘ    Medium complexity items, rivetting.";
                    document.getElementById("infoMsg").style.display = "inline-block";   
                     }else if(value ==='Complex'){
                         document.getElementById("infoMsg").innerHTML = "ⓘ Complex items including soldering.";
                          document.getElementById("infoMsg").style.display = "inline-block";
                         }
                }            
            
            


//     ESTIMATE BUTTON , SUBMIT OBJECT WITH VALUE TO SERVER
document.getElementById('submit').addEventListener("click",estimate);
 
 //SHOW PRICING AS SUBMITTED
 /*
 const yourEstimation = document.querySelector('.yourEst');
 yourEstimation.style.display = 'none';
 */
 
  var i = 0;

function estimate(e){
   e.preventDefault();
     var userInfo = {};
     var ids = document.querySelectorAll('*[id]'); 
     
     
           ids.forEach(element => {
                if (element.id.length < 15){
                   userInfo[element.id] = element.value;
                   }
             });
               //ADD THE googleSheet -URL TO THE userInfo OBJECT
               //userInfo.googleSheetURL = googleSheetURL;   
             
      userInfo.hide = e.target.checked;
      
//  google.script.run.estimate(userInfo);
       i++;
  google.script.run.withSuccessHandler(printEstimate).estimate(userInfo); 
    
   }
   
   
   
//TOGGLE PRICE ON MASTER RIGHT
var estimation = document.querySelector('.estimation1');
estimation.style.display = 'none';


  function printEstimate (userInfo){
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
 
       console.log(arr);
    //CALL TOGS
    google.script.run.toGS(arr,googleSheetURL);   
    
    ifr.src = googleSheetURL;
    
    myForm.reset();
       
    }

