/**
 * Created by ianshinbrot on 11/19/15.
 */

var searchResults = {};     // This array contains the search results


var collegeArray = [];


app.controller('resultsController', function ($scope, apiCall, $http, $timeout, $mdSidenav, $log)
{

    searchParameters = getCookie('searchParameters');
    var jsonString = JSON.stringify(searchParameters);
    jsonString = jsonString.replace(/\"/g, "");

    apiCall.setApiDestination("search.php?"+jsonString);



    var response = apiCall.callCollegeSearchAPI($http, loadResults);
        $scope.toggleSearch = buildToggler('searchBar')
        searchParameters = $scope.searchParameters;
        $scope.isSearchOpen = function () {
            return $mdSidenav('searchBar').isOpen();

        };
        $scope.close = function () {
            return $mdSidenav('searchBar').close()
                //TODO update results page in real time
                .then(function () {
                    $log.debug("results pane is closed");
                });
        };
        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }
})


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
function loadResults(response) {


    var resultsDiv = $("#information");


    for (var i = 0; i < response.length; i++) {

        if (response.length == 0) {
            noResultsAvailable();
        }
        else {
            addSearchResult(response[i], resultsDiv, i)
        }
    }

    // TODO set up onclicks


}

/*
This function should show a warning that no search results are available and return the user to the previous page
 */
function noResultsAvailable() {

    alert("No results available. Returning to previous page");

    window.location.href="searchPage.html"
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