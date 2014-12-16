var app = angular.module("IndexModule");

app.factory('urlService', ['$http', function($http){
	var that = this;

	that.hostname = document.location.hostname;
	that.port = document.location.port;
	that.api = 'api.';

	that.routes = {
		loginHTML: '/account/login',
		signupHTML: '/account/signup',
		doLogin: '/account/login',
		doLogout: '/account/logout',
		doSignup: '/account/signup',
	}

	return{ 
		getUrl: function(key){
			var route = that.routes[key];
			return 'http://' + that.hostname + ':' + that.port + route;
		}
	}

}]);