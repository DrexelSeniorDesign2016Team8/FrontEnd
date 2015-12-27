/**
 * Created by ianshinbrot on 11/19/15.
 */

var searchResults = {};     // This array contains the search results


var collegeArray = [];


app.controller('resultsController', function ($scope, apiCall, $http, $timeout, $mdSidenav, $log)
{

    fillResults = function() {
        searchParameters = getCookie('searchParameters');
        params = JSON.parse(searchParameters);

        jsonString = formatSearch(params);
        jsonString = jsonString.replace(/\"/g, "");
        apiCall.setApiDestination("search.php?"+jsonString);
        apiCall.callCollegeSearchAPI($http, loadResults);

    }


        $scope.toggleSearch = buildToggler('searchBar')
        searchParameters = $scope.searchParameters;
        $scope.isSearchOpen = function () {
            return $mdSidenav('searchBar').isOpen();

        };
        $scope.close = function () {
            if (!$scope.CollegeInfo.$valid) {
                //TODO don't close since fields are invalid
            }
            else {
                $mdSidenav('searchBar').close()
                var config = {
                    params: {
                        // Put required values here
                        'GPAvalue': $scope.parameter.gpa,
                        'ACTScore': $scope.parameter.actcomposite,
                        'highSchoolPercentile': $scope.parameter.HighSchoolPercentile,
                        'MathScore': $scope.parameter.mathscore,
                        'WritingScore': $scope.parameter.WritingScore,
                        'ReadingScore': $scope.parameter.ReadingScore,
                        'StateName': $scope.parameter.stateName,
                        'name': $scope.parameter.InstitutionName,
                        'zipCode': $scope.parameter.zipcode,
                        'fullAddress': $scope.parameter.fullAddress,
                        'acceptanceRate': $scope.parameter.acceptanceRate,
                        'retentionRate': $scope.parameter.retentionRate,
                        'institutionType': $scope.parameter.institutionType,
                        'studentPopulation': $scope.parameter.studentPopulation,
                        'classSize': $scope.parameter.classSize,
                        'CommonApplicaiton': $scope.parameter.commonApplication,
                        'favoritedInstitutions': $scope.parameter.favoritedInstitutions
                    },
                };
                parameters = formatSearch(config.params);
                createCookie("searchParameters", parameters);           // create a cookie with the search parameters

                $mdSidenav('searchBar').close();
                $log.debug("results pane is closed");
                fillResults();
            }
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
    fillResults();
})

/*
 This function formats the search depending on the values that are filled in and not
 */
function formatSearch(searchParameters) {

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