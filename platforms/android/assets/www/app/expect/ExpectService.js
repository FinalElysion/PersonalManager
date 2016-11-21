angular.module('app.services')

.service('ExpectService', ['$state','AppConstant','CommonUtils', function ($state,AppConstant,CommonUtils) {
	var currentData = AppConstant.expectData;
	
	this.getExpectData = function(){
		return currentData;
	};

	this.addExpectData = function(data){
		currentData.push(data);
		return currentData;
	};

	this.removeExpectData = function(data){
		CommonUtils.removeArrayItem(currentData,data);
	};


	this.editExpectData = function(data){
		CommonUtils.removeArrayItem(currentData,data);
	};
}]);
