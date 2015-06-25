app.controller('ConfigMasterCtrl', function ($scope, AppService, CommonStubService, MasterConfig, $ionicLoading, MasterStubService) {
	
	// Show loading until user logs in
    $scope.showLoadding = $ionicLoading.show({
		template: '<ion-spinner icon="android"></ion-spinner>'
	});
	
	// Check if the user is logged in
	MasterStubService.loginCheckMaster()
        .success(function (data) {
            // Set userLogged - 0:Not logged 1:Logged
            if (data.response != 0) {
                $scope.isLogged = 1;
            } else {
                $scope.isLogged = 0;
            }
            console.log("isLogged: " + $scope.isLogged);
            $ionicLoading.hide();
        }).error(function (error) {
            console.log("Unable to check login: " + error);
            $ionicLoading.hide();
        });

    // COMMENT LATER
    //$scope.isLogged = 1;

	/* RIGHT NOW I HAVE TO FORCE IT TO BE LOGGED IN */
		//$scope.isLogged = 1;

	$scope.registerInformation = {
		password: false,
		repeatPassword: false,
		repeatEmail: false
	}

	$scope.doMasterLogout = function() {
		console.log('Logout pressed');

		MasterStubService.logoutMaster()
		.success(function (data) {
			$scope.showLoadding = $ionicLoading.show({
				template: '<ion-spinner icon="android"></ion-spinner>'
			});

			MasterStubService.loginCheckMaster()
	        .success(function (data) {
	            // Set userLogged - 0:Not logged 1:Logged
	            if (data.response != 0) {
	                $scope.isLogged = 1;
	            } else {
	                $scope.isLogged = 0;
	            }
	            console.log("isLogged: " + $scope.isLogged);
	            $ionicLoading.hide();
	        }).error(function (error) {
	            console.log("Unable to check login: " + error);
	            $ionicLoading.hide();
	        });

			$ionicLoading.hide();

			console.log('Logout succeded!');
			console.log('isLogged: ' + $scope.isLogged);
		}).error(function (error) {
			console.log('isLogged: ' + $scope.isLogged);
			console.log('Error on logout: ' + error);
		});
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