app.controller('searchController', function ($scope, $timeout, $mdSidenav, $log, userService) {
    $scope.searchParameters = {};
    $scope.userService = userService;
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
            if ($scope.parameter) {
                if ($scope.parameter.stateName) {
                    stateName = convert_state($scope.parameter.stateName, "abbrev");
                }
            }
            if ($scope.parameter) {
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


                params = JSON.stringify(config.params);
                createCookie("searchParameters", params);           // create a cookie with the search parameters
            }
            window.location.href = "searchResults.html";      // redirect to a new page

            return false;
        }
    };
    pageSetup();
});