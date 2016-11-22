angular.module('app.services')

.service('CostService', ['$state','AppConstant','DBUtils','CommonUtils', function ($state,AppConstant,DBUtils,CommonUtils) {
	
	var currentData = [];
	
	this.getCostData = function(){
		currentData = [];
		return DBUtils.getCostDB().allDocs({include_docs: true})
	    .then(function (result) {
	    	for (var i = 0; i < result.rows.length; i++) {
	    		currentData.push(result.rows[i].doc);
	    	}
	      	return currentData;
	    }).catch(function (err) {
	      	console.log('error:' + err);
	    });
	};

	this.addCostData = function(data){
		return DBUtils.getCostDB().put({
			_id:CommonUtils.generateId('COS'),
			type:'CostList',
			money:data.money,
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

	this.removeCostData = function(data){
		var costDB = DBUtils.getCostDB()
		return costDB.get(data._id)
		.then(function(result){
			return costDB.remove(result);
		})
		.then(function(result){
			CommonUtils.removeArrayItem(currentData,data);
		});
	};


	this.editCostData = function(data,currentItem){
		var costDB = DBUtils.getCostDB();
		return costDB.get(data._id)
		.then(function(result){
			return costDB.put({
				_id:data._id,
				type:data.type,
				money:data.money,
				desc:data.desc,
				date:data.date,
				createDate:data.createDate,
				updateDate:new Date(),
				_rev:result._rev
			})
		})
		.then(function(result){
			return costDB.get(data._id);
		})
		.then(function(result){
			CommonUtils.updateArrayItem(currentData,currentItem,result);
		});
	};
}]);
