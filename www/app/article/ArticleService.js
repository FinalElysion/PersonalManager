angular.module('app.services')

.service('ArticleService', ['$state','AppConstant', function ($state,AppConstant) {
	
	var currentData = AppConstant.articleData;
	
	this.getArticleData = function(){
		return currentData;
	}


	this.addArticleData = function(data){
		currentData.push(data);
		return currentData;
	}
}]);
