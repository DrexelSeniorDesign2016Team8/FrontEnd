app.config(function ($routeProvider) {


    $routeProvider
        .when('/', {
            templateUrl: 'searchPage.html',
            controller: searchController
        })

        .when('/searchResults.html', {
            templateUrl: 'searchResults.html',
            controller: searchResultsController

        })
        .when('/userPreferences.html', {
        templateUrl: userPreferencesController,
    })
});