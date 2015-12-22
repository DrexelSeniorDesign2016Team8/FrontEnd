/**
 * Created by ianshinbrot on 11/19/15.
 */


var searchResults = {};     // This array contains the search results



var collegeArray = [];


/*
This function will be used when the update button is used in the page
 */
function update() {

    searchOptions();

    constructSearch();
}

/*
This function loads the results
This reads the cookie containing the search parameters
It then makes a call to the college search api to retrieve the results
 */
function loadResults() {


    searchParameters = getCookie("searchParameters");

    //  var url = constructSearch(searchParameters);
    var resultsDiv = $("#information");

    var result = invokeCollegeSearchAPI(searchParameters, null, "GET", function (result) {


        for (var i = 0; i < result.length; i++) {

            addSearchResult(result[i], resultsDiv, i)
        }
        //  });


        if (results.length==0) {
            noResultsAvailable();
        }
        // TODO set up onclicks


    });
}

/*
This function should show a warning that no search results are available and return the user to the previous page
 */
function noResultsAvailable() {

}
/*
This function adds search results to the page
This currently just displays college information
 */
function addSearchResult(collegeItem, resultsDiv, count) {

    var item = document.createElement("DIV");       // the div will be the individual college
    var name;
    var address;
    var website;
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

}