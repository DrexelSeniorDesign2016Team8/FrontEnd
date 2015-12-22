/**
 * Created by ianshinbrot on 11/19/15.
 */


var searchParameters = {};

/*
This performs search on the page
 */
function performSearch() {


    if (!checkFields()) {       // This checks the fields on the page
        return false;
    }
    searchOptions();

    var search = constructSearch();

    createCookie("searchParameters", search);           // create a cookie with the search parameters
        window.location.href="searchResults.html";      // redirect to a new page

    return false;
}

function pageSetup() {

    deleteAllCookies();
}
/*
This function checks each field against a regular expression
Another function performs the actual logic
Returns true or false if one field is invalid
 */
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

/*
This function checks an element against a regular expression
If the field is blank it returns true
If the value contains text that follows the regular expression it returns true, else false
 */
function checkRegExp(elem, regExp) {

    if (!elem.text()=="") {
        if (!regExp.test(elem.text())) {
            window.id = elem;
            return false;
        }
    }
    return true;
}

function openHSPercentileMenu() {
    var e = event.target;

    var location = e.getBoundingClientRect();

    var top = location.top;
    var right = location.right;
    var left = location.left;
    var bottom = location.bottom;

 var percentileDiv = $("#percentiles");


    percentileDiv.show();


}
/*
This function is pending further completion
The menu is displayed incorrectly so this will relocate the div
 */
function displayPercentileMenu(el,list) {


  //  var x = button.offsetLeft - button.scrollLeft;
  // var y = button.offsetTop - button.scrollTop;
    //el = button.offsetParent;




    //el.css("top",y);
   // el.css("left",x);

    list.append(percentileDiv);
    percentileDiv.css("display", "block");
    list.show();
    //TODO relocate div element and add show or hide
}
/*
 This function is pending further completion
 The menu is displayed incorrectly so this will relocate the div
 */
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


/*
This function gets all the searchOptions and saves them to a json object
 */
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
/*
This function contructs the search parameters
 */
function constructSearch() {
    // usually just a get request so a simple GET is fine

    var dataType = "GET";


    var url = "search.php?"; // construct the url

    var jsonString = JSON.stringify(searchParameters);

    url +=formatSearch();


    return url;
}

/*
This function formats the search depending on the values that are filled in and not
 */
function formatSearch() {

    var parameters="";
    if (searchParameters.GPAvalue) {
        parameters += "GPAvalue=" + searchParameters.GPAvalue + "&";
    }
    if (searchParameters.ACTScore) {
        parameters += "ACTScore=" + searchParameters.ACTScore + "&";
    }
    if (searchParameters.HighSchoolPercentile) {
        parameters += "HighSchoolPercentile=" + searchParameters.HighSchoolPercentile + "&";
    }
    if (searchParameters.MathScore) {
        parameters += "MathScore=" + searchParameters.MathScore + "&";
    }
    if (searchParameters.ReadingScore) {
        parameters += "ReadingScore=" + searchParameters.ReadingScore + "&";
    }
    if (searchParameters.WritingScore) {
        parameters += "WritingScore=" + searchParameters.WritingScore + "&";
    }
    if (searchParameters.name) {
        parameters += "name=" + searchParameters.name + "&";
    }
    if (searchParameters.StateName) {
        parameters += "stateName=" + searchParameters.StateName + "&";
    }
    if (searchParameters.zipCode) {
        parameters += "zipCode=" + searchParameters.zipCode + "&";
    }
    if (searchParameters.fullAddress) {
        parameters += "fullAddress=" + searchParameters.fullAddress + "&";
    }
    if (searchParameters.AcceptanceRate) {
        parameters += "AcceptanceRate=" + searchParameters.AcceptanceRate + "&";
    }
    if (searchParameters.retentionRate) {
        parameters += "retentionRate=" + searchParameters.retentionRate + "&";
    }
    if (searchParameters.institutionType) {
        parameters += "institutionType=" + searchParameters.institutionType + "&";
    }
    if (searchParameters.studentPopulation) {
        parameters += "studentPopulation=" + searchParameters.studentPopulation + "&";
    }
    if (searchParameters.classSize) {
        parameters += "classSize=" + searchParameters.classSize;
    }

    return parameters;

}
/*
This function saves the high school percentile object to the json object
 */
function saveHighSchoolPercentile() {
    var e = event || window.event

    var target = e.target;

    //alert("Clicked" + target.textContent.replace("%",""));


    searchParameters.HighSchoolPercentile = target.textContent.replace("%","");
}
/*
 This function saves the acceptance rate object to the json object
 */
function saveAcceptanceRate() {
    var e = event || window.event;

    var target = e.target;

   // alert("Clicked " + target.textContent.replace("%",""));

    searchParameters.AcceptanceRate = target.textContent.replace("%","");
}
/*
 This function saves the state name object to the json object
 */
function saveStateName() {
    var e = event || window.event;

    var target = e.target;

    var state = this.convert_state(target.textContent, "abbrev")

  //  alert("Clicked " + state);

    searchParameters.StateName = state;
}

/*
 This function saves the retention rate object to the json object
 */
function saveRetentionRate() {
    var e = event || window.event;

    var target = e.target;

   // alert("Clicked " + target.textContent.replace("%",""));

    searchParameters.retentionRate = target.textContent.replace("%","");
}
/*
 This function saves the college type to the json object
 */
function saveType() {
    var e = event || window.event;

    var target = e.target;

  //  alert("Clicked " + target.textContent);

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

