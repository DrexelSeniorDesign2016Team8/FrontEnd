/**
 * Created by ianshinbro on 2/23/2016.
 */
function fullRecordController ($scope, items, $mdDialog, $mdToast, $log, userService, apiCall) {

    $scope.items = items;

    $scope.ID = $scope.items.instID;

    getResults = function () {
        apiCall.setApiDestination("getInstDetails.php");
        apiCall.callCollegeSearchAPI(function () {
            $log.debug("college data retrieved");
        });
    };


    $scope.hide = function () {
        $mdDialog.hide();
    };
        $scope.removeFavorite = function (collegeId) {
            $scope.results.loading = true;
            userService.removeFavorite(collegeId, function () {
                $scope.showToast("College Unfavorited", "college unfavorited")
                $scope.results.loading = false;
            })
        };
        $scope.showToast = function (message, action) {

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
        $scope.addFavorite = function (instIds, index) {
            $scope.results.loading = true;
            collegeId = instIds;
            userService.setFavorite(collegeId, function () {
                $scope.showToast("College Unfavorited", "college unfavorited");
                //TODO determine based on success
                $scope.colleges[index].favorited = true;
                $scope.results.loading = false;
            });
        }
        $scope.removeFavorite = function (instIds, index) {
            $scope.results.loading = true;
            collegeId = instIds;
            userService.removeFavorite(collegeId, function () {
                $scope.showToast("College Unfavorited", "college unfavorited")
                $scope.results.loading = false;
                //TODO determine based on success
                $scope.colleges[index].favorited = false;
            })
        };
    getResults();
};