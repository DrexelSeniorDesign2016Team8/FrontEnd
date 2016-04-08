app.controller('headerController' , function($scope, $mdDialog, $mdMedia,authService) {

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
            .then(function(answer) {
            $scope.authService=answer;

                    var toast = $mdToast.simple()
                        .textContent($scope.authService.getUserName())
                        .highlightAction(false)
                        .hideDelay(2000)
                        .position('top right')
                    $mdToast.show(toast).then(function (response) {
                        if (response == 'ok') {
                            $log.debug('ok clicked');
                            $mdToast.hide();
                        }
                    });
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