//var loggedIn = false;

var app = angular.module( 'CollegeSearch', [ 'ngMaterial', 'ngMessages'] );		// initialize the app for all classes


app.controller('headerController', function($scope, $mdDialog, $mdMedia) {
	$scope.status = '  ';
	var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
	$scope.showLoginPage = function(ev) {
		var fileref=document.createElement("script");
		fileref.setAttribute("src", "scripts/signIn.js");
		document.getElementsByTagName("head")[0].appendChild(fileref);
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
				controller: DialogController,
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
	$scope.showTabDialog = function(ev) {
		$mdDialog.show({
				controller: DialogController,
				templateUrl: 'tabDialog.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.status = 'You cancelled the dialog.';
			});
	};
});
function DialogController($scope, $mdDialog) {
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
}

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

	header.append(createAccountbtn);



	//header.append("<hr>");
//}

}

// This function retrieves the spinner and sets it to active to show the loading screen
function showloadScreen() {

	var spinner = $("#spinner")

	spinner.addClass("is-active")
}

function removeLoadScreen() {
	spinner.removeClass("is-active")
}

function openAccountPage() {
	var modal = $("#loginPage");
	modal.modal({
		show: 'false',
		refresh: true
	});

	moda.modal('show');
	modal.focus();


}
/*
 This function invokes the college search api
 */
function invokeCollegeSearchAPI(url, data, dataType, success) {


	if (data=="") {
		dataType="GET";
	}
	var startUrl = "http://mid.searchcollege.me";


	url = startUrl+"/"+url;
	var response = CollegeSearchAPI(url,data,success,dataType);

	return response;
}
/*
 url is the url request
 data is the data that will be passed into the request
 */
function CollegeSearchAPI(url, data, success, dataType){

	var xmlHttp = new XMLHttpRequest();
	$.get(url, function(data, status) {
		var result = JSON.parse(data)
		success(result);

	});

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


//TODO Figure out how to allow this to be in external js page
app.controller('signInPage', function () {

});