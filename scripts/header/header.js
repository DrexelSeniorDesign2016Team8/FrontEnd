function createHeader() {
    var header = $("#header");

    var imgSrc = "assets/icon/collegeSearch.PNG";
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

    // add dependencies for signIn page
    addDependency("script", "src", "scripts/signIn/signIn.js");
    addDependency("script", "src", "scripts/signIn/signInController.js");


    header.append(createAccountbtn);



    //header.append("<hr>");

}