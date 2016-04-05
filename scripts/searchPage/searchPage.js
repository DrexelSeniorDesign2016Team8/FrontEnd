/**
 * Created by ianshinbrot on 11/19/15.
 */
// Include app dependency on ngMaterial

var searchParameters = {};




/*
 This function formats the search depending on the values that are filled in and not
 */
function formatSearch(searchParameters) {

    var parameters="";
    if (searchParameters.GPAvalue) {
        parameters += "GPAvalue=" + searchParameters.GPAvalue + "&";
    }
    if (searchParameters.ACTScore) {
        parameters += "ACTScore=" + searchParameters.ACTScore + "&";
    }
    if (searchParameters.HighSchoolPercentile) {
        parameters += "HighSchoolPercentile=" + searchParameters.HighSchoolPercentile + "&";
    }
    if (searchParameters.MathScore) {
        parameters += "MathScore=" + searchParameters.MathScore + "&";
    }
    if (searchParameters.ReadingScore) {
        parameters += "ReadingScore=" + searchParameters.ReadingScore + "&";
    }
    if (searchParameters.WritingScore) {
        parameters += "WritingScore=" + searchParameters.WritingScore + "&";
    }
    if (searchParameters.InstitutionName) {
        parameters += "name=" + searchParameters.InstitutionName + "&";
    }
    if (searchParameters.stateName) {
        parameters += "stateName=" + convert_state(searchParameters.stateName, "abbrev") + "&";
    }
    if (searchParameters.zipCode) {
        parameters += "zipCode=" + searchParameters.zipCode + "&";
    }
    if (searchParameters.fullAddress) {
        parameters += "fullAddress=" + searchParameters.fullAddress + "&";
    }
    if (searchParameters.acceptanceRate) {
        parameters += "AcceptanceRate=" + searchParameters.acceptanceRate + "&";
    }
    if (searchParameters.retentionRate) {
        parameters += "retentionRate=" + searchParameters.retentionRate + "&";
    }
    if (searchParameters.institutionType) {
        parameters += "institutionType=" + searchParameters.institutionType + "&";
    }
    if (searchParameters.studentPopulation) {
        if (searchParameters.studentPopulation[0]="10,000+")
        {
            var pops = searchParameters.studentPopulation="10000-9999999999999999999999";
            var population = pops.split("-");
        }

            else {
            var population = searchParameters.studentPopulation.split("-");
        }

        parameters += "minPop=" + population[0] + "&" + "maxPop=" + population[1];
    }
    if (searchParameters.averageClassSize) {
        var classSize =  searchParameters.averageClassSize.split("-");
        parameters += "minClass=" + classSize[0]+"&" + "maxClass=" + classSize[1];
    }
    if (searchParameters.favoritedInstitutions) {
        parameters += "favoritedInstitutions=" + searchParameters.favoritedInstitutions +"&";
    }
    if (searchParameters.commonApplication) {
        parameters += "commonApplication=" + searchParameters.CommonApplication;
    }

    return parameters;

}

    function convert_state(name, to) {
         name = name.toUpperCase();
        var states = [{'name': 'Alabama', 'abbrev': 'AL'}, {'name': 'Alaska', 'abbrev': 'AK'},
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
            }];
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