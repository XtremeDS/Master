app.controller('ConfigMasterCtrl', function ($scope, AppService, CommonStubService) {
	console.log("isLogged: "+ AppService.getIsLogged());

	// Set userLogged - 0:Not logged 1:Logged
    $scope.isLogged = AppService.getIsLogged();

	$scope.masterInfo = {};
});