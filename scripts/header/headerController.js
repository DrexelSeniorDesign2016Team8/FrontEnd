app.controller('headerController' , function($scope, $mdDialog, $mdMedia,authService, navigationService) {

    $scope.status = '  ';
    $scope.authService = authService;
    $scope.isLoggedin=function() {
        return authService.isLoggedIn();
    };
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
        window.location.href=url;
    }
    $scope.helpPage = function(url) {
        window.location.href=url;
    }
    $scope.userPreferences = function(url) {
       window.location.href=url;
    }

    $scope.logout = function() {
        authService.logout();
    }
});