angular.module('app.services')

.service('ExpectService', ['$state','AppConstant', function ($state,AppConstant) {
	
	this.getExpectData = function(){
		return AppConstant.expectData;
	}
}]);
