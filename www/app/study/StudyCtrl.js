angular.module('app.controllers')

.controller('StudyCtrl', ['$scope', 'StudyService', '$ionicModal',function($scope, StudyService, $ionicModal) {
	$scope.data = {};
	$scope.data.studyData = StudyService.getStudyData(); 
	$scope.data.newStudy = {title:'',desc:'',date:''};
	$scope.isShowDelete = false;

	$scope.isShowEdit = false;

	//init model
	$ionicModal.fromTemplateUrl('app/study/model/add-study-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.addStudyModal = modal;
	});

	$scope.showAddStudy = function(){
		$scope.addStudyModal.show();
	};

	$scope.showDelete = function(){
		$scope.isShowDelete = !$scope.isShowDelete;
	};

	$scope.showEdit = function(){
		$scope.isShowEdit = !$scope.isShowEdit;
	};

	$scope.addStudy = function(data){
		StudyService.addStudyData(data);

		$scope.data.newStudy = {title:'',desc:'',date:''};
		$scope.hideDialog();
	};

	$scope.hideDialog = function() {
		$scope.addStudyModal.hide();
		//$scope.addStudyModal.remove();
	};

}]);
