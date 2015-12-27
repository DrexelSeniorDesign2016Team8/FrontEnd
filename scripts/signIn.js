
function signInController($scope, $mdDialog, $log) {

    $scope.login = {
        loading: false,
        password: '',
        user: ''
    };


    $scope.signIn = function () {
        $scope.login.loading = true;


        // TODO: login call service with a callback

        var success=true;
        if (success) {
            $log.debug('login successful')

            //TODO adjust page so logged in information is now shown
            createCookie("loggedIn", "false");
            $scope.currentUserLoggedin = true;
            $mdDialog.hide();

        }
        else {
            $log.debug('login failed');
        }
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
}

function resetPassword() {
    window.location.href="resetPassword.html";
}

function rememberMe() {
    //TODO: implement remember me functionality

}

function createAccount() {

}
function signIn() {

}