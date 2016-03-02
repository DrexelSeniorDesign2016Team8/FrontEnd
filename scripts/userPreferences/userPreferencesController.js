/*
This is the controller for the preferences screen
The delete content dialog is generated here
 */
app.controller('userPreferencesController', function ($scope, $mdDialog, $log, userService, $mdToast,navigationService) {
    $scope.userService = userService;
   var searchService = userService.getSearchService();
    $scope.deleteConfirmation = function (ev) {

        options = {};

        options.title = "Are you sure you want to delete your account?";

        options.text = "Account information cannot be recovered after account deletion.?";

        options.confirm = "YES, DELETE MY ACCOUNT";

        options.cancel = "CANCEL";

        options.onconfirm = deleteAccount;

        $scope.showDialog(ev, options);
    };

    $scope.emailFavorites = function (ev) {
        options = {};

        options.title = "Email Favorite Institutions";
        options.text = "An email will be sent to " + userService.getUserName();

        options.confirm = "EMAIL";

        options.cancel = "CANCEL";

        options.onconfirm = emailFavorites;

        $scope.showDialog(ev, options);
    }
    $scope.saveConfirm = function () {

        //TODO make toast message
        var options = {};

        options.title = "Save Preferences";
        options.text = "Preferences Saved";
        options.confirm="OK";

        options.onClick = savePreferences;

        $scope.showToast(options);
    };

    $scope.UndoChanges = function () {
        //Revert Changes
        var params = userService.getSearchParameters();
        if (params) {
            $scope.parameter = {
                gpa: params.GPAvalue,
                actcomposite: params.ACTScore,
                HighSchoolPercentile: params.highSchoolPercentile,
                mathscore: params.MathScore,
                WritingScore: params.WritingScore,
                ReadingScore: params.ReadingScore,
                stateName: params.StateName,
                InstitutionName: params.name,
                zipcode: params.zipCode,
                fullAddress: params.fullAddress,
                acceptanceRate: params.acceptanceRate,
                retentionRate: params.retentionRate,
                institutionType: params.institutionType,
                studentPopulation: params.studentPopulation,
                classSize: params.classSize,
                commonApplication: params.CommonApplication,
                favoritedInstitutions: params.favoritedInstitutions,
            };
        }
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
            $scope.status = 'You decided to get rid of your debt.';
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

    userService.deleteAccount();
    }
    function emailFavorites() {
        userService.emailFavorites();
    }

    function savePreferences() {
        userService.set(searchService.get());
    }
    onPageLoad = function() {
       var params= userService.getSearchPreferences();
        //TODO fix this based on the response
        userService.setSearchPreferences(params);
        userService.setSearchPreferences();
        $scope.parameter.states = searchService.fillStates();
        $scope.parameter.population = searchService.fillPercentages();

        $scope.parameter.percentages = searchService.fillPercentages();
        $scope.parameter.studentPopulation = searchService.fillPopulation();
        $scope.parameter.population = searchService.fillPopulation();


        $scope.parameter.classSize = searchService.fillClassSize();
    }

    $scope.cancel = function () {
        $mdDialog.hide();
    }
    onPageLoad();

});




