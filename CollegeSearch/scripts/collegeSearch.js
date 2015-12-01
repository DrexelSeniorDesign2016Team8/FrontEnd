//var loggedIn = false;





// This function retrieves the spinner and sets it to active to show the loading screen
function showloadScreen() {
	
	var spinner = $("#spinner")
	
	spinner.addClass("is-active")
}

function removeLoadScreen() {
	spinner.removeClass("is-active")
}


function createHeader() {
	var header = $("#header");
	
	var imgSrc = "icon/collegeSearch.PNG";
	
	var icon = new Image();
	
	icon.src=imgSrc;
	
	icon.title="CollegeSearch";
	icon.alt="CollegeSearch";
	
	icon.id="collegeSearchicon";
	
	header.append(icon);
	
	header.append(icon);
	
	//if (loggedIn==false) {
		
		var createAccountbtn = document.createElement("BUTTON");
	createAccountbtn.className="mdl-button mdl-js-button mdl-js-ripple-effect createAccountbtn";
	createAccountbtn.id="accountCreation";
	var text = document.createTextNode("Create Account");  
	createAccountbtn.appendChild(text);

	header.append(createAccountbtn);
	
	
	
	//header.append("<hr>");
//}

}

function invokeCollegeSearchAPI(url, data, dataType, success) {


	if (data=="") {
		dataType="GET";
	}
	var startUrl = "http://searchCollege.me/";


	url = startUrl=url;
	var response = CollegeSearchAPI(url,data,success,dataType);

	return response;
}
/*
	url is the url request
	data is the data that will be passed into the request
 */
function CollegeSearchAPI(url, data, success, dataType){

	xmlHttp.open( dataType, url, false);
	xmlHtpp.send(null);
	success(xmlHttp.responseText)

	return xmlHtpp.responseText;

}


function getCookie(name) {
		var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
		var result = regexp.exec(document.cookie);
		return (result === null) ? null : result[1];
}
function createCookie(name, value) {
	document.cookie = name+"="+value;
}

