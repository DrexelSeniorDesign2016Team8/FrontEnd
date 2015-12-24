//var loggedIn = false;





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