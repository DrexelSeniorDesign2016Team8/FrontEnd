app.controller('resetPasswordController', function ($scope, userService, apiCall, $timeout, $log, $mdToast) {
    $scope.showConfirmation = false;
    $scope.userService = userService;
        $scope.sendEmailResetPassword = function () {
            apiCall.setApiDestination("resetPassword?");

            apiCall.callCollegeSearchAPI(function () {

                $scope.showConfirmation();
                // $scope.showConfirmation = true;
            });
        }

    $scope.showConfirmation = function() {

        var toast = $mdToast.simple()
            .textContent('Recovery Email Sent')
            .action('OK')
            .highlightAction(false)
            .position('top right')
        $mdToast.show(toast).then(function (response) {
            if (response == 'ok') {
                $log.debug('ok clicked');
                $mdToast.hide();
            }
        });
    };
});