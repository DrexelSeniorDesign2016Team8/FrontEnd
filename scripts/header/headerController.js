app.controller('headerController' , function($scope, $mdToast, $mdDialog, $mdMedia, navigationService) {

    $scope.status = '  ';
    $scope.authService = authService;
    $scope.user = {
        loggedIn: false,
    };

    $scope.userName = "";
    $scope.showLoginPage = function(ev) {

        $mdDialog.show({
                controller: signInController,
                templateUrl: 'signIn.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            })
            .then(function(authService) {
                $scope.userName=authService.getUserName();
                $scope.sessionId=authService.getSessionId();
                if ($scope.sessionId) {
                    $scope.user.loggedIn=true;

                    var toast = $mdToast.simple()
                        .textContent($scope.userName+ " successfully logged in")
                        .highlightAction(false)
                        .hideDelay(2000)
                        .position('top right')
                    $mdToast.show(toast).then(function (response) {
                            $mdToast.hide();
                    });
                }
                else {
                    $scope.user.loggedIn=false;
                    var toast = $mdToast.simple()
                        .textContent("Error logging in")
                        .highlightAction(false)
                        .hideDelay(2000)
                        .position('top right')
                    $mdToast.show(toast).then(function (response) {
                            $mdToast.hide();
                    });
                }
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
    $scope.helpPage = function(url) {
        navigationService.leavePage(url);
    }
    $scope.userPreferences = function(url) {
        navigationService.leavePage(url);
    }

    $scope.logout = function() {
        authService.logout();
        $scope.user.loggedIn=false;
        $scope.userName="";
        var toast = $mdToast.simple()
            .textContent("Successfully logged out")
            .highlightAction(false)
            .hideDelay(2000)
            .position('top right')
        $mdToast.show(toast).then(function (response) {
            $mdToast.hide();
        });
    }
});