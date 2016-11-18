angular.module('app.controllers')

.controller('ExpectCtrl', ['$scope', 'ExpectService', '$ionicModal',function($scope, ExpectService, $ionicModal) {
	$scope.data = {};
	$scope.data.repectData = ExpectService.getExpectData(); 
	$scope.data.newExpect  = {title:'',desc:''};
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
	
	$scope.hideDialog = function(newExpect) {
		$scope.data.repectData = ExpectService.addExpectData(newExpect);

		$scope.addExpectModal.hide();
		$scope.data.newExpect  = {title:'',desc:''};
		//$scope.addExpectModal.remove();
	};
}]);
