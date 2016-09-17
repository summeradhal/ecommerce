ecommerceApp.controller('loginCtrl',function($scope,$http,$location,$cookies){
var apiPath="http://localhost:3000";
	
	// $http.get(apiPath+'/login'{
		
	// })
	//Login function called from login.html
	$scope.login=function(username,password){
		
		console.log($scope.username);
		$http.post(apiPath+'/login',{
			username:$scope.username,
			password:$scope.password
		}).then(function successCallback(response){
			if (response.data.failure == 'noToken' || response.data.failure == 'badToken'){
			//redirect to login page
			$location.path('/login');
		} else {
			
				console.log(response);
				$scope.username=$scope.username;
				$location.path('/options');
				console.log($scope.username);
				$cookies.put('username',$scope.username);
				// $cookies.put('token',response.data.token);

				$scope.loggedIn=true;

				console.log($scope.loggedIn);
				
				
				console.log($scope.username);
				// $scope.grindType=response.data.username;
			}
		},function errorCallbak(response){
			console.log(response);
			
		});
	
	};
});