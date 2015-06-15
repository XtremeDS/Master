app.controller('ConfigEventCtrl', function ($scope, EventConfig, MasterStubService) {

    $scope.eventInfo = EventConfig;
    $scope.stubService = MasterStubService;

    $scope.checkboxes = [
        {text: "ComSys Bases Visible", checked: false},
        {text: "Respawn points visible", checked: false}
    ];

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

    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);-
        $scope.items.splice(toIndex, 0, item);
    };

    $scope.saveEventGeneralSettings = function(form){
        //invoke create event

        var seeEnemyBases = 0;
        var seeEnemyRespawn = 0;

        if ($scope.checkboxes[0].checked) {
            seeEnemyBases = 1;
        }
        if ($scope.checkboxes[1].checked) {
            seeEnemyRespawn = 1;
        }

        console.log("Event Name " + form.eventName);
        console.log("Event Description " + form.eventDescription);
        console.log("Event Address " + form.eventAddress);
        console.log("Event Rules " + form.eventRules);
        console.log("Event Restrictions " + form.eventRestrictions);
        console.log("Event Proceedments " + form.eventProceedments);
        console.log("Event Additional Info " + form.eventAdditionalInformation);
        console.log("Event Reg. Start Date " + form.eventRegistryStartDate);
        console.log("Event Reg. End Date " + form.eventRegistryEndDate);
        console.log("Event Start Date " + form.eventStartDate);
        console.log("Event End Date " + form.eventEndDate);
        console.log("Event Initial Perk Points " + form.initialPerkPoints);
        console.log("Max Comsys Per Factions " + form.maxComsysPerFaction);
        console.log("Max Opers Per Comsys " + form.maxOperPerComSys);
        console.log("Respawn Delay " + form.respawnDelay);
        console.log("Min GPS Ref. Rate " + form.minGpsRefreshRate);
        console.log("Max GPS Ref. Rate " + form.maxGpsRefreshRate);
        console.log("Comsys Bases Visible" + seeEnemyBases);
        console.log("Respawn Points Visible" + seeEnemyRespawn);
        console.log("Points Per Kill" + form.pointsPerKill);


        MasterStubService.createEvent(form.eventName,
            null,
        form.eventDescription,
        form.eventAddress,
        form.eventRules,
        form.eventRestrictions,
        form.eventProceedments,
        form.eventAdditionalInformation,
        form.eventRegistryStartDate,
        form.eventRegistryEndDate,
        form.eventStartDate,
        form.eventEndDate,
        form.initialPerkPoints,
        form.maxComsysPerFaction,
        form.maxOperPerComSys,
        form.respawnDelay,
        form.minGpsRefreshRate,
        form.maxGpsRefreshRate,
        seeEnemyBases,
        seeEnemyRespawn,
        form.pointsPerKill);

        console.log("Pushed a new event to the server.");
    };

    //what to do when deleting
    $scope.onItemDelete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    //TODO: Load from backend
    $scope.rates = [{id: 1, rate: '0%'}, {id: 2, rate: '15%'}, {id: 3, rate: '30%'}];
    $scope.minRefRateSelected = {id: 1, rate: '0%'};
    $scope.maxRefRateSelected = {id: 3, rate: '0%'};

    $scope.tarList = [{id: 1, name: 'T.A.R. 1'}, {id: 2, name: 'T.A.R. 2'}, {id: 3, name: 'T.A.R. 3'}];
    $scope.oprList = [{id: 1, name: 'O.P.R. 1'}, {id: 2, name: 'O.P.R. 2'}, {id: 3, name: 'O.P.R. 3'}];
})

app.controller('MasterMapsCtrl', function($scope){
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;

    this.maps = $scope.masterData.maps;
})
