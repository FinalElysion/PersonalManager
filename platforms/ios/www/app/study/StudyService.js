angular.module('app.services')

.service('StudyService', ['$state','AppConstant','DBUtils','CommonUtils', function ($state,AppConstant,DBUtils,CommonUtils) {
	
	var currentData = [];
	
	this.getStudyData = function(){
		currentData = [];
		return DBUtils.getStudyDB().allDocs({include_docs: true})
	    .then(function (result) {
	    	for (var i = 0; i < result.rows.length; i++) {
	    		currentData.push(result.rows[i].doc);
	    	}
	      	return currentData;
	    }).catch(function (err) {
	      	console.log('error:' + err);
	    });
	}


	this.addStudyData = function(data){
		return DBUtils.getStudyDB().put({
			_id:CommonUtils.generateId('STU'),
			type:'StudyList',
			title:data.title,
			desc:data.desc,
			date:data.date,
			createDate:new Date()
		}).then(function(result){
			console.log(result);
			return CommonUtils.generateResult(true);
		}).catch(function(err){
			return CommonUtils.generateResult(false,err);
		});
	}

	
	this.removeStudyData = function(data){
		var studyDB = DBUtils.getStudyDB()
		return studyDB.get(data._id)
		.then(function(result){
			return studyDB.remove(result);
		})
		.then(function(result){
			CommonUtils.removeArrayItem(currentData,data);
		});
	};

	this.editStudyData = function(data,currentItem){
		var studyDB = DBUtils.getStudyDB();
		return studyDB.get(data._id)
		.then(function(result){
			return studyDB.put({
				_id:data._id,	
				title:data.title,
				desc:data.desc,
				date:data.date,
				createDate:data.createDate,
				updateDate:new Date(),
				_rev:result._rev
			})
		})
		.then(function(result){
			return studyDB.get(data._id);
		})
		.then(function(result){
			CommonUtils.updateArrayItem(currentData,currentItem,result);
		});
	};
}]);
