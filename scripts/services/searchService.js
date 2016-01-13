app.factory('searchService', function(apiCall, $localStorage) {
    var searchOptions = {}
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
        searchOptions = config.params;
    }
    function get() {
        return $localStorage.params
    }


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
    }

});
