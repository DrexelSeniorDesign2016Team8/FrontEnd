app.controller('headerController' , function($scope, $mdToast, $mdDialog, $mdMedia, navigationService, authService) {

    $scope.status = '  ';
    $scope.user = {
        loggedIn: false,
        userName: "",
        sessionId: ""
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
                $scope.user.userName=authService.getUserName();
                $scope.user.sessionId=authService.getSessionId();
                if ($scope.user.sessionId) {
                    $scope.user.loggedIn=true;

                    var toast = $mdToast.simple()
                        .textContent($scope.user.userName+ " successfully logged in")
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
    $scope.changePassword = function(url) {
        navigationService.leavePage(url);
    }
    $scope.searchResults = function(url) {
        navigationService.leavePage(url);
    }



    $scope.logout = function() {
        authService.logout();
        $scope.user.loggedIn=false;
        $scope.user.userName="";
        var toast = $mdToast.simple()
            .textContent("Successfully logged out. Redirecting to home page")
            .highlightAction(false)
            .hideDelay(2000)
            .position('top right')
        $mdToast.show(toast).then(function (response) {
            $mdToast.hide();
        });
        navigationService.leavePage('searchPage.html');
    };
    var isLoggedIn = function() {
        if (authService.getUserName()!=null) {
            $scope.user.userName=authService.getUserName();
            $scope.user.sessionId=authService.getSessionId();
            if ($scope.user.sessionId) {
                $scope.user.loggedIn=true;
            }
        }
    }
    isLoggedIn();
});