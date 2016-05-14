/**
 * Ian Shinbrot
 */
app.controller('changePasswordController', function ($scope, authService, $timeout, $log, $mdToast,navigationService) {
    $scope.showConfirmation = false;
    $scope.page = {};
    $scope.page.Title = "Change Password";
    $scope.page.Message = "Enter a password below";

    if (authService.isLoggedin()) {
        // stay on page
    }
    else {
        var message = "Not logged in. Redirecting to home page";
        showMessage(message);
        navigationService.loadPage('searchPage.html')
    }

    $scope.changePassword = function () {
        var password = changePasswordForm.passwordChangePassword.value;
        var oldPassword = changePasswordForm.oldPassword.value;
        var message = "";
        authService.changePassword(oldPassword, password, function(response) {
                // success
                 message = "Password Successfully changed";
                showMessage(message);
            navigationService.loadPage("searchPage.html");

            },
            function(response) {
                //failure at retrieval
                 message = 'Old password is incorrect';
                showMessage(message);
            });



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