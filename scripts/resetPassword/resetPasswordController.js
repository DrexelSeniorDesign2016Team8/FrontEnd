app.controller('resetPasswordController', function ($scope, userService, $timeout, $log) {
    $scope.showConfirmation = false;
    $scope.userService = userService;
        $scope.sendEmailResetPassword = function () {
           // sendEmail($scope.resetPassword.emailAddress);
            $scope.showConfirmation = true;
        };
});