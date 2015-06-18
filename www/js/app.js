// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in configEventCtrl.js
// 'starter.services' is found in services.js

var app = angular.module('starter', ['ionic', 'ngFlag', 'socom-maps', 'hudModule']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            // StatusBar.styleDefault();
            StatusBar.style(2);
        }
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'MenuCtrl'
        })

        .state('app.map', {
            url: "/map",
            views: {
                'menuContent': {
                    templateUrl: "templates/map.html",
                    controller: 'MapCtrl'
                }
            }
        })

        .state('app.live', {
            url: "/live",
            views: {
                'menuContent': {
                    templateUrl: "templates/live.html",
                    controller: 'LiveCtrl'
                }
            }
        })

        .state('app.masterconfig', {
            url: "/masterconfig",
            views: {
                'menuContent': {
                    templateUrl: "templates/master/config_master/config_master.html",
                    controller: "ConfigMasterCtrl"
                }
            }
        })

        .state('app.masterconfiguser', {
            url: "/masterconfiguser",
            views: {
                'menuContent': {
                    templateUrl: "templates/master/config_master/user_config.html",
                    controller: 'MasterUserConfigCtrl'
                }
            }
        })

        .state('app.masterconfigmaps', {
            url: "/masterconfigmaps",
            views: {
                'menuContent': {
                    templateUrl: "templates/master/config_master/maps_list.html",
                    controller: 'MasterMapsCtrl'
                }
            }
        })
		
        .state('app.masternewmap', {
            url: "/masternewmap",
            views: {
                'menuContent': {
                    templateUrl: "templates/zones.html",
                    controller: 'ZoneCtrl'
                }
            }
        })

        .state('app.configevent', {
            url: "/configevent",
            views: {
                'menuContent': {
                    templateUrl: "templates/master/event_management/config_event.html",
                    controller: 'ConfigEventCtrl'
                }
            }
        })

        .state('app.configeventgeneral', {
            url: "/configeventgeneral",
            views: {
                'menuContent': {
                    templateUrl: "templates/master/event_management/config_event_general_settings.html",
                    controller: 'ConfigEventCtrl'
                }
            }
        })

        .state('app.listfactions', {
            url: "/listfactions",
            views: {
                'menuContent': {
                    templateUrl: "templates/master/faction_management/list_factions.html",
                    controller: 'FactionsCtrl'
                }
            }
        })

        .state('app.tacticalActions', {
            url: "/tacticalActions",
            views: {
                'menuContent': {
                    templateUrl: "templates/comsys/tacticalActions.html",
                    controller: 'TacticalActionsCtrl'
                }
            }
        })

        .state('app.configfaction', {
            url: "/configfaction",
            views: {
                'menuContent': {
                    templateUrl: "templates/master/faction_management/config_faction.html",
                    controller: 'FactionsCtrl'
                }
            }
        })

        .state('app.listtar', {
            url: "/listtar",
            views: {
                'menuContent': {
                    templateUrl: "templates/master/event_management/list_tar.html",
                    controller: 'ConfigEventCtrl'
                }
            }
        })

        .state('app.listopr', {
            url: "/listopr",
            views: {
                'menuContent': {
                    templateUrl: "templates/master/event_management/list_opr.html",
                    controller: 'ConfigEventCtrl'
                }
            }
        })

        .state('app.listevents', {
            url: "/listevents",
            views: {
                'menuContent': {
                    templateUrl: "templates/master/event_management/list_events.html",
                    controller: 'EventsCtrl'
                }
            }
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/masterconfig');
});