angular.module('app.controllers')

.controller('StudyCtrl', ['$scope', 'StudyService', '$ionicModal',function($scope, StudyService, $ionicModal) {
	

	

	function initData(){
		$scope.data = {};
		$scope.data.studyData = [];
		$scope.data.newStudy = {title:'',desc:'',date:''};
		$scope.isShowDelete = false;

		$scope.isShowEdit = false;

		$scope.data.editStudy = null;
		$scope.data.currentItem = null;
		StudyService.getStudyData().then(function(result){
			$scope.data.studyData = result;
			$scope.$apply();
		})


		//init model
		$ionicModal.fromTemplateUrl('app/study/model/add-study-model.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.addStudyModal = modal;
		});

		$ionicModal.fromTemplateUrl('app/study/model/edit-study-model.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.editStudyModal = modal;
		});
	};
	initData();

	$scope.showAddStudy = function(){
		$scope.addStudyModal.show();
	};

	$scope.addStudy = function(data){
		StudyService.addStudyData(data).then(function(result){
			return StudyService.getStudyData().then(function(result){
				$scope.data.studyData = result;
				$scope.hideAddDialog();
				//$scope.$apply();
			}); 
		})
	};


	$scope.hideAddDialog = function() {
		$scope.addStudyModal.hide();
		$scope.data.newStudy = {title:'',desc:'',date:''};
		//$scope.addStudyModal.remove();
	};


	$scope.showDelete = function(){
		$scope.isShowDelete = !$scope.isShowDelete;
	};

	$scope.showEdit = function(){
		$scope.isShowEdit = !$scope.isShowEdit;
	};


	$scope.showEditStudyDialog = function(item){
		$scope.data.editStudy = angular.copy(item);
		$scope.data.editStudy.date = new Date($scope.data.editStudy.date); 
		$scope.data.currentItem = item;
		$scope.editStudyModal.show();

	};

	$scope.saveEditStudy  = function(item){
		StudyService.editStudyData(item,$scope.data.currentItem)
		.then(function(result){
			$scope.hideEditStudyDialog();
			$scope.$apply();
		})
	 	
	}
	$scope.hideEditStudyDialog = function(item){
		$scope.editStudyModal.hide();
		$scope.data.editStudy = null;
		$scope.data.currentItem = null;
	};

	$scope.deleteStudy = function(item){
		StudyService.removeStudyData(item)
		.then(function(result){
			$scope.$apply();
		})
	};


}]);
