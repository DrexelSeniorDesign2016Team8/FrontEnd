app.factory('apiCall', function() {

    var endPoint = "http://mid.searchcollege.me";
    var method = "";
    var apiCall = '';
    var finalUrl = "";
    var response = "";
    var currentUserLoggedin = false;
    var service = {}

    var makeUrl = function() {

        finalUrl = endPoint + "/" + apiCall;

        return finalUrl;
    }

    service.setApiDestination = function(apiDestination) {
        apiCall = apiDestination
    }
    service.getapiCall = function() {
        return apiCall;
    }
    service.setMethod = function(method) {
        method = method;
    }
    service.getMethod = function() {
        return method;
    }
    service.callCollegeSearchAPI = function($http, callback) {
        makeUrl();

        if (service.getMethod() == "")  {
            method = "GET";
            service.setMethod(method);
        }
        $http({
            method: method,
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