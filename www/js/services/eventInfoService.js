app.service('EventInfoService', function() {
    var eventID;
    var factionIDs = ([]);
    
    return {
        getEventId: function() {
            return eventID;
        },
        setEventId: function(id) {
            eventID = id;
        },
        getFactionIds: function() {
            return factionIDs;
        },
        addFactionId: function(id) {
            factionIDs.push({factionId: id});
        }
    }
});