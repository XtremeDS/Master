/* globals angular */

'use strict';
var app = angular.module('myApp', ['voylinux.ngChronos'])
.controller('MyCtrl','$scope', [function($scope) {

    $scope.chrono = {};

    $scope.start = function() {
        console.log($scope.chrono);
        console.log($scope);
        $scope.chrono.start();

    };
}]);
