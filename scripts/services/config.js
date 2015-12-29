app.config(function($mdIconProvider) {
    $mdIconProvider
        .defaultIconSet('assets/icon/materialdesignicons.svg');
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