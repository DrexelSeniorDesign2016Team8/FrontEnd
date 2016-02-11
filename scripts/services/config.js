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
            templateUrl: 'searchCards.html'
        }
        
    })

