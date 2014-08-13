var ModalController = function ($scope, $modal, $log) {
	$scope.items = ['item1', 'item2', 'item3'];
	$scope.open = function (client) {
		var modalInstance = $modal.open({
			templateUrl: 'myModalContent.html',
			controller: ModalInstanceController,
			size: "lg",
			resolve: {
				items: function () {
					return $scope.items;
				},
				client: function () {
					return client;
				}
			}
		});
		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
};

var ModalInstanceController = function ($scope, $modalInstance, client) {
	$scope.client = client;
	$scope.ok = function () {
		$modalInstance.close();
	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
};

app.controller('loginModalController', function ($scope, $modal) {
	$scope.open = function (client) {
		var modalInstance = $modal.open({
			templateUrl: 'loginModal.html',
			controller: loginModalInstanceController,
			size: "sm",
			resolve: {
				client: function () {
					return client;
				}
			}
		});
	};
});

var loginModalInstanceController = function ($scope, $modalInstance) {
	$scope.ok = function () {
		$modalInstance.close();
	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	$scope.login = function (credentials) {
		console.log($scope);
	}
};
