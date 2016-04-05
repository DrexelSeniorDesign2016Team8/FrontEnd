/*
This function should show a warning that no search results are available and return the user to the previous page
 */
function noResultsAvailable() {

    alert("No results available. Please refine results");
    $("#refineSearchButton").click()
}
