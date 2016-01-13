function signInController ($scope, $mdDialog, $log, userService, $localStorage) {

    var userService = userService;
    $scope.login = {
        loading: false,
        password: '',
        user: ''
    };
    $scope.createAccount = function() {
        $scope.login.loading = true;


        // TODO: login call service with a callback
        // TODO: provide hint text saying what password should look like

        var success=true;
        if (success) {
            $log.debug('login successful')

            //TODO adjust page so logged in information is now shown
            createCookie("loggedIn", "false");
            $scope.currentUserLoggedin = true;
            $scope.userName=$scope.signIn.emailAddress
            $mdDialog.hide();

        }
        else {
            $log.debug('login failed');

        }
    }
    $scope.signIn = function () {
        $scope.login.loading = true;


        // TODO: login call service with a callback

        var success=true;
        if (success) {
            $log.debug('login successful')

            //TODO adjust page so logged in information is now shown
            userService.set
            $localStorage.loggedIn = true;
            $scope.currentUserLoggedin = true;
            $mdDialog.hide();
            userService.loggedIn=true;
            userService.userName=signinForm.emailAddress.value

        }
        else {
            $log.debug('login failed');
            //TODO show error message saying invalid credentials
            $scope.currentUserLoggedin = false;
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
};