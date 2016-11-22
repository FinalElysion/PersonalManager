angular.module('AppUtils', [])

.service('CommonUtils', function() {
	app.CommonUtils = this;
	/**
	 * 生成带前缀的随机Id并返回
	 * 
	 * @param  prefix 前缀
	 * @return (prefix + timestamp + baseChar的随机2位) 组成的一个id
	 */
	this.generateId = function(prefix){
		var t = new Date().getTime(),
			baseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			i;

		for(i = 0; i < 2; i++){
			t += baseChar.charAt(Math.floor(Math.random()*26));
		}

		return prefix + t;
	};

	//生成一个公用的结果对象
	this.generateResult = function(success,msg,data){
		return {
			success:success,
			msg:msg,
			data:data
		}
	};


	//移除数组中的对象
	this.removeArrayItem = function(array,item){
		for (var i = 0; i < array.length; i++) {
			if(angular.equals(item, array[i]))
				array.splice(i,1);
		}
	};


	//替换数组中的对象
	this.updateArrayItem = function(array,currentItem,newItem){
		for (var i = 0; i < array.length; i++) {
			if(angular.equals(currentItem, array[i]))
				array.splice(i,1,newItem);
		}
	};
})

.service('DBUtils', function() {
	app.DBUtils = this;
	var userDB;
	var costDB;
	var articleDB;
	var expectDB;
	var studyDB;

	this.getUserDB = function(){
		return userDB;
	}

	this.getCostDB = function(){
		return costDB;
	}

	this.getArticleDB = function(){
		return articleDB;
	}

	this.getExpectDB = function(){
		return expectDB;
	}

	this.getStudyDB = function(){
		return studyDB;
	}

	this.createDb = function(){
		userDB = new PouchDB("userDB");
		costDB = new PouchDB("costDB");
		articleDB = new PouchDB("articleDB");
		expectDB = new PouchDB("expectDB");
		studyDB = new PouchDB("studyDB");
	}

});