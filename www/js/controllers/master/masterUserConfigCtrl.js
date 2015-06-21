app.controller('MasterUserConfigCtrl', function ($scope, $state, $ionicHistory, $ionicPopup, $ionicLoading, $ionicModal, AppService, MasterStubService, MasterConfig, Countries) {	
	
	$scope.masterInfo = MasterConfig;
	$scope.isFormValid = false;
	$scope.countries = Countries;
	
	/* FOR NOW I HAVE TO USE DUMMY DATA */
	
    /*$scope.showLoadding = $ionicLoading.show({
         template: '<ion-spinner icon="android"></ion-spinner>'
    });
	
	MasterStubService.loginCheckMaster().success(function (data) {
		console.log(data);
		login = data.response;
		
		/* Assign Recieved Data To MasterFactory */
		/* TODO --- CALL FUNCTION HERE TO ASSIGN *
		
		$ionicLoading.hide();
	}).error(function (error) {
		$scope.loginCheckResult = 'Unable to load data: ' + error;
		console.log(error);
		$ionicLoading.hide();
		$scope.showFailLoginAlert();
	});*/
	
	
	/* Fail to get MasterInfData */
    // An alert dialog
    $scope.showFailLoginAlert = function() {
      var alertPopup = $ionicPopup.alert({
		  cssClass: "alert-danger",
        title: 'Something is not right',
        template: 'Something went wrong while getting your data.\n Please go back and try again'
      });
      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
		$ionicHistory.nextViewOptions({
		    disableBack: true
		 });
		$state.go('app.masterconfig');
      });
    };
	
	$scope.isMFormInvalid = function (submitedForm){
		return submitedForm.$invalid;
	};
	
	$scope.registerMasterInfo = function(submitedForm){
		//In case is logged is a change data
		var result;
		var login;
		
		console.log(submitedForm);
		return;
		
		if(submitedForm.$valid){
			
		}

		if(login == 0){
			MasterStubService.createMaster(submitedForm.accessData.email, submitedForm.accessData.password,"teste",null,
			submitedForm.personalData.phone, "Rua da estrada", submitedForm.personalData.zipCode, submitedForm.personalData.country.countryName, submitedForm.association.description, 
			submitedForm.association.pageLink, submitedForm.association.videoLink)
			.success(function (data) {
				if(data.response == 0){
					for(var key in data.errors) {
						var value = data.errors[key];
						console.log(value);	
					}
				}
			})
			.error(function (error) {
				$scope.createMasterResult = 'Unable to load data: ' + error;
			});
		}else{
			MasterStubService.updateMasterPersonalConfig(0, 2, "teste3", null,
			submitedForm.personalData.phone, "Rua Alterada", submitedForm.personalData.zipCode, submitedForm.personalData.country,submitedForm.association.description, 
			submitedForm.association.pageLink, submitedForm.association.videoLink)
			.success(function (data){
				console.log(data);
				$scope.updateMasterConfigResult = data.response;
				if(data == 0){
					Console.log("Error updating");
				}
			})
			.error(function (error) {
				$scope.updateMasterConfigResult = 'Unable to load data: ' + error;
			});
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