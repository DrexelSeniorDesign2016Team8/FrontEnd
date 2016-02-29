app.factory('apiCall', function($http, $log) {

    var endPoint = "http://mid.searchcollege.me";
    var method = "";
    var apiCall = '';
    var apiParameters = '';
    var finalUrl = "";
    var response = "";
    var service = {};
    var loggedIn = false;
    var sessionId;
    /**
     * This function creates the url for the college search api
     * @returns {string}
     */
    var makeUrl = function() {

        finalUrl = endPoint + "/";

        finalUrl = finalUrl + apiCall;

        if (loggedIn) {
            finalUrl =+ "sid"+sessionId+"&";
        }
        finalUrl +=apiParameters;
        return finalUrl;
    };
    /**
     * This function sets the api destination
     * @param apiDestination - destination for the api call
     */
    service.setApiDestination = function(apiDestination) {
        apiCall = apiDestination;
    }
    service.setParameters = function(parameters) {
        var encodedDestination = encodeURI(parameters);
        apiParameters = encodedDestination;
    }
    service.getapiCall = function() {
        return apiCall;
    };
    /**
     * Allows a method to be set to for the http request
     * @param method
     */
    service.setMethod = function(method) {
        this.method = method;
    };
    /**
     * Retrieves the method to be performed for the http request
     * @returns {string}
     */
    service.getMethod = function() {
        return method;
    };
   service.setSessionId = function(sessionId) {
       loggedIn=true;
       this.sessionId=sessionId;
   }
    /**
     * performs the api request by creating an http request
     * The requests are all done not asynchronously.
     * TODO Figure out what to do with error
     * @param callback
     * @returns {string}
     */
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

            if (data.status=="error") {
                $log.debug(data.error);     // log the error message
             //   TODO input error message here
            }
                response = data;

                callback(response);
            })
            .error(function (data) {
                $log.debug(data);       // put response in error window. Maybe display user friendliness
                //TODO input error message

                callback(response);
            })
        return response;
    };
    return service;
});