function gpaController ($scope, $mdDialog, searchService) {


    $scope.close = function() {
        $mdDialog.hide();
    };
    $scope.submit = function(answer) {


        var gpaVal = convertGPA($scope.gpa.number, $scope.gpa.gpaOutof);

        searchService.setGPA(gpaVal);
        $mdDialog.hide(answer);
    };




    function convertGPA(num, outOf) {
        var temp = (num)/(eval(outOf));
         return temp * 4 ;

    }
};