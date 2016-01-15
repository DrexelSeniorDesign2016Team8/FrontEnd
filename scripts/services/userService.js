app.factory('userService', function($localStorage) {
    var user = {
        loggedIn: false,
        username: '',
        authenticationKey: '',
        rememberMe: false
    };


    function getUserName() {
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
        user.rememberMe=false;
        $localStorage.loggedIn=false;
        $localStorage.username='';
        $localStorage.authenticationKey='';
        $localStorage.rememberMe=false;

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
    function setRememberMe(rememberMe) {
        user.rememberMe=rememberMe;
        $localStorage.rememberMe=rememberMe;
    }
    function restoreLocalStorage() {
        if ($localStorage.username && $localStorage.loggedIn) {
            user.username = $localStorage.username;
            user.loggedIn = $localStorage.loggedIn;
            if ($localStorage.rememberMe==false) {      // if remember me is not selected remove local storage
                $localStorage.loggedIn=false;
                $localStorage.username='';
            }

            return true;
        }
        else return false;
    }
    return {
        getUserName: getUserName,
        set: set,
        setLoggedIn: setLoggedIn,
        setUserName: setUserName,
        setRememberMe :setRememberMe,
        setAuthenticationKey: setAuthenticationKey,
        restoreLocalStorage: restoreLocalStorage,
        isLoggedin : isLoggedin,
        logout: logout
    };
});