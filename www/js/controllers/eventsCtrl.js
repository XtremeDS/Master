/**
 * Created by joaosilva on 25/05/15.
 */
app.controller('EventsCtrl', function ($scope, AppService, MasterStubService) {
    $scope.data = {
        showDelete: false,
        showReorder: false,
        canSwipe: true
    };

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
        console.log("Searching for events!");
        MasterStubService.getAllMasterEvents()
            .success(function (data) {
                $scope.items = data.response;
                console.log($scope.getAllEventsResult);
            })
            .error(function (error) {
                $scope.items = 'Unable to load data: ' + error;
                console.log($scope.getAllEventsResult);
            });
        };

    //what to do when editing..
    $scope.edit = function (item) {
        alert('Edit Item: ' + item.id);
    };

    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    //what to do when deleting
    $scope.onItemDelete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    //TODO : Read data from back-end instead of dummy data
    /*$scope.items = [{id: 1, name: "Event 1", location: "Leiria"},
        {id: 2, name: "Event 2", location: "Lisboa"},
        {id: 3, name: "Event 3", location: "Porto"},
        {id: 4, name: "Event 4", location: "Aveiro"},
        {id: 5, name: "Event 5", location: "Coimbra"},
        {id: 6, name: "Event 6", location: "Braga"},
        {id: 7, name: "Event 7", location: "Santarém"},
        {id: 8, name: "Event 8", location: "Viana do Castelo"}];*/
});