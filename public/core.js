var toDo = angular.module('toDo', []);

function todoController($scope, $http) {
	$scope.formData = {};

	//when landing on the page we get all the todos and show them
	$http.get('/api/todos')
	.success(function(data){
		$scope.todos = data;
		console.log(data);
	})
	.error(function(data){
		console.log('Error: ' + data)
	});


	//when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
		.success(function(data){
			$scope.formData = {}; // clear the form so our user is ready to enter another todo
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};

	$scope.toggleTodoStatus = function (todo) {
		todo.done = !todo.done;
		$http.put('/api/todos', todo)
			.success(function(data){
				$scope.formData = {}; // clear the form so our user is ready to enter another todo
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});

	}

	// delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.remainingTodos = function(){

		return _.filter($scope.todos, function (todo) {
			return !todo.done;
		}).length
	}
}