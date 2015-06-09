app.controller('FactionsCtrl', function ($scope, $ionicModal) {
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

    $scope.factions = [{name: 'Faction A', description: 'Faction A'},
        {name: 'Faction B', description: 'Faction B'},
        {name: 'Faction C', description: 'Faction C'},
        {name: 'Faction D', description: 'Faction D'},
        {name: 'Faction E', description: 'Faction E'}
    ];

    $scope.locations = [{id: 1, name: 'Location A'}, {id: 2, name: 'Location B'}, {id: 3, name: 'Location C'}];
});