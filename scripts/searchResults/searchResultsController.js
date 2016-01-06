app.controller('resultsController', function ($scope, apiCall, $localStorage, $mdSidenav, $log, userService, searchService)
{
    $scope.results = {
        loading: false,
    };
    $scope.results.loading = false;
    $scope.userService = userService;
    fillResults = function() {
        var jsonString = "";
        params = $localStorage.params;
        if (params) {     // if they exist make call

            jsonString = formatSearch(params);
            jsonString = jsonString.replace(/\"/g, "");
            }
            apiCall.setApiDestination("search.php?" + jsonString);

        apiCall.callCollegeSearchAPI($scope.loadResults);


    }

    $scope.autoFillSearch = function() {
        params = searchService.get();
        if (params) {
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
    /*
     This function loads the results
     This reads the cookie containing the search parameters
     It then makes a call to the college search api to retrieve the results
     */
    $scope.loadResults = function(response) {


        var resultsDiv = $("#information");

        $scope.results.loading=false;
        $scope.results.focusLoading=false;
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
            if (searchParameters) {
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

                $log.debug("results pane is closed");

            }
            $mdSidenav('searchBar').close();
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
    $scope.autoFillSearch();
    fillResults();
})