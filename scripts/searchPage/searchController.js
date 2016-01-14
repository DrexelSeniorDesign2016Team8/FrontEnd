app.controller('searchController', function ($scope, $timeout, $log, searchService, $location) {
    $scope.searchParameters = {};
    $scope.searchService = searchService;
    pageSetup = function () {

        var loggedIn = getCookie("loggedIn");


        if (loggedIn == "true") {
            //TODO Angular probably lets us delete ths
            // remove class for not showing logged in functions
        }
        else {
            // we don't need to modify anything
        }
        $scope.parameter.stateName = '';

        $scope.parameter.states = ('None,' + 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,' +
            'Florida Georgia, Hawaii, Idaho, Illinois Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland,' +
            'Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire,' +
            'New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania,' +
            'Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington,' +
            'West Virginia, Wisconsin, Wyoming,'
        ).split(',').map(function (state) { return { fullName: state }; });


        $scope.parameter.percentages = ('None,' + '10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%'
        ).split(',').map(function (percentage) { return { percentage: percentage }; });

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

            return false;
        }
    };
    pageSetup();




});