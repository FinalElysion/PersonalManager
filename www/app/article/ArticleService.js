angular.module('app.services')

.service('ArticleService', ['$state','AppConstant','DBUtils','CommonUtils', function ($state,AppConstant,DBUtils,CommonUtils) {
	
	var currentData = [];
	
	this.getArticleData = function(){
		currentData = [];
		return DBUtils.articleDB.allDocs({include_docs: true})
	    .then(function (result) {
	    	for (var i = 0; i < result.rows.length; i++) {
	    		currentData.push(result.rows[i].doc);
	    	}
	      	return currentData;
	    }).catch(function (err) {
	      	console.log('error:' + err);
	    });
	};


	this.addArticleData = function(data){
		return DBUtils.articleDB.put({
			_id:CommonUtils.generateId('ART'),
			type:'ArticleList',
			desc:data.desc,
			date:data.date,
			createDate:new Date()
		}).then(function(result){
			console.log(result);
			return CommonUtils.generateResult(true);
		}).catch(function(err){
			return CommonUtils.generateResult(false,err);
		});
	};

	this.removeArticleData = function(data){
		var articleDB = DBUtils.articleDB
		return articleDB.get(data._id)
		.then(function(result){
			return articleDB.remove(result);
		})
		.then(function(result){
			CommonUtils.removeArrayItem(currentData,data);
		});
	};


	this.editArticleData = function(data,currentItem){
		var articleDB = DBUtils.articleDB;
		return articleDB.get(data._id)
		.then(function(result){
			return articleDB.put({
				_id:data._id,
				type:data.type,
				desc:data.desc,
				date:data.date,
				createDate:data.createDate,
				updateDate:new Date(),
				_rev:result._rev
			})
		})
		.then(function(result){
			return articleDB.get(data._id);
		})
		.then(function(result){
			CommonUtils.updateArrayItem(currentData,currentItem,result);
		});
	};
}]);
