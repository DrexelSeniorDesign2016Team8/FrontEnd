app.factory('authService', function (apiCall, session) {
    var authService = {};

    authService.login = function (credentials) {

        //TODO: determine credentials format
        apiCall.setApiDestination("login/" + credentials);;

        apiCall.callCollegeSearchAPI(function(response) {

            session.create(response.data.id, response.data.user.id, response.data.user.role);
        });
    };

    authService.isAuthenticated = function () {
        return !!session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(session.userRole) !== -1);
    };

    return authService;
});

