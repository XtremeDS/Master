app.controller('MasterUserConfigCtrl', function ($scope, $ionicModal, AppService, CommonStubService, MasterConfig, Countries) {
	
	$scope.masterInfo = MasterConfig;
	$scope.isFormValid = false;
	$scope.countries = Countries;
	
	$scope.registerMasterInfo = function(submitedForm){
		//In case is logged is a change data
		console.log(submitedForm.masterEmail.$viewValue);
		console.log(!submitedForm.$invalid);
		if(!submitedForm.$invalid){
			/* Call Stub */
			
		}
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
	
	$scope.openChooseCountryModal = function(){
		$scope.countryModal.show();
	}
	
	$scope.closeChooseCountryModal = function(){
		$scope.countryModal.hide();
	}
	
	$scope.countrySelection = function(shortName, name){
		$scope.masterInfo.personalData.country = {
			country: shortName.toLowerCase(),
			countryName: name
		}
		
		$scope.countryModal.hide();
	}
	
});