/**
 * Ian Shinbrot
 */
app.controller('changePasswordController', function ($scope, authService, $timeout, $log, $mdToast,navigationService) {
    $scope.showConfirmation = false;
    $scope.page = {};
    $scope.page.Title="Change Password";
    $scope.page.Message="Enter a password below";

    $scope.changePassword = function () {
        var password = changePasswordForm.passwordChangePassword.value;
        var oldPassword = changePasswordForm.oldPassword.value;
        var message = "";
        authService.changePassword(oldPassword, password, function(response) {
                // success
                 message = "Password Successfully changed";
            navigationService.loadPage("searchPage.html");
                showMessage(message);
            },
            function(response) {
                //failure at retrieval
                 message = 'Something went wrong';
            });

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