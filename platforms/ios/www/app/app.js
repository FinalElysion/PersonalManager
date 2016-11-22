// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers','app.services','AppUtils'])

.run(['$ionicPlatform','AppService',function($ionicPlatform,AppService) {
	$ionicPlatform.ready(function() {
		AppService.initAppInfo();

		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
		  	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		 	cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
		  	// org.apache.cordova.statusbar required
		  	StatusBar.styleDefault();
		}
	});
}])

.config(function($stateProvider, $urlRouterProvider) {
  	$stateProvider
  	// Login Page
    .state('login', {
        url: '/security/login',
        templateUrl: 'app/security/login.html',
        controller: 'SecurityCtrl'
    })
     .state('welcome', {
	    url: '/welcome',
   	 	templateUrl: 'app/welcome/welcome.html',
 		controller: 'WelcomeCtrl'
  	})
    .state('app', {
	    url: '/app',
	    abstract: true,
	    templateUrl: 'app/menu.html',
	    controller: 'AppCtrl'
  	})
   
  	.state('app.fgo', {
	    url: '/fgo',
	    views: {
	      	'menuContent': {
	        	templateUrl: 'app/fgo/fgo.html',
	        	controller: 'FGOCtrl'
	     	}
	    }
  	})
  	.state('app.expect', {
	    url: '/expect',
	    views: {
	      	'menuContent': {
	       	 	templateUrl: 'app/expect/expect.html',
	       	 	controller: 'ExpectCtrl'
	     	}
	    }
  	})

  	.state('app.cost', {
	    url: '/cost',
	      	views: {
	        'menuContent': {
	          templateUrl: 'app/cost/cost.html',
	          controller: 'CostCtrl'
	        }
	    }
    })
    .state('app.study', {
        url: '/study',
     	views: {
        	'menuContent': {
          	templateUrl: 'app/study/study.html',
          	controller: 'StudyCtrl'
        }
      }
    })

  	.state('app.article', {
	    url: '/article',
	    views: {
	      	'menuContent': {
	        	templateUrl: 'app/article/article.html',
	        	controller: 'ArticleCtrl'
	     	}
	    }
  	});
  	
  
  	// if none of the above states are matched, use this as the fallback
  	// /$urlRouterProvider.otherwise('/app/expect');
});