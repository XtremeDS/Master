/**
 * Created by joaosilva on 25/05/15.
 */
app.controller('MenuCtrl', function ($scope, $ionicModal, $timeout, $ionicPopup, $ionicLoading, AppService, OperatorStubService) {
    // Set appType - 0:Operator 1:ComSys 2:Master
    $scope.appType = AppService.getAppType();
    
    // Set userLogged - 0:Not logged 1:Logged
    $scope.isLogged = AppService.getIsLogged();

    // Set inSquad - 0:Not in squad 1:In squad
    $scope.squadID = AppService.getSquadID();

    // Set specialisation - 0:without specialisation >1:with specialisation
    $scope.specialisation = AppService.getSpecialisation();

    $scope.inEvent = AppService.getInEvent();

    $scope.eventID = AppService.getEventID();

    $scope.factionPin = AppService.getFactionPin();

    // Form data for the login modal
    $scope.loginData = {
        username:{

        },
        password:{

        }
    };

    // Form data for the sign up modal
    $scope.signUpData = {
        username:{

        },
        password:{

        },
        repeatPassword:{

        },
        nickname:{

        },
        country:{

        },
        rank:{

        }
    };

    // Form data for the create squad modal
    $scope.createSquadData = {};

    // Form data for the join squad modal
    $scope.joinSquadData = {};

    // Form Data for Master modal
    $scope.masterData = {
        personalData:{

        },
        maps:[
            {
                title: "Mapa 1",
                description: "Descrição do mapa 1"
            },
            {
                title: "Mapa 2",
                description: "Descrição do mapa 2"
            }
        ],
        rulseSet:{

        }
    };

    $scope.masterExists = 0;

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modalLogin) {
        $scope.modalLogin = modalLogin;
    });

    // Triggered in the login modal to close it
    $scope.closeLoginModal = function () {
        $scope.modalLogin.hide();
    };

    // Open the login modal
    $scope.openLoginModal = function () {
        $scope.modalLogin.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        $scope.loadingLogin = $ionicLoading.show({
            content: 'Saving login information',
            showBackdrop: false
        });
        console.log('Doing login', $scope.loginData);

        // Login for operator
        if ($scope.appType == 0) {
            OperatorStubService.loginOperator($scope.loginData.username, $scope.loginData.password)
                .success(function (data) {
                    $scope.loadingLogin.hide();

                    console.log(data);

                    if(data.response==0){
                        // Bad login
                        var alertBadLoginPopup = $ionicPopup.alert({
                            title: 'Unable to login',
                            template: 'Unable to login. Please check all the fields and your internet connection.'
                        });
                    }else {
                        // Change the variable isLogged to is logged state
                        AppService.setIsLogged(1);
                        $scope.isLogged = AppService.getIsLogged();

                        // Closes the modal view
                        $scope.closeLoginModal();
                    }
                })
                .error(function (error) {
                    $scope.loadingLogin.hide();

                    console.log(error);

                    // Bad login
                    var alertBadLoginPopup = $ionicPopup.alert({
                        title: 'Unable to login',
                        template: 'Unable to login: ' + error
                    });
                });
        }else{
            // Login for comsys
            if ($scope.appType == 1) {

            }else{
                // Login for master

            }
        }
    };

    // Create the sign up modal that we will use later
    $ionicModal.fromTemplateUrl('templates/signUp.html', {
        scope: $scope
    }).then(function (modalSignUp) {
        $scope.modalSignUp = modalSignUp;
    });

    // Open the sign up modal
    $scope.openSignUpModal = function () {
        $scope.modalSignUp.show();
    };

    // Triggered in the sign up modal to close it
    $scope.closeSignUpModal = function () {
        $scope.modalSignUp.hide();
    };

    // Perform the sign up action when the user submits the login form
    $scope.doSignUp = function () {
        $scope.loadingSignUP = $ionicLoading.show({
            content: 'Saving sign up information',
            showBackdrop: false
        });
        console.log('Doing Sign Up', $scope.signUpData);

        if ($scope.signUpData.password == $scope.signUpData.repeatPassword) {
            OperatorStubService.createOperator($scope.signUpData.username, $scope.signUpData.password,
                $scope.signUpData.nickname, $scope.signUpData.country, $scope.signUpData.rank, null)
                .success(function (data) {
                    $scope.loadingSignUP.hide();

                    console.log(data);

                    if (data.response==0){
                        // Bad sign up
                        var alertBadSignUpPopup = $ionicPopup.alert({
                            title: 'Unable to sign up',
                            template: 'Unable to sign up. Please check your internet connection.'
                        });
                    }else {
                        // Change the variable isLogged to is logged state
                        AppService.setIsLogged(1);
                        $scope.isLogged = AppService.getIsLogged();

                        // Closes the modal view
                        $scope.closeSignUpModal();
                        $scope.closeLoginModal();
                    }
                })
                .error(function (error) {
                    $scope.loadingSignUP.hide();

                    console.log(error);

                    // Bad sign up
                    var alertBadSignUpPopup = $ionicPopup.alert({
                        title: 'Unable to sign up',
                        template: 'Unable to sign up: ' + error.message
                    });
                });
        }else{
            // Popup bad passwords
            var alertPasswordPopup = $ionicPopup.alert({
                title: 'Wrong password',
                template: 'The field \"Password\" and \"Repeat Password\" must be the same.'
            });
        }
    };

    // Create the join squad modal that we will use later
    $ionicModal.fromTemplateUrl('templates/operator/joinSquad.html', {
        scope: $scope
    }).then(function (modalJoinSquad) {
        $scope.modalJoinSquad = modalJoinSquad;
    });

    // Triggered in the join squad modal to close it
    $scope.closeJoinSquadModal = function () {
        $scope.modalJoinSquad.hide();
    };

    // Open the join squad modal
    $scope.openJoinSquadModal = function () {
        $scope.modalJoinSquad.show();
    };

    // Perform the join squad action when the user submits the joinSquad form
    $scope.doJoinSquad = function () {
        $scope.loadingJoinSquad = $ionicLoading.show({
            content: 'Saving join squad information',
            showBackdrop: false
        });
        OperatorStubService.joinFactionSquad($scope.eventID(), $scope.factionPin(), $scope.squadID())
            .success(function (data) {
                $scope.loadingJoinSquad.hide();

                console.log(data);

                if (data.response==0){
                    // Bad request
                    var alertBadRequestPopup = $ionicPopup.alert({
                        title: 'Unable to join',
                        template: 'Unable to join squad. Please check your internet connection.'
                    });
                }else{
                    console.log('Doing join squad', $scope.joinSquadData);

                    // Change the variable isLogged to is logged state
                    AppService.setSquadID(1);
                    $scope.squadID = AppService.getSquadID();

                    $scope.closeJoinSquadModal();
                }
            })
            .error(function (error) {
                $scope.loadingJoinSquad.hide();

                // Bad request
                var alertBadRequestPopup = $ionicPopup.alert({
                    title: 'Unable to join',
                    template: 'Unable to join squad: ' + error.message
                });
            });
    };

    // Create the join squad modal that we will use later
    $ionicModal.fromTemplateUrl('templates/operator/createSquad.html', {
        scope: $scope
    }).then(function (modalCreateSquad) {
        $scope.modalCreateSquad = modalCreateSquad;
    });

    // Triggered in the join squad modal to close it
    $scope.closeCreateSquadModal = function () {
        $scope.modalCreateSquad.hide();
    };

    // Open the join squad modal
    $scope.openCreateSquadModal = function () {
        $scope.modalCreateSquad.show();
    };

    // Perform the join squad action when the user submits the joinSquad form
    $scope.doCreateSquad = function () {
        $scope.loadingCreateSquad = $ionicLoading.show({
            content: 'Saving crate squad information',
            showBackdrop: false
        });
        console.log('Doing create squad', $scope.createSquadData);

        OperatorStubService.createSquad($scope.eventID, $scope.factionPin)
            .success(function (data) {
                $scope.loadingCreateSquad.hide();

                console.log(data);

                if(data.response==0){
                    // Bad request
                    var alertBadRequestPopup = $ionicPopup.alert({
                        title: 'Unable to create squad',
                        template: 'Unable to create new squad. Please check your internet connection.'
                    });
                }else{
                    // Change the variable squadID and isSquadLider to is logged state
                    AppService.setSquadID(1);
                    AppService.setIsSquadLider(1);
                    $scope.squadID = AppService.getSquadID();
                    $scope.squadLider = AppService.getIsSquadLider();

                    // Close modals
                    $scope.closeCreateSquadModal();
                    $scope.closeJoinSquadModal();
                }
            })
            .error(function (error) {
                $scope.loadingCreateSquad.hide();

                // Bad request
                var alertBadRequestPopup = $ionicPopup.alert({
                    title: 'Unable to create squad',
                    template: 'Unable to create new squad: ' + error.message
                });
            });
    };
});