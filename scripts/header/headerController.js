app.controller('headerController' , function($scope, $mdToast, $mdDialog, $mdMedia,authService) {

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
            .then(function(answer) {
            $scope.authService=answer;
                $scope.userName=$scope.authService.getUserName();
                $scope.sessionId=$scope.authService.getSessionId();
                if ($scope.sessionId) {
                    $scope.user.loggedIn=true;

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
        $scope.user.loggedIn=false;
        $scope.userName="";
    }
});