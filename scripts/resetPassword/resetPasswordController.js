app.controller('resetPasswordController', function ($scope, userService, $timeout, $log, $mdToast) {
    $scope.showConfirmation = false;
    $scope.userService = userService;
        $scope.sendEmailResetPassword = function () {
           // sendEmail($scope.resetPassword.emailAddress);

            $scope.showConfirmation();
           // $scope.showConfirmation = true;
        };

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