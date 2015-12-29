app.controller('resetPasswordController', function ($scope, $timeout, $log) {
    $scope.showConfirmation = false;
        $scope.sendEmailResetPassword = function () {
           // sendEmail($scope.resetPassword.emailAddress);
            $scope.showConfirmation = true;
        };
})