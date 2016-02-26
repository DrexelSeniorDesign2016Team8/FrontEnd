
function fullRecordController ($scope, items, $mdDialog, $mdMedia) {

    $scope.items=items;

    $scope.college=$scope.items;



$scope.hide = function() {
    $mdDialog.hide();
};
$scope.cancel = function() {
    $mdDialog.cancel();
};
};/**
 * Created by ianshinbro on 2/23/2016.
 */