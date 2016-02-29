app.controller('resultsController', function ($scope, $mdSidenav, $mdDialog, $mdToast, $log, searchService, userService)
{
    $scope.results = {
        loading: false,
    };
    $scope.results.loading = false;
    $scope.parameter = {};
    fillResults = function() {

        searchService.search($scope.loadResults);

    };
loadDropdowns = function() {


    $scope.parameter.states = searchService.fillStates();

    $scope.parameter.percentages = searchService.fillPercentages();
    $scope.parameter.filterOptions = ('Best Match,'
    ).split(',').map(function (filterOption) {
        return {filterOption: filterOption};
    });
    $scope.pageSize=10;
    $scope.parameter.pageSizes = ('10, 20, 50, 100'
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

        // add the google maps address
       for (var i=0; i<response.length; i++) {
           if (response[i].URL && response[i].address)    // only if website exists
            response[i].googleMapsAddress = "http://www.maps.google.com/maps?q=" +((response[i].address));
        }

        $scope.colleges=response;

    };

    $scope.toggleSearch = buildToggler('searchBar');
    searchParameters = $scope.parameter;
    $scope.isSearchOpen = function () {
        return $mdSidenav('searchBar').isOpen();

    };
    $scope.openMoreInfo = function(ev, college) {


        $mdDialog.show({
                controller: fullRecordController,
                templateUrl: 'fullRecord.html',
                parent: angular.element(document.body),
                targetEvent: ev,
            locals: {
                items: ev,
            },
                clickOutsideToClose:true,

            })
            .then(function() {
            }, function() {
            });
    };
    $scope.openMenu = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
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
            searchParameters = $scope.parameter;


            searchService.set(searchParameters);
            $log.debug("results pane is closed");

        }
        searchService.search($scope.loadResults);
        $mdSidenav('searchBar').close();

    };
    $scope.addFavorite = function(collegeId) {
        $scope.results.loading=true;
        userService.setFavorite(collegeId, function() {
            $scope.showToast("College Unfavorited", "college unfavorited");
            $scope.results.loading=false;
        });
    }
    $scope.RemoveFavorite = function(collegeId) {
        $scope.results.loading=true;
        userService.removeFavorite(collegeId, function() {
            $scope.showToast("College Unfavorited", "college unfavorited")
            $scope.results.loading=false;
        })
    };
    $scope.showToast = function(message, action) {

        var toast = $mdToast.simple()
            .textContent(message)
            .action('OK')
            .highlightAction(false)
            .position('top right')
        $mdToast.show(toast).then(function (response) {
            if (response == 'ok') {
                $log.debug(action);
                $mdToast.hide();
            }
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
    $scope.autoFillSearch();
    loadDropdowns();
    fillResults();
});