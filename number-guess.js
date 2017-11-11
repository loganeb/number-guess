angular.module('numberGuessApp', [])
  .controller('numberGuessController', ['$scope', '$http', '$sce',
    function($scope, $http, $sce) {
      var initMsg = "Pick a number between 0 and 1,000,000, then press start.";
      var greaterMsg = function(newNum){
        return "Is your number greater than " + newNum + "?";
      };
      var guessMsg = function(newNum){
        return "Is your number " + newNum + "?";
      };
      var endMsg = function(guessNum){
        return "It took " + guessNum + " guesses to find your number.";
      };
      $scope.startStr = true;
      $scope.yesnoStr = false;
      $scope.guessStr = false;
      $scope.endStr = false;

      $scope.message = initMsg;
      var num = 0;
      var lastNum = 0;
      var temp = 0;
      var guesses = 0;

      $scope.start = function(){
          guesses = 0;
          num = 500000;
          lastNum = 1000000;
          $scope.message = greaterMsg(num);
          $scope.startStr = false;
          $scope.yesnoStr = true;
          $scope.guessStr = false;
          $scope.endStr = false;
      };

      $scope.greater = function(){
        if(num > 1000000)
          num = 1000000;
        temp = num;
        num = Math.round((Math.abs(lastNum-num)/2) + num);
        lastNum = temp;
        $scope.message = greaterMsg(num);
        $scope.startStr = false;
        $scope.yesnoStr = true;
        $scope.guessStr = false;
        $scope.endStr = false;
      };

      $scope.notGreater = function(){
        $scope.message = guessMsg(num);
        $scope.startStr = false;
        $scope.yesnoStr = false;
        $scope.guessStr = true;
        $scope.endStr = false;
        guesses ++;
      };

      $scope.lesser = function(){
        if(num < 1)
          num = 1;
        if(lastNum === 1000000 || lastNum === num){
          temp = num;
          num = Math.round(num/2);
          lastNum = temp;
        }
        else{
          temp = num;
          num = Math.round(num - (Math.abs(lastNum-num)/2));
          lastNum = temp;
        }
        $scope.message = greaterMsg(num);
        $scope.startStr = false;
        $scope.yesnoStr = true;
        $scope.guessStr = false;
        $scope.endStr = false;
      };

      $scope.end = function(){
        $scope.message = endMsg(guesses);
        $scope.startStr = false;
        $scope.yesnoStr = false;
        $scope.guessStr = false;
        $scope.endStr = true;
      };




  }]);
