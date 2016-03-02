function signInController ($scope, $mdDialog, $log, userService, apiCall) {

    var userService = userService;
    $scope.login = {
        loading: false,
        password: '',
        user: '',
        rememberMe: false,
        failed: '',
        attempts: 3,

    };
    $scope.createAccount = function() {
        $scope.login.loading = true;

            createCookie("loggedIn", "false");
            $scope.currentUserLoggedin = true;
            var userInfo = {}
                userInfo.userName =createAccountForm.emailAddressCreateAccount.value;
                userInfo.password = createAccountForm.passwordCreateAccount.value;
        var parameters = userService.generateCreateAccountParameters(userInfo)
            var createAccountUrl =  userService.getCreateAccountURL();
            apiCall.setApiDestination(createAccountUrl);
             apiCall.setParameters(parameters);
        apiCall.callCollegeSearchAPI(function(response) {
            if (response.status=="error") {
                $log.debug("account  creation failed");
                $scope.login.failed = true;
                $scope.login.message = response.error;
                $scope.login.loading=false;
                userService.setLoggedIn(false);
                success = false;
            }
            else {
                $log.debug("account creation successful");

                var success = true;
                userService.setUserName(response.response.email);
                userService.setEmailAddress(response.response.email);
                userService.setLoggedIn(true);
                $scope.login.loading=true;
                $mdDialog.hide();
            }
        })


    }
    $scope.signIn = function () {
        $scope.login.loading = true;
        var userInfo = {};
        userInfo.userName = signinForm.emailAddressSignIn.value;
        userInfo.password = signinForm.passwordSignIn.value;

        var url = userService.getSignInURL();
        var destination = userService.generateSignInUParameters(userInfo);
        apiCall.setApiDestination(url);
        apiCall.setParameters(destination)

        // TODO: login call service with a callback
        apiCall.callCollegeSearchAPI(function (response) {
    var success;
            if (response.status=="error") {

                $scope.login.failed = true;
                $scope.login.message = response.error;
                $scope.login.attempts--;
                $scope.login.loading=false;
                success = false;
                if ($scope.login.attempts==0) {
                    $mdDialog.hide();
                }
            }
            else if (response.status=="success"){
                success=true;
                $scope.login.failed=false;
            }
            if (success) {
                if (response && response.SessionID) {
                    userService.setSessionId(results.SessionID);
                }
                //TODO adjust page so logged in information is now shown
                $mdDialog.hide();
                userService.setLoggedIn(true);

                userService.setUserName(signinForm.emailAddressSignIn.value);
                if ($scope.signIn.rememberMe == true) {
                    $scope.rememberMe = true;
                }
                else {
                    $scope.rememberMe = false;
                }
                userService.setRememberMe($scope.rememberMe);

            }
            else
                {
                    //TODO show error message saying invalid credentials
                    $scope.currentUserLoggedin = false;
                    $scope.login.loading=false;
                }
        });
    };
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

};