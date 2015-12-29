app.controller('resultsController', function ($scope, apiCall, $http, $timeout, $mdSidenav, $log)
{
    $scope.results = {
        loading: false,
    };
    $scope.results.loading = false;
    fillResults = function(loading) {
        searchParameters = getCookie('searchParameters');
        if (searchParameters) {     // if they exist make call
            params = JSON.parse(searchParameters);

            jsonString = formatSearch(params);
            jsonString = jsonString.replace(/\"/g, "");
            apiCall.setApiDestination("search.php?" + jsonString);
            apiCall.callCollegeSearchAPI($http, loading, loadResults);

        }
    }

    $scope.autoFillSearch = function() {
        searchParameters = getCookie('searchParameters');
        if (searchParameters) {
            params = JSON.parse(searchParameters);
            $scope.parameter = {
                gpa: params.GPAvalue,
                actcomposite: params.ACTScore,
                HighSchoolPercentile: params.highSchoolPercentile,
                mathscore: params.MathScore,
                WritingScore: params.WritingScore,
                ReadingScore: params.ReadingScore,
                stateName: params.StateName,
                InstitutionName: params.name,
                zipcode: params.zipCode,
                fullAddress: params.fullAddress,
                acceptanceRate: params.acceptanceRate,
                retentionRate: params.retentionRate,
                institutionType: params.institutionType,
                studentPopulation: params.studentPopulation,
                classSize: params.classSize,
                commonApplication: params.CommonApplication,
                favoritedInstitutions: params.favoritedInstitutions,
            }
        }
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
            $scope.results.loading = true;
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
            fillResults($scope.CollegeInfo);
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
    $scope.autoFillSearch();
    fillResults();
})