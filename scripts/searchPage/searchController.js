app.controller('searchController', function ($scope, $timeout, $log, searchService, $location) {
    $scope.searchParameters = {};
    $scope.searchService = searchService;
    var stateName = "";
    pageSetup = function() {

        var loggedIn = getCookie("loggedIn");


        if (loggedIn=="true") {

            // remove class for not showing logged in functions
        }
        else {
            // we don't need to modify anything
        }
        deleteCookie("searchParameters");
    }
    $scope.performSearch = function() {
        if (!$scope.CollegeInfo.$valid) {
            //TODO add message saying some values are invalid
        }
        else {
            var searchOptions = $scope.parameter;
            if (searchOptions) {
                if (searchOptions.stateName) {
                    stateName = convert_state($scope.parameter.stateName, "abbrev");
                }
            }
            if (searchOptions) {

                searchService.set(searchOptions);


            }
            window.location.href="searchResults.html";
            $location.path("/results");      // redirect to a new page

            return false;
        }
    };
    pageSetup();
});