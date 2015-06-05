app.controller('ConfigMasterCtrl', function ($scope, AppService, CommonStubService) {

	// Set userLogged - 0:Not logged 1:Logged
    $scope.isLogged = AppService.getIsLogged();

	$scope.masterInfo = {};

	$scope.doMasterLogout = function(){
		console.log('Logou pressed');
	}
	;
});