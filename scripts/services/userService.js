app.factory('userService', function($localStorage) {
    var user = {
        fullName: "",
        loggedIn: false,
        username: '',
        sessionId: '',
        rememberMe: false,
        preferencesUpdated: false,
        loginFailed: false
    };

    function setfullName(name) {
        user.fullName = name;
    }
    function setSessionId(sessionId) {
        user.sessionId=sessionId;
    }
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
    function arePreferencesUpdated() {
        return user.preferencesUpdated;
    }

    /**
     * This function logs a user out, and sets all the corresponding values to their default values
     */
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

    function updatePreferences() {
        user.preferencesUpdated=true;
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

    /**
     * This method restores the user information from local storage
     * @returns {boolean}
     */
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

    /**
     * This generates a sign in url with a username and password of the user
     * @returns {string}
     */
    function generatesignInUrl() {
        var loginString = "login.php?";

        if (user.userName) {
            loginString += "userName=" + user.userName + "&";
        }
        if (user.password) {
            loginString += "pass=" + user.password + "&";
        }
            return loginString;
    }

    /**
     * This generates an account url with the full name and userName of the user
     * @returns {string}
     */
    function generateCreateAccountUrl() {
        var creationString = "create.php?";
        if (user.fullName) {
            creationString += "name=" + user.name;
        }
        if (user.userName) {
            creationString += "userName" + user.userName;
        }
        if (user.password) {
            creationString += "pass" + user.password;
        }
        return creationString;
    }
    function setLoginStatus(status) {
        user.loginFailed = status;
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
        updatePreferences: updatePreferences,
        arePreferencesUpdated : arePreferencesUpdated,
        setSessionId : setSessionId,
        generatesignInUrl:generatesignInUrl,
        generateCreateAccountUrl: generateCreateAccountUrl,
        logout: logout,
        setfullName: setfullName,
        setLoginStatus: setLoginStatus
    };
});