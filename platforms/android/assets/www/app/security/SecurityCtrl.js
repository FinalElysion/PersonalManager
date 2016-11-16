angular.module('app.controllers')

.controller('SecurityCtrl', ['$rootScope', '$scope', '$state',
function ($rootScope, $scope, $state) {
 	$scope.login = function(user){
  		//$state.go('app.expect');
  		$state.go('welcome');
  	};
}]);

