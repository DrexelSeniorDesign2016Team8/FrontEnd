app.factory('searchService', function(apiCall, $localStorage,userService) {
    var searchOptions = {};

    /**
     * This function sets all the search parameters
     * The parameters are also stored in local storage
     * @param data - the data to be searched
     */
    function set(data) {
        var config = {
            params: {
                // Put required values here
                'GPAvalue': data.gpa,
                'ACTScore': data.actcomposite,
                'highSchoolPercentile': data.HighSchoolPercentile,
                'MathScore': data.mathscore,
                'WritingScore': data.WritingScore,
                'ReadingScore': data.ReadingScore,
                'StateName': data.stateName,
                'name': data.InstitutionName,
                'zipCode': data.zipcode,
                'fullAddress': data.fullAddress,
                'acceptanceRate': data.acceptanceRate,
                'retentionRate': data.retentionRate,
                'institutionType': data.institutionType,
                'studentPopulation': data.studentPopulation,
                'classSize': data.classSize,
                'CommonApplicaiton': data.commonApplication,
                'favoritedInstitutions': data.favoritedInstitutions
            },
        };
        $localStorage.params = config.params;
        searchOptions.params = config.params;
    }
    function setGPA(gpa) {
        var config = {
            params: {
                'GPAvalue': gpa
            }
        }
        searchOptions.GPAvalue = config.params.GPAvalue;
    }
    function  getGPA() {
        return searchOptions.GPAvalue;
    }
    function get() {
        return $localStorage.params
    }

    /**
     * This function performs a search
     * @param callback - the function to be called after a search is performed
     */
    function search(callback) {

        params = $localStorage.params;
        if (params) {     // if they exist make call

            jsonString = formatSearch(params);
            jsonString = jsonString.replace(/\"/g, "");
        }
        apiCall.setApiDestination("search.php?" + jsonString);

        apiCall.callCollegeSearchAPI(callback);
    }

    return {
        set: set,
        get: get,
        search: search,
        setGPA:setGPA,
        getGPA: getGPA
    }

});
