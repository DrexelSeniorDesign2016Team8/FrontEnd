//var loggedIn = false;

var app = angular.module( 'CollegeSearch', [ 'ngMaterial', 'ngMessages', 'ngStorage', 'ngRoute'] );		// initialize the app for all classes

app.constant('USER_ROLES', {
	all: '*',
	admin: 'admin',
	editor: 'editor',
	guest: 'guest'

});


app.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
});



	app.factory('AuthInterceptor', function ($rootScope, $q,
											 AUTH_EVENTS) {
		return {
			responseError: function (response) {
				$rootScope.$broadcast({
					401: AUTH_EVENTS.notAuthenticated,
					403: AUTH_EVENTS.notAuthorized,
					419: AUTH_EVENTS.sessionTimeout,
					440: AUTH_EVENTS.sessionTimeout
				}[response.status], response);
				return $q.reject(response);
			}
		};
	})

/* modify this so it works with authService
	app.run(function ($rootScope, AUTH_EVENTS, authService) {
		$rootScope.$on('$stateChangeStart', function (event, next) {
			var authorizedRoles = next.data.authorizedRoles;
			if (!authService.isAuthorized(authorizedRoles)) {
				event.preventDefault();
				if (authService.isAuthenticated()) {
					// user is not allowed
					$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
				} else {
					// user is not logged in
					$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
				}
			}
		});
	});
	*/
	/*
	 This function retrieves a cookie based on a name
	 */
	function getCookie(name) {
		var regexp = new RegExp("(?:^" + name + "|;\s*" + name + ")=(.*?)(?:;|$)", "g");
		var result = regexp.exec(document.cookie);
		return (result === null) ? null : result[1];
	}

	/*
	 This function creates a cookie with a name and value taken as arguments
	 */
	function createCookie(name, value) {
		document.cookie = name + "=" + value;
	}

	function deleteAllCookies() {
		var cookies = document.cookie.split(";");

		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			var eqPos = cookie.indexOf("=");
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	}

	function deleteCookie(name) {
		var regexp = new RegExp("(?:^" + name + "|;\s*" + name + ")=(.*?)(?:;|$)", "g");
		var result = regexp.exec(document.cookie);
		document.cookie = result + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}

	function addDependency(type, attr, location) {

		var fileref = document.createElement(type);

		fileref.setAttribute(attr, location);

		document.getElementsByTagName("head")[0].appendChild(fileref);
	}