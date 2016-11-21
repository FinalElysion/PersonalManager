angular.module('app.controllers')

.controller('ArticleCtrl', ['$scope', 'ArticleService', '$ionicModal','$ionicListDelegate',
function($scope, ArticleService, $ionicModal, $ionicListDelegate) {
	$scope.data = {};
	$scope.data.articleData = ArticleService.getArticleData(); 
	$scope.data.newArticle = {title:'',desc:'',date:''};
	
	
	$scope.data.editArticle = null;

	//init model
	$ionicModal.fromTemplateUrl('app/article/model/add-article-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.addArticleModal = modal;
	});

	$ionicModal.fromTemplateUrl('app/article/model/edit-article-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.editArticleModal = modal;
	});


	$scope.showArticle = function(){
		$scope.addArticleModal.show();
	}

	$scope.addArticle = function(data){
		ArticleService.addArticleData(data);

		$scope.data.newArticle = {desc:'',date:''};
		$scope.hideArticleDialog();
	};

	$scope.hideArticleDialog = function() {
		$scope.addArticleModal.hide();
		//$scope.addArticleModal.remove();
	};


	$scope.showEditArticle = function(item){
		$scope.data.editArticle = item;
		$scope.editArticleModal.show();
	};

	$scope.editArticle = function(item){
		$scope.hideEditArticleDialog();
	};

	$scope.hideEditArticleDialog = function() {
		$scope.editArticleModal.hide();
		$scope.data.editArticle = null;
		$ionicListDelegate.closeOptionButtons();
		//$scope.addArticleModal.remove();
	};

	$scope.deleteArticle = function(item){
		ArticleService.removeCostData(item);
	};
}]);
