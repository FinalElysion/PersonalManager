angular.module('app.services')

.service('ExpectService', ['$state','AppConstant','CommonUtils','DBUtils', function ($state,AppConstant,CommonUtils,DBUtils) {
	var currentData = [];
	/**
	 获取目标数据列表
	 */
	this.getExpectData = function(){
		currentData = [];
		return DBUtils.getExpectDB().allDocs({include_docs: true})
	    .then(function (result) {
	    	for (var i = 0; i < result.rows.length; i++) {
	    		currentData.push(result.rows[i].doc);
	    	}
	      	return currentData;
	    }).catch(function (err) {
	      	console.log('error:' + err);
	    });
	};

	/**
	 添加目标数据
	 */
	this.addExpectData = function(data){
		return DBUtils.getExpectDB().put({
			_id:CommonUtils.generateId('EXP'),
			type:'ExpectList',
			title:data.title,
			desc:data.desc,
			createDate:new Date()
		}).then(function(result){
			console.log(result);
			return CommonUtils.generateResult(true);
		}).catch(function(err){
			return CommonUtils.generateResult(false,err);
		});
	};

	/**
	 * 删除目标数据
	 */
	this.removeExpectData = function(data){
		var expectDB = DBUtils.getExpectDB()
		return expectDB.get(data._id)
		.then(function(result){
			return expectDB.remove(result);
		})
		.then(function(result){
			CommonUtils.removeArrayItem(currentData,data);
		});
	};

	/**
     编辑目标数据
	*/
	this.editExpectData = function(data,currentItem){
		var expectDB = DBUtils.getExpectDB();
		return expectDB.get(data._id)
		.then(function(result){
			return expectDB.put({
				_id:data._id,
				type:data.type,
				title:data.title,
				desc:data.desc,
				createDate:data.createDate,
				updateDate:new Date(),
				_rev:result._rev
			})
		})
		.then(function(result){
			return expectDB.get(data._id);
		})
		.then(function(result){
			CommonUtils.updateArrayItem(currentData,currentItem,result);
		});
	};
}]);
