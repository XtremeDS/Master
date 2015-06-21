app.controller('ConfigMasterCtrl', function ($scope, AppService, CommonStubService, MasterConfig, $ionicLoading, MasterStubService) {
	
	/*$scope.showLoadding = $ionicLoading.show({
		template: '<ion-spinner icon="android"></ion-spinner>'
		});
	
		MasterStubService.loginCheckMaster().success(function (data) {
		// Set userLogged - 0:Not logged 1:Logged
		$scope.isLogged = 1;
		$ionicLoading.hide();
		}).error(function (error) {
		// Set userLogged - 0:Not logged 1:Logged
		$scope.isLogged = 0;
		$ionicLoading.hide();
		$scope.showFailLoginAlert();
		});*/
		
		/* RIGHT NOW I HAVE TO FORCE IT TO BE LOGGED IN */
		$scope.isLogged = 1;

		$scope.registerInformation = {
			password: false,
			repeatPassword: false,
			repeatEmail: false
		}

		$scope.doMasterLogout = function() {
			console.log('Logout pressed');
		};
	
		/* Fail to get MasterInfData */
		// An alert dialog
		$scope.showFailLoginAlert = function() {
			var alertPopup = $ionicPopup.alert({
				cssClass: "alert-danger",
				title: 'Something is not right',
				template: 'Please try again'
			});
			alertPopup.then(function(res) {
		  
			});
		};
	});