'use strict';

var app = angular.module('searchApp', [
	'ngRoute',
	'ui.bootstrap'
]);

app.factory("services", ['$http', function($http) {
	var serviceBase = '/angulardb/services/';
	var obj = {};
	obj.getClients = function(){
		return $http.get(serviceBase + 'getClients');
	}
	return obj;	 
}]);

app.controller('listCtrl', function ($scope, services) {
	services.getClients().then(function(data){
		$scope.clients = data.data;
		for (var i in $scope.clients) {
			var c = $scope.clients[i];
			if (c.p_checks) {
				c.p_checks = c.p_checks.split(",");
				c.p_dates = c.p_dates.split(",");
				c.p_amounts = c.p_amounts.split(",");
			}
			if (c.o_orders) {
				c.o_orders = c.o_orders.split(",");
				c.o_orderDates = c.o_orderDates.split(",");
				c.o_requiredDates = c.o_requiredDates.split(",");	
				c.o_shippedDates = c.o_shippedDates.split(",");
				c.o_statuses = c.o_statuses.split(",");		
			}
		}
		$scope.quantity = 50;
	});
});


app.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider.
		when('/', {
			title: 'Clients',
			templateUrl: 'partials/search.php',
			controller: 'listCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		$rootScope.title = current.$$route.title;
	});
}]);