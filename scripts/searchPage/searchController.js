/*
This controller is used for the search page
Ian Shinbrot
 */
app.controller('searchController', function ($scope, $mdDialog,$mdMedia, $log, searchService, navigationService, userService) {
    $scope.searchService = searchService;
    $scope.user = {};
    $scope.user.loggedIn = false;
    pageSetup = function () {
        $scope.parameter.stateName = '';

        if (userService.isLoggedin()) {
            userService.getSearchPreferences(function (response) {
                //TODO fix this based on the response

                userService.setSearchPreferences(response);
                // this converts the fields to int
                if (response.length != 0) {
                    $scope.parameter = response[0];
                }
                else
            {
                $scope.parameter = {};
            }
                $scope.parameter.states = searchService.fillStates();
                $scope.parameter.states = searchService.fillStates();
                $scope.parameter.population = searchService.fillPercentages();

                $scope.parameter.percentages = searchService.fillPercentages();
                $scope.parameter.population = searchService.fillPopulation();

                $scope.parameter.classSize = searchService.fillClassSize();
                $scope.user.loggedIn=true;

            });
        }
        else {
            $scope.parameter.states = searchService.fillStates();
            $scope.parameter.population = searchService.fillPercentages();

            $scope.parameter.percentages = searchService.fillPercentages();
            $scope.parameter.population = searchService.fillPopulation();

            $scope.parameter.classSize = searchService.fillClassSize();
        }
        deleteCookie("searchParameters");
    };

    $scope.clearParameters = function() {
        $scope.parameter = {};
        $scope.parameter.states = searchService.fillStates();
        $scope.parameter.population = searchService.fillPercentages();

        $scope.parameter.percentages = searchService.fillPercentages();
        $scope.parameter.population = searchService.fillPopulation();

        $scope.parameter.classSize = searchService.fillClassSize();
    }
    $scope.performSearch = function() {
        if (!$scope.CollegeInfo.$valid) {
            //TODO add message saying some values are invalid
        }
            var searchOptions = $scope.parameter;
            if (searchOptions) {
                if (searchOptions.stateName && searchOptions.stateName!="None") {
                    stateName = convert_state($scope.parameter.stateName, "abbrev");
                }
                    // If none is selected make the value an empty string
                else if (searchOptions.stateName=="None") {
                    searchOptions.stateName="";
                }
                if (searchOptions.averageClassSize=="None") {
                    searchOptions.averageClassSize=="";
                }
                if (searchOptions.retentionRate=="None") {
                    searchOptions.retentionRate=="";
                }
                if (searchOptions.acceptanceRate=="None") {
                    searchOptions.acceptanceRate=="";
                }
                if (searchOptions.studentPopulation=="None") {
                    searchOptions.studentPopulation=="";
                }
                if (searchOptions.institutionType=="None") {
                    searchOptions.institutionType=="";
                }
                if (searchOptions.highSchoolPercentile=="None") {
                    searchOptions.highSchoolPercentile=="";
                }
            }
            if (searchOptions) {

                searchService.set(searchOptions);

            }
            navigationService.leavePage("searchResults.html");

            return false;
    };

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    /*
    Build the convertGPA dialog
     */
    $scope.convertGPA = function(ev) {

        var dialogContent = " <md-toolbar>" +
            "<div class='md-toolbar-tools'>"+
            "<h2>GPA Conversion</h2>"+
        "<span flex></span>"+
        "<md-button class='md-icon-button' ng-click='close()'>"+
            "<md-icon md-svg-icon='close-box' aria-label='Close dialog'></md-icon>"+
            "</md-button>"+
            "</div>"+
            "</md-toolbar>"+
            "<md-content layout-wrap>" +
                "<md-input-container> <label>GPA Scale</label>" +
                   "<input type='number' ng-model='gpa.number' style='width:100px'>"+
                        "</md-input-container>" +

                       "<md-input-container>" +
                "<label>Out of</label>" +

            "<input type='number' ng-model='gpa.gpaOutof' style='width:100px'>" +
        "</md-input-container><br>" +
                "example 10 out of 20" +
            "<md-button ng-click='submit()' style='float:right'>Submit</md-button>"+

            "</md-content>";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
                controller: gpaController,
                template: dialogContent,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            })
            .then(function() {
                var gpa = searchService.getGPA();
                params = searchService.get();
                if (gpa) {
                    $scope.parameter = {
                        GPAvalue: gpa
                    }
                }
            }, function() {

            });
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };


    pageSetup();
});