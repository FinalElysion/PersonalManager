angular.module('app.controllers')

.controller('FGOCtrl', ['$scope', 'FGOService', '$ionicModal',function($scope, FGOService, $ionicModal) {
	var fgoDate = FGOService.getFGOData();
	$scope.data = {};
	$scope.data.cailiaoMR = fgoDate.cailiao;

}]);
