angular.module('app.controllers')

.controller('CostCtrl', ['$scope', 'CostService', '$ionicModal',function($scope, CostService, $ionicModal) {
	$scope.data = {};
	$scope.data.costData = CostService.getCostData(); 
	$scope.data.newCost = {money:'',desc:'',date:''};
	
	//init model
	$ionicModal.fromTemplateUrl('app/cost/model/add-cost-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.addCostModal = modal;
	});

	$scope.showCost = function(){
		$scope.addCostModal.show();
	}

	$scope.addCost = function(data){
		CostService.addCostData(data);

		$scope.data.newCost = {money:'',desc:'',date:''};
		$scope.hideDialog();
	};

	$scope.hideDialog = function() {
		$scope.addCostModal.hide();
		//$scope.addCostModal.remove();
	};

}]);
