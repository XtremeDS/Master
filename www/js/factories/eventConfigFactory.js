app.factory('EventConfig', function(){
	return {
        eventId: 0,
		gameSettings:{
			name:null,
			description:null,
			additionalInfo:null,
            address:null,
            rules:null,
            restrictions:null,
            proceedments:null
		},
		generalSettings:{
			initialPerkPoints:null,
			maxComsysFaction:null,
			maxOperatorComsys:null,
			respawnDelay:null,
            factionsInGame:null,
            maxGpsRefRate:null,
            minGpsRefRate:null,
            pointsPerKill:null,
            comsysBasesVisible:null,
            respawnPointsVisible:null
		},
		dates:{
			regStartDate:null,
			regEndDate:null,
			eventStartDate:null,
			eventEndDate:null
		}
	};
});