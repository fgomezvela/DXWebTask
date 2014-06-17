//The angularJS main file. This file call to the REST api and show its results

//The angular module
var angularTodo = angular.module('angularTodo', []);
//The controler of our app
function mainController($scope, $http) {
	$scope.formData = {};

// Load all task and send them to the main page
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	//Create a new Task and call to the post method of the REST api
	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};

	//Delete a Task selected
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
}