
function fullRecordController ($scope, items, $mdDialog, $mdToast, $log, userService) {

    $scope.items=items;

    $scope.college=$scope.items;

$scope.hide = function() {
    $mdDialog.hide();
};
$scope.cancel = function() {
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
    $scope.addFavorite = function(collegeId) {
        $scope.results.loading=true;
        userService.setFavorite(collegeId, function() {
            $scope.showToast("College Unfavorited", "college unfavorited");
            $scope.results.loading=false;
        });
    }
    $scope.removeFavorite = function(collegeId) {
        $scope.results.loading=true;
        userService.removeFavorite(collegeId, function() {
            $scope.showToast("College Unfavorited", "college unfavorited")
            $scope.results.loading=false;
        })
    };
};
};/**
 * Created by ianshinbro on 2/23/2016.
 */