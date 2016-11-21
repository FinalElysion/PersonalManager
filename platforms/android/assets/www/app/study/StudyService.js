angular.module('app.services')

.service('StudyService', ['$state','AppConstant', function ($state,AppConstant) {
	
	var currentData = AppConstant.studyData;
	
	this.getStudyData = function(){
		return currentData;
	}


	this.addStudyData = function(data){
		currentData.push(data);
		return currentData;
	}
}]);
