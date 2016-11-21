/**
 * 定义serviece模块
 * 该模块下定义所有的service,和 app 常量
 */
angular.module('app.services', [])
//定义一个全局常量 使用时先注入到要使用的模块
.constant("AppConstant", {
	version:1.0,
	expectData:[{
		title:'增加重量',
		desc:'增加到55KG'
	},{
		title:'补充Java知识',
		desc:'把Java基础知识补充完整,重点内容是jdbc,多线程,泛型'
	}],
	costData:[{
		money:20,
		desc:'家乐园吃饭',
		date:new Date()
	},{
		money:30,
		desc:'叫外卖',
		date:new Date()
	}],
	studyData:[{
		title:'Java',
		desc:'多线程',
		date:new Date()
	},{
		title:'ionic',
		desc:'界面',
		date:new Date()
	}],
	articleData:[{
		desc:'早到',
		date:new Date()
	},{
		desc:'没准时落班',
		date:new Date()
	}],
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
})
//定义一个全局Service
.service('AppService', ["AppConstant",'$state',function (AppConstant,$state) {
 	/**
 	 * 初始化app的信息, 并跳转到登陆页面
 	 */
 	this.initAppInfo = function(){
 		console.log('init my app');
 		//use for dev
 		// $state.go('app.expect');
 		$state.go('login');
 	};

}]);