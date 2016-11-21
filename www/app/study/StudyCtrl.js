angular.module('app.controllers')

.controller('StudyCtrl', ['$scope', 'StudyService', '$ionicModal',function($scope, StudyService, $ionicModal) {
	$scope.data = {};
	$scope.data.studyData = StudyService.getStudyData(); 
	$scope.data.newStudy = {title:'',desc:'',date:''};
	$scope.isShowDelete = false;

	$scope.isShowEdit = false;

	$scope.data.editStudy = null;

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


	$scope.showAddStudy = function(){
		$scope.addStudyModal.show();
	};

	
	$scope.addStudy = function(data){
		StudyService.addStudyData(data);

		$scope.data.newStudy = {title:'',desc:'',date:''};
		$scope.hideDialog();
	};

	$scope.hideAddDialog = function() {
		$scope.addStudyModal.hide();
		//$scope.addStudyModal.remove();
	};


	$scope.showDelete = function(){
		$scope.isShowDelete = !$scope.isShowDelete;
	};

	$scope.showEdit = function(){
		$scope.isShowEdit = !$scope.isShowEdit;
	};


	$scope.showEditStudyDialog = function(item){
		$scope.data.editStudy = item;
		$scope.editStudyModal.show();
		
	};
	$scope.saveEditStudy  = function(item){
	 	$scope.hideEditStudyDialog();
	}
	$scope.hideEditStudyDialog = function(item){
		$scope.editStudyModal.hide();
		$scope.data.editStudy = null;
	};

	$scope.deleteStudy = function(item){
		StudyService.removeCostData(item);
	};

}]);
