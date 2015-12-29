app.controller('headerController', function($scope, $mdDialog, $mdMedia) {
    $scope.status = '  ';
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $scope.showLoginPage = function(ev) {

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
                controller: signInController,
                templateUrl: 'signIn.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            })
            .then(function() {
            }, function() {
            });
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
});