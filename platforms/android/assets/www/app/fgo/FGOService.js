angular.module('app.services')

.service('FGOService', ['$state','AppConstant','DBUtils','CommonUtils', 
function ($state,AppConstant,DBUtils,CommonUtils) {
	
	var currentMRCLData = [];
	
	this.getMRCLData = function(){
		return DBUtils.getFgoDB().get('MRCL')
	    .then(function (result) {
	    	currentMRCLData = result.items;
	    	return currentMRCLData;
	    }).catch(function (err) {
	      	console.log('error:' + err);
	    });
	}

	var currentNoteData = [];
	
	this.getNoteData = function(){
		currentNoteData = [];
		return DBUtils.getFgoDB().allDocs({include_docs: true})
	    .then(function (result) {
	    	for (var i = 0; i < result.rows.length; i++) {
	    		currentNoteData.push(result.rows[i].doc);
	    	}
	      	return currentNoteData;
	    }).catch(function (err) {
	      	console.log('error:' + err);
	    });
	};


	this.addNoteData = function(data){
		return DBUtils.getFgoDB().put({
			_id:CommonUtils.generateId('NOTE'),
			type:'NOTELIST',
			desc:data.desc,
			createDate:new Date()
		}).then(function(result){
			console.log(result);
			return CommonUtils.generateResult(true);
		}).catch(function(err){
			return CommonUtils.generateResult(false,err);
		});
	};

	this.removeNoteData = function(data){
		var fgoDB = DBUtils.getFgoDB()
		return fgoDB.get(data._id)
		.then(function(result){
			return fgoDB.remove(result);
		})
		.then(function(result){
			CommonUtils.removeArrayItem(currentNoteData,data);
		});
	};


	this.editNoteData = function(data,currentItem){
		var fgoDB = DBUtils.getFgoDB();
		return fgoDB.get(data._id)
		.then(function(result){
			return fgoDB.put({
				_id:data._id,
				type:data.type,
				desc:data.desc,
				createDate:data.createDate,
				updateDate:new Date(),
				_rev:result._rev
			})
		})
		.then(function(result){
			return fgoDB.get(data._id);
		})
		.then(function(result){
			CommonUtils.updateArrayItem(currentNoteData,currentItem,result);
		});
	};
}]);
