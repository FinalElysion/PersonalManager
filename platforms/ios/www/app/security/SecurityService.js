angular.module('app.services')

.service('SecurityService', ['$state','CommonUtils','$q','DBUtils', function ($state,CommonUtils,$q,DBUtils) {
	
	this.regist = function(user){
		var userDB = DBUtils.getUserDB();

		return checkUserIsExit(user)
		.then(function(result){
			if(result){
				return CommonUtils.generateResult(false, '用户已经存在');
			}else{
				return userDB.put({"_id":user.name,'password':user.password})
				.then(function(result){
					CommonUtils.generateResult(true);
				})
			}
		})
	};

	var checkUserIsExit = function(user){
		return DBUtils.getUserDB().get(user.name)
		.then(function(result){
			return true;
		})
		.catch(function(result){
			return false;
		})
	};

	this.login = function(user,remember){

		var userDB = DBUtils.getUserDB();
		
		return userDB.get(user.name)
		.then(function(result){

			if(result.password == user.password){
				saveLastUser(user,remember);
				return CommonUtils.generateResult(true);
			}else{
				return CommonUtils.generateResult(false, '密码错误');
			}
		})
		.catch(function(result){
			return CommonUtils.generateResult(false, '用户不存在');;
		})
	}
  	
  	var saveLastUser = function(user,remember){
  		var userDB = DBUtils.getUserDB();
		return userDB.get('lastUser')
		.then(function(result){
			return userDB.put({_id:'lastUser',name:user.name,password:user.password,remember:remember,_rev:result._rev})
		})
		.catch(function(result){
			return userDB.put({_id:'lastUser',name:user.name,password:user.password,remember:remember})
		})
  	};

  	this.getLastUser = function(){
  		var userDB = DBUtils.getUserDB();
  		return userDB.get('lastUser')
		.catch(function(result){
			return null;
		})
  	};

}]);
