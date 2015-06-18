app.factory('MasterStubService', function ($http) {

	var baseUrl = 'http://192.168.234.37/SOCOM_BO/public/v1/';

	var firebaseUrl = 'https://socom-bo-estg-2015.firebaseio.com/events_in_progress/';

	var requestPost = 
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	};

	$http.defaults.withCredentials = true;

	function escapeIfNotNull(variable){
		if(variable != null){
			return variable;
		}
		return null;
	}

	return {

		login: function (username, password) {
			requestPost.url = baseUrl + 'master/login';
			requestPost.params = { username: escapeIfNotNull(username), password: escapeIfNotNull(password) };
			return $http(requestPost);
		},

		loginCheckMaster: function () {
			var url = baseUrl + 'master/login/check';
			return $http.get(url);
		},

		logoutMaster: function () {
			var url = baseUrl + 'master/logout';
			return $http.get(url);
		},

		createMaster: function (email, password, nickname, logo,
			phone, address, zipcode, country, association_description, association_link, association_link_promo  ){
				requestPost.url = baseUrl + 'master/create';
				requestPost.params = { email: escapeIfNotNull(email), password: escapeIfNotNull(password), nickname: escapeIfNotNull(nickname),
					logo: escapeIfNotNull(logo), phone: escapeIfNotNull(phone),address: escapeIfNotNull(address),zipcode: escapeIfNotNull(zipcode),country: escapeIfNotNull(country),
					association_description: escapeIfNotNull(association_description),association_link: escapeIfNotNull(association_link),
					association_link_promo: escapeIfNotNull(association_link_promo)};
					return $http(requestPost);
				},

				getMasterPersonalConfig: function () {
					return $http.get(baseUrl + 'master/config/personal/get');
				},

				updateMasterPersonalConfig: function (display_grid, coord_format, nickname, logo, 
					phone, address, zipcode, country, association_description, association_link, association_link_promo) {
						requestPost.url = baseUrl + 'master/config/personal/update';
						requestPost.params = { display_grid: display_grid, coord_format: coord_format, nickname: nickname,
							logo: logo, phone: phone, address: address, zipcode: zipcode, country: country,
							association_description: association_description, association_link: association_link, 
							association_link_promo: association_link_promo};
							return $http(requestPost);
						},

						getAllMasterSponsors: function(){
							var url = baseUrl + 'master/sponsor/get/all';
							return $http.get(url);	
						},

						changeMasterPassword: function (oldPassword, newPassword) {
							requestPost.url = baseUrl + 'master/password/update';
							requestPost.params = { old: escapeIfNotNull(oldPassword), new: escapeIfNotNull(newPassword) };
							return $http(requestPost);
						},

						updateMasterSponsor: function (sponsorId, name, logo) {
							requestPost.url = baseUrl + 'master/sponsor/update/' + sponsorId;
							requestPost.params = { name: escapeIfNotNull(name), logo: escapeIfNotNull(logo) };
							return $http(requestPost);
						},

						deleteMasterSponsor: function(sponsorId) {
							return $http.get(baseUrl + 'master/sponsor/delete/' + sponsorId);
						},

						getAllPerks: function() {
							return $http.get(baseUrl + 'master/perk/get/all');
						},

						getMasterSponsorByName: function (name) {
							return $http.get(baseUrl + 'master/sponsor/get/name/' + name);
						},

						createMasterSponsor: function(name, logo) {
							requestPost.url = baseUrl + 'master/sponsor/create';
							requestPost.params = { name: escapeIfNotNull(name), logo: escapeIfNotNull(logo) };
							return $http(requestPost);
						},

						getPerksByName:  function(name) {
							return $http.get(baseUrl +  'master/perk/get/name/'+name);			
						},

						getPerkById:  function(perkId) {
							return $http.get(baseUrl +  'master/perk/get/id/'+perkId);			
						},

						createMasterPerkRuleSet: function(description) {
							requestPost.url = baseUrl + 'master/perk/ruleset/create';
							requestPost.params = { description: escapeIfNotNull(description)};
							return $http(requestPost);
						},

						updateMasterPerkRuleSet: function(description, perkRuleSetId) {
							requestPost.url = baseUrl + 'master/perk/ruleset/update/'+perkRuleSetId;
							requestPost.params = { description: escapeIfNotNull(description)};
							return $http(requestPost);
						},

						deleteMasterPerkRuleSet: function(perkRuleSetId) {
							return $http.get(baseUrl +  'master/perk/ruleset/delete/' + perkRuleSetId);	
						},

						getAllMasterPerkRuleSets: function() {
							return $http.get(baseUrl +  'master/perk/ruleset/get/all');	
						},

						createPerkRuleSetRule:function(master_perk_rule_id, perk_id, p_initial_time_delay, 
							p_cooldown_time, p_duration_time, p_vision_range, p_detection_range, p_max_units, p_cost) {
								requestPost.url = baseUrl + 'master/perk/ruleset/rule/create';
								requestPost.params = { desmaster_perk_rule_idription: escapeIfNotNull(master_perk_rule_id), 
									perk_id: escapeIfNotNull(perk_id),p_initial_time_delay: escapeIfNotNull(p_initial_time_delay),
									p_cooldown_time: escapeIfNotNull(p_cooldown_time), p_duration_time: escapeIfNotNull(p_duration_time),
									p_vision_range: escapeIfNotNull(p_vision_range), p_detection_range: escapeIfNotNull(p_detection_range), 
									p_max_units: escapeIfNotNull(p_max_units),p_cost: escapeIfNotNull(p_cost)
								};
								return $http(requestPost);
							},

							updatePerkRuleSetRule:function(master_perk_rule_id, perk_id, p_initial_time_delay, 
								p_cooldown_time, p_duration_time, p_vision_range, p_detection_range, p_max_units, p_cost) {
									requestPost.url = baseUrl + 'master/perk/ruleset/rule/create';
									requestPost.params = { desmaster_perk_rule_idription: escapeIfNotNull(master_perk_rule_id), 
										perk_id: escapeIfNotNull(perk_id),p_initial_time_delay: escapeIfNotNull(p_initial_time_delay),
										p_cooldown_time: escapeIfNotNull(p_cooldown_time), p_duration_time: escapeIfNotNull(p_duration_time),
										p_vision_range: escapeIfNotNull(p_vision_range), p_detection_range: escapeIfNotNull(p_detection_range), 
										p_max_units: escapeIfNotNull(p_max_units),p_cost: escapeIfNotNull(p_cost)
									};
									return $http(requestPost);
								},

								deletePerkRuleSetRule: function(perkRuleId) {
									return $http.get(baseUrl +  'master/perk/ruleset/rule/delete/' + perkRuleId);	
								},

								getPerkRuleSetRulesByPerkRuleSetId: function(perkRuleSetId) {
									return $http.get(baseUrl +  'master/perk/ruleset/rule/get/id/' + perkRuleSetId);	
								},

								getMasterZoneById: function(masterZoneId) {
									return $http.get(baseUrl +  'master/zone/get/id/' + masterZoneId);	
								},

								getMasterZoneByZoneTypeId: function(masterZoneId) {
									return $http.get(baseUrl +  'master/zone/get/type/id/' + masterZoneId);	
								},

								createZoneType: function (name) {
									requestPost.url = baseUrl + 'master/zone/type/create';
									requestPost.params = { name: escapeIfNotNull(name) };
									return $http(requestPost);
								},

								removeSponsorOfEvent: function (eventId, sponsorId) {
									return $http.get(baseUrl + 'event/' + eventId + '/sponsor/remove/' + sponsorId);
								},

								attachSponsorToEvent: function (eventId, sponsorId) {
									return $http.get(baseUrl + 'event/' + eventId + '/sponsor/attach/' + sponsorId);
								},

								getTacticalActionRuleSetRulesByTacticalActionRuleSetId: function (tacticalActionRuleSetId) {
									return $http.get(baseUrl + 'master/tacticalaction/ruleset/rule/get/id/' + tacticalActionRuleSetId);
								},

								deleteTacticalActionRuleSetRule: function (tacticalActionRuleId) {
									return $http.get(baseUrl + 'master/tacticalaction/ruleset/rule/delete/' + tacticalActionRuleId);
								},

								getAllMasterTacticalActionRuleSets: function () {
									return $http.get(baseUrl + 'master/tacticalaction/ruleset/get/all');
								},

								deleteMasterTacticalActionRuleSet: function (tacticalActionRuleSetId) {
									return $http.get(baseUrl + 'master/tacticalaction/ruleset/delete/' + tacticalActionRuleSetId);
								},

								getTacticalActionById: function (tacticalActionId) {
									return $http.get(baseUrl + 'master/tacticalaction/get/id/' + tacticalActionId);
								},

								getTacticalActionsByName: function (name) {
									return $http.get(baseUrl + 'master/tacticalaction/get/name/' + name);
								},

								getAllTacticalActions: function () {
									return $http.get(baseUrl + 'master/tacticalaction/get/all');
								},

								createMasterTacticalActionRuleSet: function(description) {
									requestPost.url = baseUrl + 'master/tacticalaction/ruleset/create';
									requestPost.params = { description: escapeIfNotNull(description) };
									return $http(requestPost);
								},

								updateMasterTacticalActionRuleSet: function (tacticalActionRuleSetId, description) {
									requestPost.url = baseUrl + 'master/tacticalaction/ruleset/update/' + tacticalActionRuleSetId;
									requestPost.params = { description: escapeIfNotNull(description) };
									return $http(requestPost);
								},

								createTacticalActionRuleSetRule: function (masterTacticalActionRuleId, tacticalActionId, ta_initial_time_delay, ta_cooldown_time, ta_duration_time, ta_vision_range, ta_detection_range, ta_death_range, ta_cost) {
									requestPost.url = baseUrl + 'master/tacticalaction/ruleset/rule/create';
									requestPost.params = {
										master_tacticalaction_rule_id: escapeIfNotNull(masterTacticalActionRuleId),
										tacticalaction_id: escapeIfNotNull(tacticalActionId),
										ta_initial_time_delay: escapeIfNotNull(ta_initial_time_delay),
										ta_cooldown_time: escapeIfNotNull(ta_cooldown_time),
										ta_duration_time: escapeIfNotNull(ta_duration_time),
										ta_vision_range: escapeIfNotNull(ta_vision_range),
										ta_detection_range: escapeIfNotNull(ta_detection_range),
										ta_death_range: escapeIfNotNull(ta_death_range),
										ta_cost: escapeIfNotNull(ta_cost)					
									};
									return $http(requestPost);
								},

								updateTacticalActionRuleSetRule: function (tacticalActionRuleId, masterTacticalActionRuleId, tacticalActionId, ta_initial_time_delay, ta_cooldown_time, ta_duration_time, ta_vision_range, ta_detection_range, ta_death_range, ta_cost) {
									requestPost.url = baseUrl + 'master/tacticalaction/ruleset/rule/update/' + tacticalActionRuleId;
									requestPost.params = {
										master_tacticalaction_rule_id: escapeIfNotNull(masterTacticalActionRuleId),
										tacticalaction_id: escapeIfNotNull(tacticalActionId),
										ta_initial_time_delay: escapeIfNotNull(ta_initial_time_delay),
										ta_cooldown_time: escapeIfNotNull(ta_cooldown_time),
										ta_duration_time: escapeIfNotNull(ta_duration_time),
										ta_vision_range: escapeIfNotNull(ta_vision_range),
										ta_detection_range: escapeIfNotNull(ta_detection_range),
										ta_death_range: escapeIfNotNull(ta_death_range),
										ta_cost: escapeIfNotNull(ta_cost)					
									};
									return $http(requestPost);
								},

								updateZoneType: function (zoneTypeId, newName) {
									requestPost.url = baseUrl + 'master/zone/type/update/' + zoneTypeId;
									requestPost.params = { name: escapeIfNotNull(newName) };
									return $http(requestPost);
								},

								deleteZoneType: function (zoneTypeId) {
									return $http.get(baseUrl + 'master/zone/type/delete/' + zoneTypeId);
								},

								getAllZoneTypes: function () {
									return $http.get(baseUrl + 'master/zone/type/get/all');
								},

								getServerDefinedZoneTypes : function () {
									return $http.get(baseUrl + 'master/zone/type/get/server/defined');
								},

								getMasterDefinedZoneTypes : function () {
									return $http.get(baseUrl + 'master/zone/type/get/master/defined');
								},

								getZoneTypesByName : function (name) {
									return $http.get(baseUrl + 'master/zone/type/get/name/' + name);
								},

								getZoneTypeById : function (id) {
									return $http.get(baseUrl + 'master/zone/type/get/id/' + id);
								},

								createMasterZone : function (id, description, capture_points) {
									requestPost.url = baseUrl + 'master/zone/create';
									requestPost.params = { zone_id: escapeIfNotNull(id), description: escapeIfNotNull(description), capture_points: escapeIfNotNull(capture_points) };
									return $http(requestPost);
								},

								updateMasterZone : function (id, description, capture_points) {
									requestPost.url = baseUrl + 'master/zone/update/' + id;
									requestPost.params = { zone_id: escapeIfNotNull(id), description: escapeIfNotNull(description), capture_points: escapeIfNotNull(capture_points) };
									return $http(requestPost);
								},

								deleteMasterZone : function (id) {
									return $http.get(baseUrl + 'master/zone/delete/' + id);
								},

								getAllMasterZones : function () {
									return $http.get(baseUrl + 'master/zone/get/all');
								},

								attachPerkRuleSetToEvent: function(eventId, perkRuleSetId) {
									return $http.get(baseUrl + 'event/' + eventId + '/ruleset/perk/attach/' + perkRuleSetId);
								},


								getPerksByName:  function(perkName) {
									return $http.get(baseUrl +  'master/perk/get/name/' + perkName);		
								},

								getPerkById:  function(perkId) {
									return $http.get(baseUrl +  'master/perk/get/id/' + perkId);			

								},

								createMasterPerkRuleSet: function(description) {
									requestPost.url = baseUrl + 'master/perk/ruleset/create';
									requestPost.params = { description: escapeIfNotNull(description)};
									return $http(requestPost);
								},

								updateMasterPerkRuleSet: function(description, perkRuleSetId) {
									requestPost.url = baseUrl + 'master/perk/ruleset/update/' + perkRuleSetId;
									requestPost.params = { description: escapeIfNotNull(description)};
									return $http(requestPost);
								},

								deleteMasterPerkRuleSet: function(perkRuleSetId) {
									return $http.get(baseUrl +  'master/perk/ruleset/delete/' + perkRuleSetId);	
								},

								getAllMasterPerkRuleSets: function() {
									return $http.get(baseUrl +  'master/perk/ruleset/get/all');	
								},

								createPerkRuleSetRule:function(master_perk_rule_id, perk_id, p_initial_time_delay, 
									p_cooldown_time, p_duration_time, p_vision_range, p_detection_range, p_max_units, p_cost) {
										requestPost.url = baseUrl + 'master/perk/ruleset/rule/create';
										requestPost.params = { desmaster_perk_rule_idription: escapeIfNotNull(master_perk_rule_id), 
											perk_id: escapeIfNotNull(perk_id),p_initial_time_delay: escapeIfNotNull(p_initial_time_delay),
											p_cooldown_time: escapeIfNotNull(p_cooldown_time), p_duration_time: escapeIfNotNull(p_duration_time),
											p_vision_range: escapeIfNotNull(p_vision_range), p_detection_range: escapeIfNotNull(p_detection_range), 
											p_max_units: escapeIfNotNull(p_max_units),p_cost: escapeIfNotNull(p_cost)
										};
										return $http(requestPost);
									},

									updatePerkRuleSetRule:function(master_perk_rule_id, perk_id, p_initial_time_delay, 
										p_cooldown_time, p_duration_time, p_vision_range, p_detection_range, p_max_units, p_cost) {
											requestPost.url = baseUrl + 'master/perk/ruleset/rule/create';
											requestPost.params = { desmaster_perk_rule_idription: escapeIfNotNull(master_perk_rule_id), 
												perk_id: escapeIfNotNull(perk_id),p_initial_time_delay: escapeIfNotNull(p_initial_time_delay),
												p_cooldown_time: escapeIfNotNull(p_cooldown_time), p_duration_time: escapeIfNotNull(p_duration_time),
												p_vision_range: escapeIfNotNull(p_vision_range), p_detection_range: escapeIfNotNull(p_detection_range), 
												p_max_units: escapeIfNotNull(p_max_units),p_cost: escapeIfNotNull(p_cost)
											};
											return $http(requestPost);
										},

										deletePerkRuleSetRule: function(perkRuleId) {
											return $http.get(baseUrl +  'master/perk/ruleset/rule/delete/' + perkRuleId);	
										},

										getPerkRuleSetRulesByPerkRuleSetId: function(perkRuleSetId) {
											return $http.get(baseUrl +  'master/perk/ruleset/rule/get/id/' + perkRuleSetId);	
										},

										getMasterZoneById: function(masterZoneId) {
											return $http.get(baseUrl +  'master/zone/get/id/' + masterZoneId);	
										},

										getMasterZoneByZoneTypeId: function(zoneTypeId) {
											return $http.get(baseUrl +  'master/zone/get/type/id/' + zoneTypeId);	
										},

										createZoneType: function (name) {
											requestPost.url = baseUrl + 'master/zone/type/create';
											requestPost.params = { name: escapeIfNotNull(name) };
											return $http(requestPost);
										},

										updateZoneType: function (zoneTypeId, newName) {
											requestPost.url = baseUrl + 'master/zone/type/update/' + zoneTypeId;
											requestPost.params = { name: escapeIfNotNull(newName) };
											return $http(requestPost);
										},

										deleteZoneType: function (zoneTypeId) {
											return $http.get(baseUrl + 'master/zone/type/delete/' + zoneTypeId);
										},

										getAllZoneTypes: function () {
											return $http.get(baseUrl + 'master/zone/type/get/all');
										},

										getServerDefinedZoneTypes : function () {
											return $http.get(baseUrl + 'master/zone/type/get/server/defined');
										},

										getMasterDefinedZoneTypes : function () {
											return $http.get(baseUrl + 'master/zone/type/get/master/defined');
										},

										getZoneTypesByName : function (name) {
											return $http.get(baseUrl + 'master/zone/type/get/name/' + name);
										},

										getZoneTypeById : function (zoneTypeId) {
											return $http.get(baseUrl + 'master/zone/type/get/id/' + zoneTypeId);
										},

										createMasterZone : function (zoneTypeId, description, capturePoints) {
											requestPost.url = baseUrl + 'master/zone/create';
											requestPost.params = { zone_id: escapeIfNotNull(zoneTypeId), description: escapeIfNotNull(description), capture_points: escapeIfNotNull(capturePoints) };
											return $http(requestPost);
										},

										updateMasterZone : function (masterZoneId, zoneTypeId, description, capturePoints) {
											requestPost.url = baseUrl + 'master/zone/update/' + masterZoneId;
											requestPost.params = { zone_id: escapeIfNotNull(zoneTypeId), description: escapeIfNotNull(description), capture_points: escapeIfNotNull(capturePoints) };
											return $http(requestPost);
										},

										deleteMasterZone : function (masterZoneId) {
											return $http.get(baseUrl + 'master/zone/delete/' + masterZoneId);
										},

										getAllMasterZones : function () {
											return $http.get(baseUrl + 'master/zone/get/all');
										},

										attachPerkRuleSetToEvent: function(eventId, perkRuleSetId) {
											return $http.get(baseUrl + 'event/' + eventId + '/ruleset/perk/attach/' + perkRuleSetId);
										},

										removePerkRuleSetOfEvent: function(eventId) {
											return $http.get(baseUrl + 'event/' + eventId + '/ruleset/perk/remove');
										},

										attachTacticalActionRuleSetToEvent: function(eventId, tacticalActionRuleSetId) {
											return $http.get(baseUrl + 'event/' + eventId + '/ruleset/tacticalaction/attach/' + tacticalActionRuleSetId);
										},

										removeTactionalRuleSetOfEvent: function(eventId) {
											return $http.get(baseUrl + 'event/' + eventId + '/ruleset/tacticalaction/remove');
										},

										createZoneCoord: function(masterPersonalZoneId, lat_c, lat_d, lat_m, lat_s, lng_c, lng_d, lng_m, lng_s) {
											requestPost.url = baseUrl + 'master/zone/coord/create';
											requestPost.params = {master_zone_id: escapeIfNotNull(masterPersonalZoneId), lat_c: escapeIfNotNull(lat_c), lat_d: escapeIfNotNull(lat_d), lat_m: escapeIfNotNull(lat_m), lat_s: escapeIfNotNull(lat_s), lng_c: escapeIfNotNull(lng_c), lng_d: escapeIfNotNull(lng_d), lng_m: escapeIfNotNull(lng_m), lng_s: escapeIfNotNull(lng_s)};
											return $http(requestPost);
										},

										updateZoneCoord: function(coordId, masterPersonalZoneId, lat_c, lat_d, lat_m, lat_s, lng_c, lng_d, lng_m, lng_s) {
											requestPost.url = baseUrl + 'master/zone/coord/update/' + coordId;
											requestPost.params = {master_zone_id: escapeIfNotNull(masterPersonalZoneId), lat_c: escapeIfNotNull(lat_c), lat_d: escapeIfNotNull(lat_d), lat_m: escapeIfNotNull(lat_m), lat_s: escapeIfNotNull(lat_s), lng_c: escapeIfNotNull(lng_c), lng_d: escapeIfNotNull(lng_d), lng_m: escapeIfNotNull(lng_m), lng_s: escapeIfNotNull(lng_s)};
											return $http(requestPost);
										},

										deleteZoneCoord: function(coordId) {
											return $http.get(baseUrl + 'master/zone/coord/delete/' + coordId);
										},

										getZoneCoordById: function(coordId) {
											return $http.get(baseUrl + 'master/zone/coord/get/id/' + coordId);
										},

										getZoneCoordByMasterZoneId: function(masterZoneId) {
											return $http.get(baseUrl + 'master/zone/coord/get/zone/id/' + masterZoneId);
										},

										getAllMasterEvents: function() {
											return $http.get(baseUrl + 'master/event/get/all');
										},

										getMasterEventById: function(eventId) {
											return $http.get(baseUrl + 'master/event/get/id/' + eventId);
										},

										createEvent: function( name, logo, description_briefing, address, rules, prohibitions, proceedment, additional_informations, registration_date_start, registration_date_end, event_date_start, event_date_end, operator_inicial_perk_points, 
											max_comsys_per_faction, max_operators_per_faction, respawn_delay, gps_refresh_rate_min, gps_refresh_rate_max,
											see_enemie_bases, see_enemie_respawn, points_per_kill ) {

												requestPost.url = baseUrl + 'event/create';

												requestPost.params = { name: escapeIfNotNull(name), logo: escapeIfNotNull(logo), description_briefing: escapeIfNotNull(description_briefing),
													address: escapeIfNotNull(address), rules: escapeIfNotNull(rules), prohibitions: escapeIfNotNull(prohibitions), 
													proceedment: escapeIfNotNull(proceedment), additional_informations: escapeIfNotNull(additional_informations), 
													registration_date_start: escapeIfNotNull(registration_date_start), registration_date_end: escapeIfNotNull(registration_date_end), 
													event_date_start: escapeIfNotNull(event_date_start), event_date_end: escapeIfNotNull(event_date_end), 
													operator_inicial_perk_points: escapeIfNotNull(operator_inicial_perk_points), 
													max_comsys_per_faction: escapeIfNotNull(max_comsys_per_faction), max_operators_per_faction: escapeIfNotNull(max_operators_per_faction), 
													respawn_delay: escapeIfNotNull(respawn_delay), gps_refresh_rate_min: escapeIfNotNull(gps_refresh_rate_min), 
													gps_refresh_rate_max: escapeIfNotNull(gps_refresh_rate_max), see_enemie_bases: escapeIfNotNull(see_enemie_bases), 
													see_enemie_respawn: escapeIfNotNull(see_enemie_respawn), points_per_kill: escapeIfNotNull(points_per_kill) };

													return $http(requestPost);
												},

												updateEvent: function( eventId, name, logo, description_briefing, address, rules, prohibitions, proceedment, additional_informations,
													registration_date_start, registration_date_end, event_date_start, event_date_end, operator_inicial_perk_points, 
													max_comsys_per_faction, max_operators_per_faction, respawn_delay, gps_refresh_rate_min, gps_refresh_rate_max,
													see_enemie_bases, see_enemie_respawn, points_per_kill ) {

														requestPost.url = baseUrl + 'event/update/' + eventId;

														requestPost.params = { name: escapeIfNotNull(name), logo: escapeIfNotNull(logo), description_briefing: escapeIfNotNull(description_briefing),
															address: escapeIfNotNull(address), rules: escapeIfNotNull(rules), prohibitions: escapeIfNotNull(prohibitions), 
															proceedment: escapeIfNotNull(proceedment), additional_informations: escapeIfNotNull(additional_informations), 
															registration_date_start: escapeIfNotNull(registration_date_start), registration_date_end: escapeIfNotNull(registration_date_end), 
															event_date_start: escapeIfNotNull(event_date_start), event_date_end: escapeIfNotNull(event_date_end), 
															operator_inicial_perk_points: escapeIfNotNull(operator_inicial_perk_points), 
															max_comsys_per_faction: escapeIfNotNull(max_comsys_per_faction), max_operators_per_faction: escapeIfNotNull(max_operators_per_faction), 
															respawn_delay: escapeIfNotNull(respawn_delay), gps_refresh_rate_min: escapeIfNotNull(gps_refresh_rate_min), 
															gps_refresh_rate_max: escapeIfNotNull(gps_refresh_rate_max), see_enemie_bases: escapeIfNotNull(see_enemie_bases), 
															see_enemie_respawn: escapeIfNotNull(see_enemie_respawn), points_per_kill: escapeIfNotNull(points_per_kill) };

															return $http(requestPost);
														},

														deleteEvent: function(eventId) {
															return $http.get(baseUrl + 'event/delete/' + eventId);
														},

														attachMapToEvent: function(eventId, masterZoneId) {
															return $http.get(baseUrl + 'event/' + eventId + '/map/attach/' + masterZoneId);
														},

														removeMapOfEvent: function(eventId) {
															return $http.get(baseUrl + 'event/' + eventId+ '/map/remove');
														},

														createFaction: function(eventId, name, pin) {
															requestPost.url = baseUrl + 'event/' + eventId + '/faction/create';
															requestPost.params = {name: escapeIfNotNull(name), pin: escapeIfNotNull(pin)};
															return $http(requestPost);
														},

														updateFaction: function(eventId, oldPin, name, pin) {
															requestPost.url = baseUrl + 'event/' + eventId + '/faction/update/' + oldPin;
															requestPost.params = {name: escapeIfNotNull(name), pin: escapeIfNotNull(pin)};
															return $http(requestPost);
														},

														deleteFaction: function(eventId, pin) {
															return $http.get(baseUrl + 'event/' + eventId + '/faction/delete/' + pin);
														},

														leaveFactionComsys: function(eventId, factionPIN) {
															return $http.get(baseUrl + 'event/' + eventId + '/faction/' + 
															factionPIN + '/comsys/leave');
														},

														removeZoneOfEvent: function(eventId, zoneId) {
															return $http.get(baseUrl + 'event/' + eventId + '/zone/remove/' + zoneId);
														},

														attachCommonZoneToEvent: function(eventId, masterZoneId) {
															return $http.get(baseUrl + 'event/' + eventId + '/zone/common/attach/' + masterZoneId);
														},

														attachFactionZoneToEvent: function(eventId, factionPIN, masterZoneId) {
															return $http.get(baseUrl + 'event/' + eventId + '/zone/faction/' + factionPIN + "/attach/" + masterZoneId);
														},

														prestartEvent: function(eventId) {
															return $http.get(baseUrl + 'event/' + eventId + '/prestart');
														},

														startEvent: function(eventId) {
															return $http.get(baseUrl + 'event/' + eventId + '/start');
														},

														pauseEvent: function(eventId) {
															return $http.get(baseUrl + 'event/' + eventId + '/pause');
														},

														stopEvent: function(eventId) {
															return $http.get(baseUrl + 'event/' + eventId + '/stop');
														},

														deleteFaction: function(eventId, factionPIN) {
															return $http.get(baseUrl + 'event/' + eventId + '/faction/delete/' + factionPIN);
														},

														getFactionById: function(eventId, factionId) {
															return $http.get(baseUrl + 'event/' + eventId + '/faction/get/id/' + factionId);
														},

														getAllFactions: function(eventId) {
															return $http.get(baseUrl + 'event/' + eventId + '/faction/get/all');
														},

														joinFactionComsys: function(eventId, factionPIN) {
															return $http.get(baseUrl + 'event/' + eventId + '/faction/' + factionPIN + '/comsys/join');
														},

														sendNotificationToEvent: function(eventId, available_responses_list, sender, text) {
															var ref = new Firebase(firebaseUrl + eventId + '/');
															var postsRef = ref.child("event_notifications");
															postsRef.push({
																available_responses_list: available_responses_list,
																sender: sender,
																text: text,
																timestamp: Firebase.ServerValue.TIMESTAMP
															});
														},

														sendNotificationToFaction: function(eventId, factionId, available_responses_list, sender, text) {
															var ref = new Firebase(firebaseUrl + eventId + '/' + factionId + '/');
															var postsRef = ref.child("faction_notifications/");
															postsRef.push({
																available_responses_list: available_responses_list,
																sender: sender,
																text: text,
																timestamp: Firebase.ServerValue.TIMESTAMP
															});
														},

														sendNotificationToComsys: function(eventId, factionId, comsysId, available_responses_list, sender, text) {
															var ref = new Firebase('https://socom-bo-estg-2015.firebaseio.com/events_in_progress/' + eventId + '/factions/' + factionId + '/comsys_users/' + comsysId + '/');
															var postsRef = ref.child("comsys_notifications/");
															var newPostRef = postsRef.push({
																available_responses_list: available_responses_list,
																sender: sender,
																text: text,
																timestamp: Firebase.ServerValue.TIMESTAMP
															});
														},

														changeMasterScore: function (eventId, factionId, score) {
															var ref = new Firebase('https://socom-bo-estg-2015.firebaseio.com/events_in_progress/' + eventId + '/factions/' + factionId + '/');
															ref.update({
																score: score
															});
														},
														sendNotificationToSquad : function (eventId, factionId, squadId, available_responses_list, sender, text) {
															var ref = new Firebase('https://socom-bo-estg-2015.firebaseio.com/events_in_progress/' + eventId + '/factions/' + factionId + '/squads/' + squadId + '/');
															var postsRef = ref.child("squad_notifications/");
															var newPostRef = postsRef.push({
																available_responses_list: available_responses_list,
																sender: sender,
																text: text,
																timestamp: Firebase.ServerValue.TIMESTAMP
															});
														},

														sendNotificationToOperator : function (eventId, factionId, IDOperator, available_responses_list, sender, text) {
															var ref = new Firebase('https://socom-bo-estg-2015.firebaseio.com/events_in_progress/' + eventId + '/factions/' + factionId + '/operators/' + IDOperator + '/');
															var postsRef = ref.child("operator_notifications/");
															var newPostRef = postsRef.push({
																available_responses_list: available_responses_list,
																sender: sender,
																text: text,
																timestamp: Firebase.ServerValue.TIMESTAMP
															});		
														},

														getMasterAllowedNotifReceiver: function (eventId, done) {

															var factionsRef = new Firebase(firebaseUrl + eventId + '/factions/');
															var allowedNotifReceivers = [];
															var factions;

															var current = 0;
															var currentToFactionId = [];

															allowedNotifReceivers.push({id: eventId, name: 'Event', type: 'event'});

															factionsRef.once("value", function(snapshot) {
																factions = snapshot.val();
																var i = 0;
																for (var id in factions) {
																	allowedNotifReceivers.push({id: id, name: factions[id].name, type: 'faction'});
																	currentToFactionId[i] = id;
																	i++;
																};

																processFaction(currentToFactionId[current], function iterate() {
																	if (++current < factions.length) {
																		processFaction(currentToFactionId[current], iterate);
																	} else {
																		done(allowedNotifReceivers);
																	}
																});
															}, function (errorObject) {
																console.log("The read failed: " + errorObject.code);
															});


															function processFaction(factionId, callback){

																var ref = new Firebase(firebaseUrl + eventId + '/factions/' + factionId + '/operators/');
																var squadRef = new Firebase(firebaseUrl + eventId + '/factions/' + factionId + '/squads/');
																var comsysRef = new Firebase(firebaseUrl + eventId + '/factions/' + factionId + '/comsys_users/');
																var operators;
																var squads;
																var comsys;

																ref.once("value", function(snapshot) {
																	operators = snapshot.val();
																	for (var id in operators) {
																		allowedNotifReceivers.push({id: id, name: operators[id].nickname, type: 'operator'});
																	};

																	squadRef.once("value", function(snapshot) {
																		squads = snapshot.val();

																		for (var id in squads) {
																			allowedNotifReceivers.push({id: id, name: 'Squad ' + squads[id].tag, type: 'squad'});
																		};

																		comsysRef.once("value", function(snapshot) {
																			comsys = snapshot.val();
																			for (var id in comsys) {
																				allowedNotifReceivers.push({id: id, name: comsys[id].nickname, type: 'comsys'});
																			};
																			callback();
																		}, function (errorObject) {
																			console.log("The read failed: " + errorObject.code);
																		});
																	}, function (errorObject) {
																		console.log("The read failed: " + errorObject.code);
																	});
																}, function (errorObject) {
																	console.log("The read failed: " + errorObject.code);
																});
															};

			
														},

														createCarePackage : function (eventId,  hidden, gps_lat, gps_long) {
															var ref = new Firebase('https://socom-bo-estg-2015.firebaseio.com/events_in_progress/' + eventId);
															var postsRef = ref.child("care_packages/");
															var newPostRef = postsRef.push({
																hidden: hidden,
																gps_lat: gps_lat,
																gps_long: gps_long,
																timestamp: Firebase.ServerValue.TIMESTAMP
															});		
														}
		
													};
												});
