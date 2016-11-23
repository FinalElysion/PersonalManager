angular.module('app.controllers')

.controller('FGOCtrl', ['$scope', 'FGOService', '$ionicModal','$ionicSlideBoxDelegate','$ionicSideMenuDelegate','$ionicPopover','$ionicListDelegate','$ionicLoading',
function($scope, FGOService, $ionicModal,$ionicSlideBoxDelegate,$ionicSideMenuDelegate,$ionicPopover,$ionicListDelegate,$ionicLoading) {
	
	var TPL_PICTURE = 'app/fgo/tpl/fgo-picture-tpl.html';
	var TPL_NOTE = 'app/fgo/tpl/fgo-note-tpl.html';

	$scope.$on('$ionicView.afterEnter', function(event) {
        $ionicSideMenuDelegate.canDragContent(false);
    });
    //enable side menu drag before moving to next view
    $scope.$on('$ionicView.beforeLeave', function (event) {
        $ionicSideMenuDelegate.canDragContent(true);
    });


     //Cleanup the popover when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.categoryPopover.remove();
	});
	// Execute action on hidden popover
	$scope.$on('popover.hidden', function() {
	// Execute action
	});
	// Execute action on remove popover
	$scope.$on('popover.removed', function() {
	// Execute action
	});

	function initData(){
		$scope.data = {};
		
		
		$scope.data.noteData = [];
		$scope.data.template = TPL_PICTURE;
		$scope.data.tplType = 'PIC';


		$scope.data.newNote = {desc:''};
		$scope.data.currentItem = null;


		$scope.activeSlideIndex = 0;

		$ionicLoading.show({template: 'Loading...'});
		
		FGOService.getMRCLData().then(function(result){
			$scope.data.picTPLdata =  result;

			return FGOService.getNoteData()
			.then(function(result){
				$scope.data.noteData  = result;
				$ionicLoading.hide();
				$scope.$apply();
			})
		})	
		
		

		$ionicPopover.fromTemplateUrl('app/fgo/tpl/category-popover.html', {
			scope: $scope
		}).then(function(popover) {
			$scope.categoryPopover = popover;
		});


		//init model
		$ionicModal.fromTemplateUrl('app/fgo/model/add-note-model.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.addNoteModal = modal;
		});

		
		$ionicModal.fromTemplateUrl('app/fgo/model/edit-note-model.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.editNoteModal = modal;
		});
	}


	initData();

	$scope.changeTpL = function (type){
		if(type == 'NOTE'){
			$scope.data.template = TPL_NOTE;
			$scope.data.tplType = 'NOTE'
		}else if(type == 'PIC'){
			$scope.data.template = TPL_PICTURE;
			$scope.data.tplType = 'PIC'
		}	
	};

	$scope.rightBtnClick = function($event){
		if($scope.data.tplType == 'PIC'){
			$scope.switchCategory($event);
		}else if($scope.data.tplType == 'NOTE'){
			$scope.showNote();
		}
	}
	$scope.switchCategory = function($event){
		$scope.categoryPopover.show($event);
	};

 	$scope.productSlideChanged = function(index){
		$scope.activeSlideIndex = index;
		$ionicSlideBoxDelegate.update();
		$scope.categoryPopover.hide();
	};


	$scope.showNote = function(){
		$scope.addNoteModal.show();
	};

	$scope.addNote = function(data){
		FGOService.addNoteData(data).then(function(result){
			return FGOService.getNoteData().then(function(result){
				$scope.data.noteData = result;
				$scope.hideNoteDialog();
				//$scope.$apply();
			}); 
		})
	};

	$scope.hideNoteDialog = function() {
		$scope.addNoteModal.hide();
		$scope.data.newNote = {desc:''};
	};

	$scope.showEditNote = function(item){
		$scope.data.editNote = angular.copy(item);
		$scope.data.currentItem = item;
		$scope.editNoteModal.show();
	};

	$scope.saveEditNote = function(item){
		FGOService.editNoteData(item,$scope.data.currentItem)
		.then(function(result){
			$scope.hideEditNote();
			$scope.$apply();
		})
	};

	$scope.hideEditNote = function() {
		$scope.editNoteModal.hide();
		$scope.data.editNote = null;
		$scope.data.currentItem = null; 
		$ionicListDelegate.closeOptionButtons();
		//$scope.addArticleModal.remove();
	};

	$scope.deleteNote = function(item){
		FGOService.removeNoteData(item)
		.then(function(result){
			$scope.$apply();
		})
	};
}]);
