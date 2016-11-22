angular.module('app.controllers')

.controller('ArticleCtrl', ['$scope', 'ArticleService', '$ionicModal','$ionicListDelegate',
function($scope, ArticleService, $ionicModal, $ionicListDelegate) {
	
	function initData(){

		$scope.data = {};
		$scope.data.articleData = [];
		$scope.data.newArticle = {title:'',desc:'',date:''};
		
		$scope.data.editArticle = null;

		ArticleService.getArticleData().then(function(result){
			$scope.data.articleData = result;
			$scope.$apply();
		})

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
	}

	initData();
	$scope.showArticle = function(){
		$scope.addArticleModal.show();
	};

	$scope.addArticle = function(data){
		ArticleService.addArticleData(data).then(function(result){
			return ArticleService.getArticleData().then(function(result){
				$scope.data.articleData = result;
				$scope.hideArticleDialog();
				//$scope.$apply();
			}); 
		})
	};

	$scope.hideArticleDialog = function() {
		$scope.addArticleModal.hide();
		$scope.data.newArticle = {title:'',desc:'',date:''};
		//$scope.addArticleModal.remove();
	};


	$scope.showEditArticle = function(item){
		$scope.data.editArticle =angular.copy(item);
		$scope.data.editArticle.date = new Date($scope.data.editArticle.date);
		$scope.data.currentItem = item;
		$scope.editArticleModal.show();
	};

	$scope.editArticle = function(item){
		ArticleService.editArticleData(item,$scope.data.currentItem)
		.then(function(result){
			$scope.hideEditArticleDialog();
			$scope.$apply();
		})
	};

	$scope.hideEditArticleDialog = function() {
		$scope.editArticleModal.hide();
		$scope.data.editArticle = null;
		$scope.data.currentItem = null; 
		$ionicListDelegate.closeOptionButtons();
		//$scope.addArticleModal.remove();
	};

	$scope.deleteArticle = function(item){
		ArticleService.removeArticleData(item)
		.then(function(result){
			$scope.$apply();
		})
	};

}]);
