app.controller('ZoneCtrl', function ($scope, Map, CoordinatesConverter, CommonStubService, MasterStubService, $controller, $q, $ionicPopup, $rootScope, $ionicModal) {
	
	$scope.login = function (username, password) {
		MasterStubService.login(username, password)
		.success(function (data) {
			$scope.loginResult = data.response;
		})
		.error(function (error) {
			$scope.loginResult = 'Unable to load data: ' + error;
		});
	};
	
	$scope.getAllMasterZones = function () {
		MasterStubService.getAllMasterZones().success(function (data) {
			console.log(data);
			if (data.response === 1) {
				$scope.zones = data.list;
				$scope.getZoneCoordinates($scope.selectedZone);
			}
		}).error(function (error) {
			$scope.getAllMasterZonesResult = 'Unable to load data: ' + error;
		});
	};
	
	$scope.selectedZone = undefined;
	$scope.selectedZoneType = undefined;
	$scope.zoneInEdition = {};
	$scope.zoneTypeInEdition = {};
	$scope.getAllZoneTypes = function () {
		MasterStubService.getAllZoneTypes().success(function (data) {
			if (data.response === 1) {
				$scope.zoneTypes = data.list;
			}
		}).error(function (error) {
			$scope.error = 'Unable to load data: ' + error;
		});
	};
	$scope.mapCreated = function (map) {
		$scope.map = map;
		//angular.extend(this, $controller('CommonController', {$scope: $scope}));
		//angular.extend(this, $controller('MasterController', {$scope: $scope}));


		$scope.login('master01@socom.com', 'master01');
		$scope.getAllZoneTypes();
		$scope.getAllMasterZones();

	};
	$scope.getZoneType = function (selectedZoneType) {
		$scope.zoneTypeInEdition.id = selectedZoneType;
	};
	$scope.getZoneCoordinates = function (selectedZone) {
		console.log(selectedZone);
		$scope.selectedZone = selectedZone;
		//TODO: refresh controls
		if ($scope.map.map.hasLayer($scope.currentLayer)) {
			$scope.map.map.removeLayer($scope.currentLayer);
		}
		$scope.selectedzoneCoordinates = []; //LatLng
		if ($scope.currentLayer) {
			$scope.map.map.removeLayer($scope.currentLayer);
		}
		if (selectedZone != undefined && selectedZone != null) {
			MasterStubService.getZoneCoordByMasterZoneId(selectedZone).success(function (data) {
				if (data.response === 1) {
					var converter = new CoordinatesConverter();
					$scope.selectedzoneCoordinates = [];
					angular.forEach(data.list, function (coordinate) {
						converter.latitude.setDMS(coordinate.lat_d, coordinate.lat_m, coordinate.lat_s, coordinate.lat_c);
						converter.longitude.setDMS(coordinate.lng_d, coordinate.lng_m, coordinate.lng_s, coordinate.lng_c);
						$scope.selectedzoneCoordinates.push(new L.LatLng(converter.getLatitude(), converter.getLongitude()));
					});
					console.log($scope.selectedzoneCoordinates);
					if ($scope.selectedzoneCoordinates.length > 0) {
						$scope.currentLayer = new L.Polygon($scope.selectedzoneCoordinates, {color: 'red'});
						$rootScope.$broadcast('layerAdded', $scope.currentLayer);
					} else {
						$rootScope.$broadcast('layerRemoved');
					}
					$scope.zoneInEdition = {};
					angular.forEach($scope.zones, function (zone) {
						if (zone.id == selectedZone) {
							$scope.zoneInEdition = angular.copy(zone);
							if ($scope.zoneInEdition.capture_points !== undefined) {
								$scope.zoneInEdition.capture_points = parseInt($scope.zoneInEdition.capture_points);
							}
						}
					});
					$scope.getZoneType($scope.zoneInEdition.zone_id);
				}
			});
		}
		else {
			$scope.zoneInEdition = {};
			$scope.zoneTypeInEdition = {};
			$rootScope.$broadcast('layerRemoved');
		}
	};
	$scope.$on('zoneDefined', function (event, layer) {
		angular.forEach(layer.getLatLngs(), function (coordinate) {
			var converter = new CoordinatesConverter();
			converter.setLatitude(coordinate.lat);
			converter.setLongitude(coordinate.lng);
			var coord = {
				lat_c: converter.latitude.getDirection(),
				lat_d: converter.latitude.getDegrees(),
				lat_m: converter.latitude.getMinutes(),
				lat_s: converter.latitude.getSecondsDecimal(),
				lng_c: converter.longitude.getDirection(),
				lng_d: converter.longitude.getDegrees(),
				lng_m: converter.longitude.getMinutes(),
				lng_s: converter.longitude.getSecondsDecimal()
			};
			$scope.selectedzoneCoordinates.push(coord);
		});
		$scope.currentLayer = layer;
		$rootScope.$broadcast('layerAdded', $scope.currentLayer);
	});
	$scope.$on('zoneUpdated', function (event, layer) {
		$scope.selectedzoneCoordinates = [];
		angular.forEach(layer.getLatLngs(), function (coordinate) {
			var converter = new CoordinatesConverter();
			converter.setLatitude(coordinate.lat);
			converter.setLongitude(coordinate.lng);

			var coord = {
				lat_c: converter.latitude.getDirection(),
				lat_d: converter.latitude.getDegrees(),
				lat_m: converter.latitude.getMinutes(),
				lat_s: converter.latitude.getSecondsDecimal(),
				lng_c: converter.longitude.getDirection(),
				lng_d: converter.longitude.getDegrees(),
				lng_m: converter.longitude.getMinutes(),
				lng_s: converter.longitude.getSecondsDecimal()
			};
			$scope.selectedzoneCoordinates.push(coord);
		});
		$scope.currentLayer = layer;
		//$rootScope.$broadcast('layerAdded', $scope.currentLayer);
	});
	$scope.save = function () {
		var saveCoords = function (selectedZoneId) {
			console.log(selectedZoneId);
			MasterStubService.getZoneCoordByMasterZoneId(selectedZoneId).success(function (data) {
				if (data.response === 1) {
					console.log(data);
					angular.forEach(data.list, function (coordinate) {
						MasterStubService.deleteZoneCoord(coordinate.id).success(function (data) {
							console.log(data);
						}).error(function (error) {

						});
					});
					angular.forEach($scope.selectedzoneCoordinates, function (coordinate) {
						MasterStubService.createZoneCoord(
							selectedZoneId,
							coordinate.lat_c,
							coordinate.lat_d,
							coordinate.lat_m,
							coordinate.lat_s,
							coordinate.lng_c,
							coordinate.lng_d,
							coordinate.lng_m,
							coordinate.lng_s)
							.success(function (data) {
							}).error(function (error) {
							});
						});
						$scope.getAllZoneTypes();
						$scope.getAllMasterZones();
						$scope.getZoneCoordinates($scope.selectedZone);
					}
				});
			};
			if ($scope.zoneInEdition.id === undefined) {
				console.log($scope.zoneInEdition);
				console.log($scope.zoneTypeInEdition);
				MasterStubService.createMasterZone($scope.zoneTypeInEdition.id, $scope.zoneInEdition.description, $scope.zoneInEdition.capture_points)
				.success(function (data) {
					saveCoords(data.response);
				}).error(function (error) {
					console.log(error);
				});
			} else {
				MasterStubService.updateMasterZone($scope.zoneInEdition.id, $scope.zoneTypeInEdition.id, $scope.zoneInEdition.description, $scope.zoneInEdition.capture_points)
				.success(function (data) {
					saveCoords($scope.zoneInEdition.id);
				}).error(function (error) {
					console.log(error);
				});
			}
		};
		$scope.cancel = function () {
			//TODO: refresh controls
			$scope.zoneInEdition = {};
			$scope.zoneTypeInEdition = {};
			$scope.getZoneCoordinates($scope.selectedZone);
		};
		$scope.removeZone = function () {
			var confirmPopup = $ionicPopup.confirm({
				title: "Confirm removal",
				template: 'If you preceed, the selected zone will be deleted and you will no longer have access to it!',
				scope: $scope
			});
			confirmPopup.then(function (res) {
				if (res) {
					MasterStubService.deleteMasterZone($scope.selectedZone);
					$scope.selectedZone = undefined;
					$scope.selectedZoneType = undefined;
					$scope.zoneInEdition = {};
					$scope.zoneTypeInEdition = {};
					$scope.getAllZoneTypes();
					$scope.getAllMasterZones();
					$scope.getZoneCoordinates($scope.selectedZone);
				}
			});
		}

		$scope.manageZoneTypes = function () {
			$ionicModal.fromTemplateUrl("templates/zone_types_modal.html", {
				controller: "ZoneTypeCtrl",
				animation: 'slide-in-up'
			}).then(function (modal) {
				($scope.modal = modal).show();
			});
		}

		$scope.$on('zoneTypesModalClosed', function () {
			console.log('asdas');
			$scope.getAllZoneTypes();
			$scope.getAllMasterZones();
			$scope.getZoneCoordinates($scope.selectedZone);
			$scope.modal.remove();
		});

	})
	.controller('ZoneTypeCtrl', function ($scope, Map, CoordinatesConverter, CommonStubService, MasterStubService, $controller, $q, $ionicPopup, $rootScope) {
		$scope.getMasterZoneTypes = function () {
			MasterStubService.getMasterDefinedZoneTypes()
			.success(function (data) {
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