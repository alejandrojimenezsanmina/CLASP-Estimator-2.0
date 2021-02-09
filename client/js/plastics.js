$(document).ready(function(){
  $('select').formSelect();
  $('.sidenav').sidenav();

 
});

let sheetNewUrl;

if (localStorage.getItem('url')){
  sheetNewUrl = localStorage.getItem('url')
  var downloadXl = document.getElementById('downloadXls');
  var openSheets = document.getElementById("openGSheets");

  openSheets.href = sheetNewUrl;
  openSheets.target = "_blank";

  let indexof = sheetNewUrl.indexOf("edit?")
  let substr = sheetNewUrl.slice(0, indexof);
  let downloadRoute = substr + "export?format=xlsx";
  downloadXl.href = downloadRoute;

} 

const costForm = document.forms[0]
console.log(costForm);
var typeval = "newmat";

function getElement (obj)
{
  if (typeof obj == "string")
   { return document.all ? document.all(obj) : document.getElementById ? document.getElementById(obj) : document.layers ? document.layers[obj] : null; }
  else
   { return obj; }
}

function getFormValue (field)
{
  if(field.length != null) { var type = field[0].type; }
  if((typeof(type)=="undefined") || (type==0)) { var type = field.type; }

  if (type)
  {
    if (type=="hidden" || type=="text") { return field.value; }
    else if (type=="select-one") { return (field.selectedIndex >= 0) ? field[field.selectedIndex].value : "" ; }
    else if (type=="checkbox") { return (field.checked) ? field.value : ""; }

    else if (type=="radio")
    {
      for (var i = 0; i < field.length; i++)
      {
        if (field[i].checked) { return field[i].value; }
      }
    }
  }

  return "";
}

function getFormValue1 (field)
{
  if (field)
  {
    if (field.type=="hidden" || field.type=="text") { return field.value; }
    else if (field.type=="select-one") { return (field.selectedIndex >= 0) ? field[field.selectedIndex].value : "" ; }
    else if (field.type=="checkbox") { return (field.checked) ? field.value : ""; }
  }

  return "";
}

function setSelectedValue (box, val)
{
  var curval = box.selectedIndex;
  for (var i = 0; i < box.length; i++)
  {
    if (box[i].value == val) { curval = i; break; }
  }
  box.selectedIndex = curval;
}

function initForm (form)
{
  //setSelectedValue(form.calctype,"newmat");
  //SelectType(form.calctype);
  form.unittype[0].checked = true;
  SelectUnits(form, 0);
}

function InToCm (inches) { return inches * 2.54; }
function In2ToCm2 (inches) { return inches * 6.4516; }
function In3ToCm3 (inches) { return inches * 16.387; }
function LbsToKg (lbs) { return lbs * 0.45359; }
function CmToIn (cm) { return cm / 2.54; }
function Cm2ToIn2 (cm) { return cm / 6.4516; }
function Cm3ToIn3 (cm) { return cm / 16.387; }
function KgToLbs (kg) { return kg / 0.45359; }
//function ClearCavnum (form) { form.cavnum.value = form.j.value = ""; }
//function ClearCavnum (form) { form.cavnum.value = ""; }
function ClearCavnum (form) { form.cavnum.selectedIndex = 0; }
function ClearPress (form) { form.pressnum.value = ""; }
function ClickCav (form) { console.log("this form :",form); if (!form.cav[0].checked) { form.cav[0].click(); } }
function ClickPress (form) { if (!form.press[0].checked) { form.press[0].click(); } }

function SelectType (typebox)
{
  console.log('SelectType(typebox) is :::::', typebox);
  ClearCalcs(typebox.form);
  //SelectMaterial(typebox.form);

  typeval = getFormValue(typebox);

  for (var i=0; i < typebox.options.length; i++)
  {
    getElement(typebox.options[i].value).style.display = (typebox.options[i].value==typeval) ? "" : "none";
  }
}

function ClearCalcs (form)
{
  //form.b1.value = form.a2.value = "";
  form.d1.value = form.f1.value = "";
  form.d2.value = form.f2.value = "";
  form.k.value = form.g.value = form.i.value = form.m.value = "";
  form.n.value = form.o.value = form.p.value = form.totval.value = "";
}

function SelectMaterial (form)
{
  console.log('form input is : ', form);
  ClearCalcs(form);
  selindex = form.material.selectedIndex;

  if (form.material.selectedIndex > 0)
  {
    selval = form.material[form.material.selectedIndex].value;
    fillval = selval.substring(0, 1);
    grav = selval.substring(2);
    grav = parseFloat(grav);
    form.filled.value = fillval;

    //if (form.calctype.selectedIndex==1) { form.a2.value = Math.round(grav*100)/100; }
    //else { form.b1.value = Math.round(grav*100)/100; }
    form.a2.value = form.b1.value = Math.round(grav*100)/100;
  }
}

////////////////////////////////////////////////////////////////////////

function RemoveCommas (form)
{
  form.j.value = form.j.value.replace(/,/, "");
  form.thick.value = form.thick.value.replace(/,/, "");
  form.h.value = form.h.value.replace(/,/, "");
  form.a1.value = form.a1.value.replace(/,/, "");
  form.c1.value = form.c1.value.replace(/,/, "");
  form.e1.value = form.e1.value.replace(/,/, "");
  form.b2.value = form.b2.value.replace(/,/, "");
  form.e2.value = form.e2.value.replace(/,/, "");
}

function SelectUnits (form, type)
{
  // Pass 0 for American, 1 for Metric

  if (form.totval.value != "") { ClearCalcs(form); }

  if (type == 1)
  {
    getElement('wtlabel').innerHTML = "(millimeters)";
    getElement('arealabel').innerHTML = "(cm&#178;)";
    getElement('vollabel').innerHTML = "(cm&#179;)";
    getElement('wgtlabel').innerHTML = "(Kg)";
    getElement('costlabel1').innerHTML = "(\$/Kg)";
    getElement('costlabel2').innerHTML = "(\$/Kg)";
    getElement('newweight1').innerHTML = "(Kg)";
    getElement('newweight2').innerHTML = "(Kg)";
  }
  else
  {
    getElement('wtlabel').innerHTML = "(inches)";
    getElement('arealabel').innerHTML = "(in&#178;)";
    getElement('vollabel').innerHTML = "(in&#179;)";
    getElement('wgtlabel').innerHTML = "(lbs)";
    getElement('costlabel1').innerHTML = "(\$/lb)";
    getElement('costlabel2').innerHTML = "(\$/lb)";
    getElement('newweight1').innerHTML = "(lbs)";
    getElement('newweight2').innerHTML = "(lbs)";
  }
}

function ProductFilled (form)
{
  if (form.filled.value == "1") { return 1; }
  else { return 0; }
}

function CycleTime (thick)
{
  if (thick < 0.05) { return 20; }
  else if (thick < 0.1) { return 25; }
  else if (thick < 0.15) { return 45; }
  else if (thick < 0.2) { return 60; }
  else { return 70; }
}

function PressCost (tons)
{
  if (tons < 50) { return 37.28; }
  else if (tons < 100) { return 41.43; }
  else if (tons < 300) { return 47.01; }
  else if (tons < 500) { return 54.88; }
  else if (tons < 750) { return 73.56; }
  else if (tons < 1000) { return 88.47; }
  else if (tons < 1500) { return 107.87; }
  else if (tons < 2000) { return 106.99; }
  else if (tons < 3000) { return 133.37; }
  else { return 169.03; }
}

function ValidFields (form)
{
  if (form.material.selectedIndex < 1) { alert("Please select a Material"); return false; }

  var selected = form.calctype.selectedIndex;
  if (selected == 0)
  {
    if (form.a1.value == "" || isNaN(form.a1.value)) { alert("Please enter the present weight"); return false; }
    //if (form.b1.value == "") { alert("Please enter the Specific Gravity of the New Material"); return false; }
    if (form.c1.value == "" || isNaN(form.c1.value)) { alert("Please enter the Specific Gravity of the Present Material"); return false; }
    if (form.e1.value == "" || isNaN(form.e1.value)) { alert("Please enter the Cost of New Material"); return false; }
  }
  if (selected == 1)
  {
    //if (form.a2.value == "") { alert("Please enter the Specific Gravity of the New Material"); return false; }
    if (form.b2.value == "" || isNaN(form.b2.value)) { alert("Please enter the Specific Gravity of the Present Material"); return false; }
    if (form.e2.value == "" || isNaN(form.e2.value)) { alert("Please enter the Cost of New Material"); return false; }
  }
  if (form.j.value == "" || isNaN(form.j.value)) { alert("Please enter the Annual Number of Parts"); return false; }

  if (form.thick.value == "" || isNaN(form.thick.value)) { alert("Please enter the Wall Thickness"); return false; }
  if (form.h.value == "" || isNaN(form.h.value)) { alert("Please enter the Projected Area of Part"); return false; }
  //if (form.w.value == "") { alert("Please enter the Overhead Contingencies"); return false; }
  if (form.w.selectedIndex < 0) { alert("Please enter the Overhead Contingencies"); return false; }

  if (!form.press[0].checked && !form.press[1].checked)
    { alert("Please enter the Labor Rate"); return false; }
  if (form.press[0].checked && form.pressnum.value == "")
    { alert("Please enter the Labor Rate"); return false; }

  //if ((!form.cav[0].checked && !form.cav[1].checked) || (form.cav[0].checked && form.cavnum.value == ""))
  if ((!form.cav[0].checked && !form.cav[1].checked) || (form.cav[0].checked && getFormValue(form.cavnum)==""))
    { alert("Please enter the Number of Cavities"); return false; }

//   if ((!form.docycletime[0].checked && !form.docycletime[1].checked) || (form.docycletime[1].checked && form.cycletime.value==""))
  if (getFormValue(form.docycletime)=="" || (getFormValue(form.docycletime)=="no" && form.cycletime.value==""))
    { alert("Please enter the Cycle Time"); return false; }

  return true;
}

function doCalc (form)
{
  RemoveCommas(form);
  if (!ValidFields(form)) { return false; }

  var thick = form.thick.value;
  var h = form.h.value;
  var b2 = form.b2.value;
  var a1 = form.a1.value;
  var e1 = form.e1.value;
  var e2 = form.e2.value;
  var sgfactor = 27.7;   // Specific Gravity factor (cubic inches per lb.)

  if (form.unittype[1].checked)
  {
    thick = CmToIn(thick/10);
    h = Cm2ToIn2(h);
    b2 = Cm3ToIn3(b2);
    a1 = KgToLbs(a1);
    e1 = LbsToKg(e1);
    e2 = LbsToKg(e2);
  }

  if (typeval == "newpart")
  {
    var d = (form.a2.value * b2) / sgfactor;
    if (form.unittype[1].checked) {  form.d2.value = Math.round(LbsToKg(d)*100)/100; }
    else { form.d2.value = Math.round(d*100)/100; }
    var f = e2 * d;
    form.f2.value = Math.round(f*100)/100;
  }
  else
  {
    var d = (a1 * form.b1.value) / form.c1.value;
    if (form.unittype[1].checked) {  form.d1.value = Math.round(LbsToKg(d)*100)/100; }
    else { form.d1.value = Math.round(d*100)/100; }
    var f = e1 * d;
    form.f1.value = Math.round(f*100)/100;
  }

  //var g = CycleTime(thick);
  //var g = (form.docycletime[0].checked) ? CycleTime(thick) : form.cycletime.value;
  if (getFormValue(form.docycletime)=="yes")
  {
    var g = CycleTime(thick);
    form.ctestimate.value = g;
  }
  else
  {
    var g = form.cycletime.value
  }
  form.g.value = Math.round(g*100)/100;

  if (ProductFilled(form)) { var i = h * 5; }
  else { var i = h * 4; }
  form.i.value = Math.round(i*100)/100;

  //if (form.cav[0].checked || form.cavnum.value != "") { var k = form.cavnum.value; }
  if (form.cav[0].checked || form.cavnum.value != "") { var k = getFormValue(form.cavnum); }
  else { var k = Math.ceil((form.j.value * g)/Math.pow(10,7)); }
  form.k.value = Math.round(k*100)/100;

  var m = (k/g) * 3600;
  form.m.value = Math.round(m*100)/100;

  //var n = PressCost(i);
  if (form.press[0].checked) { var n = form.pressnum.value; }
  else { var n = PressCost(i); }
  //form.n.value = Math.round(n*100)/100;
  // Mulitply by the number of cavities - 1/23/2009
  //form.n.value = Math.round(n*100)/100 * k;
  //form.n.value = Math.round(n*k*100)/100;
  // Don't multiply by the number of cavities - 3/16/2018
  form.n.value = Math.round(n*100)/100;

  var o = n/m;
  form.o.value = Math.round(o*100)/100;

  //var p = (form.w.value/100) * o;
  //var p = (o + f) * (form.w.value/100);
  var p = (o + f) * (getFormValue(form.w)/100);
  form.p.value = Math.round(p*100)/100;

  var w = form.w.value;
  //var total = f + o + form.w.value;
  //var total = f + o + form.w[form.w.selectedIndex].value;
  //var total = f + o + p + form.w[form.w.selectedIndex].value;
  //var total = (f + o) * (1 + w/100);
  var total = f + o + p;
  total = Math.round(total*100)/100;
  form.totval.value = "$" + total;

  return false;
}

function ResetForm (form)
{
  form.resetme.click();
}

const inchRadio = document.querySelector('#inchRadio');
inchRadio.addEventListener('click', e=> SelectUnits(costForm, 0) )

const mmRadio = document.querySelector('#mmRadio')
mmRadio.addEventListener('click',(e)=>{
  SelectUnits(costForm, 1)
})

const forMe = document.querySelector('#forMe')
forMe.addEventListener('click',e => ClearPress(costForm))

const yesHr = document.querySelector('#yesHr')
yesHr.addEventListener('click', e => ClickPress(costForm))

const fromAnnual = document.querySelector('#fromAnnual');
fromAnnual.addEventListener('click', e=> ClearCavnum(costForm))

const resetThisFo = document.querySelector('#resetThisFo');
resetThisFo.addEventListener('click', e => ResetForm(costForm))

const calculatePart = document.querySelector('#calculatePart');
calculatePart.addEventListener('click', e => {
  e.preventDefault();
  e.stopPropagation();
  doCalc(costForm) 
});

const materialSelected = document.querySelector('#materialSelected');
materialSelected.addEventListener('change', e => SelectMaterial(costForm));

const selectMe = document.querySelector('#selectMe');
selectMe.addEventListener('change', e => SelectType(e.target))


document.getElementById('selectMe').getElementsByTagName('option')[1].selected = 'selected'
SelectType(selectMe)


