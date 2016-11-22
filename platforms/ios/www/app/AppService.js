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
	version:1.0,
	FGOData:{
		cailiao:[{
			desc0:'弓之修炼场',
			desc1:'每日材料本',
			url:'img/fgo/gong.jpg'
		},{
			desc0:'枪之修炼场',
			desc1:'每日材料本',
			url:'img/fgo/qiang.jpg'
		},{
			desc0:'狂之修炼场',
			desc1:'每日材料本',
			url:'img/fgo/kuang.jpg'
		},{
			desc0:'骑之修炼场',
			desc1:'每日材料本',
			url:'img/fgo/qi.jpg'
		},{
			desc0:'术之修炼场',
			desc1:'每日材料本',
			url:'img/fgo/shu.jpg'
		},{
			desc0:'杀之修炼场',
			desc1:'每日材料本',
			url:'img/fgo/sha.jpg'
		},{
			desc0:'剑之修炼场',
			desc1:'每日材料本',
			url:'img/fgo/jian.jpg'
		}]

	}
});