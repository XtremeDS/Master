/**
 * Created by joaosilva on 25/05/15.
 */
app.controller('SettingsCtrl', function ($scope, $ionicLoading, $timeout, AppService) {
    // Set appType - 0:Operator 1:ComSys 2:Master
    $scope.appType = AppService.getAppType();

    // Set userLogged - 0:Not logged 1:Logged
    $scope.isLogged = AppService.getIsLogged();

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