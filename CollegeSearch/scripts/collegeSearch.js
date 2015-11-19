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

