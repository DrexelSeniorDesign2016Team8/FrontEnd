//var loggedIn = false;





// This function retrieves the spinner and sets it to active to show the loading screen
function showloadScreen() {
	
	var spinner = $("#spinner")
	
	spinner.addClass("is-active")
}

function removeLoadScreen() {
	spinner.removeClass("is-active")
}

/*
This function creates the header of the college Search page
The header contains an icon that links to the home page
The right side also contains elements depending on if currently logged on
 */
function createHeader() {
	var header = $("#header");
	
	var imgSrc = "icon/collegeSearch.PNG";
	var ahref = document.createElement("A")
	ahref.href="searchPage.html";
	var icon = new Image();
	
	icon.src=imgSrc;
	
	icon.title="CollegeSearch";
	icon.alt="CollegeSearch";
	
	icon.id="collegeSearchicon";
	ahref.appendChild(icon);
	header.append(ahref);
	
	header.append(ahref);
	
	//if (loggedIn==false) {
		//TODO enable for logged in user
		var createAccountbtn = document.createElement("BUTTON");
	createAccountbtn.className="mdl-button mdl-js-button mdl-js-ripple-effect createAccountbtn";
	createAccountbtn.id="accountCreation";
	var text = document.createTextNode("Create Account");  
	createAccountbtn.appendChild(text);

	header.append(createAccountbtn);
	
	
	
	//header.append("<hr>");
//}

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

