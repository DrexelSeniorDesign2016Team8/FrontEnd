app.factory('navigationService', function($localStorage, userService) {


    function leavePage(url) {
        // check to see if rememberMe is selected in local storage
        if (userService.rememberMe==true) {
            $localStorage.username=userService.getUserName();
            $localStorage.loggedIn=true;
        }
        window.location.href=url;

    }
    function  loadPage(url) {
        $localStorage.rememberMe=false;
        $localStorage.username='';
        $localStorage.loggedIn='';
    }

    return {
        leavePage: leavePage,
        loadPage: loadPage
    }

});