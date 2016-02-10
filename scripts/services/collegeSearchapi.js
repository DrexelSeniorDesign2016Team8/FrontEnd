app.factory('apiCall', function($http, userService) {

    var endPoint = "http://mid.searchcollege.me";
    var method = "";
    var apiCall = '';
    var finalUrl = "";
    var response = "";
    var service = {}

    var makeUrl = function() {

        finalUrl = endPoint + "/";

        if (userService.isLoggedin()) {
            finalUrl =+ userService.sessionId+"&";
        }

        finalUrl = finalUrl + apiCall;
        return finalUrl;
    };

    service.setApiDestination = function(apiDestination) {
        apiCall = apiDestination
    }
    service.getapiCall = function() {
        return apiCall;
    }
    service.setMethod = function(method) {
        this.method = method;
    }
    service.getMethod = function() {
        return method;
    }
    service.callCollegeSearchAPI = function(callback) {
        makeUrl();

        if (service.getMethod() == "")  {
            method = "GET";
            service.setMethod(method);
        }
        $http({
            method: this.method,
            url: finalUrl,
            async: false,
        }).success(function (data) {
                response = data;
                callback(response);
            })
            .error(function (data) {
                //TODO input error message
                callback(response);
            })
        return response;
    };
    return service;
});