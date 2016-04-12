app.controller('resetPasswordController', function ($scope, authService, $timeout, $log, $mdToast) {
    $scope.showConfirmation = false;
        $scope.sendEmailResetPassword = function () {
            var emailAddress = $scope.resetPasswordform.emailAddress.$viewValue;

            authService.resetPassword(emailAddress, function(response) {
                // success
                var message = "Rocovery Email Sent";
                showMessage(message);
            },
            function(response) {
                //failure at retrieval

            });
           var message = 'Something went wrong';
                showMessage(message);

        }

    showMessage = function(message) {

        var toast = $mdToast.simple()
            .textContent(message)
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