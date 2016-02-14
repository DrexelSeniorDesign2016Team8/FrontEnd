app.controller('resultsController', function ($scope, $mdSidenav, $log, searchService)
{
    $scope.results = {
        loading: false,
    };
    $scope.results.loading = false;
    fillResults = function() {

        searchService.search($scope.loadResults);


       // $scope.loadResults();

    };
loadDropdowns = function() {
    $scope.parameter.stateName = '';

    $scope.parameter.states = ('None,' + 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,' +
        'Florida Georgia, Hawaii, Idaho, Illinois Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland,' +
        'Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire,' +
        'New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania,' +
        'Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington,' +
        'West Virginia, Wisconsin, Wyoming,'
    ).split(',').map(function (state) {
        return {fullName: state};
    });


    $scope.parameter.percentages = ('None,' + '10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%'
    ).split(',').map(function (percentage) {
        return {percentage: percentage};
    });
    $scope.parameter.filterOptions = ('Best Match,'
    ).split(',').map(function (filterOption) {
        return {filterOption: filterOption};
    });
    $scope.pageSize=10;
    $scope.parameter.pageSizes = ('5, 10, 15, 20'
    ).split(',').map(function (pageSize) {
        return {pageSize: pageSize};
    });

    $scope.currentPage=1;

};
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
    };
    /*
     This function loads the results
     This reads the cookie containing the search parameters
     It then makes a call to the college search api to retrieve the results
     */
    $scope.loadResults = function(response) {

        $scope.results.loading=false;
        $scope.results.focusLoading=false;

        if (response.length==0) {
            noResultsAvailable();
        }
        // Put the response in the colleges variable to be used on the html page
        $scope.colleges=response;

        // TODO set up onclicks

    };


    $scope.toggleSearch = buildToggler('searchBar');
    searchParameters = $scope.searchParameters;
    $scope.isSearchOpen = function () {
        return $mdSidenav('searchBar').isOpen();

    };
    /*
    Close the toggle bar and perform a search
     */
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
    loadDropdowns();
    fillResults();
});