/**
 * Created by joaosilva on 25/05/15.
 */
app.controller('EventsCtrl', function ($scope, AppService, MasterStubService, EventInfoService) {
    $scope.data = {
        showDelete: false,
        showReorder: false,
        canSwipe: true
    };

    console.log("inEvent: "+ AppService.getInEvent());

    // UNCOMMENT LATER
    /*MasterStubService.loginCheckMaster()
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
        });*/

    // COMMENT LATER
    $scope.isLogged = 1;

    $scope.inEvent = AppService.getInEvent();

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

    //what to do when editing..
    $scope.edit = function (item) {
        alert('Edit Item: ' + item.id);
    };

    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    //what to do when deleting
    $scope.onItemDelete = function (itemIndex) {
        eventIdToDelete = $scope.items[itemIndex].id;
        MasterStubService.deleteEvent(eventIdToDelete);
        console.log("Successfully deleted event with the ID: " + eventIdToDelete);
        $scope.items.splice($scope.items.indexOf(itemIndex), 1);
    };

    // Reading the events from the server and displaying them on the interface
    function retrieveEvents(){
        var allEvents;
        MasterStubService.getAllMasterEvents()
            .success(function (data) {
                allEvents = data.list;
                console.log("SUCCESS in retrieving events from server!");
                //console.log(allEvents[0]['name']);

                $scope.items = ([]);
                for (i = 0; i < allEvents.length; i++) { 
                    $scope.items.push({id: allEvents[i]['id'], name: allEvents[i]['name'], description: allEvents[i]['description_briefing']});
                    //console.log($scope.items);
                }
            })
            .error(function (error) {
                console.log('Unable to retrieve events from server:' + error.message);
        });
    }
    retrieveEvents();
});