/**
 * Created by ianshinbrot on 11/19/15.
 */

var searchResults = {};     // This array contains the search results


var collegeArray = [];




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
    if (searchParameters.name) {
        parameters += "name=" + searchParameters.name + "&";
    }
    if (searchParameters.StateName) {
        parameters += "stateName=" + searchParameters.StateName + "&";
    }
    if (searchParameters.zipCode) {
        parameters += "zipCode=" + searchParameters.zipCode + "&";
    }
    if (searchParameters.fullAddress) {
        parameters += "fullAddress=" + searchParameters.fullAddress + "&";
    }
    if (searchParameters.AcceptanceRate) {
        parameters += "AcceptanceRate=" + searchParameters.AcceptanceRate + "&";
    }
    if (searchParameters.retentionRate) {
        parameters += "retentionRate=" + searchParameters.retentionRate + "&";
    }
    if (searchParameters.institutionType) {
        parameters += "institutionType=" + searchParameters.institutionType + "&";
    }
    if (searchParameters.studentPopulation) {
        parameters += "studentPopulation=" + searchParameters.studentPopulation + "&";
    }
    if (searchParameters.classSize) {
        parameters += "classSize=" + searchParameters.classSize;
    }

    return parameters;

}
/*
This function will be used when the update button is used in the page
 */
function update() {

    searchOptions();

    constructSearch();
}



/*
This function should show a warning that no search results are available and return the user to the previous page
 */
function noResultsAvailable() {

    alert("No results available. Returning to previous page");

    window.location.href="searchPage.html"
}