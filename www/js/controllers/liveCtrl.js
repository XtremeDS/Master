app.controller('LiveCtrl', function ($scope, $ionicLoading, $timeout, $ionicPopup, $ionicModal, AppService, Squad, Operator, Specialization, Hostile, CoordinatesConverter, Direction, MasterStubService, CommonStubService) {
    // Set appType - 0:Operator 1:ComSys 2:Master
    $scope.appType = AppService.getAppType();
    $scope.mapCreated = function (map) {
        console.log(map);
        $scope.map = map;
        $scope.map.addSquad(new Squad(1));
        var requestResult = [
            {
                lat_c: "N",
                lat_d: 39,
                lat_m: 44,
                lat_s: 58.57,
                lng_c: "W",
                lng_d: 8,
                lng_m: 48,
                lng_s: 42.76
            },
            {
                lat_c: "N",
                lat_d: 39,
                lat_m: 44,
                lat_s: 50.08,
                lng_c: "W",
                lng_d: 8,
                lng_m: 48,
                lng_s: 33.8
            },
            {
                lat_c: "N",
                lat_d: 39,
                lat_m: 44,
                lat_s: 6.28,
                lng_c: "W",
                lng_d: 8,
                lng_m: 48,
                lng_s: 57.31
            },
            {
                lat_c: "N",
                lat_d: 39,
                lat_m: 43,
                lat_s: 30.24,
                lng_c: "W",
                lng_d: 8,
                lng_m: 47,
                lng_s: 19.96
            },
            {
                lat_c: "N",
                lat_d: 39,
                lat_m: 42,
                lat_s: 15.13,
                lng_c: "W",
                lng_d: 8,
                lng_m: 44,
                lng_s: 42.23
            },
            {
                lat_c: "N",
                lat_d: 39,
                lat_m: 42,
                lat_s: 17.7,
                lng_c: "W",
                lng_d: 8,
                lng_m: 42,
                lng_s: 42.34
            },
            {
                lat_c: "N",
                lat_d: 39,
                lat_m: 44,
                lat_s: 49.28,
                lng_c: "W",
                lng_d: 8,
                lng_m: 41,
                lng_s: 53.72
            },
            {
                lat_c: "N",
                lat_d: 39,
                lat_m: 45,
                lat_s: 47.75,
                lng_c: "W",
                lng_d: 8,
                lng_m: 46,
                lng_s: 7.38
            },
            {
                lat_c: "N",
                lat_d: 39,
                lat_m: 44,
                lat_s: 58.57,
                lng_c: "W",
                lng_d: 8,
                lng_m: 48,
                lng_s: 42.47
            }
        ];
        var zoneResult = [
            {
                lat_c: "N",
                lat_d: 38,
                lat_m: 43,
                lat_s: 57.57,
                lng_c: "W",
                lng_d: 7,
                lng_m: 47,
                lng_s: 41.76
            },
            {
                lat_c: "N",
                lat_d: 38,
                lat_m: 43,
                lat_s: 49.08,
                lng_c: "W",
                lng_d: 7,
                lng_m: 47,
                lng_s: 32.8
            },
            {
                lat_c: "N",
                lat_d: 38,
                lat_m: 43,
                lat_s: 5.28,
                lng_c: "W",
                lng_d: 7,
                lng_m: 47,
                lng_s: 56.31
            },
            {
                lat_c: "N",
                lat_d: 38,
                lat_m: 42,
                lat_s: 29.24,
                lng_c: "W",
                lng_d: 7,
                lng_m: 46,
                lng_s: 18.96
            },
            {
                lat_c: "N",
                lat_d: 38,
                lat_m: 41,
                lat_s: 14.13,
                lng_c: "W",
                lng_d: 7,
                lng_m: 43,
                lng_s: 41.23
            },
            {
                lat_c: "N",
                lat_d: 38,
                lat_m: 41,
                lat_s: 16.7,
                lng_c: "W",
                lng_d: 7,
                lng_m: 41,
                lng_s: 41.34
            },
            {
                lat_c: "N",
                lat_d: 38,
                lat_m: 43,
                lat_s: 48.28,
                lng_c: "W",
                lng_d: 7,
                lng_m: 40,
                lng_s: 52.72
            },
            {
                lat_c: "N",
                lat_d: 38,
                lat_m: 44,
                lat_s: 46.75,
                lng_c: "W",
                lng_d: 7,
                lng_m: 45,
                lng_s: 6.38
            },
            {
                lat_c: "N",
                lat_d: 38,
                lat_m: 43,
                lat_s: 57.57,
                lng_c: "W",
                lng_d: 7,
                lng_m: 47,
                lng_s: 41.47
            }
        ];
        var coordinates = []; //LatLng
        var converter = new CoordinatesConverter();
        angular.forEach(requestResult, function (coordinate) {
            converter.latitude.setDMS(coordinate.lat_d, coordinate.lat_m, coordinate.lat_s, coordinate.lat_c);
            converter.longitude.setDMS(coordinate.lng_d, coordinate.lng_m, coordinate.lng_s, coordinate.lng_c);
            coordinates.push(new L.LatLng(converter.getLatitude(), converter.getLongitude()));
        });
        var zoneCoordinates = []; //LatLng
        converter = new CoordinatesConverter();
        angular.forEach(zoneResult, function (coordinate) {
            converter.latitude.setDMS(coordinate.lat_d, coordinate.lat_m, coordinate.lat_s, coordinate.lat_c);
            converter.longitude.setDMS(coordinate.lng_d, coordinate.lng_m, coordinate.lng_s, coordinate.lng_c);
            zoneCoordinates.push(new L.LatLng(converter.getLatitude(), converter.getLongitude()));
        });
        $scope.map.setGameZone(coordinates);
        $scope.map.addZone(1, 'xpto', zoneCoordinates, "#FFF");
        $scope.map.addSquad(new Squad(1));
        $scope.map.addOperator(1, new Operator(1, 1, 39.73669629664551, -8.727478981018065, Specialization.TRANSPORTATION));
        $scope.map.addOperator(1, new Operator(1, 12, 39.74669629664551, -8.727478981018065, Specialization.MEDIC));
        $scope.$on('enemyDetected', function (event, hostile) {
            console.log(hostile);
            $scope.map.addHostile(new Hostile(hostile.latitude, hostile.longitude, hostile.enemiesNumber, hostile.direction, hostile.timestamp));
        });
        $scope.map.addHostile(new Hostile(39.73669629664551, -8.727478981018065, '+7', Direction.NORTH_EAST, new Date().getTime() + 30000));//will appear
        $scope.map.addHostile(new Hostile(39.73669629664551, -8.737478981018065, '+7', Direction.NORTH_EAST, new Date().getTime() - 40000));//will appear
    };
    // Set userLogged - 0:Not logged 1:Logged
    //$scope.isLogged = AppService.getIsLogged();

    // Check if user is logged in
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

    $scope.isLogged = 1;

    // Set squadID - 0:Not in squad 1:In squad
    $scope.squadID = AppService.getSquadID();

    // Set squadLider - 0:Not in squad 1:In squad
    $scope.squadLider = AppService.getIsSquadLider();

    // Set specialisation
    $scope.specialisation = AppService.getSpecialisation();

    // Set eventReady
    $scope.eventReady = AppService.getEventReady();

    // Selected event from the list
    $scope.radio = {
        selectedEvent: {}
    };

    // Faction A data
    $scope.factionA = {
        id: '',
        pin: '',
        name: '',
        score: 0,
        squadIds: [],
        operators: []
    };

    // Faction B data
    $scope.factionB = {
        id: '',
        pin: '',
        name: '',
        score: 0,
        squadIds: [],
        operators: []
    };

    // Create the see active perks that we will use later
    $ionicModal.fromTemplateUrl('templates/operator/seeActivePerks.html', {
        scope: $scope
    }).then(function (modalSeeActivePerks) {
        $scope.modalSeeActivePerks = modalSeeActivePerks;
    });

    // Triggered in the see active perks modal to close it
    $scope.closeSeeActivePerksModal = function () {
        $scope.modalSeeActivePerks.hide();
    };

    // Open the see active perks modal
    $scope.openSeeActivePerksModal = function () {
        $scope.modalSeeActivePerks.show();
    };

    window.resumeEvent = function (container, stop) {
        var eventID = $scope.radio.selectedEvent.id;
        // Aqui resumir o timer e coisas assim
        $scope.blockUI(container, stop);
        $('.js-live-label').show();
        MasterStubService.startEvent(eventID).success(function (data) {
            // in case of error
            if (data.response !== 1) {
                var alertRequest = $ionicPopup.alert({
                    title: 'An error occurred while stopping the event',
                    template: 'Please try again.'
                });
                alertRequest.then(function (res) {
                    if (res) {

                    }
                });
            }
        });

    };
    $scope.blockUI = function (container, stop) {
        if ($($(container)).find('.blockUI').length > 0) $(container).find('.blockUI').remove();
        if (!stop) {
            $(container).append('<div class="blockUI"><div class="play-button"><a class="button button-icon icon ion-play custom-icon" onclick="window.resumeEvent(\'#view-live\',true)"></a></div></div>');
        }
    };

    $scope.stopEventAndSwitchView = function () {
        var eventID = $scope.radio.selectedEvent.id;
        $('.js-live-label').hide();
        $('.js-pause-button').hide();
        $('.js-stop-button').hide();
        MasterStubService.stopEvent(eventID).success(function (data) {
            // in case of error
            if (data.response !== 1) {
                var alertRequest = $ionicPopup.alert({
                    title: 'An error occurred while stopping the event',
                    template: 'Please try again.'
                });
                alertRequest.then(function (res) {
                    if (res) {

                    }
                });
            }
        });
        $scope.closeStopEventModal();
        $scope.showEventList();
    };

    $scope.closeStopEventModal = function () {
        $scope.modal.hide();
    };

    $scope.getAllFactionsScore = function (eventId) {
        CommonStubService.getAllFactionsScore(eventId).success(function (data) {
                $scope.factionA.score = data.response.a;
                $scope.factionB.score = data.response.b;
            }).error(function (error) {
                console.log(error);
                $scope.getAllFactionsScoreResult = 'Unable to load data: ' + error;
            });
    };

    $scope.pauseEvent = function () {
        var eventID = $scope.radio.selectedEvent.id;
        // Parar aqui o timer e coisas desse estilo
        $scope.blockUI('#view-live');
        $('.js-live-label').hide();
        MasterStubService.pauseEvent(eventID).success(function (data) {
            // in case of error
            if (data.response !== 1) {
                var alertRequest = $ionicPopup.alert({
                    title: 'An error occurred while pausing the event',
                    template: 'Please try again.'
                });
                alertRequest.then(function (res) {
                    if (res) {

                    }
                });
            }
        });
    };

    $scope.stopEvent = function () {
        $ionicModal.fromTemplateUrl('templates/modals/stop_event_modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
    };

    $scope.showEventList = function () {
        MasterStubService.getAllMasterEvents().success(function (data) {
            if (data.response === 1) {
                $scope.events = data.list;

                $ionicModal.fromTemplateUrl('templates/modals/show_all_events_modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    backdropClickToClose: false
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
                //Cleanup the modal when we're done with it!
                $scope.$on('$destroy', function () {
                    $scope.modal.remove();
                });
            }
        });
    };

    $scope.existsSquad = function (faction, squadID) {
        for (var i = 0; i < faction.squadIds.length; i++) {
            if (faction.squadIds[i] === squadID) {
                return true;
            }
        }
        return false;
    };

    $scope.startSelectedEvent = function () {
        var eventID = $scope.radio.selectedEvent.id;
        // prestart the event
        $('.js-live-label').show();
        $('.js-pause-button').show();
        $('.js-stop-button').show();
        MasterStubService.prestartEvent(eventID).success(function (data) {
            if (data.response === 1) {
                // start the event
                MasterStubService.startEvent(eventID).success(function (data) {
                    if (data.response === 1) {
                        // if event is successfully created, get the factions from this event
                        MasterStubService.getAllFactions(eventID).success(function (data) {
                            if (data.response === 2) {
                                $scope.getAllFactionsScore(eventID);
                                $scope.factionA.id = data.list[0].id;
                                $scope.factionA.name = data.list[0].name;
                                $scope.factionA.pin = data.list[0].pin;
                                $scope.factionA.id = data.list[1].id;
                                $scope.factionA.name = data.list[1].name;
                                $scope.factionA.pin = data.list[1].pin;
                                // if there are two factions to start the game, then request all the data from them
                                MasterStubService.viewAllFactions(eventID, function(data) {
                                    var counter = 0;
                                    angular.forEach(data, function(value, key) {
                                        if (counter === 0) {
                                            $scope.factionA.operators = value.operators;
                                            for (var i = 0; i < value.operators.length; i++) {
                                                if (!$scope.existsSquad($scope.factionA, value.operators[i].squad_id)) {
                                                    $scope.factionA.squadIds.push(value.operators[i].squad_id);
                                                }
                                            }
                                        } else {
                                            $scope.factionB.operators = value.operators;
                                            for (var i = 0; i < value.operators.length; i++) {
                                                if (!$scope.existsSquad($scope.factionB, value.operators[i].squad_id)) {
                                                    $scope.factionB.squadIds.push(value.operators[i].squad_id);
                                                }
                                            }
                                        }
                                        counter++;
                                    });
                                });
                            } else {
                                var alertRequest = $ionicPopup.alert({
                                    title: 'An error occurred starting the event',
                                    template: 'Please select an event again to start from the list.'
                                });
                                alertRequest.then(function (res) {
                                    if (res) {
                                        $scope.showEventList();
                                    }
                                });
                            }
                        });
                    } else {
                        var alertRequest = $ionicPopup.alert({
                            title: 'An error occurred starting the event',
                            template: 'Please select an event again to start from the list.'
                        });
                        alertRequest.then(function (res) {
                            if (res) {
                                $scope.showEventList();
                            }
                        });
                    }
                });
            } else {
                var alertRequest = $ionicPopup.alert({
                    title: 'An error occurred starting the event',
                    template: 'Please select an event again to start from the list.'
                });
                alertRequest.then(function (res) {
                    if (res) {
                        $scope.showEventList();
                    }
                });
            }
        });
    };

    $scope.showRequest = function (action) {
        var confirmRequest = $ionicPopup.confirm({
            title: 'Tactical Request',
            template: 'Are you sure you want to request this tactical advantage?'
        });
        confirmRequest.then(function (res) {
            if (res) {
                $scope.loadingRequest = $ionicLoading.show({
                    content: 'Saving request tactical information',
                    showBackdrop: false
                });
                $timeout(function () {
                    $scope.loadingRequest.hide();
                }, 1000);
                if (action == "UAV") {
                    $scope.loadingRequest = $ionicLoading.show({
                        content: 'Saving request tactical information',
                        showBackdrop: false
                    });
                    $timeout(function () {
                        $scope.loadingRequest.hide();
                    }, 1000);
                } else {
                    if (action == "Quad") {

                    } else {
                        if (action == "Mortar") {

                        } else {

                        }
                    }
                }
            } else {

            }
        });
    };

    $scope.openPopupKnownText = function () {
        $scope.knownTextPopup = $ionicPopup.show({
            template: '<button class="button button-block button-positive">OK</button>' +
            '<button class="button button-block button-positive" ng-click="sendKnowText(\'Roger\')">Roger</button>'
            + '<button class="button button-block button-positive" ng-click="sendKnowText(\'WILCO\')">WILCO</button>'
            + '<button class="button button-block button-positive" ng-click="sendKnowText(\'RadioCheck\')">Radio Check</button>'
            + '<button class="button button-block button-positive" ng-click="sendKnowText(\'Positive\')">Positive</button>'
            + '<button class="button button-block button-positive" ng-click="sendKnowText(\'Negative\')">Negative</button>'
            + '<button class="button button-block button-assertive" ng-click="closeKnowTextPopup()">Cancel</button>',
            title: 'Choose message',
            subTitle: 'Please choose one of the displayed messages.',
            scope: $scope
        });
        $timeout(function () {
            scope.closeKnowTextPopup();
        }, 5000);
    };

    $scope.sendKnowText = function (action) {
        if (action == "Roger") {
            $scope.loadingSendKnowText = $ionicLoading.show({
                content: 'Sending know text information',
                showBackdrop: false
            });
            $timeout(function () {
                $scope.loadingSendKnowText.hide();
            }, 1000);
        } else {
            if (action == "WILCO") {

            } else {
                if (action == "RadioCheck") {

                } else {
                    if (action == "Positive") {

                    } else {

                    }
                }
            }
        }
    };

    $scope.sendFreeText = function () {
        $scope.freeTextdata = {};

        // An elaborate, custom popup
        var freeTextPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="freeTextdata.text">',
            title: 'Enter message',
            subTitle: 'Please use comprehensive language and don\'t use offensive words.',
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.freeTextdata.text) {
                            //don't allow the user to close unless he enters a message
                            e.preventDefault();
                        } else {
                            return $scope.freeTextdata.text;
                        }
                    }
                }
            ]
        });
        freeTextPopup.then(function (res) {
            $scope.loadingSendingFreeText = $ionicLoading.show({
                content: 'Saving and sending to operators free text message',
                showBackdrop: false
            });
            console.log('Tapped!', res);
            $timeout(function () {
                freeTextPopup.close();
                $scope.loadingSendingFreeText.hide();
            }, 1000);
        });
    };

    $scope.closeKnowTextPopup = function () {
        $scope.knownTextPopup.close();
    };

    MasterStubService.viewAllFactions(10, function(data) {
        angular.forEach(data, function(value, key) {
            console.log(key + ': ', value);
        });
    });

    $('.js-live-label').hide();
    $('.js-pause-button').hide();
    $('.js-stop-button').hide();
    $scope.showEventList();

});
