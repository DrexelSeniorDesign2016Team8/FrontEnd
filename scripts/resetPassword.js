/**
 * Created by ianshinbrot on 11/18/15.
 */



app.controller('resetPasswordController', function ($scope, $timeout, $log) {
    $scope.showConfirmation = false;
        $scope.sendEmailResetPassword = function () {
           // sendEmail($scope.resetPassword.emailAddress);
            $scope.showConfirmation = true;
        };
});


function sendEmail(emailAddress) {
    //TODO Send API call to send a password to an email address
    alert("This to be implemented in the future for" + emailAddress);
}



