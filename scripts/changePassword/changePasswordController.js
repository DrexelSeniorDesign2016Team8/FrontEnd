/**
 * Ian Shinbrot
 */
app.controller('changePasswordController', function ($scope, authService, $timeout, $log, $mdToast) {
    $scope.showConfirmation = false;
    $scope.page = {};
    $scope.page.Title="Change Password";
    $scope.page.Message="Enter a password below";
    var password = changePasswordForm.passwordChangePassword.$viewValue;
    $scope.changePassword = function () {

        authService.changePassword(password, function(response) {
                // success
                var message = "Password Successfully changed";
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