app.controller('ConfigMasterCtrl', function ($scope, AppService, CommonStubService, MasterConfig) {
	
	$scope.masterInfo = MasterConfig;

	$scope.registerInformation = {
		password: false,
		repeatPassword: false,
		repeatEmail: false
	}
	
	// Set userLogged - 0:Not logged 1:Logged
    $scope.isLogged = 1;

	$scope.doMasterLogout = function() {
		console.log('Logout pressed');
	};
});