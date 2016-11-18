angular.module('app.services')

.service('SecurityService', ['$state','CommonUtils','$q', function ($state,CommonUtils,$q) {
	//init userMap
	if(!localStorage.getItem('userMap')) localStorage.setItem('userMap','{}');
	
	this.regist = function(user){
		var userMap = JSON.parse(localStorage.getItem('userMap'))
		
		if(userMap[user.name]) return {success:false,msg:'用户已经存在'};
		//add user
		userMap[user.name] = user;

		localStorage.setItem('userMap', JSON.stringify(userMap));

		return CommonUtils.generateResult(false, '用户已经存在');
		
	}


	this.login = function(user){
		var deferred = $q.defer(),
        	result = null,
        	userMap = JSON.parse(localStorage.getItem('userMap'))

		if(!userMap || !userMap[user.name]) {
			result = CommonUtils.generateResult(false, '用户不存在');
		}
		else if(userMap[user.name].password != user.password) {
			result = CommonUtils.generateResult(false, '密码错误');
		}else
		 	result = CommonUtils.generateResult(true);

		deferred.resolve(result);

        return deferred.promise;
	}
  	
  	
  	this.reset = function(){
  		localStorage.clear();
  	}

}]);
