app.factory('userService', [function() {
    var user = {
        loggedIn: false,
        username: ''
    };
    return user;
}]);