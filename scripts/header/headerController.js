app.controller('headerController' , function($scope, $mdDialog, $mdMedia,userService, navigationService) {

    $scope.status = '  ';
    $scope.userService = userService;
    $scope.showLoginPage = function(ev) {

        $mdDialog.show({
                controller: signInController,
                templateUrl: 'signIn.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            })
            .then(function() {
            }, function() {
            });

    };

    $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    $scope.logoClick = function(url) {
        navigationService.leavePage(url);
    }
    $scope.userPreferences = function(url) {
        navigationService.leavePage(url);
    }

    $scope.logout = function() {
        userService.logout();
    }
});