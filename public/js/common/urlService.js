var app = angular.module("IndexModule");

app.factory('urlService', ['$http', function($http){
	var that = this;

	that.hostname = document.location.hostname;
	that.port = document.location.port;
	that.api = 'api.';

	that.routes = {
		skeleton: '/pages/index/skeleton',
		accountHandler: '/pages/account/handler',
		indexSidebar: '/pages/index/sidebar',
		indexCategories: '/pages/index/category',

		loginHTML: '/account/login',
		signupHTML: '/account/signup',
		doLogin: '/account/login',
		doLogout: '/account/logout',
		doSignup: '/account/signup',

		submitPost: '/post/submit',
		submitTopic: '/pages/topic/submit',

		topicContent: '/pages/topic/content',
		topicSidebar: '/pages/topic/sidebar',
		topicData: '/topic/%VAR/data',
		topicPosts: '/topic/%VAR/posts',

		setFeatured: '/dashboard/featured/setFeatured',
		getFeatured: '/dashboard/featured/getTopics',
		removeFeatured: '/dashboard/featured/removeFeatured'
	}

	return{ 
		getUrl: function(key){
			var route = that.routes[key];
			return 'http://' + that.hostname + ':' + that.port + route;
		},

		getUrlWithVars: function(key, varArray){

			var route = that.routes[key];
			for(var i = 0; i < varArray.length; i++){
				var insert = varArray[i];
				route.replace('VAR', insert);
			}

			return 'http://' + that.hostname + ':' + that.port + route;
		}
	}

}]);