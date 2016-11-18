angular.module('AppUtils', [])

.service('CommonUtils', function() {
	
	/**
	 * 生成带前缀的随机Id并返回
	 * 
	 * @param  prefix 前缀
	 * @return (prefix + timestamp + baseChar的随机5位) 组成的一个id
	 */
	this.generateId = function(prefix){
		var t = new Date().getTime(),
			baseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			i;

		for(i = 0; i < 5; i++){
			t += baseChar.charAt(Math.floor(Math.random()*26));
		}

		return prefix + t;
	};

	this.generateResult = function(success,msg,data){
		return {
			success:success,
			msg:msg,
			data:data
		}
	}
});