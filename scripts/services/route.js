app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('home', {
            url: '/',

            templateUrl: 'searchPage.html',
            controller: 'searchController',
            data : {
                requireLogin : false
            }
        })
        .state('about', {
            url: '/collegeSearchHelp',
            templateUrl: 'collegeSearchHelp.html',
            controller: 'collegeSearchHelpController.js',
            data : {
                requireLogin : false
            }
        })
        .state('login', {
            url : 'signIn',
            templateUrl: 'signIn.html',
            controller: 'signInController.js',
            authenticate: false,
        })
        .state('preferences' ,{
            url : '/preferences',
            templateUrl: 'userPreferences.html',
            controller: 'userPreferencesController.js',
            authenticate: true,
        })


});