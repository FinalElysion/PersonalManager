angular.module('app.controllers')

.controller('ExpectCtrl', ['$scope', 'ExpectService', '$ionicModal',function($scope, ExpectService, $ionicModal) {
	$scope.data = {};
	$scope.data.repectData = ExpectService.getExpectData(); 
	$scope.data.newExpect  = {title:'',desc:''};

	$scope.listCanSwipe = true;

	$scope.data.editExpect = null;
	
	//init model
	$ionicModal.fromTemplateUrl('app/expect/model/add-expect-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.addExpectModal = modal;
	});

	$ionicModal.fromTemplateUrl('app/expect/model/edit-expect-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.editExpectModal = modal;
	});


	


	$scope.showAddExpect = function(){
		$scope.addExpectModal.show();
	};


	$scope.addExpect = function(newExpect){
		$scope.data.repectData = ExpectService.addExpectData(newExpect);
		$scope.hideAddExpect();
	};

	$scope.hideAddExpect = function() {
		$scope.addExpectModal.hide();
		$scope.data.newExpect  = {title:'',desc:''};
		//$scope.addExpectModal.remove();
	};

	$scope.delteExpect = function(item){
		ExpectService.removeExpectData(item);
	};

	$scope.showEditExpect = function(item){
		$scope.data.editExpect = item;
		$scope.editExpectModal.show();
	};	

	$scope.saveEditExpect = function(item){
		$scope.hideEditExpect();
	};

	$scope.hideEditExpect = function(item){
		$scope.editExpectModal.hide();
		$scope.data.editExpect = null;
	};	

	
}]);
