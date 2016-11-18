angular.module('app.controllers')

.controller('SecurityCtrl', [ '$scope', '$state','SecurityService' ,'$ionicModal','$ionicLoading',
function ($scope, $state,SecurityService, $ionicModal,$ionicLoading) {
 	$scope.data = {};

 	$scope.data.user = {name:'',password:''};
 	$scope.data.registUser = {name:'',password:''};
 		//init model
	$ionicModal.fromTemplateUrl('app/security/model/regist-model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.registModal = modal;
	});


	$scope.showRegist = function(){
		$scope.registModal.show();
	};

	$scope.regist = function(user){
		SecurityService.regist(user);

		$scope.hideDialog();
	};

	$scope.hideDialog = function() {
		
		$scope.registModal.hide();

		$scope.data.registUser = {name:'',password:''};
		//$scope.addExpectModal.remove();
	};


 	$scope.login = function(user){
 		if(user.name=='' ||user.password ==''){
 			return $ionicLoading.show({template:'请输入用户名和密码', noBackdrop: true, duration: 1500});
 		}
 		SecurityService.login(user)
 		.then(function(result){
 			if(result.success){
				$state.go('welcome');
 			}else{
				$ionicLoading.show({template:result.msg, noBackdrop: true, duration: 1500});
 			}
 		})
  	};



  	
}]);

