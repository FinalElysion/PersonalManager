angular.module('app.services')

.service('CostService', ['$state','AppConstant', function ($state,AppConstant) {
	
	var currentData = AppConstant.costData;
	
	this.getCostData = function(){
		return currentData;
	};


	this.addCostData = function(data){
		currentData.push(data);
		return currentData;
	};

	this.removeCostData = function(data){
		CommonUtils.removeArrayItem(currentData,data);
	};
}]);
