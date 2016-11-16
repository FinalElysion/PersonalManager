angular.module('app.services')

.service('FGOService', ['$state','AppConstant', function ($state,AppConstant) {
	
	this.getFGOData = function(){
		return AppConstant.FGOData;
	}
}]);
