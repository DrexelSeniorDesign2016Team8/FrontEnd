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

angular
    .module('CollegeSearch', ['ngMaterial'])
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };
        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }
    })
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };
    })
