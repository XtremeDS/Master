/**
 * Created by joaosilva on 25/05/15.
 */
app.controller('SettingsCtrl', function ($scope, $ionicLoading, $timeout, AppService) {
    // Set appType - 0:Operator 1:ComSys 2:Master
    $scope.appType = AppService.getAppType();

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

    $scope.saveIPs = function () {
        $scope.loadingSaveIPs = $ionicLoading.show({
            content: 'Saving server IPs information',
            showBackdrop: false
        });
        $timeout(function () {
            $scope.loadingSaveIPs.hide();
        }, 1000);
    };
});