/**
 * Ian Shinbrot
 * @param $scope - scope of the current application
 * @param $mdDialog
 * @param $log
 * @param authService
 */
function signInController ($scope, $mdDialog, $log, authService) {

    $scope.login = {
        loading: false,
        password: '',
        user: '',
        rememberMe: false,
        failed: '',
        attempts: 3,
    };
    $scope.createAccount = {
        loading: false,
        password: '',
        user: '',
        failed: '',
    }
    $scope.createAccount = function () {
        $scope.createAccount.loading = true;

        createCookie("loggedIn", "false");
        $scope.currentUserLoggedin = true;
        var userInfo = {}
        userInfo.userName = createAccountForm.emailAddressCreateAccount.value;
        userInfo.password = createAccountForm.passwordCreateAccount.value;
        authService.createAccount(userInfo, function () {

                $log.debug("account creation successful");
                createAccountForm.passwordCreateAccount.value = "";
                $scope.createAccount.loading = true;
                $scope.createAccount.failed = false;
                $mdDialog.hide(authService);

            }, (function (response) {
                $log.debug("account  creation failed");
                $scope.createAccount.failed = true;
                $scope.login.message = response.error;
                $scope.createAccount.loading = false;
                createAccountForm.emailAddressCreateAccount.value = "";
                createAccountForm.passwordCreateAccount.value = "";
                createAccountForm.verifyPasswordCreateAccount.value = "";
            })
        )
    };
    $scope.signIn = function () {
        $scope.login.loading = true;
        var userInfo = {};
        userInfo.userName = signinForm.emailAddressSignIn.value;
        userInfo.password = signinForm.passwordSignIn.value;

        authService.login(userInfo, (function() {

                $scope.login.failed = false;
                //TODO adjust page so logged in information is now shown
                $mdDialog.hide(authService);

                if ($scope.signIn.rememberMe == true) {
                    $scope.rememberMe = true;
                }
                else {
                    $scope.rememberMe = false;
                }

            }), function( response) {

                $scope.login.failed = true;
                $scope.login.message = response.error;
                $scope.login.attempts--;
                $scope.login.loading = false;
                signinForm.emailAddressSignIn.value = "";
                signinForm.passwordSignIn.value = "";
                if ($scope.login.attempts == 0) {
                    $mdDialog.hide();
                }

        }
        );
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