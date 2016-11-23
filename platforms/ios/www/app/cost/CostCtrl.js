angular.module('app.controllers')

.controller('CostCtrl', ['$scope', 'CostService', '$ionicModal','$ionicListDelegate',function($scope, CostService, $ionicModal,$ionicListDelegate) {

	function initData(){
		$scope.data = {};
		$scope.data.costData = [];
		$scope.data.newCost = {money:'',desc:'',date:''};
		
		$scope.data.editCost = null;
		$scope.data.currentItem = null;
		CostService.getCostData().then(function(result){
			$scope.data.costData = result;
			$scope.$apply();
		})

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
	};

	initData();

	$scope.showCost = function(){
		$scope.addCostModal.show();
	}

	$scope.addCost = function(data){
		CostService.addCostData(data).then(function(result){
			return CostService.getCostData().then(function(result){
				$scope.data.costData = result;
				$scope.hideAddDialog();
				//$scope.$apply();
			}); 
			
		})
	};

	$scope.hideAddDialog = function() {
		$scope.addCostModal.hide();
		$scope.data.newCost = {money:'',desc:'',date:''};
		//$scope.addCostModal.remove();
	};


	$scope.showEditCost = function(item){
		$scope.data.editCost = angular.copy(item);
		$scope.data.editCost.date = new Date($scope.data.editCost.date); 
		$scope.data.currentItem = item;
		$scope.editCostModal.show();
	};
	

	$scope.editCost = function(item){
		CostService.editCostData(item,$scope.data.currentItem)
		.then(function(result){
			$scope.hideEditDialog();
			$scope.$apply();
		})
	};

	$scope.hideEditDialog = function() {
		$scope.editCostModal.hide();
		$scope.data.editCost = null;
		$scope.data.currentItem = null;
		$ionicListDelegate.closeOptionButtons();
		//$scope.addCostModal.remove();
	};

	$scope.deleteCost = function(item){
		CostService.removeCostData(item)
		.then(function(result){
			$scope.$apply();
		})
	};
	

}]);
