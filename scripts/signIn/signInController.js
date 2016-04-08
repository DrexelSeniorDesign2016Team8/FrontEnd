function signInController ($scope, $mdDialog, $log, authService) {

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
          authService.createAccount(userInfo, function(response) {
            if (response.status=="error") {
                $log.debug("account  creation failed");
                $scope.login.failed = true;
                $scope.login.message = response.error;
                $scope.login.loading=false;
                success = false;
            }
            else {
                $log.debug("account creation successful");
                createAccountForm.passwordCreateAccount.value = "";
                var success = true;
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

        authService.login(userInfo, (function (response) {
            var success;
            if (response.status == "error") {

                $scope.login.failed = true;
                $scope.login.message = response.error;
                $scope.login.attempts--;
                $scope.login.loading = false;
                success = false;
                signinForm.emailAddressSignIn.value = "";
                signinForm.passwordSignIn.value = "";
                if ($scope.login.attempts == 0) {
                    $mdDialog.hide();
                }
            }
            else if (response.status == "success") {
                success = true;
                $scope.login.failed = false;
            }
            if (success) {
                //TODO adjust page so logged in information is now shown
                $mdDialog.hide(authService);

                if ($scope.signIn.rememberMe == true) {
                    $scope.rememberMe = true;
                }
                else {
                    $scope.rememberMe = false;
                }

            }
            else {
                //TODO show error message saying invalid credentials
                $scope.currentUserLoggedin = false;
                $scope.login.loading = false;
            }

        }));
    };
    $scope.resetPassword = function() {
        window.location.href="resetPassword.html";
    }
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