angular.module('app.controllers')

.controller('WelcomeCtrl', ['$scope','$state',function($scope,$state) {
	$scope.enterSystem = function(){
		$state.go('app.expect');
	}
}]);
