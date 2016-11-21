angular.module('app.controllers')

.controller('CostCtrl', ['$scope', 'CostService', '$ionicModal','$ionicListDelegate',function($scope, CostService, $ionicModal,$ionicListDelegate) {
	$scope.data = {};
	$scope.data.costData = CostService.getCostData(); 
	$scope.data.newCost = {money:'',desc:'',date:''};
	
	$scope.data.editCost = null;

	//init model
	$ionicModal.fromTemplateUrl('app/cost/model/add-cost-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.addCostModal = modal;
	});

	
	$ionicModal.fromTemplateUrl('app/cost/model/edit-cost-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.editCostModal = modal;
	});


	$scope.showCost = function(){
		$scope.addCostModal.show();
	}

	$scope.addCost = function(data){
		CostService.addCostData(data);

		$scope.data.newCost = {money:'',desc:'',date:''};
		$scope.hideAddDialog();
	};

	$scope.hideAddDialog = function() {
		$scope.addCostModal.hide();
		//$scope.addCostModal.remove();
	};



	$scope.showEditCost = function(item){
		$scope.data.editCost = item;
		$scope.editCostModal.show();
	};
	

	$scope.editCost = function(item){
		$scope.hideEditDialog();
	};

	$scope.hideEditDialog = function() {
		$scope.editCostModal.hide();
		$scope.data.editCost = null;
		$ionicListDelegate.closeOptionButtons();
		//$scope.addCostModal.remove();
	};

	$scope.deleteCost = function(item){
		CostService.removeCostData(item);
	};
	

}]);
