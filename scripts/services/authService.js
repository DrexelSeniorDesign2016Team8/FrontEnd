/**
 * Ian Shinbrot
 */
app.factory('authService', function(userService, $http) {

    var endPoint = "http://mid.searchcollege.me/";
    var url = "";
    var parameters = "";
    function isLoggedIn() {
        return userService.getUserName()!= null;
    }
    function signinPreReq(userInfo) {
        url = "login.php?";
        parameters = "email=" + userInfo.userName + "&";
        parameters += "pass=" + userInfo.password;

    }
    function login(userInfo, callback) {
        signinPreReq(userInfo);
        var Call = endPoint + url + parameters;

        return $http
            .get(Call)
            .then(function(response) {
                userService.setSessionId(response.session_id)
                userService.setUserName("userName");
                callback(response);
            });
    };

    /**
     * This generates an account url with the full name and userName of the user
     * @returns {string}
     */
    function createAccountPreReq(userInfo) {
        url =  "create.php?";
        parameters = "email=" + userInfo.userName + "&";
        parameters += "pass=" + userInfo.password;
    }
    function createAccount(userInfo,callback) {
      createAccountPreReq(userInfo);
        var Call = endPoint + url + parameters;

        return $http
            .get(Call)
            .then(function(response) {
                userService.setSessionId(response.session_id)
                userService.setUserName("userName");
                callback(response);
            });
    }
    function deleteAccount() {
        this.url="deleteAccount.php?";
        Call = this.endPoint + this.url;

        return $http
            .get(Call)
            .then(function(respones) {
                // insert response here
            })
    };
    /**
     * This function logs a user out, and sets all the corresponding values to their default values
     */
    function logout() {
       userService.user.destroy();

    }
    return {
    isLoggedIn : isLoggedIn,
        login: login,
        createAccount : createAccount,
        logout : logout,


    };
});