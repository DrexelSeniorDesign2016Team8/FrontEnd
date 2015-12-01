/**
 * Created by ianshinbrot on 11/19/15.
 */


var searchResults = {};



var collegeArray = [];



function update() {

    searchOptions();

    constructSearch();
}

function loadResults() {


    searchParameters = getCookie("searchParameters");

    //  var url = constructSearch(searchParameters);
    var resultsDiv = $("#information");

    var result = invokeCollegeSearchAPI(searchParameters, null, "GET", function (result) {
        ;
        college = {}

        college.name = "Drexel University";

        college.phoneNumber = "555-555-5555";

        college.population = "25000";

        college.address = "3141 Chestnut Street Philadelphia 19104";

        //  invokeCollegeSearchAPI(url, null, "GET", function(result) {

        //result = [];

        result.push(college);
        for (var i = 0; i < result.length; i++) {

            addSearchResult(result[i], resultsDiv, i)
        }
        //  });

        // TODO set up onclicks

        // var hspercentileBtn = $("#hspercentileBtn");
        //  var percentiledropDown = $("#percentiles");
        //  var hslist = $("#hspercentileList");            // the ul list
        //  hspercentileBtn.click(function() {
        //       var button = this;
        //      togglePercentile(button, percentiledropDown, hslist);
        //   });

    });
}

function addSearchResult(collegeItem, resultsDiv, count) {

    var item = document.createElement("DIV");       // the div will be the individual college
    var name;
    var address;
    var website
    var phoneNumber;
    var population;
    item.id=count;
    if (collegeItem.name) {
        name = collegeItem.name;
    }
    else {
        name="Name Unavailable";
    }

    if (collegeItem.address) {
        address = collegeItem.address;
    }
    else {
        address = "Address Unavailable";
    }

    if (collegeItem.webSite) {
        website = collegeItem.webSite;
    }
    else {
        website = "Website Unavailable";
    }
    if (collegeItem.phoneNumber) {
        phoneNumber = collegeItem.phoneNumber;
    }
    else {
        phoneNumber= "PhoneNumber Unavailable"
    }
    if (collegeItem.population) {
         population = collegeItem.population;
    }
    else {
        population = "Population Unavailable";
    }


    var html = "<h3>" + name + " </h3>";

    html = html + "<br>";

    html = html + address;

    html = html + "<br>";

    html = html + website;

    html = html + "  ";

    html = html + phoneNumber;

    html = html + "<br>";

    html = html + "Students: " + population;


    html = html + "<hr>";
    $(item).append(html);

    resultsDiv.append(item);


   // {name: Drexel University, phoneNumber: 555-555-5555, population: 25,000, address: 3141 Chestnut, Philadelphia, 19104

}

function searchOptions() {
    // Get all options from HTML fields and save them to a variable

    searchParameters = getCookie(searchParameters);

    var searchParameters = JSON.parse(searchParameters);

    collegeName

    var collegeName = $("#collegeName");

    searchParameters.name = institutionName.val();

}
function constructSearch(searchParameters) {
    // usually just a get request so a simple GET is fine

    var dataType = "GET";


    var url = "www.searchCollege.me/Search/"; // consturct the url

    var jsonString = JSON.stringify(searchParameters);

    jsonString = jsonString.replace(/\"\:\"/g,"=");

    jsonString = jsonString.replace("{","");
    jsonString = jsonString.replace("}","");

    url = url + jsonString;

    alert("The request to be called is " + url);
}
function saveHighSchoolPercentile() {
    var e = event || window.event

    var target = e.target;

    alert("Clicked" + target.textContent);


    searchParameters.HighSchoolPercentile = target.textContent;
}

function saveAcceptanceRate() {
    var e = event || window.event;

    var target = e.target;

    alert("Clicked " + target.textContent);

    searchParameters.AcceptanceRate = target.textContent;
}

function saveRetentionRate() {
    var e = event || window.event;

    var target = e.target;

    alert("Clicked " + target.textContent);

    searchParameters.retentionRate = target.textContent;
}

function saveType() {
    var e = event || window.event;

    var target = e.target;

    alert("Clicked " + target.textContent);

    searchParameters.institutionType = target.textContent;
}