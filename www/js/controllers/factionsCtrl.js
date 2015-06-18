app.controller('FactionsCtrl', function ($scope, $ionicModal, MasterStubService) {
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

    var allEvents;
    MasterStubService.getAllMasterEvents()
        .success(function (data) {
            allEvents = data.list;
            console.log("SUCCESS in retrieving latest event from server!");
            //console.log(allEvents[0]['name']);

            $scope.eventID = allEvents[allEvents.length-1]['id'];
            console.log("Event ID of the latest created event is " + $scope.eventID);
            console.log("Adding factions to event with ID " + $scope.eventID);
        })
        .error(function (error) {
            console.log('Unable to retrieve latest event from server:' + error.message);
    });

    var allFactions;
    MasterStubService.getAllFactions($scope.eventID)
        .success(function (data) {
            allFactions = data.list;
            console.log("SUCCESS in retrieving factions from server!");

            $scope.factions = ([]);
            for (i = 0; i < allFactions.length; i++) { 
                $scope.factions.push({name: allFactions[i]['name'], pin: allFactions[i]['pin']});
                console.log($scope.factions);
            }
        })
        .error(function (error) {
            console.log('Unable to retrieve factions from server:' + error.message);
    });

    $scope.addNewFaction = function (form) {
        console.log("Creating a new faction...");

        MasterStubService.createFaction(
            $scope.eventID,
            form.factionName,
            form.factionPIN);

        console.log("Added a new faction to the event" + $scope.eventID);
    };

    //what to do when deleting
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