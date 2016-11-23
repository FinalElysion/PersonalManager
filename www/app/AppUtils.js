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

.service('DBUtils', ['angularLoad',function(angularLoad) {
	var me = this;
	app.DBUtils = this;
	
	this.createDb = function(){
		this.userDB = new PouchDB("userDB");
		this.costDB = new PouchDB("costDB");
		this.articleDB = new PouchDB("articleDB");
		this.expectDB = new PouchDB("expectDB");
		this.studyDB = new PouchDB("studyDB");
		this.fgoDB = new PouchDB("fgoDB");
		this.initfgoData();
	};


	this.initfgoData = function(){
		return beginUpdate();
	};

	//获取当前数据版本
	function getDataVersion(){
		return me.userDB.get('data_version')
		.then(function(result){
			return result;
		}).catch(function(result){
			return me.userDB.put({_id:'data_version',version:0})
			.then(function(result){
				return getDataVersion();
			})
		});
	};


	function beginUpdate(){
		var version = 0;
		var versionDoc = null;
		return getDataVersion()
		.then(function(result){	
			version = result.version + 1;
			versionDoc =result;
			console.log('init data : v' + version);
			if (window._updateData) delete window._updateData;
			return angularLoad.loadScript('data/data_v' + version + ".js")
		})
		.then(function(result){		
			var docs = _updateData.data;

			return saveDocs(docs, 0)
			.then(function(result){
				if (window._updateData) delete window._updateData;
				versionDoc.version = version;

				return me.userDB.put(versionDoc);
			})
			.then(function(result){
				return beginUpdate();
			})
		})
		.catch(function(result){
			if (window._updateData) delete window._updateData;
			console.log(result)
		});
	};

	function saveDocs(docs, i){
		if (i == docs.length) {
			console.log('save data finish');
			return true;
		}

		var doc = docs[i];

		return saveDoc(doc)
		.then(function(result){
			var next = i + 1;
			return saveDocs(docs, next);
		});
	};


	function saveDoc(doc){
		console.log("saving doc " + doc._id);

		return me.fgoDB.get(doc._id)
		.then(function(result){
			doc._rev = result._rev;
			return me.fgoDB.put(doc);
		})
		.catch(function(error){
			return me.fgoDB.put(doc);
		});
	};

	
}]);