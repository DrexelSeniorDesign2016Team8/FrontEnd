/**
 * Created by ianshinbrot on 11/19/15.
 */


var searchParameters = {};


function performSearch() {


    if (!checkFields()) {
        return false;
    }
    searchOptions();

    var search = constructSearch();

    createCookie("searchParameters", search);
        window.location.href="searchResults.html";

    return false;
}

function loadResultsPage() {

}

function checkFields() {

    var GPAfield = $("#GPANumber");

    var success;
    searchParameters.GPAvalue = GPAfield.val();
    if (GPAfield.val()=="-?[0-9]*(\.[0-9]+)?") {
        alert("Please check error messages");
        return false;
    }

    var ACTscore = $("#ACTScore");
    var reg = new RegExp("[0-9]{2}")
    success = this.checkRegExp(ACTscore, reg);
    searchParameters.ACTScore = ACTscore.val();

    var mathScore = $("#MathScore");

    var reg = new RegExp("[0-9]{3}")
    success = this.checkRegExp(mathScore, reg);
    searchParameters.MathScore = mathScore.val();

    var readingScore = $("#ReadingScore");

    var reg = new RegExp("[0-9]{3}")
    success = this.checkRegExp(readingScore, reg);
    searchParameters.ReadingScore = readingScore.val();

    var institutionName = $("#InstitutionName");

    searchParameters.name = institutionName.val();

    var writingScore = $("#WritingScore");

    var reg = new RegExp("[0-9]{3}")
    success = this.checkRegExp(writingScore, reg);
    searchParameters.WritingScore = writingScore.val();


    var zipCode = $("#zipCode");

    var reg = new RegExp("[0-9]{5}")
    success = this.checkRegExp(zipCode, reg);
    searchParameters.zipCode = zipCode.val();

    var fullAddress = $("#FullAddress");

    searchParameters.fullAddress = encodeURIComponent(fullAddress.val());

    var studentPopulation = $("#populationtxt");

    searchParameters.studentPopulation = studentPopulation.val();

    var classSize = $("#classSizetxt");

    searchParameters.classSize = classSize.val();


    if (success) {
        return true;
    }
    else return false;
}


function checkRegExp(elem, regExp) {
    if (!regExp.test(elem)) {
        window.id=elem;
        return false;
    }
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

