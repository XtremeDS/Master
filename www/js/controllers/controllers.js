app.controller('ConfigMasterCtrl', function ($scope) {
    $scope.masterInfo = {};

    $scope.submitMsterInfo = function () {

    };
})

//Master Event Form Controller
app.controller('ConfigEventCtrl', function ($scope, $ionicModal) {
    $scope.data = {
        map: 'Not choosen',
        showDelete: false,
        showReorder: false,
        canSwipe: true
    };

    //what to do when editing..
    $scope.edit = function (item) {
        alert('Edit Item: ' + item.id);
    };

    //what to do when sharing
    $scope.share = function (item) {
        alert('Share Item: ' + item.id);
    };

    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    //what to do when deleting
    $scope.onItemDelete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };


    $ionicModal.fromTemplateUrl('templates/master/event_management/config_faction.html', {
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


    //TODO: Load from backend
    $scope.rates = [{id: 1, rate: '0%'}, {id: 2, rate: '15%'}, {id: 3, rate: '30%'}];
    $scope.minRefRateSelected = {id: 1, rate: '0%'};
    $scope.maxRefRateSelected = {id: 3, rate: '0%'};
    $scope.factions = [{name: 'Faction A', description: 'Faction A'},
        {name: 'Faction B', description: 'Faction B'},
        {name: 'Faction C', description: 'Faction C'},
        {name: 'Faction D', description: 'Faction D'},
        {name: 'Faction E', description: 'Faction E'}
    ];

    $scope.locations = [{id: 1, name: 'Location A'}, {id: 2, name: 'Location B'}, {id: 3, name: 'Location C'}];
    $scope.tarList = [{id: 1, name: 'T.A.R. 1'}, {id: 2, name: 'T.A.R. 2'}, {id: 3, name: 'T.A.R. 3'}];
    $scope.oprList = [{id: 1, name: 'O.P.R. 1'}, {id: 2, name: 'O.P.R. 2'}, {id: 3, name: 'O.P.R. 3'}];
})

    //Master Config Controller //Structure $scope.masterData = {personalData:{},maps:{},rulseSet:{}};
    .controller('MasterConfigCtrl', function($scope){

    })

    .controller('MasterUserConfigCtrl', function($scope){

    })

app.controller('MasterMapsCtrl', function($scope){
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;

    this.maps = $scope.masterData.maps;
})

app.controller('MasterConfigRules', function($scope){

})

//Master Event Form Controller
app.controller('ListEventsCtrl', function ($scope) {
    $scope.data = {
        showDelete: false,
        showReorder: false,
        canSwipe: true
    };

    //what to do when editing..
    $scope.edit = function (item) {
        alert('Edit Item: ' + item.id);
    };

    //what to do when sharing
    $scope.share = function (item) {
        alert('Share Item: ' + item.id);
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
    $scope.items = [{id: 1, name: "Event 1", location: "Leiria"},
        {id: 2, name: "Event 2", location: "Lisboa"},
        {id: 3, name: "Event 3", location: "Porto"},
        {id: 4, name: "Event 4", location: "Aveiro"},
        {id: 5, name: "Event 5", location: "Coimbra"},
        {id: 6, name: "Event 6", location: "Braga"},
        {id: 7, name: "Event 7", location: "Santarém"},
        {id: 8, name: "Event 8", location: "Viana do Castelo"}];
});
