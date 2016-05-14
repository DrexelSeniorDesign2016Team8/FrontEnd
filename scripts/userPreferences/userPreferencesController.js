/*
This is the controller for the preferences screen
The delete content dialog is generated here
100% coded by Ian Shinbrot
 */
app.controller('userPreferencesController', function ($scope, $mdDialog, $log, userService, authService, $mdToast,navigationService) {
    $scope.userService = userService;
    $scope.pageTitle="User Preferences Page";
    $scope.parameter = {
        favoritesAvailable: false,
    };

    if (authService.isLoggedin()) {
        // stay on page
    }
    else {
        var message = "Not logged in. Redirecting to home page";
        showMessage(message);
        navigationService.loadPage('searchPage.html')
    }

    
    var searchService = userService.getSearchService();
    $scope.deleteConfirmation = function (ev) {

        options = {};

        options.title = "Are you sure you want to delete your account?";

        options.text = "Account information cannot be recovered after account deletion.";

        options.confirm = "YES, DELETE MY ACCOUNT";

        options.cancel = "CANCEL";

        options.onconfirm = deleteAccount;

        $scope.showDialog(ev, options);
    };

    $scope.emailFavorites = function (ev) {
        options = {};

        options.title = "Email Favorite Institutions";
        options.text = "An email will be sent to the email address on file.";;

        options.confirm = "EMAIL";

        options.cancel = "CANCEL";

        options.onconfirm = sendEmail;

        $scope.showDialog(ev, options);
    }
    $scope.saveConfirm = function () {

        var options = {};

        options.title = "Save Preferences";
        options.text = "Preferences Saved";
        options.confirm="OK";
        var params = $scope.parameter;

        searchService.set(params);
        savePreferences(function() {

            $scope.showToast(options);
        });
    };

    $scope.UndoChanges = function () {
        //Revert Changes
         $scope.parameter = userService.getSearchParameters();

        var options = {}
            options.text = "Preferences reverted";
        options.confirm = "Ok";
        $scope.showToast(options);

    };
    $scope.showToast = function(toastOptions) {

        var toast = $mdToast.simple()
            .textContent(toastOptions.text)
            .action(toastOptions.confirm)
            .highlightAction(false)
            .position('bottom right')
        $mdToast.show(toast).then(function (response) {
            if (response == 'ok') {
                $log.debug('ok clicked');
                $mdToast.hide();
            }
        });
    };
    $scope.showDialog = function (ev, dialogOptions) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title(dialogOptions.title)
            .textContent(dialogOptions.text)
            .targetEvent(ev)
            .ok(dialogOptions.confirm)
            .cancel(dialogOptions.cancel);
        $mdDialog.show(confirm).then(function () {
            dialogOptions.onconfirm();
        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
    };
    $scope.getFavorites = function()
    {
        userService.searchFavorites();
        navigationService.leavePage("searchResults.html");
    }
    function deleteAccount() {

        authService.deleteAccount(function () {
            navigationService.leavePage("searchPage.html");
        });
    }
    function sendEmail() {
        userService.emailFavorites(function() {
            options.text = "Favorites sent";
            options.confirm = "Ok";
        });
    }

    function savePreferences(callback) {

        userService.saveSearchPreferences(callback);
    }
    var onPageLoad = function() {
        userService.getSearchPreferences(function(response) {
            //TODO fix this based on the response
            userService.setSearchPreferences(response);
            if (response.length!=0) {
                $scope.parameter = response[0];
            }
            $scope.parameter.states = searchService.fillStates();
            if (response.length!=0) {
                $scope.parameter.stateName = response[0].stateName;
                searchService.set(response[0])
            }
            userService.determineFavoriteCount(function(favoritesShow) {

                if (favoritesShow == 1) {
                    // don't disable buttons
                    $scope.parameter.favoritesAvailable = false;
                }
                else if (favoritesShow == 0) {
                    // disable button
                    $scope.parameter.favoritesAvailable = true;
                }
            });
        });

    };

    $scope.cancel = function () {
        $mdDialog.hide();
    }

    onPageLoad();
});