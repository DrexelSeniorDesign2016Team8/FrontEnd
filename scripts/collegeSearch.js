//var loggedIn = false;

var app = angular.module( 'CollegeSearch', [ 'ngMaterial', 'ngMessages'] );		// initialize the app for all classes

app.config(function($mdIconProvider) {
	$mdIconProvider
		.defaultIconSet('icon/materialIcons.svg');
});
app.controller('headerController', function($scope, $mdDialog, $mdMedia) {
	$scope.status = '  ';
	var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
	$scope.showLoginPage = function(ev) {

		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
				controller: signInController,
				templateUrl: 'signIn.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: useFullScreen,
			})
			.then(function() {
			}, function() {
			});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	};
});
app.factory('searchService', function() {
	var searchOptions = {}
	function set(data) {
		searchOptions = data;
	}
	function get() {
		return savedData;
	}

	return {
		set: set,
		get: get
	}

});

app.factory('apiCall', function() {

	var endPoint = "http://mid.searchcollege.me";
	var method = "";
	var apiCall = '';
	var finalUrl = "";
	var response = "";
	var currentUserLoggedin = false;
	var service = {}

	var makeUrl = function() {

		finalUrl = endPoint + "/" + apiCall;

		return finalUrl;
	}

	service.setApiDestination = function(apiDestination) {
		apiCall = apiDestination
	}
	service.getapiCall = function() {
		return apiCall;
	}
	service.setMethod = function(method) {
		method = method;
	}
	service.getMethod = function() {
		return method;
	}
	service.callCollegeSearchAPI = function($http, callback) {
		makeUrl();

		if (service.getMethod() == "")  {
			method = "GET";
			service.setMethod(method);
		}
		$http({
			method: method,
			url: finalUrl,
			async: false,
		}).success(function (data) {
				response = data;
			callback(response);
			})
			.error(function (data) {
				//TODO input error message
				callback(response);
			})
			return response;
	};
	return service;
});


function createHeader() {
	var header = $("#header");

	var imgSrc = "icon/collegeSearch.PNG";
	var ahref = $("<a href='searchPage.html'>");
	var icon = new Image();

	icon.src=imgSrc;

	icon.title="CollegeSearch";
	icon.alt="CollegeSearch";

	icon.id="collegeSearchicon";
	ahref.append(icon);
	header.append(ahref);


	//if (loggedIn==false) {

	var createAccountbtn = $("<md-button id='accountCreation' ng-click='showLoginPage(event)'>");
		createAccountbtn.addClass("md-button");
			createAccountbtn.text("Login/Create Account");
	var fileref=document.createElement("script");
	fileref.setAttribute("src", "scripts/signIn.js");
	document.getElementsByTagName("head")[0].appendChild(fileref);
	header.append(createAccountbtn);



	//header.append("<hr>");
//}

}


/*
 This function retrieves a cookie based on a name
 */
function getCookie(name) {
	var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
	var result = regexp.exec(document.cookie);
	return (result === null) ? null : result[1];
}
/*
 This function creates a cookie with a name and value taken as arguments
 */
function createCookie(name, value) {
	document.cookie = name+"="+value;
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
	var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
	var result = regexp.exec(document.cookie);
	document.cookie = result + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}