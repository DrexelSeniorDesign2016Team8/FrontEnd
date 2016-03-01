
function fullRecordController ($scope, items, $mdDialog, $mdToast, $log, userService) {

    $scope.items=items;

    $scope.college=$scope.items;



$scope.hide = function() {
    $mdDialog.hide();
};
$scope.cancel = function() {
    $mdDialog.can
    $scope.removeFavorite = function(collegeId) {
        $scope.results.loading=true;
        userService.removeFavorite(collegeId, function() {
            $scope.showToast("College Unfavorited", "college unfavorited")
            $scope.results.loading=false;
        })
    };
    $scope.showToast = function(message, action) {

        var toast = $mdToast.simple()
            .textContent(message)
            .action('OK')
            .highlightAction(false)
            .position('top right')
        $mdToast.show(toast).then(function (response) {
            if (response == 'ok') {
                $log.debug(action);
                $mdToast.hide();
            }
        });
    };
};
};/**
 * Created by ianshinbro on 2/23/2016.
 */