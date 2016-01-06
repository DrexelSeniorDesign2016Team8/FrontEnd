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

/* something like that for checking if logged in
angular
    .module('app', ['ngRoute', 'ngCookies'])
    .config(config)
    .run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'home/home.view.html',
            controllerAs: 'vm'
        })

        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'login/login.view.html',
            controllerAs: 'vm'
        })

        .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'register/register.view.html',
            controllerAs: 'vm'
        })

        .otherwise({ redirectTo: '/login' });
}

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
}

})();

    */