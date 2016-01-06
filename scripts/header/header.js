function createHeader() {
    var header = $("#header");

    var imgSrc = "assets/icon/collegeSearch.png";
    var ahref = $("<a href='searchPage.html'>");
    var icon = new Image();

    icon.src=imgSrc;

    icon.title="CollegeSearch";
    icon.alt="CollegeSearch";

    icon.id="collegeSearchicon";
    ahref.append(icon);
    header.append(ahref);



    var createAccountbtn = $("<md-button id='accountCreation' ng-hide='userService.loggedIn' ng-click='showLoginPage(event)'>");
    createAccountbtn.text("Login/Create Account");

    var loginDetails = $("<md-button id='accountCreation' ng-show='userService.loggedIn' ng-click='showLoginPage(event)'>");

    // add dependencies for signIn page
    loginDetails.text('{{userService.userName}}');



    header.append(createAccountbtn);
    header.append(loginDetails);



}

