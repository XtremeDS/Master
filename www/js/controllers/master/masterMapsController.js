app.controller('MasterMapsCtrl', function ($scope, MasterZones, $state, $ionicHistory, $ionicPopup, $ionicLoading, $ionicModal, AppService, MasterStubService, MasterConfig, Countries) {
	console.log('Here at Zones Controller');
	
	$scope.maps = MasterZones;
	
	/* Loading Zones */
	/*$scope.showLoadding = $ionicLoading.show({
		template: '<ion-spinner icon="android"></ion-spinner>'
	});*/

	
	
	/* Load Zones From Server */
	/* PLEASE ADD THE MasterStubFuntion TO Load ZOnes Here */
	/* We have a Factory for this kind of data. Suggested Steps */
	/* 1 - Load the data from Stub */
	/* 2 - Cycl it */
	/* 3 - Push new Item into Factory */

	MasterStubService.getAllMasterZones()
	.success(function (data) {
		console.log(data);
		if (data.response == 1) {
			$scope.maps = data.list;
		}
	}).error(function (error) {
		$scope.getAllMasterZonesResult = 'Unable to load zones from Master: ' + error;
	});
	
	/* Stucture (So Far) */
	/**
		{
			name: "Map 5",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
		}
	**/

	//what to do when deleting
    $scope.onItemDelete = function (itemIndex) {
        zoneIdToDelete = $scope.maps[itemIndex].id;
        //MasterStubService.deleteMasterZone(zoneIdToDelete);
        console.log("Successfully deleted zone with the ID: " + zoneIdToDelete);
        $scope.maps.splice($scope.maps.indexOf(itemIndex), 1);
    };
	
});