/**
 * Ian Shinbrot
 */
app.factory('navigationService', function($localStorage, userService) {


    function leavePage(url) {
            $localStorage.username=userService.getUserName();
            $localStorage.loggedIn=true;
            $localStorage.params=userService.getSearchParameters();

        window.location.href=url;

    }
    function  loadPage() {
        $localStorage.rememberMe=false;
        $localStorage.params=userService.getSearchParameters();
        userService.setUserName($localStorage.userName);
    }

    function reload() {
        // check to see if rememberMe is selected in local storage
            $localStorage.username=userService.getUserName();
            $localStorage.loggedIn=true;
            $localStorage.params=userService.getSearchParameters();
        window.location.reload();
    }
    return {
        leavePage: leavePage,
        loadPage: loadPage,
        reload: reload
    }

});