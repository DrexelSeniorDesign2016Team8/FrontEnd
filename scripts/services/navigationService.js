app.factory('navigationService', function($localStorage, userService) {


    function leavePage(url) {
        // check to see if rememberMe is selected in local storage
        if (userService.rememberMe==true) {
            $localStorage.username=userService.getUserName();
            $localStorage.loggedIn=true;
            $localStorage.params=userService.getSearchParameters().get();
            $localStorage.userName=userService.getUserName();
        }
        window.location.href=url;

    }
    function  loadPage() {
        $localStorage.rememberMe=false;
        $localStorage.username='';
        $localStorage.loggedIn='';
        $localStorage.params=userService.getSearchParameters();
        userService.setUserName($localStorage.userName);
    }

    return {
        leavePage: leavePage,
        loadPage: loadPage
    }

});