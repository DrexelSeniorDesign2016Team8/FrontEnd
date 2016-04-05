app.factory('userService', function($localStorage, searchService, apiCall) {
    var user = {
        loggedIn: false,
        username: '',
        sessionId: '',
        rememberMe: false,
        preferencesUpdated: false,
        loginFailed: false,
        searchService : searchService,
    };
    function getSearchService() {
        return searchService;
    }


    function setSessionId(sessionId) {
        user.sessionId=sessionId;
        apiCall.setSessionId(sessionId);
        $localStorage.sessionId=sessionId;
    }
    function getUserName() {
        return user.username;
    }
    function setSearchPreferences(response) {
        if (response.length!=0)
       user.searchService.set(response[0]);
    }

    function getSearchParameters() {
        return user.searchService.get();
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
    function getSearchPreferences(callback) {

        apiCall.setApiDestination("getPreferences.php?");
        apiCall.callCollegeSearchAPI(function(response) {

            if (response.length!=0) {
                if (response[0].MathScore)
                // convert to int
                    response[0].MathScore = parseInt(response[0].MathScore);
                if (response[0].ReadingScore)
                // convert to int
                    response[0].ReadingScore = parseInt(response[0].ReadingScore)
                if (response[0].WritingScore)
                // convert to int
                    response[0].WritingScore = parseInt(response[0].WritingScore);
                if (response[0].GPAvalue)
                // convert to float
                    response[0].GPAvalue = parseFloat(response[0].GPAvalue);
                if (response[0].zipCode)
                // convert to int
                    response[0].zipCode = parseInt(response[0].zipCode);
                if (response[0].ACTScore) {
                    // convert to int
                    response[0].ACTScore = parseInt(response[0].ACTScore);
                }
                if (response[0].stateName) {
                    // convert state name
                    response[0].stateName = convert_state(response[0].stateName, "name")
                }
            }

            callback(response);
        });
    }

    /**
     * This function logs a user out, and sets all the corresponding values to their default values
     */
    function logout() {
        user.loggedIn=false;
        user.username="";
        user.authenticationKey='';
        user.rememberMe=false;
        $localStorage.loggedIn=false;
        $localStorage.username='';
        $localStorage.authenticationKey='';
        $localStorage.rememberMe=false;
        $localStorage.sessionId="";

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
            setUserName($localStorage.username);
            setLoggedIn($localStorage.loggedIn);
            setSessionId($localStorage.sessionId);
            if ($localStorage.rememberMe==false && $localStorage.username=="") {      // if remember me is not selected remove local storage
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
    function getSignInURL() {
        return  "login.php?";
    }
    function generateSignInUParameters(userInfo) {
        var paramters = '';
        paramters += "email=" + userInfo.userName + "&";
        paramters += "pass=" + userInfo.password;

            return paramters;
    }

    /**
     * This generates an account url with the full name and userName of the user
     * @returns {string}
     */
    function getCreateAccountURL() {
        var creationString = "create.php?";
        return creationString;
    }
    function generateCreateAccountParameters(userInfo) {
        var parameters ='';
        parameters += "email=" + userInfo.userName +"&";
        parameters += "pass=" + userInfo.password ;
        return parameters;
    }
    function setLoginStatus(status) {
        user.loginFailed = status;
    }
    function searchFavorites() {
        preferences = {};
        preferences.favoritedInstitutions = {}
        preferences.favoritedInstitutions = 1;
        searchService.set(preferences);
    }

    function saveSearchPreferences(callback) {
        params = searchService.get();

        if (params) {     // if they exist make call

            jsonString = formatSearch(params);
            jsonString = jsonString.replace(/\"/g, "");
        }
        apiCall.setApiDestination("savePreferences.php?");
        apiCall.setParameters(jsonString);

        apiCall.callCollegeSearchAPI(callback);
    }
    function deleteAccount() {
        apiCall.setApiDestination("deleteAccount.php?");
        apiCall.callCollegeSearchAPI(function () {
            window.location.href = ("searchPage.html")

            logout();


        })
    };
    function emailFavorites(callback) {
        apiCall.setApiDestination("sendMail.php?");
        apiCall.callCollegeSearchAPI(callback);
    }
    function setApiSearch() {
        searchService.setApiCall(apiCall);
    }
    function setFavorite(collegeId, callback) {
        apiCall.setApiDestination("addFavorite.php?");
        apiCall.setParameters("college_id="+collegeId);
        apiCall.callCollegeSearchAPI(callback);
    }
    function removeFavorite(collegeId, callback) {
        apiCall.setApiDestination("deleteFavorite.php?");
        apiCall.setParameters("college_id="+collegeId);
        apiCall.callCollegeSearchAPI(callback);
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
        getSignInURL:getSignInURL,
        generateSignInUParameters: generateSignInUParameters,
        generateCreateAccountParameters: generateCreateAccountParameters,
        getCreateAccountURL: getCreateAccountURL,
        logout: logout,
        setLoginStatus: setLoginStatus,
        setSearchPreferences: setSearchPreferences,
        getSearchParameters: getSearchParameters,
        deleteAccount: deleteAccount,
        emailFavorites: emailFavorites,
        saveSearchPreferences: saveSearchPreferences,
        getSearchService: getSearchService,
        setApiSearch: setApiSearch,
        removeFavorite: removeFavorite,
        setFavorite: setFavorite,
        searchFavorites: searchFavorites,
        getSearchPreferences: getSearchPreferences
    };
});