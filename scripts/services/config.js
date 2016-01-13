app.config(function($mdIconProvider) {
    $mdIconProvider
        .defaultIconSet('assets/icon/materialdesignicons.svg')
        .iconSet('large', 'assets/icon/materialdesignicons.svg');
});

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

    app.directive('header', function() {
        addDependency("script", "src", "scripts/signIn/signIn.js");
        addDependency("script", "src", "scripts/signIn/signInController.js");
        addDependency("rel", "stylesheet", "assets/css/header.css");
        return {
            controller: 'headerController',
            templateUrl: 'header.html'

        };
    });
app.config(['$routeProvider', '$locationProvider',
    function($routeProvider,$locationProvider) {
        $routeProvider
            .when('/search', {
                templateUrl: 'searchPage.html',
                controller: 'searchController'
            })
            .when('/results', {
                templateUrl: 'searchResults.html',
                controller: 'searchResultsController'
            })
            .when('/resetPassword', {
                templateUrl: 'resetPassword.html',
                controller: 'resetPasswordController'
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'homeController'
            })
            .otherwise({
                redirectTo: '/searchPage'
            });
    }]);

