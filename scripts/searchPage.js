/**
 * Created by ianshinbrot on 11/19/15.
 */
// Include app dependency on ngMaterial

var searchParameters = {};

app.controller('searchController', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.searchParameters = {};
    $scope.currentUserLoggedin = false;
    var stateName = "";
    pageSetup = function() {

        var loggedIn = getCookie("loggedIn");


        if (loggedIn=="true") {

            // remove class for not showing logged in functions
        }
        else {
            // we don't need to modify anything
        }
        deleteCookie("searchParameters");
    }
    $scope.performSearch = function() {
        if (!$scope.CollegeInfo.$valid) {
            //TODO add message saying some values are invalid
        }
        else {
            if ($scope.parameter.stateName) {
                stateName = convert_state($scope.parameter.stateName, "abbrev");
            }

                var config = {
                    params: {
                        // Put required values here
                        'GPAvalue': $scope.parameter.gpa,
                        'ACTScore': $scope.parameter.actcomposite,
                        'highSchoolPercentile': $scope.parameter.HighSchoolPercentile,
                        'MathScore': $scope.parameter.mathscore,
                        'WritingScore': $scope.parameter.WritingScore,
                        'ReadingScore': $scope.parameter.ReadingScore,
                        'StateName': $scope.parameter.stateName,
                        'name': $scope.parameter.InstitutionName,
                        'zipCode': $scope.parameter.zipcode,
                        'fullAddress': $scope.parameter.fullAddress,
                        'acceptanceRate': $scope.parameter.acceptanceRate,
                        'retentionRate': $scope.parameter.retentionRate,
                        'institutionType': $scope.parameter.institutionType,
                        'studentPopulation': $scope.parameter.studentPopulation,
                        'classSize': $scope.parameter.classSize,
                        'CommonApplicaiton': $scope.parameter.commonApplication,
                        'favoritedInstitutions': $scope.parameter.favoritedInstitutions
                    },
                };


                params = JSON.stringify(config.params);
                createCookie("searchParameters", params);           // create a cookie with the search parameters
                window.location.href = "searchResults.html";      // redirect to a new page

                return false;
        }
    };
    pageSetup();
});


/*
This function contructs the search parameters
 */
function constructSearch(params) {
    // usually just a get request so a simple GET is fine

    var dataType = "GET";


    var url = "search.php?"; // construct the url


    url +=formatSearch(params);


    return url;
}



    function convert_state(name, to) {
        var name = name.toUpperCase();
        var states = new Array({'name': 'Alabama', 'abbrev': 'AL'}, {'name': 'Alaska', 'abbrev': 'AK'},
            {'name': 'Arizona', 'abbrev': 'AZ'}, {'name': 'Arkansas', 'abbrev': 'AR'}, {
                'name': 'California',
                'abbrev': 'CA'
            },
            {'name': 'Colorado', 'abbrev': 'CO'}, {'name': 'Connecticut', 'abbrev': 'CT'}, {
                'name': 'Delaware',
                'abbrev': 'DE'
            },
            {'name': 'Florida', 'abbrev': 'FL'}, {'name': 'Georgia', 'abbrev': 'GA'}, {
                'name': 'Hawaii',
                'abbrev': 'HI'
            },
            {'name': 'Idaho', 'abbrev': 'ID'}, {'name': 'Illinois', 'abbrev': 'IL'}, {
                'name': 'Indiana',
                'abbrev': 'IN'
            },
            {'name': 'Iowa', 'abbrev': 'IA'}, {'name': 'Kansas', 'abbrev': 'KS'}, {'name': 'Kentucky', 'abbrev': 'KY'},
            {'name': 'Louisiana', 'abbrev': 'LA'}, {'name': 'Maine', 'abbrev': 'ME'}, {
                'name': 'Maryland',
                'abbrev': 'MD'
            },
            {'name': 'Massachusetts', 'abbrev': 'MA'}, {'name': 'Michigan', 'abbrev': 'MI'}, {
                'name': 'Minnesota',
                'abbrev': 'MN'
            },
            {'name': 'Mississippi', 'abbrev': 'MS'}, {'name': 'Missouri', 'abbrev': 'MO'}, {
                'name': 'Montana',
                'abbrev': 'MT'
            },
            {'name': 'Nebraska', 'abbrev': 'NE'}, {'name': 'Nevada', 'abbrev': 'NV'}, {
                'name': 'New Hampshire',
                'abbrev': 'NH'
            },
            {'name': 'New Jersey', 'abbrev': 'NJ'}, {'name': 'New Mexico', 'abbrev': 'NM'}, {
                'name': 'New York',
                'abbrev': 'NY'
            },
            {'name': 'North Carolina', 'abbrev': 'NC'}, {'name': 'North Dakota', 'abbrev': 'ND'}, {
                'name': 'Ohio',
                'abbrev': 'OH'
            },
            {'name': 'Oklahoma', 'abbrev': 'OK'}, {'name': 'Oregon', 'abbrev': 'OR'}, {
                'name': 'Pennsylvania',
                'abbrev': 'PA'
            },
            {'name': 'Rhode Island', 'abbrev': 'RI'}, {
                'name': 'South Carolina',
                'abbrev': 'SC'
            }, {'name': 'South Dakota', 'abbrev': 'SD'},
            {'name': 'Tennessee', 'abbrev': 'TN'}, {'name': 'Texas', 'abbrev': 'TX'}, {'name': 'Utah', 'abbrev': 'UT'},
            {'name': 'Vermont', 'abbrev': 'VT'}, {'name': 'Virginia', 'abbrev': 'VA'}, {
                'name': 'Washington',
                'abbrev': 'WA'
            },
            {'name': 'West Virginia', 'abbrev': 'WV'}, {'name': 'Wisconsin', 'abbrev': 'WI'}, {
                'name': 'Wyoming',
                'abbrev': 'WY'
            }
        );
        var returnthis = false;
        $.each(states, function (index, value) {
            if (to == 'name') {
                if (value.abbrev == name) {
                    returnthis = value.name;
                    return false;
                }
            } else if (to == 'abbrev') {
                if (value.name.toUpperCase() == name) {
                    returnthis = value.abbrev;
                    return false;
                }
            }
        });
        return returnthis;
    }
function showLogIn() {
    createDialog('simpleModal.html', {
        id: 'simpleDialog',
        title: 'A Simple Modal Dialog',
        backdrop: true,
        success: {
            label: 'Yay', fn: function () {
                console.log('Successfully closed modal');
            }
        },
    });
}
