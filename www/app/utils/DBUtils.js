angular.module('AppUtils')

.service('DBUtils', ['angularLoad',function(angularLoad) {
	var me = this;
	app.DBUtils = this;
	
	this.createDb = function(){
		me.userDB = new PouchDB("userDB");
		me.costDB = new PouchDB("costDB");
		me.articleDB = new PouchDB("articleDB");
		me.expectDB = new PouchDB("expectDB");
		me.studyDB = new PouchDB("studyDB");
		me.fgoDB = new PouchDB("fgoDB");
		me.initfgoData();
	};

	this.initfgoData = function(){
		return beginUpdate();
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
			console.log('no data to load');
		});
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

