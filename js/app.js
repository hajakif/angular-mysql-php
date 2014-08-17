"use strict";

var app = angular.module("searchApp", [
	"uiControllers",
	"ngRoute",
	"ui.bootstrap"
]);

app.factory("services", ["$http", function($http) {
	var serviceBase = "/angular-mysql-php/services/";
	var obj = {};
	obj.getClients = function() {
		return $http.get(serviceBase + "getClients");
	}
	obj.login = function() {
		return $http.get(serviceBase + "login");
	}
	return obj;	 
}]);

app.controller("listCtrl", function ($scope, services) {
	services.getClients().then(function(data) {
		$scope.clients = data.data;
		console.log($scope.clients);
		for (var i in $scope.clients) {
			var c = $scope.clients[i];
			c.messages = [];
			c.addWarning = function (msg) {
				c.warning = true;
				c.messages.push(msg);
			};
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
				if (c.o_statuses.indexOf("Cancelled") != -1) c.addWarning("This client has cancelled past orders.");
				if (c.o_statuses.indexOf("Disputed") != -1) c.addWarning("This client has a disputed order.");
				c.o_statuses = c.o_statuses.split(",");		
			}
		}
		$scope.quantity = 50;
	});
});

app.controller("loginCtrl", function ($scope, services) {
	services.login().then(function(data) {
		$scope.users = data.data;
	});
});


app.config(["$routeProvider",
	function($routeProvider) {
	$routeProvider.
		when("/", {
			templateUrl: "partials/search.php",
			controller: "listCtrl"
		}).
		when("/login", {
			templateUrl: "partials/login.php",
			controller: "loginCtrl"
		})
		.otherwise({
			redirectTo: "/"
		});
}]);
app.run(["$location", "$rootScope", function($location, $rootScope) {
	$rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
		$rootScope.title = current.$$route.title;
	});
}]);