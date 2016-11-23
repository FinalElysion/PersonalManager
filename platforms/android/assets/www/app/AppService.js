/**
 * 定义serviece模块
 * 该模块下定义所有的service,和 app 常量
 */
angular.module('app.services', [])

//定义一个全局Service
.service('AppService', ["AppConstant",'$state','DBUtils',function (AppConstant,$state,DBUtils) {
 	/**
 	 * 初始化app的信息, 并跳转到登陆页面
 	 */
 	this.initAppInfo = function(){
 		console.log('init my app');
 		var userDB = new PouchDB('userInfo');
 		DBUtils.createDb();
 		//use for dev
 		// $state.go('app.expect');
 		$state.go('login');
 	};

}])
//定义一个全局常量 使用时先注入到要使用的模块
.constant("AppConstant", {
	version:2.0
});