/*
This controller is used for the search page
TODO move more information over to searchService and away from controller
 */
app.controller('searchController', function ($scope, $mdDialog,$mdMedia, $log, searchService, navigationService, userService) {
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

        $scope.parameter.states = searchService.fillStates();

        $scope.parameter.population = searchService.fillPopulation();

        $scope.parameter.percentages = searchService.fillPercentages();
        $scope.parameter.classSize = searchService.fillClassSize();

        deleteCookie("searchParameters");
    };
    $scope.performSearch = function() {
        if (!$scope.CollegeInfo.$valid) {
            //TODO add message saying some values are invalid
        }
            var searchOptions = $scope.parameter;
            if (searchOptions) {
                if (searchOptions.stateName) {
                    stateName = convert_state($scope.parameter.stateName, "abbrev");
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