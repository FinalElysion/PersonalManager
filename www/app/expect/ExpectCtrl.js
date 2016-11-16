angular.module('app.controllers')

.controller('ExpectCtrl', ['$scope', 'ExpectService', '$ionicModal',function($scope, ExpectService, $ionicModal) {
	$scope.data = {};
	$scope.data.repectData = ExpectService.getExpectData(); 

	//init model
	$ionicModal.fromTemplateUrl('app/expect/model/add-expect-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.addExpectModal = modal;
	});


	$scope.addExpect = function(){
		$scope.addExpectModal.show();
	};

	$scope.hideDialog = function() {
		$scope.addExpectModal.hide();
		//$scope.addExpectModal.remove();
	};

}]);
