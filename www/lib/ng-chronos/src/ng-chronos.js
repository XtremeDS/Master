/* glo.minbals angular     */
angular.module('voylinux.ngChronos', [])
.directive('ngChronos', function() {
    'use strict';


    return {
      replace: false,
      scope: {
        chrono: '=ngModel'
      },
      restrict: 'EAC',
      transclude: true,
      template:  '<span>Actual seconds {{chrono.actualSeconds}} : is running {{chrono.isRunning}}</span>',
      controller: ['$scope', '$interval',function ($scope, $interval){

          var _incrementSeconds,
              _increment,
              _isRunning = false,
              _start,
              _pause,
              _stop;

          _start = function ( ) {
              console.info('Starting chrono');
              console.info(_isRunning);

              if( $scope.chrono.isRunning === false ){
                  _incrementSeconds();
              }

          };

          _pause = function ( ) {
            console.info('Pausing chrono');
            $scope.chrono.isRunning = false;
            $interval.cancel(_increment);
          };

          _stop = function ( ) {

              try{
                $interval.cancel(_increment);
                $scope.chrono.isRunning = false;
                $scope.chrono.actualSeconds = 0;
              }catch(e){
                console.warn(e);
              }

          };

          _incrementSeconds = function ( ) {
              $scope.chrono.isRunning = true;
              
              _increment = $interval(function(){
                          if($scope.chrono.isRunning === true) {
                              $scope.chrono.actualSeconds+=1;
                          }
                      }, 1000);

          };

          $scope.chrono = {

              actualSeconds: 0,
              isRunning: _isRunning,
              start: _start,
              pause: _pause,
              stop: _stop

          };

      }]
    };

  });
