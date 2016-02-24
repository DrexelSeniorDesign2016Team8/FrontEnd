app.factory('navigationService', function($localStorage, userService,searchService) {


    function leavePage(url) {
        // check to see if rememberMe is selected in local storage
        if (userService.rememberMe==true) {
            $localStorage.username=userService.getUserName();
            $localStorage.loggedIn=true;
            $localStorage.params=searchService.get();
        }
        window.location.href=url;

    }
    function  loadPage(url) {
        $localStorage.rememberMe=false;
        $localStorage.username='';
        $localStorage.loggedIn='';
        $localStorage.params=searchService.get();
    }

    return {
        leavePage: leavePage,
        loadPage: loadPage
    }

});