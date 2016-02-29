//var loggedIn = false;

var app = angular.module( 'CollegeSearch', [ 'ngMaterial', 'ngMessages', 'ngAnimate','ngAria','ngStorage', 'angularUtils.directives.dirPagination']);		// initialize the app for all classes


	app.run(function ($rootScope, userService, navigationService, searchService, apiCall, $localStorage) {

		// first retrieve data from local storage
		var authenticate = userService.restoreLocalStorage();

		var version = $localStorage.version;
		userService.setApiSearch();
		apiCall.setSessionId(userService.sessionId);


		var searchPreferences = userService.getSearchParameters();
		if (version!=".6")
			//$localStorage.$reset();

		navigationService.loadPage();

		// then make a call to verify the authentication key, if not a new one will be created

	});

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