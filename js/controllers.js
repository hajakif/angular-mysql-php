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

var ModalInstanceController = function ($scope, $modalInstance, items, client) {
	$scope.client = client;
	$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};
	$scope.ok = function () {
		$modalInstance.close($scope.selected.item);
	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
};