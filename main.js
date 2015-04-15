'use strict';

/**
 * Entry point of application
 * @module app
 *
 */
var app = angular.module('app' , ['LocalStorageModule']);

app.config(function (localStorageServiceProvider) {
	localStorageServiceProvider
		.setPrefix('dnd');

});

app.run(function() {

});

app.controller("dndController",["$scope", function($scope){

  $scope.data = {name:"Dropped Item",props:"someprops"};

  $scope.description = {type:"sometype",state:"somestate"};
  $scope.items = [
    {name:"Item #1 in list",props:"someprops"},
    {name:"Item #2 in list",props:"someprops"}
  ]

  $scope.dropMethod = function(o){
    $scope.items.push(o.data);
    $scope.$apply();
  }



}]);
