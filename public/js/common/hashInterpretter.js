var app = angular.module("IndexModule");

app.factory('hashInterpretter', ['urlService', function(urlService){

	return function(hashValue){
		hashValue = hashValue.slice('#!');
		return getRouteBundle(routes.split('.'));
	};

	function getRouteBundle(routes){
		var routingTree = routeBundles;
		var keys = routingTree.keys();
		for(route in routes){
			if(keys.contains(route)){
				routingTree = routingTree[route];
			} else if(routeTree.variable){
				routingTree = routingTree.variable;
			} else {
				return routingTree.level;
			}
		}
	}

	var routeBundles = {
		user: {
				variable: {
					profile: {},
					settings: {}
				}
		},
		topic: {
			submit:{
				level:{}
			},

			variable:{
				post:{},
				level:{
					mainContent: "/topic",
					navContent: "/topic/nav",
					supplemental: []
				}
			},
		}
	};
}]);
