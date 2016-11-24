angular.module('app.controllers')

.controller('ExpectCtrl', ['$scope', 'ExpectService', '$ionicModal',function($scope, ExpectService, $ionicModal) {

	var initData = function(){
		$scope.data = {};
		$scope.data.newExpect  = {title:'',desc:''};
		$scope.listCanSwipe = true;
		$scope.data.editExpect = null;
		$scope.data.currentItem = null;
		$scope.data.repectData = [];
		$scope.data.searchType = 'name';
		$scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
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

		ExpectService.getExpectData().then(function(result){
			$scope.data.repectData = result;
			$scope.$apply();
		});
	} 

	initData();

	$scope.showAddExpect = function(){
		$scope.addExpectModal.show();
	};

	$scope.addExpect = function(newExpect){
		ExpectService.addExpectData(newExpect).then(function(result){
			return ExpectService.getExpectData().then(function(result){
				$scope.data.repectData = result;
				$scope.hideAddExpect();
			}); 
			
		})
	};

	$scope.hideAddExpect = function() {
		$scope.addExpectModal.hide();
		$scope.data.newExpect  = {title:'',desc:''};
		//$scope.addExpectModal.remove();
	};

	$scope.delteExpect = function(item){
		ExpectService.removeExpectData(item)
		.then(function(result){
			$scope.$apply();
		})
	};

	$scope.showEditExpect = function(item){
		$scope.data.editExpect = angular.copy(item);
		$scope.data.currentItem = item;
		$scope.editExpectModal.show();
	};	

	$scope.saveEditExpect = function(item){
		ExpectService.editExpectData(item,$scope.data.currentItem)
		.then(function(result){
			$scope.hideEditExpect();
			$scope.$apply();
		})
	};

	$scope.hideEditExpect = function(item){
		$scope.editExpectModal.hide();
		$scope.data.editExpect = null;
		$scope.data.currentItem = null;
	};	

}]);
