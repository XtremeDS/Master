app.controller('ConfigEventCtrl', function ($scope, EventConfig, MasterStubService, EventInfoService) {

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

        console.log("Event Name " + form.gameSettings.name);
        console.log("Event Description " + form.gameSettings.description);
        console.log("Event Address " + form.gameSettings.address);
        console.log("Event Rules " + form.gameSettings.rules);
        console.log("Event Restrictions " + form.gameSettings.restrictions);
        console.log("Event Proceedments " + form.gameSettings.proceedments);
        console.log("Event AddInfo " + form.gameSettings.additionalInfo);
        console.log("Event Reg Start Date " + form.dates.regStartDate);
        console.log("Event Reg End Date " + form.dates.regEndDate);
        console.log("Event Start Date " + form.dates.eventStartDate);
        console.log("Event End Date " + form.dates.eventEndDate);
        console.log("Event Perk Points " + form.generalSettings.initialPerkPoints);
        console.log("Event MaxComsysFaction " + form.generalSettings.maxComsysFaction);
        console.log("Event MaxOperatorComsys " + form.generalSettings.maxOperatorComsys);
        console.log("Respawn Delay " + form.generalSettings.respawnDelay);
        console.log("MinGPS " + form.generalSettings.minGpsRefRate);
        console.log("MaxGPS " + form.generalSettings.maxGpsRefRate);
        console.log("SeeEnemyBases " + seeEnemyBases);
        console.log("SeeEnemyRespawn " + seeEnemyRespawn);
        console.log("PointsPerKill " + form.generalSettings.pointsPerKill);

        MasterStubService.createEvent(form.gameSettings.name,
            null,
        form.gameSettings.description,
        form.gameSettings.address,
        form.gameSettings.rules,
        form.gameSettings.restrictions,
        form.gameSettings.proceedments,
        form.gameSettings.additionalInfo,
        form.dates.regStartDate,
        form.dates.regEndDate,
        form.dates.eventStartDate,
        form.dates.eventEndDate,
        form.generalSettings.initialPerkPoints,
        form.generalSettings.maxComsysFaction,
        form.generalSettings.maxOperatorComsys,
        form.generalSettings.respawnDelay,
        form.generalSettings.minGpsRefRate,
        form.generalSettings.maxGpsRefRate,
        seeEnemyBases,
        seeEnemyRespawn,
        form.generalSettings.pointsPerKill)
        .success(function (data) {
            EventInfoService.setEventId(data.response);
            console.log("SUCCESS in creating event with ID " + EventInfoService.getEventId());
        })
        .error(function (error) {
            console.log('Unable to create event on server:' + error.message);
        });
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
