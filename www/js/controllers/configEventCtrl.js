app.controller('ConfigEventCtrl', function ($scope) {
    $scope.data = {
        map: 'Not choosen',
        showDelete: false,
        showReorder: false,
        canSwipe: true
    };

    //what to do when editing..
    $scope.edit = function (item) {
        alert('Edit Item: ' + item.id);
    };

    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    //what to do when deleting
    $scope.onItemDelete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    //TODO: Load from backend
    $scope.rates = [{id: 1, rate: '0%'}, {id: 2, rate: '15%'}, {id: 3, rate: '30%'}];
    $scope.minRefRateSelected = {id: 1, rate: '0%'};
    $scope.maxRefRateSelected = {id: 3, rate: '0%'};

    $scope.tarList = [{id: 1, name: 'T.A.R. 1'}, {id: 2, name: 'T.A.R. 2'}, {id: 3, name: 'T.A.R. 3'}];
    $scope.oprList = [{id: 1, name: 'O.P.R. 1'}, {id: 2, name: 'O.P.R. 2'}, {id: 3, name: 'O.P.R. 3'}];
})

app.controller('MasterMapsCtrl', function($scope){
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;

    this.maps = $scope.masterData.maps;
})
