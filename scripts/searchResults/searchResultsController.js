/**
 * Controller for search results page
 * 100% coded by Ian Shinbrot
 */
app.controller('resultsController', function ($scope, $mdSidenav, $mdDialog, $mdToast, $log, searchService, userService)
{
    $scope.results = {
        loading: false,
    };
    $scope.results.loading = false;
    $scope.pageNumber=1;
    $scope.parameter = {};
    fillResults = function() {
        
        searchService.searchWithPagination($scope.loadResults, $scope.pageNumber, $scope.pageSize);

    };
    pageSizeChange = function(size) {
        $scope.pageSize=size;
        fillResults();
    }
    updatePage = function(pageNumber) {
        $scope.pageNumber=pageNumber;
        fillResults();
    }
loadDropdowns = function() {


    $scope.parameter.states = searchService.fillStates();
    $scope.parameter.population = searchService.fillPercentages();

    $scope.parameter.percentages = searchService.fillPercentages();
    $scope.parameter.population = searchService.fillPopulation();

    $scope.parameter.classSize = searchService.fillClassSize();

    $scope.pageSize=10;
    $scope.parameter.pageSizes = ('10, 20, 50, 100'
    ).split(',').map(function (pageSize) {
        return {pageSize: pageSize};
    });
    $scope.results.loading = true;
    $scope.currentPage=1;

};
    $scope.autoFillSearch = function() {
        params = searchService.get();
        if (params) {
            $scope.parameter = {
                GPAvalue: params.GPAvalue,
                ACTScore: params.ACTScore,
                HighSchoolPercentile: params.highSchoolPercentile,
                MathScore: params.MathScore,
                WritingScore: params.WritingScore,
                ReadingScore: params.ReadingScore,
                stateName: params.stateName,
                InstitutionName: params.InstitutionName,
                zipcode: params.zipCode,
                fullAddress: params.fullAddress,
                acceptanceRate: params.acceptanceRate,
                retentionRate: params.retentionRate,
                institutionType: params.institutionType,
                studentPopulation: params.studentPopulation,
                averageClassSize: params.averageClassSize,
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
            alert("No results available. Please refine results");
            $scope.toggleSearch("CollegeInfo");
        }
        // Put the response in the colleges variable to be used on the html page

        // add the google maps address
       for (var i=0; i<response.length; i++) {
           if (response[i].URL && response[i].address)    // only if website exists
            response[i].googleMapsAddress = "http://www.maps.google.com/maps?q=" +((response[i].address));
           // determine if college is faovirited and make boolean
           if (response[i].favorited=="1") {
               response[i].favorited=true;
           }
           else if (response[i].favorited=="0") {
               response[i].favorited=false;
           }
        }
        // $scope.totalResults=totalResults needs to be implemented for pagination to be proper
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
    $scope.addFavorite = function(instIds, index) {
        $scope.results.loading=true;
        collegeId = instIds;
        userService.setFavorite(collegeId, function() {
            $scope.showToast("College Favorited", "college favorited");
            //TODO determine based on success
            $scope.colleges[index].favorited=true;
            $scope.results.loading=false;
        });
    }
    $scope.removeFavorite = function(instIds,index) {
        $scope.results.loading=true;
        collegeId = instIds;
        userService.removeFavorite(collegeId, function() {
            $scope.showToast("College Unfavorited", "college unfavorited")
            $scope.results.loading=false;
            //TODO determine based on success
            $scope.colleges[index].favorited=false;
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