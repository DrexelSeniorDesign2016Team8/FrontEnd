app.controller('headerController' , function($scope, $mdToast, $mdDialog, $mdMedia,authService) {

    $scope.status = '  ';
    $scope.authService = authService;
    $scope.userName = "";
    $scope.isLoggedin=false;
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
                $scope.userName=$scope.authService.getUserName();
                $scope.sessionId=$scope.authService.getSessionId();
                if ($scope.sessionId) {
                    $scope.isLoggedin = true;

                    var toast = $mdToast.simple()
                        .textContent($scope.authService.getUserName() + " successfully logged in")
                        .highlightAction(false)
                        .hideDelay(2000)
                        .position('top right')
                    $mdToast.show(toast).then(function (response) {
                            $mdToast.hide();
                    });
                }
                else {
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