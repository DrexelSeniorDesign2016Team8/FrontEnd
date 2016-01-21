app.controller('headerController' , function($scope, $mdDialog, $mdMedia,userService, navigationService) {

    $scope.status = '  ';
    $scope.userService = userService;
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $scope.showLoginPage = function(ev) {

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
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
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
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