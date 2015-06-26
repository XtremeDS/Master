/**
 * Created by Bagaric on 09/06/15.
 * Login service for the Master
 */
app.service('MasterInfo', function($ionicLoading, GeneralFunctions, MasterStubService, EventsInfo, $ionicHistory, $state) {
    var isLogged = 0;

    //Return isLogged
    this.getIsLogged = function() {
        return isLogged;
    };

    //Set isLogged
    this.setIsLogged = function (newIsLogged) {
        isLogged = newIsLogged;
    };

    //Reset to default - Logout
    this.resetToDefault = function (scope) {
        var self = this;
        self.setIsLogged(0);

        EventsInfo.resetToDefault();

        // closes loading spin
        $ionicLoading.hide();

        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.map');
    };

    //Fetch and check if user is logged
    this.checkIfItsLogged = function () {
        MasterStubService.loginCheckMaster()
            .success(function (data) {
                // closes loading spin
                $ionicLoading.hide();

                console.log(data);

                if (data.response==0){
                    // Bad result
                    GeneralFunctions.buildAlertPopUp('Unable to check',
                        'Unable to check if user is logged.');
                }else{

                }
            })
            .error(function (error) {
                // closes loading spin
                $ionicLoading.hide();

                // Bad result
                GeneralFunctions.buildAlertPopUp('Something went wrong',
                    'Something went wrong: ' + error.message);
            });
    };

    // Fetch master data
    this.getMasterPersonalConfig = function (scope) {
        var self = this;
        MasterStubService.getMasterPersonalConfig()
            .success(function (data) {

                console.log(data);

                if (data.response == 0) {
                    // closes loading spin
                    $ionicLoading.hide();

                    // Bad password
                    GeneralFunctions.buildAlertPopUp('Unable to update',
                        'Unable to update user information.');
                } else {
                    //Change here the editProfileData and mapGrid variables
                    /*if (data.list.coord_format == 0){
                        self.setCoordInpFormatText("Lat/Long");
                    }else{
                        if (data.list.coord_format == 1){
                            self.setCoordInpFormatText("DMS");
                        }else{
                            if (data.list.coord_format == 2){
                                self.setCoordInpFormatText("UTM");
                            }else{
                                self.setCoordInpFormatText("MGRS");
                            }
                        }
                    }

                    self.setNickname(data.list.nickname);
                    self.setCountry(data.list.country.toUpperCase());
                    self.setRank(data.list.rank_ornumber);
                    self.setCoordInpFormat(data.list.coord_format);
                    self.setMapGrid(data.list.display_grid);
                    self.setSpecialisation(data.list.specialization_id);
                    switch(parseInt(data.list.specialization_id.toString())) {
                        case 1:
                            self.setSpecialisationName("Anti Tank");
                            break;
                        case 2:
                            self.setSpecialisationName("Armored");
                            break;
                        case 3:
                            self.setSpecialisationName("Artellery");
                            break;
                        case 4:
                            self.setSpecialisationName("Bridging");
                            break;
                        case 5:
                            self.setSpecialisationName("Engineer");
                            break;
                        case 6:
                            self.setSpecialisationName("Infantary Light");
                            break;
                        case 7:
                            self.setSpecialisationName("Infantary Heavy");
                            break;
                        case 8:
                            self.setSpecialisationName("Infantary Sniper");
                            break;
                        case 9:
                            self.setSpecialisationName("Maintenance");
                            break;
                        case 10:
                            self.setSpecialisationName("Medic");
                            break;
                        case 11:
                            self.setSpecialisationName("Mortar");
                            break;
                        case 12:
                            self.setSpecialisationName("Radar");
                            break;
                        case 13:
                            self.setSpecialisationName("Recon");
                            break;
                        case 14:
                            self.setSpecialisationName("Special Force");
                            break;
                        case 15:
                            self.setSpecialisationName("Signals");
                            break;
                        case 16:
                            self.setSpecialisationName("SOF");
                            break;
                        case 17:
                            self.setSpecialisationName("Transportation");
                            break;
                        default:
                            self.setSpecialisationName("undefined");
                    }
                    */
                    // Closes the modal view
                    //scope.closeLoginModal();

                    EventsInfo.fetchAllEvents(scope);
                }
            })
            .error(function (error) {
                // closes loading spin
                $ionicLoading.hide();

                // Bad password
                GeneralFunctions.buildAlertPopUp('Unable to update',
                    'Unable to update user information: ' + error.message);
            });
    };

    // Function to login
    this.doLogin = function (username, password, scope) {
        var self = this;
        MasterStubService.login(username, password)
            .success(function (data) {

                console.log(data);

                if(data.response==0){
                    // closes loading spin
                    $ionicLoading.hide();

                    // Bad result
                    GeneralFunctions.buildAlertPopUp('Unable to login',
                        'Unable to login. Incorrect username or password.');
                }else {
                    // Change the variable isLogged to is logged state
                    self.setIsLogged(data.response);

                    scope.isLogged = self.getIsLogged();

                    // Fetch master data
                    self.getMasterPersonalConfig(scope);
                }
            })
            .error(function (error) {
                // closes loading spin
                $ionicLoading.hide();

                // Bad result
                GeneralFunctions.buildAlertPopUp('Unable to login',
                    'Unable to login: ' + error.message);
            });
    };

    //Create Master
    this.doSignUp = function(password, rPassword, email, nickname, logo,
                phone, address, zipcode, country, association_description, association_link, association_link_promo, scope) {
        var self = this;
        if (password == rPassword) {
            MasterStubService.createMaster(email, password, nickname, null,
                phone, address, zipcode, country, null, null, null)
                .success(function (data) {

                    console.log(data);

                    if (data.response==0){
                        // closes loading spin
                        $ionicLoading.hide();

                        // Bad result
                        GeneralFunctions.buildAlertPopUp('Unable to sign up',
                            'Unable to sign up. Please check your internet connection.');
                    }else {
                        // Closes the modal view


                        // Do automatic login
                        self.doLogin(username, password, scope);
                    }
                })
                .error(function (error) {
                    // closes loading spin
                    $ionicLoading.hide();

                    console.log(error);

                    // Bad result
                    GeneralFunctions.buildAlertPopUp('Unable to sign up',
                        'Unable to sign up: ' + error.message);
                });
        }else{
            // closes loading spin
            $ionicLoading.hide();

            // Bad password
            GeneralFunctions.buildAlertPopUp('Wrong password',
                'The field \"Password\" and \"Repeat Password\" must be the same.');
        }
    };

    //Set new user data
    this.editProfileData = function (mapGrid, coordInpFormat, nickname, country, rank, specialisation, scope){
        var self = this;
        MasterStubService.updateMasterPersonalConfig(mapGrid, coordInpFormat, nickname, country.toLowerCase(), rank, specialisation)
            .success(function (data) {
                console.log(data);

                if(data.response==0){
                    // closes loading spin
                    $ionicLoading.hide();

                    // Bad password
                    GeneralFunctions.buildAlertPopUp('Unable to update',
                        'Unable to update profile information. Please check your internet connection.');
                }else{
                    /*if (coordInpFormat == 0){
                        self.setCoordInpFormatText("Lat/Long");
                    }else{
                        if (coordInpFormat == 1){
                            self.setCoordInpFormatText("DMS");
                        }else{
                            if (coordInpFormat == 2){
                                self.setCoordInpFormatText("UTM");
                            }else{
                                self.setCoordInpFormatText("MGRS");
                            }
                        }
                    }
                    self.setCoordInpFormat(coordInpFormat);
                    self.setNickname(nickname);
                    self.setCountry(country);
                    self.setRank(rank);
                    self.setMapGrid(mapGrid);*/

                    // closes loading spin
                    $ionicLoading.hide();

                    scope.closeEditProfileModal();
                }
            })
            .error(function (error) {
                // closes loading spin
                $ionicLoading.hide();

                // Bad password
                GeneralFunctions.buildAlertPopUp('Unable to update',
                    'Unable to update profile information: ' + error.message);
            });
    };

    //Change user password
    this.changeUserPassword = function (password, rPassword, oPassword, scope) {
        if (password == rPassword) {
            MasterStubService.changeMasterPassword(oPassword, password)
                .success(function (data) {
                    // closes loading spin
                    $ionicLoading.hide();

                    console.log(data);

                    if(data.response==0){
                        // closes loading spin
                        $ionicLoading.hide();

                        // Bad result
                        GeneralFunctions.buildAlertPopUp('Unable to change password',
                            'Unable to change password. Please check your internet connection.');
                    }else{
                        scope.closeChangePasswordModal();
                    }
                })
                .error(function (error) {
                    // closes loading spin
                    $ionicLoading.hide();

                    // Bad result
                    GeneralFunctions.buildAlertPopUp('Unable to change password',
                        'Unable to change password: ' + error.message);
                });
        } else {
            // closes loading spin
            $ionicLoading.hide();

            // Bad password
            GeneralFunctions.buildAlertPopUp('Wrong password',
                'The field \"Password\" and \"Repeat Password\" must be the same.');
        }
    };

    //Logout
    this.userLogout = function (scope) {
        var self = this;
        MasterStubService.logoutMaster()
            .success(function (data) {

                console.log(data);

                if (data.response == 0){
                    // closes loading spin
                    $ionicLoading.hide();

                    // Bad password
                    GeneralFunctions.buildAlertPopUp('Unable to logout',
                        'Unable to logout. Please check your internet connection.');
                }else {
                    self.resetToDefault(scope);
                }
            })
            .error(function (error) {
                // closes loading spin
                $ionicLoading.hide();

                // Bad password
                GeneralFunctions.buildAlertPopUp('Unable to logout',
                    'Unable to load data: ' + error.message);
            });
    };


    // this part enables retrieval of current password when changing passwords
    /*var currentMasterPassword;
    
    return {
        getCurrentPassword: function() {
            return currentMasterPassword;
        },
        setCurrentPassword: function(password) {
            currentMasterPassword = password;
        }
    }*/
});