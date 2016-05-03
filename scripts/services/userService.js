/**
 * Ian Shinbrot
 */
app.factory('userService', function($localStorage, searchService, apiCall) {
    var user = {
        username: null,
        sessionId: '',
        rememberMe: false,
        preferencesUpdated: false,
        loginFailed: false,
        searchService : searchService,
    };
    function getSearchService() {
        return searchService;
    }
    function isLoggedin() {
        return user.username!=null;
    }

    function getSessionId() {
        return user.sessionId;
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
                    if (isNaN(response[0].zipCode)) {
                        response[0].zipCode="";
                    }
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



    function set(username) {
        var info = {
            authInfo: {
                'username': data.username,
            }
        }
            $localStorage.username = username;

        setUserName(username);

    }
    function setUserName(username) {
        user.username = username;
        $localStorage.username = username
    }

    /**
     * This method restores the user information from local storage
     * @returns {boolean}
     */
    function restoreLocalStorage() {
        if ($localStorage.username) {
            setUserName($localStorage.username);
            setSessionId($localStorage.sessionId);
            if ($localStorage.rememberMe==false && $localStorage.username==null) {      // if remember me is not selected remove local storage
                $localStorage.username=null;
            }


            return true;
        }
        else return false;
    }

    function searchFavorites() {
        var preferences = {};
        preferences.favoritedInstitutions = {}
        preferences.favoritedInstitutions = 1;
        searchService.set(preferences);
    }
    function  determineFavoriteCount() {
        apiCall.setApiDestination("search.php?");
        apiCall.setParameters("favoritedInstitutions=1");
        apiCall.callCollegeSearchAPI(function(response) {
            if (response.response.size()>0) {
            return true;
        }
            else return false;
        });
    }
    function logout() {
        user.username = null;
        user.sessionId = '';
        $localStorage.username=null;
        $localStorage.sessionId='';
    }
    function saveSearchPreferences(callback) {
        var params = searchService.get();

        if (params) {     // if they exist make call

            jsonString = formatSearch(params);
            jsonString = jsonString.replace(/\"/g, "");
        }
        apiCall.setApiDestination("savePreferences.php?");
        apiCall.setParameters(jsonString);

        apiCall.callCollegeSearchAPI(callback);
    }

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
    function deleteAccount() {

        setSessionId("");
        setUserName(null);
    }
    function getUserNameCall() {
        apiCall.setApiDestination("getUser.php?");
        apiCall.callCollegeSearchAPI(function() {
            user.username=response;
        });
    }

    return {

        getUserName: getUserName,
        getSessionId:getSessionId,
        set: set,
        isLoggedin: isLoggedin,
        setUserName: setUserName,
        logout: logout,
        restoreLocalStorage: restoreLocalStorage,
        setSessionId : setSessionId,
        setSearchPreferences: setSearchPreferences,
        getSearchParameters: getSearchParameters,
        emailFavorites: emailFavorites,
        saveSearchPreferences: saveSearchPreferences,
        getSearchService: getSearchService,
        setApiSearch: setApiSearch,
        removeFavorite: removeFavorite,
        setFavorite: setFavorite,
        searchFavorites: searchFavorites,
        getSearchPreferences: getSearchPreferences,
        deleteAccount:deleteAccount,
        determineFavoriteCount: determineFavoriteCount,
        getUserNameCall: getUserNameCall
    };
});