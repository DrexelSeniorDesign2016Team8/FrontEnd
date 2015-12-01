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

    var search = constructSearch();

    createCookie("searchParameters", search);
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

    searchParameters.classSize = classSize.val();

    if (!searchParameters.HighSchoolPercentile) {
        searchParameters.HighSchoolPercentile="";
    }

    if (!searchParameters.AcceptanceRate) {
        searchParameters.AcceptanceRate="";
    }
    if (!searchParameters.StateName) {
        searchParameters.StateName="";
    }
    if (!searchParameters.retentionRate) {
        searchParameters.retentionRate="";
    }
    }
    if (!searchParameters.institutionType) {
        searchParameters.institutionType="";

}
function constructSearch() {
    // usually just a get request so a simple GET is fine

    var dataType = "GET";


    var url = "search.php?"; // construct the url

    var jsonString = JSON.stringify(searchParameters);

    /*jsonString = jsonString.replace(/\"\:\"/g,"=");
    jsonString = jsonString.replace(/\"\"\"\"/g,"");

    jsonString = jsonString.replace("{","");
    jsonString = jsonString.replace("}","");

    url = url + jsonString;
    */
    url +=formatSearch();

    alert("The request to be called is " + url);

    return url;
}

function formatSearch() {

    var parameters="";
    parameters+="GPAvalue="+searchParameters.GPAvalue+"&";
    parameters+="ACTScore="+searchParameters.ACTScore+"&";
    parameters+="HighSchoolPercentile="+searchParameters.HighSchoolPercentile+"&";
    parameters+="MathScore="+searchParameters.MathScore+"&";
    parameters+="ReadingScore="+searchParameters.ReadingScore+"&";
    parameters+="WritingScore="+searchParameters.WritingScore+"&";
    parameters+="name="+searchParameters.name+"&";
    parameters+="StateName="+searchParameters.StateName+"&";
    parameters+="zipCode="+searchParameters.zipCode+"&";


    parameters+="fullAddress="+searchParameters.fullAddress+"&";
    parameters+="AcceptanceRate="+searchParameters.AcceptanceRate+"&";
    parameters+="retentionRate="+searchParameters.retentionRate+"&";
    parameters+="institutionType="+searchParameters.institutionType+"&";
    parameters+="studentPopulation="+searchParameters.studentPopulation+"&";
    parameters+="classSize="+searchParameters.classSize;

    return parameters;

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

    var state = this.convert_state(target.textContent, "abbrev")

    alert("Clicked " + state);

    searchParameters.StateName = state;
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

function convert_state(name, to) {
    var name = name.toUpperCase();
    var states = new Array(                         {'name':'Alabama', 'abbrev':'AL'},          {'name':'Alaska', 'abbrev':'AK'},
        {'name':'Arizona', 'abbrev':'AZ'},          {'name':'Arkansas', 'abbrev':'AR'},         {'name':'California', 'abbrev':'CA'},
        {'name':'Colorado', 'abbrev':'CO'},         {'name':'Connecticut', 'abbrev':'CT'},      {'name':'Delaware', 'abbrev':'DE'},
        {'name':'Florida', 'abbrev':'FL'},          {'name':'Georgia', 'abbrev':'GA'},          {'name':'Hawaii', 'abbrev':'HI'},
        {'name':'Idaho', 'abbrev':'ID'},            {'name':'Illinois', 'abbrev':'IL'},         {'name':'Indiana', 'abbrev':'IN'},
        {'name':'Iowa', 'abbrev':'IA'},             {'name':'Kansas', 'abbrev':'KS'},           {'name':'Kentucky', 'abbrev':'KY'},
        {'name':'Louisiana', 'abbrev':'LA'},        {'name':'Maine', 'abbrev':'ME'},            {'name':'Maryland', 'abbrev':'MD'},
        {'name':'Massachusetts', 'abbrev':'MA'},    {'name':'Michigan', 'abbrev':'MI'},         {'name':'Minnesota', 'abbrev':'MN'},
        {'name':'Mississippi', 'abbrev':'MS'},      {'name':'Missouri', 'abbrev':'MO'},         {'name':'Montana', 'abbrev':'MT'},
        {'name':'Nebraska', 'abbrev':'NE'},         {'name':'Nevada', 'abbrev':'NV'},           {'name':'New Hampshire', 'abbrev':'NH'},
        {'name':'New Jersey', 'abbrev':'NJ'},       {'name':'New Mexico', 'abbrev':'NM'},       {'name':'New York', 'abbrev':'NY'},
        {'name':'North Carolina', 'abbrev':'NC'},   {'name':'North Dakota', 'abbrev':'ND'},     {'name':'Ohio', 'abbrev':'OH'},
        {'name':'Oklahoma', 'abbrev':'OK'},         {'name':'Oregon', 'abbrev':'OR'},           {'name':'Pennsylvania', 'abbrev':'PA'},
        {'name':'Rhode Island', 'abbrev':'RI'},     {'name':'South Carolina', 'abbrev':'SC'},   {'name':'South Dakota', 'abbrev':'SD'},
        {'name':'Tennessee', 'abbrev':'TN'},        {'name':'Texas', 'abbrev':'TX'},            {'name':'Utah', 'abbrev':'UT'},
        {'name':'Vermont', 'abbrev':'VT'},          {'name':'Virginia', 'abbrev':'VA'},         {'name':'Washington', 'abbrev':'WA'},
        {'name':'West Virginia', 'abbrev':'WV'},    {'name':'Wisconsin', 'abbrev':'WI'},        {'name':'Wyoming', 'abbrev':'WY'}
    );
    var returnthis = false;
    $.each(states, function(index, value){
        if (to == 'name') {
            if (value.abbrev == name){
                returnthis = value.name;
                return false;
            }
        } else if (to == 'abbrev') {
            if (value.name.toUpperCase() == name){
                returnthis = value.abbrev;
                return false;
            }
        }
    });
    return returnthis;
}

