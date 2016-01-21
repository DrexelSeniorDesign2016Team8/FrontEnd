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

    app.directive('search', function () {


        return {
            templateUrl: 'searchCards.html'
        }
        
    })

app.directive('searchResults', function() {
    return {
        template: "<h2> {{college.name }}</h2>" +
        "<div ng-if='college.image!=undefined'><img src='{{college.image}}.jpg' alt='{{college.name}}'' style='width:200px;height:200px; float:left'></div>" +
        "<div ng-f='college.image==undefined'><label class='collegeLabel' collegeLetter></div>" +
        "<div ng-if='college.address!==undefined'><p>{{college.address}}</p></div>" +
        "<div ng-if='college.address==undefined'> <p>Address unavailable</p></div>" +
        "<div ng-if='college.website!=undefined && college.phoneNumber==undefined'> {college.website}} Number Unavailable</div>" +
        "<div ng-if='college.website==undefined && college.phoneNumber==undefined'>Website unavailable Number Unavailable</div>" +
        "<div ng-if='college.website==undefined && college.phoneNumber!=undefined'>Website unavailable {{college.phoneNumber}}</div>" +
        "<div ng-if='college.phoneNumber!=undefined && college.website!=undefined'> {{college.website}} {{college.phoneNumber}}</div>" +
        "<div ng-if='college.phoneNumber==undefined'><p>Number unavailable</p></div>" +
        "<div ng-if='college.population!==undefined'><p>Students: {{college.population}}</p></div>" +
        "<div ng-if='college.population==undefined'><p>Student count unavailable</p></div>" +
        "<hr>",

        link: function (scope, element, attrs) {
            scope.image = attrs.image
            scope.address = attrs.address

        }
    }
})