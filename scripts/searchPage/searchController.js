/*
This controller is used for the search page
100% coded by  Ian Shinbrot
TODO move more information over to searchService and away from controller
 */
app.controller('searchController', function ($scope, $mdDialog,$mdMedia, $log, searchService, navigationService, userService) {
    $scope.searchService = searchService;
    pageSetup = function () {



        if (loggedIn == "true") {
            //TODO Angular probably lets us delete ths
            // remove class for not showing logged in functions
        }
        else {
            // we don't need to modify anything
        }
        $scope.parameter.stateName = '';

        if (userService.isLoggedin()) {
            userService.getSearchPreferences(function (response) {
                //TODO fix this based on the response
                userService.setSearchPreferences(response);
                // this converts the fields to int
                $scope.parameter = response[0];
                $scope.parameter.states = searchService.fillStates();

                if (response.length != 0) {
                    $scope.parameter.stateName = response[0].stateName;
                    searchService.set(response[0])
                }

            });
        };
        $scope.parameter.states = searchService.fillStates();
        $scope.parameter.population = searchService.fillPercentages();

        $scope.parameter.percentages = searchService.fillPercentages();
        $scope.parameter.population = searchService.fillPopulation();

        $scope.parameter.classSize = searchService.fillClassSize();
        deleteCookie("searchParameters");
    };

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
                   "<input ng-model='gpa.number' style='width:100px'>"+
                        "</md-input-container>" +
                       "<md-input-container>" +
            "<md-select ng-model='gpa.gpaOutof' placeholder='Out of' style='float:right'>" +
            "<md-option value='3'>3</md-option>"+
            "<md-option value='4'>4</md-option>"+
            "<md-option value='5'>5</md-option>"+
            "<md-option value='6'>6</md-option>"+
            "<md-option value='100'>100</md-option>" +
        "</md-select></md-input-container><br>" +
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
                        gpa: gpa
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