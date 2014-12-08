var app = angular.module("IndexModule");

app.factory('urlService', ['$http', function($http){
	var that = this;

	that.hostname = document.location.hostname;
	that.port = document.location.port;
	that.api = 'api.';

	that.routes = {
		api: {
			login: '/account/login',
			logout: '/account/logout',
			signup: '/account/signup'
		},
		domain: {
			login: '/account/login',
			signup: '/account/signup'
		}
	}

	return{ 
		getUrl: function(base, key){
			var domain = that.routes[base];

			if(base == 'api'){
				var route = domain[key];
				return 'http://' + that.api + that.hostname + ':' + that.port + route;
			} else {
				var route = domain[key];
				return 'http://'+ that.hostname + ':' + that.port + route;
			}
		}
	}

}]);