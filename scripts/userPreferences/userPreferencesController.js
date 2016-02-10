app.controller('userPreferencesController', function ($scope, $mdDialog,$mdMedia, $log, userService, searchService) {
    $scope.userService = userService;

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $scope.deleteConfirmation = function(ev) {

        var dialogContent = " <md-toolbar>" +
            "<div class='md-toolbar-tools'>"+
            "<h2>Delete Account</h2>"+
            "<span flex></span>"+
            "<md-button class='md-icon-button' ng-click='close()'>"+
            "<md-icon md-svg-icon='close-box' aria-label='Close dialog'></md-icon>"+
            "</md-button>"+
            "</div>"+
            "</md-toolbar>"+
            "<md-content layout-wrap>" +
            "<center><md-button ng-click='delete()' style='float:right'>Are you Sure?</md-button></center>"+

            "</md-content>";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
                controller: deleteController,
                template: dialogContent,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            })
            .then(function() {

            }, function() {


            });
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };

    $scope.savePreferences = function(ev) {
        searchCriteria = $scope.parameter;
        userService.updatePreferences();
        //TODO call api to update user preferences
    };

});

function deleteController ($scope, $mdDialog, apiCall, navigationService, userService) {


    $scope.close = function() {
        $mdDialog.hide();
    };
    $scope.confirm = function(answer) {

        apiCall.setApiDestination("deleteAccount");

//TODO add redirect after deleting account
        apiCall.callCollegeSearchAPI(  navigationService.leavePage("searchResults.html"));

        userService.deleteAccount();
        $mdDialog.hide(answer);
    };

};