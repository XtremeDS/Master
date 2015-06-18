app.controller('ZoneTypeCtrl', function ($scope, Map, CoordinatesConverter, CommonStubService, MasterStubService, $controller, $q, $ionicPopup, $rootScope) {
	
	$scope.getMasterZoneTypes = function () {
		MasterStubService.getMasterDefinedZoneTypes()
		.success(function (data) {
			console.log(data);
			$scope.masterZones = data.list;
		})
		.error(function (error) {
			console.log(error);
		});
	};
	
	$scope.masterZoneTypeInEdition = {};
	$scope.masterZoneTypeSelected = {};
	$scope.getMasterZoneTypes();
	$scope.getMasterZoneType = function (selectedZoneType) {
		$scope.masterZoneTypeInEdition = selectedZoneType ? {
			id: selectedZoneType.id,
			name: selectedZoneType.name
		} : {};
	};
	
	$scope.cancelMasterZoneType = function () {
		$scope.masterZoneTypeInEdition = {};
		angular.forEach($scope.masterZones, function (zoneType) {
			if (zoneType.id == $scope.masterZoneTypeSelected.id) {
				$scope.getMasterZoneType($scope.masterZoneTypeSelected);
			}
		});
	};
	
	$scope.saveMasterZoneType = function () {
		if ($scope.masterZoneTypeSelected && $scope.masterZoneTypeInEdition.id && $scope.masterZoneTypeInEdition.id > 0) {
			MasterStubService.updateZoneType($scope.masterZoneTypeInEdition.id, $scope.masterZoneTypeInEdition.name)
			.success(function (data) {
				$scope.masterZoneTypeInEdition = {};
				$scope.masterZoneTypeSelected = {};
				$scope.getMasterZoneTypes();
			})
			.error(function (error) {
				console.log(error);
			});
		} else {
			MasterStubService.createZoneType($scope.masterZoneTypeInEdition.name)
			.success(function (data) {
				$scope.masterZoneTypeInEdition = {};
				$scope.masterZoneTypeSelected = {};
				$scope.getMasterZoneTypes();
			})
			.error(function (error) {
				console.log(error);
			});
		}
	};
	
	$scope.deleteMasterZoneType = function () {
		var confirmPopup = $ionicPopup.confirm({
			title: "Confirm removal",
			template: 'If you preceed, the selected zone type will be deleted and you will no longer have access to it!',
			scope: $scope
		});
		confirmPopup.then(function (res) {
			if (res) {
				MasterStubService.deleteZoneType($scope.masterZoneTypeInEdition.id)
				.success(function (data) {
					$scope.masterZoneTypeInEdition = {};
					$scope.masterZoneTypeSelected = {};
					$scope.getMasterZoneTypes();
				})
				.error(function (error) {
					console.log(error);
				});
			}
		});

	};
	
	$scope.closeModal = function () {
		$rootScope.$broadcast('zoneTypesModalClosed');
	}
});