/**
 * Created by ianshinbrot on 11/19/15.
 */


var searchParameters = {};







function createButton(label, type, errorMessage, id, pattern, fortext) {



    // create input element
    var input = document.createElement("INPUT");

    input.setAttribute("type","text");
    input.setAttribute("pattern", pattern)
    input.addClass("mdl-textfield mdl-js-textfield");
    input.id=id;

    var errorMsg = document.createElement("SPAN");

    var label = document.createElement("label");
    label.setAttribute("for", fortext);

    errorMsg.addClass("mdl-textfield__label");
    errorMsg.text=errorMessage;
}

function GPASearch() {

    var type = text;
    var pattern = "-?[0-9]*(\.[0-9]+)?";
    var id="GPANumber";

    var errorMsg="Input is not a number!"
    var forId="textLabelGPA";
    var labelTxt = "GPA (Out of 4.0)";
}

function performSearch() {

    searchOptions();

    constructSearch();

    createCookie("searchParameters", searchParameters);
        window.location.href="searchResults.html"

}

function loadResultsPage() {

}
function createhighSchooldropdown() {

    var dropdown = $("#hspercentiles");


    var percentiles = $("#percentiles");

    var ul = document.createElement('UL');

    ul.setAttribute('class', 'mdl-menu mdl-js-menu mdl-js-ripple-effect');
    ul.setAttribute("for", "hspercentiles");
    var options = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];

  /*  percentiles.children().each( function(index, value) {

        // add each item to the list
        var li = document.createElement('LI');
        li.setAttribute('class', 'mdl-menu__item');
        li.innerHTML = options[index];
        li.button = dropdown;
        //li.onclick = onSelect;
        ul.appendChild(li);
    });
*/

    dropdown.append(ul);


}


function displayPercentileMenu(el,list) {


  //  var x = button.offsetLeft - button.scrollLeft;
  // var y = button.offsetTop - button.scrollTop;
    //el = button.offsetParent;

    var percentileDiv = $("#percentileOptions");


    //el.css("top",y);
   // el.css("left",x);

    list.append(percentileDiv);
    percentileDiv.css("display", "block");
    list.show();
    //TODO relocate div element and add show or hide
}

function togglePercentile(element, list) {

    element = $(element);
    list = $(list);
    if (element.is(":visible")) {
        element.hide();
    }
    else {
        displayPercentileMenu(element, list);
    }

}

function pageSetup() {
    // TODO set up onclicks

   // var hspercentileBtn = $("#hspercentileBtn");
  //  var percentiledropDown = $("#percentiles");
  //  var hslist = $("#hspercentileList");            // the ul list
  //  hspercentileBtn.click(function() {
 //       var button = this;
  //      togglePercentile(button, percentiledropDown, hslist);
 //   });


}

function searchOptions() {
    // Get all options from HTML fields and save them to a variable


    var GPAfield = $("#GPANumber");

    searchParameters.GPAvalue = GPAfield.val();

    var ACTscore = $("#ACTScore");

    searchParameters.ACTScore = ACTscore.val();

    var mathScore = $("#MathScore");

    searchParameters.MathScore = mathScore.val();

    var readingScore = $("#ReadingScore");

    searchParameters.ReadingScore = readingScore.val();

    var institutionName = $("#InstitutionName");

    searchParameters.name = institutionName.val();

    var writingScore = $("#WritingScore");

    searchParameters.WritingScore = writingScore.val();


    var zipCode = $("#zipCode");

    searchParameters.zipCode = zipCode.val();

    var fullAddress = $("#FullAddress");

    searchParameters.fullAddress = encodeURIComponent(fullAddress.val());

    var studentPopulation = $("#populationtxt");

    searchParameters.studentPopulation = studentPopulation.val();

    var classSize = $("#classSizetxt");

    searchParameters.clasSize = classSize.val();

}
function constructSearch() {
    // usually just a get request so a simple GET is fine

    var dataType = "GET";


    var url = "search.php?"; // construct the url

    var jsonString = JSON.stringify(searchParameters);

    jsonString = jsonString.replace(/\"\:\"/g,"=");

    jsonString = jsonString.replace("{","");
    jsonString = jsonString.replace("}","");

    url = url + jsonString;

    alert("The request to be called is " + url);

    return url;
}
function saveHighSchoolPercentile() {
    var e = event || window.event

    var target = e.target;

    alert("Clicked" + target.textContent.replace("%",""));


    searchParameters.HighSchoolPercentile = target.textContent.replace("%","");
}

function saveAcceptanceRate() {
    var e = event || window.event;

    var target = e.target;

    alert("Clicked " + target.textContent.replace("%",""));

    searchParameters.AcceptanceRate = target.textContent.replace("%","");
}

function saveStateName() {
    var e = event || window.event;

    var target = e.target;

    alert("Clicked " + target.textContent.replace("%",""));

    searchParameters.StateName = target.textContent.replace("%","");
}

function saveRetentionRate() {
    var e = event || window.event;

    var target = e.target;

    alert("Clicked " + target.textContent.replace("%",""));

    searchParameters.retentionRate = target.textContent.replace("%","");
}

function saveType() {
    var e = event || window.event;

    var target = e.target;

    alert("Clicked " + target.textContent);

    searchParameters.institutionType = target.textContent.replace("%","");
}

