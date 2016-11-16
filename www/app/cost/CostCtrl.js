angular.module('app.controllers')

.controller('CostCtrl', ['$scope', 'CostService', '$ionicModal',function($scope, CostService, $ionicModal) {
	$scope.data = {};
	$scope.data.costData = CostService.getCostData(); 

	//init model
	$ionicModal.fromTemplateUrl('app/cost/model/add-cost-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.addCostModal = modal;
	});


	$scope.addCost = function(){
		$scope.addCostModal.show();
	};

	$scope.hideDialog = function() {
		$scope.addCostModal.hide();
		//$scope.addCostModal.remove();
	};

}]);
