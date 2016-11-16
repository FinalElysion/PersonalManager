angular.module('app.services')

.service('CostService', ['$state','AppConstant', function ($state,AppConstant) {
	
	this.getCostData = function(){
		return AppConstant.costData;
	}
}]);
