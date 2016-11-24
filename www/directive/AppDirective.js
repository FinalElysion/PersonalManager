angular.module('AppDirective', [])
//directive 必须使用驼峰命名 UI引用时使用 - 链接
.directive("appSearch", ['AppConstant', function (AppConstant) {
	return {
        /*
	    	其他属性配置:
	    	priority
	    		在同一个DOM元素有多个directive定义时，可以指定执行顺序
			terminal
				在同一个DOM元素有多个directive定义时，该属性设为true,则最后执行
		    require 
		    	引入其他controller
		    	
		    	require(前缀 + 'controllerName')
				
				前缀：(可以不加)
	             ? – 不要抛出异常。这使这个依赖变为一个可选项。
	             ^ – 允许查找父元素的controller
	    */

		/*
			restrict:
				E – 元素名称： <app-search></app-search>
			    A – 属性名： <div app-search></div>
			    C – class名： <div class="app-search"></div>
			    M – 注释 ： <!-- directive:app-search -->  (使用M要把replace设为true)
			
			可以同时设多个eg: 
				restrict : "AECM",
		*/
        restrict : "E",
        //replace 如果设置为true将会替换当前元素，否则将作为子元素添加到当前元素中。
        replace : true,
        /*
        	scope
		 		true:创建一个新的scope。如果在同一个元素中有多个directive都设为true 也只会创建一个scope。
		        {}:创建一个新的、独立的,拷贝父scope 的 scope(不会影响到父scope)
        */
        scope: {
        	//UI设置这属性也要转换为 - 连接
        	searchField: '=searchFieldModel'
        },
        // template:'<div>Hello</div>'
        templateUrl: 'directive/app-search.html',
        /*
	    controller 属性:
		    $scope – 与当前元素结合的scope
			$element – 当前的元素
			$attrs – 当前元素的属性对象
			$transclude 
        */
        controller: ['$scope', function($scope){
        	//angular.extend($scope.configRectangleParam, $scope.$parent.configRectangleParam);
        	console.log($scope.searchField);
        }],
        // compile 和 link 不能同时使用
        link: function(scope, el, att){
        	console.log(att.appSearch);
        }
	}
}]);