angular.module('app.controllers', [])

.controller('AppCtrl', ['$rootScope', '$scope', '$state',
function ($rootScope, $scope, $state) {
	$scope.login = function(user){
  		$state.go('app.expect');
  	};
         
}]);