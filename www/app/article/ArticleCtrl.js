angular.module('app.controllers')

.controller('ArticleCtrl', ['$scope', 'ArticleService', '$ionicModal',function($scope, ArticleService, $ionicModal) {
	$scope.data = {};
	$scope.data.articleData = ArticleService.getArticleData(); 
	$scope.data.newArticle = {title:'',desc:'',date:''};
	
	//init model
	$ionicModal.fromTemplateUrl('app/article/model/add-article-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.addArticleModal = modal;
	});

	$scope.showArticle = function(){
		$scope.addArticleModal.show();
	}

	$scope.addArticle = function(data){
		ArticleService.addArticleData(data);

		$scope.data.newArticle = {title:'',desc:'',date:''};
		$scope.hideDialog();
	};

	$scope.hideDialog = function() {
		$scope.addArticleModal.hide();
		//$scope.addArticleModal.remove();
	};

}]);
