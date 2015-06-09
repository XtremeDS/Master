app.controller('ConfigMasterCtrl', function ($scope, AppService, CommonStubService) {

	$scope.registerInformation = {
		password: false,
		repeatPassword: false,
		repeatEmail: false
	}
	
	// Set userLogged - 0:Not logged 1:Logged
    $scope.isLogged = AppService.getIsLogged();

	$scope.masterInfo = {
		accessData:{
			email:false,
			repeatEmail:false,
			password:false,
			repeatPassword:false
		},
		personalData:{
			name:false,
			phone:false,
			zipCode:false,
			country:false
		},
		association:{
			name:false,
			videoLink:false,
			pageLink:false,
			description:false
		}
	};	

	$scope.doMasterLogout = function() {
		console.log('Logou pressed');
	};
});