/**
 * Ian Shinbrot
 */
app.factory('authService', function(userService, $http) {

    var endPoint = "http://mid.searchcollege.me/";
    var url = "";
    var parameters = "";
    var sessionId;

    function getUserName() {
        return userService.getUserName();
    }

    function getSessionId() {
        return userService.getSessionId;
    }

    function signinPreReq(userInfo) {
        url = "login.php?";
        parameters = "email=" + userInfo.userName + "&";
        parameters += "pass=" + userInfo.password;

    }

    function login(userInfo, success, error) {
        signinPreReq(userInfo);
        var Call = endPoint + url + parameters;

        return $http
            .get(Call)
            .then(function (response) {
                var data = response.data
                if (data.status == "success") {
                    userService.setSessionId(data.response.session_id)
                    userService.setUserName("userName");
                    success(data);
                }
                if (data.status = "error")
                    error(data);
            });
    };

    /**
     * This generates an account url with the full name and userName of the user
     * @returns {string}
     */
    function createAccountPreReq(userInfo) {
        url = "create.php?";
        parameters = "email=" + userInfo.userName + "&";
        parameters += "pass=" + userInfo.password;
    }

    function resetPasswordPreReq(emailAddress) {
        url = "resetPassword.php?";
        parameters = "email=";
        parameters += emailAddress;
    }
    function changePasswordPreReq(password) {
        url = "changePassword.php?";
        parameters = "password=";
        parameters += password;
    }

    function createAccount(userInfo, success, error) {
        createAccountPreReq(userInfo);
        var Call = endPoint + url + parameters;

        return $http
            .get(Call)
            .then(function (response) {
                var data = response.data
                if (data.status == "success") {
                    userService.setSessionId(data.response.session_id)
                    userService.setUserName("userName");
                    success(data);
                }
                if (data.status = "error")
                    error(data);
            });
    }

    function deleteAccount() {
        url = "deleteAccount.php?";
        var Call = endPoint + url + "sid=" + userService.getSessionId() + "&";

        return $http
            .get(Call)
            .then(function (response) {
                // insert response here
            })
    };
    /**
     * This function logs a user out, and sets all the corresponding values to their default values
     */
    function logout() {
        userService.logout();
    }

    function resetPassword(emailAddress, success, error) {
        resetPasswordPreReq(emailAddress);
        var Call = endPoint + url + parameters;
        return $http
            .get(Call)
            .then(function (response) {
                if (response.status == "success") {
                    // succeeded
                    success(response);
                }
                else if (response.status = "error") {
                    // failed
                    error(response);
                    //TODO add better server error checking
                }

            })
    };
    function changePassword(password, success, error) {
        changePasswordPreReq(password);
        var Call = endPoint + url + parameters;
        return $http
            .get(Call)
            .then(function (response) {
                if (response.status == "success") {
                    // succeeded
                    success(response);
                }
                else if (response.status == "error") {
                    //failed
                    error(response);
                }
            })
    }

    return {
        login: login,
        createAccount: createAccount,
        getSessionId: getSessionId,
        logout: logout,
        deleteAccount: deleteAccount,
        getUserName: getUserName,
        resetPassword: resetPassword,
        changePassword: changePassword


    };
});