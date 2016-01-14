app.factory('userService', function($localStorage) {
    var user = {
        loggedIn: false,
        username: '',
        authenticationKey: ''
    };


    function get() {
        return user;
    }

    function isLoggedin() {
        if (user.loggedIn==true) {
            return true;
        }
        else {
            return false;
        }
    }
    function logout() {
        user.loggedIn=false;
        user.username=false;
        user.authenticationKey='';
        $localStorage.loggedIn=false;
        $localStorage.username='';
        $localStorage.authenticationKey='';

    }
    function set(loggedIn, username, authenticationKey) {
        var info = {
            authInfo: {
                'loggedIn': data.loggedIn,
                'username': data.username,
                'authenticationKey': data.authenticationKey,
            }
        }
            $localStorage.username = username;

        setLoggedIn(loggedIn);
        setUserName(username);
        setAuthenticationKey(authenticationKey);

    }

    function setLoggedIn(loggedIn) {
        user.loggedIn = loggedIn;
        $localStorage.loggedIn = loggedIn;
    }
    function setUserName(username) {
        user.username = username;
        $localStorage.username = username
    }
    function setAuthenticationKey(authenticationKey) {
        user.authenticationKey = authenticationKey;
    }
    function restoreLocalStorage() {
        if ($localStorage.username && $localStorage.loggedIn) {
            user.username = $localStorage.username
            user.loggedIn = $localStorage.loggedIn;
            return true;
        }
        else return false;
    }
    return {
        get: get,
        set: set,
        setLoggedIn: setLoggedIn,
        setUserName: setUserName,
        setAuthenticationKey: setAuthenticationKey,
        restoreLocalStorage: restoreLocalStorage,
        isLoggedin : isLoggedin,
        logout: logout
    };
});