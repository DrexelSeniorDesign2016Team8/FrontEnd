app.config(function($mdIconProvider) {
    $mdIconProvider
        .defaultIconSet('assets/icon/materialdesignicons.svg')
        .iconSet('large', 'assets/icon/materialdesignicons.svg');
});
/**
 * This directive shows focus on specific html elements
 * Used for showing the loading screen
 */
app.directive('showFocus', function($timeout) {
    return function(scope, element, attrs) {
        scope.$watch(attrs.showFocus,
            function (newValue) {
                $timeout(function() {
                    newValue && element.focus();
                });
            },true);
    };
});

/**
 * This loads the header scripts and javascript pages
 */
app.directive('header', function() {
        addDependency("script", "src", "scripts/signIn/signIn.js");
        addDependency("script", "src", "scripts/signIn/signInController.js");
        addDependency("rel", "stylesheet", "assets/css/header.css");
        return {
            controller: 'headerController',
            templateUrl: 'header.html'

        };
    });

    app.directive('search', function () {
        return {
            templateUrl: 'fullSearch.html'
        }
        
    });

    app.directive('searchPreferences' ,function() {
        return {
            templateUrl: 'searchPreferences.html'
        }
    });
app.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("match", n);
            });
        }
    };
}]);