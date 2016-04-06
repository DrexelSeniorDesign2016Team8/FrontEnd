app.factory('searchService', function($localStorage, apiCall) {
    var searchOptions = {};

    /**
     * This function sets all the search parameters
     * The parameters are also stored in local storage
     * @param data - the data to be searched
     */
    function set(data) {
        $localStorage.params = data;
        searchOptions.params = data;
    }
    function setGPA(gpa) {
        var config = {
            params: {
                'GPAvalue': gpa
            }
        }
        searchOptions.GPAvalue = config.params.GPAvalue;
    }

    function getGPA() {
        return searchOptions.GPAvalue;
    }

    function get() {
        return $localStorage.params
    }

    function fillStates() {
        return ('None,' + 'Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,' +
            'Florida Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,' +
            'Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,' +
            'New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,' +
            'Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,' +
            'West Virginia,Wisconsin,Wyoming'
        ).split(',').map(function (state) {
            return {fullName: state};
        });
    }

    function fillPopulation() {
        return ("None:" + "500-1,000:" + "1,000-2,500:"+"2,500-10,000:"+"10,000+" ).split(':').map(function (population) {
            return {population: population};
        });
    }
    function fillClassSize() {
        return ("None:" + "0-10:" + "10-20:"+"20-30:"+"40-50" ).split(':').map(function (classSize) {
            return {classSize: classSize};
        });
    }

    function fillPercentages() {
        return ('None,' + '10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%'
        ).split(',').map(function (percentage) {
            return {percentage: percentage};
        });
    }

    /**
     * This function performs a search
     * @param callback - the function to be called after a search is performed
     */
    function fullSearch(callback) {
        search(callback);
    }

    function setApiCall(apiCall) {
        this.apiCall = apiCall;
    }
    function searchWithPagination(callback, pageNumber, resultsPerPage) {
        var jsonString = setupSearch();

        var parameters = jsonString + "page=" + pageNumber + "&pageSize=" + resultsPerPage;
        apiCall.setParameters(parameters);
        search(callback);
    }
    function searchWithoutPagination(callback) {
        var parameters = setupSearch();
        apiCall.setParameters(parameters);
        search(callback);
    }
    function setupSearch() {
        var jsonString = "";
        params = $localStorage.params;
        if (params) {     // if they exist make call

            jsonString = formatSearch(params);
            jsonString = jsonString.replace(/\"/g, "");
        }

        apiCall.setApiDestination("search.php?");
        return jsonString;

    }
    function search(callback) {
        apiCall.callCollegeSearchAPI(callback);
    }

    return {
        set: set,
        get: get,
        fullSearch: fullSearch,
        setGPA: setGPA,
        getGPA: getGPA,
        searchWithoutPagination: searchWithoutPagination,
        searchWithPagination: searchWithPagination,
        fillStates: fillStates,
        fillPopulation: fillPopulation,
        fillPercentages: fillPercentages,
        setApiCall: setApiCall,
        fillClassSize: fillClassSize,
    }

});
