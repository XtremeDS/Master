/**
 * Created by joaosilva on 25/05/15.
 */
app.controller('EventsCtrl', function ($scope, AppService, CommonStubService) {
    console.log("inEvent: "+ AppService.getInEvent());

    $scope.isLogged = AppService.getIsLogged();

    $scope.inEvent = AppService.getInEvent();

    $scope.eventsList = ["Evento de Leiria", "Evento de Lisboa"];

    $scope.myGoBack = function() {
        $ionicHistory.goBack();
    };

    $scope.showJoinEventPopup = function () {
        $scope.joinEvent = {};

        // An elaborate, custom popup
        var joinEventPopup = $ionicPopup.show({
            template: '<input type="password" style="text-align: center" ng-model="joinEvent.pin">',
            title: 'Enter pin',
            subTitle: 'Please enter event pin to join. It must be 4 digits.',
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Enter</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.joinEvent.pin) {
                            //don't allow the user to close unless he enters a message
                            e.preventDefault();
                        } else {
                            if ($scope.joinEvent.pin.length != 4) {
                                //don't allow the user to close unless he enters a message
                                e.preventDefault();
                            }else {
                                if (parseInt($scope.joinEvent.pin) <= 1000 && parseInt($scope.joinEvent.pin) >= 10000) {
                                    //don't allow the user to close unless he enters a message
                                    e.preventDefault();
                                }else {
                                    console.log("pin: "+ parseInt($scope.joinEvent.pin));
                                    return $scope.joinEvent.pin;
                                }
                            }
                        }
                    }
                }
            ]
        });
        joinEventPopup.then(function (res) {
            $scope.loadingEnteringEvent = $ionicLoading.show({
                content: 'Entering event',
                showBackdrop: false
            });
            console.log('Tapped!', res);
            $timeout(function () {
                AppService.setInEvent(1);
                joinEventPopup.close();
                $scope.loadingEnteringEvent.hide();
                $scope.myGoBack();
            }, 1000);
        });
    };

    $scope.getAllEvents = function(){
        console.log("Entras!");
        CommonStubService.getAllEvents()
            .success(function (data) {
                $scope.getAllEventsResult = data.response;
                console.log($scope.getAllEventsResult);
            })
            .error(function (error) {
                $scope.getAllEventsResult = 'Unable to load data: ' + error;
                console.log($scope.getAllEventsResult);
            });
        };
});