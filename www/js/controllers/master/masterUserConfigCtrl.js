app.controller('MasterUserConfigCtrl', function ($scope, $ionicModal, AppService, CommonStubService, MasterConfig) {
	
	$scope.masterInfo = MasterConfig;
	$scope.isFormValid = false;
	
	$scope.registerMasterInfo = function(sbmitedMasterInfo, isLogged){
		//In case is logged is a change data
	}
	
	/* Choose Country Modal */
	$ionicModal.fromTemplateUrl('templates/modals/choose-country.html', function(modal) {
		$scope.countryModal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});
	
	// Open choose country modal
	$scope.newTask = function() {
		$scope.countryModal.show();
	};

	// Close country modal
	$scope.closeNewTask = function() {
		$scope.countryModal.hide();
	};
	
});