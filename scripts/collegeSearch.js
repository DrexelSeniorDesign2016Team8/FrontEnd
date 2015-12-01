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
	var ahref = document.createElement("A")
	ahref.href="http://searchcollege.me/";
	var icon = new Image();
	
	icon.src=imgSrc;
	
	icon.title="CollegeSearch";
	icon.alt="CollegeSearch";
	
	icon.id="collegeSearchicon";
	ahref.appendChild(icon);
	header.append(ahref);
	
	header.append(ahref);
	
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


function getCookie(name) {
		var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
		var result = regexp.exec(document.cookie);
		return (result === null) ? null : result[1];
}
function createCookie(name, value) {
	document.cookie = name+"="+value;
}

