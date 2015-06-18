app.controller('FactionsCtrl', function ($scope, $ionicModal, MasterStubService, EventInfoService) {
    $ionicModal.fromTemplateUrl('templates/master/faction_management/config_faction.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modalCreateFaction) {
        $scope.modalCreateFaction = modalCreateFaction;
    });

    $scope.openCreateFaction = function () {
        $scope.modalCreateFaction.show();
    };

    $scope.closeCreateFaction = function () {
        $scope.modalCreateFaction.hide();
    };

    // A function that refreshes the list of Factions
    function retrieveFactions () {
        var allFactions;
        MasterStubService.getAllFactions(EventInfoService.getEventId())
            .success(function (data) {
                allFactions = data.list;
                console.log("SUCCESS in retrieving factions from event " + EventInfoService.getEventId());
                console.log(data.list);

                $scope.factions = ([]);
                for (i = 0; i < allFactions.length; i++) { 
                    $scope.factions.push({name: allFactions[i]['name'], pin: allFactions[i]['pin']});
                }

            })
            .error(function (error) {
                console.log('Unable to retrieve factions from server:' + error.message);
        });
    }
    retrieveFactions();

    // adding new factions to the event
    $scope.addNewFaction = function (form) {
        console.log("Creating a new faction on event " + EventInfoService.getEventId());
        console.log("Adding a new faction with the pin" + form.factionPIN["$viewValue"] + "and name " + form.factionName["$viewValue"]);

        MasterStubService.createFaction(
            EventInfoService.getEventId(),
            form.factionName["$viewValue"],
            Number(form.factionPIN["$viewValue"]))
            .success(function (data) {
                EventInfoService.addFactionId(data.response);
                console.log("SUCCESS in adding a faction with the ID " + EventInfoService.getFactionIds()[EventInfoService.getFactionIds().length-1]['factionId'] + " to the event " + EventInfoService.getEventId());
                retrieveFactions();
            })
            .error(function (error) {
                console.log('Unable to create a faction on the event ' + EventInfoService.getEventId());
        });
    };

    //what to do when deleting a faction
    $scope.onItemDelete = function (itemIndex) {
        factionToDelete = $scope.factions[itemIndex].pin;
        MasterStubService.deleteFaction($scope.eventID, factionToDelete);
        console.log("Successfully deleted faction with the PIN: " + factionToDelete + " from event " + $scope.eventID);
        $scope.items.splice($scope.factions.indexOf(itemIndex), 1);
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modalCreateFaction.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });

    $scope.locations = [{id: 1, name: 'Location A'}, {id: 2, name: 'Location B'}, {id: 3, name: 'Location C'}];


});