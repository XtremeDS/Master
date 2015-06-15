app.factory('EventConfig', function(){
	return {
        eventId: 0,
		gameSettings:{
			name:"Test event",
			description:"Testing of creating an event.",
			additionalInfo:"Additional info.",
            address:"Address street 1000, Portugal",
            rules:"No rules man, just kill everyone you see in every way you can man dude.",
            restrictions:"No restrictions man, just kill everyone you see in every way you can man dude.",
            proceedments:"Proceedments"
		},
		generalSettings:{
			initialPerkPoints:100,
			maxComsysFaction:5,
			maxOperatorComsys:5,
			respawnDelay:5,
            factionsInGame:3,
            maxGpsRefRate:1,
            minGpsRefRate:5,
            pointsPerKill:100,
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