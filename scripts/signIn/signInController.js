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

        if (createAccountform.fullName.length>55) {
            //TODO Error Message
        }
        // TODO: login call service with a callback
        // TODO: provide hint text saying what password should look like

        var success=true;
        if (success) {
            $log.debug('login successful')

            //TODO adjust page so logged in information is now shown
            createCookie("loggedIn", "false");
            $scope.currentUserLoggedin = true;
            $scope.userName=createAccountform.emailAddress.value
            userService.setfullName(createAccountform.fullName.value);
            var createAccountUrl =  userService.generateCreateAccountUrl();
            var result = apiCall.setApiDestination(createAccountUrl);

            if (result.error) {

            }
            $mdDialog.hide();

            apiCall.setApiDestination()
        }
        else {
            $log.debug('login failed');

        }
    }
    $scope.signIn = function () {
        $scope.login.loading = true;
        var userInfo = {};
        userInfo.userName = signinForm.emailAddress.value;
        userInfo.password = signinForm.password.value;

        var destination = userService.generatesignInUrl(userInfo);

        var results = apiCall.setApiDestination(destination)

        // TODO: login call service with a callback
        apiCall.callCollegeSearchAPI(function (response) {
    var success;
            if (response.status=="error") {

                $scope.login.failed = true;
                $scope.login.message = response.error;
                $scope.login.attempts--;
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

                userService.setUserName(signinForm.emailAddress.value);
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