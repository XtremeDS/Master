app.controller('LiveCtrl', function ($scope, $ionicLoading, $timeout, $ionicPopup, $ionicModal, AppService) {
    // Set appType - 0:Operator 1:ComSys 2:Master
    $scope.appType = AppService.getAppType();

    // Set userLogged - 0:Not logged 1:Logged
    $scope.isLogged = AppService.getIsLogged();

    // Set squadID - 0:Not in squad 1:In squad
    $scope.squadID = AppService.getSquadID();

    // Set squadLider - 0:Not in squad 1:In squad
    $scope.squadLider = AppService.getIsSquadLider();

    // Set specialisation
    $scope.specialisation = AppService.getSpecialisation();

    // Set eventReady
    $scope.eventReady = AppService.getEventReady();

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

    $scope.blockUI = function (container, stop) {
        if ($($(container)).find('.blockUI').length > 0) $(container).find('.blockUI').remove();

        if (!stop) {
            $(container).append('<div class="blockUI"><div class="play-button"><a class="button button-icon icon ion-play custom-icon"></a></div></div>');
        }
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
                if (action=="UAV") {
                    $scope.loadingRequest = $ionicLoading.show({
                        content: 'Saving request tactical information',
                        showBackdrop: false
                    });
                    $timeout(function () {
                        $scope.loadingRequest.hide();
                    }, 1000);
                }else{
                    if (action=="Quad") {

                    }else{
                        if (action=="Mortar") {

                        }else{

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
        if (action=="Roger") {
            $scope.loadingSendKnowText = $ionicLoading.show({
                content: 'Sending know text information',
                showBackdrop: false
            });
            $timeout(function () {
                $scope.loadingSendKnowText.hide();
            }, 1000);
        }else{
            if (action=="WILCO") {

            }else{
                if (action=="RadioCheck") {

                }else{
                    if (action=="Positive") {

                    }else{

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

    $scope.initialize = function () {
        var myLatlng = new google.maps.LatLng(43.07493, -89.381388);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });

        $scope.map = map;
    };
    google.maps.event.addDomListener(document.getElementById("map-canvas"), 'load', $scope.initialize());

    $scope.centerOnMe = function () {
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });
        //$scope.map.marker.remove();
        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: $scope.map,
                title: 'My Location'
            });
            $scope.loading.hide();
        }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
    };
});