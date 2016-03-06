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
        options.text = "An email will be sent to the email address on file.";;

        options.confirm = "EMAIL";

        options.cancel = "CANCEL";

        options.onconfirm = sendEmail();

        $scope.showDialog(ev, options);
    }
    $scope.saveConfirm = function () {

        //TODO make toast message
        var options = {};

        options.title = "Save Preferences";
        options.text = "Preferences Saved";
        options.confirm="OK";
        var params = $scope.parameter;
        if (params.zipcode) {
            params.zipCode = params.zipcode;
        }
        if (params.gpa) {
            params.GPAvalue = params.gpa;
        }
        if (params.actcomposite) {
            params.ACTScore = params.actcomposite;
        }
        searchService.saveForFormat(params);
        savePreferences(function() {

            $scope.showToast(options);
        });
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
    function sendEmail() {
        userService.emailFavorites(function() {
            options.text = "Favorites sent";
            options.confirm = "Ok";
        });
    }

    function savePreferences(callback) {

        userService.saveSearchPreferences(callback);
    }
    onPageLoad = function() {
        userService.getSearchPreferences(function(response) {
            //TODO fix this based on the response
            userService.setSearchPreferences(response);
            if (response.length!=0) {
                if (response[0].MathScore)
                    response[0].MathScore = parseInt(response[0].MathScore);
                if (response[0].ReadingScore)
                    response[0].ReadingScore = parseInt(response[0].ReadingScore)
                if (response[0].WritingScore)
                    response[0].WritingScore = parseInt(response[0].WritingScore);
                if (response[0].GPAvalue)
                    response[0].gpa = parseFloat(response[0].GPAvalue);
                if (response[0].zipCode)
                    response[0].zipcode = response[0].zipCode;
                if (response[0].ACTScore) {
                    response[0].actcomposite = parseInt(response[0].ACTScore);
                }
                if (response[0].stateName) {
                    response[0].stateName = convert_state(response[0].stateName, "name")
                }
                $scope.parameter = response[0];
            }
            $scope.parameter.states = searchService.fillStates();
            if (response.length!=0)
            $scope.parameter.stateName=response[0].stateName;
            searchService.set(response[0])
        });


    }

    $scope.cancel = function () {
        $mdDialog.hide();
    }
    onPageLoad();

});




