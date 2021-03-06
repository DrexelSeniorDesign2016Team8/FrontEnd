/**
 * Ian Shinbrot
 */
function fullRecordController ($scope, items, $mdDialog, $mdToast, $log, userService, searchService ) {

    $scope.items = items;
    $scope.college = {};
    $scope.college.name=$scope.items.name;
    $scope.ID = $scope.items.ID;
    $scope.user = {
        loggedIn: false,
        userName: "",
        sessionId: ""
    };
    $scope.results = {
        loading: false,
    };
    $scope.results.loading = false;

    if (userService.isLoggedin()) {
        $scope.user.userName=userService.getUserName();
        $scope.user.loggedIn=true;
        $scope.user.sessionId=userService.getSessionId();
    }

    getResults = function () {
        $scope.results.loading=true;
        $scope.results.focusLoading=true;
        var id = $scope.ID;
        searchService.fullRecordSearch(id, function(response) {
            // success
            $scope.results.loading=false;
            var college = response.response[0];
                if (college.URL && college.address)    // only if website exists
                    college.googleMapsAddress = "http://www.maps.google.com/maps?q=" + ((college.address));
                // determine if college is favorites and make boolean
            $scope.college=college;

            $log.debug("college data retrieved");
        }
        ,function(response) {
            // failure
                $scope.results.loading=false;
                $scope.college=response.response[0];
                $log.debug("failure retrieving results");
        });
    };


    $scope.hide = function () {
        $mdDialog.hide($scope.college);
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
        $scope.addFavorite = function () {
            $scope.results.loading = true;
            var collegeId = $scope.ID;
            userService.setFavorite(collegeId, function () {
                $scope.showToast("College Unfavorited", "college unfavorited");
                //TODO determine based on success
                $scope.college.favorited = true;
                $scope.results.loading = false;
            });
        }
        $scope.removeFavorite = function () {
            $scope.results.loading = true;
            var collegeId = $scope.ID;
            userService.removeFavorite(collegeId, function () {
                $scope.showToast("College Unfavorited", "college unfavorited")
                $scope.results.loading = false;
                //TODO determine based on success
                $scope.college.favorited = false;
            })
        };
    getResults();
};