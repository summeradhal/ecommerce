
ecommerceApp.controller('loginCtrl',function($scope,$http,$location,$cookies){
var apiPath="http://localhost:3000";
	
	// $http.get(apiPath+'/login'{

	// })
	//Login function called from login.html
	$scope.login=function(username,password){
		
		
		$http.post(apiPath+'/login',{
			username:$scope.username,
			password:$scope.password
			
		}).then(function successCallback(response){
			if (response.data.failure == 'noToken' || response.data.failure == 'badPass'){
			//redirect to login page
			$scope.errorMessage="Username or password are incorrect";
			$location.path('/login');
			
		} else if(response.data.success=="userFound"){
			
				$cookies.put('username',$scope.username);
				var expDate = new Date();
				expDate.setDate(expDate.getTime() + (30 * 60000));
				// $cookies.put('token',response.data.token);
				$cookies.put('token', response.data.token, {'expires': expDate});
				
				$scope.username=response.data;

			
				$scope.loggedIn=true;
				console.log(response)
				
			
			
				$location.path('/options');
			}
		},function errorCallbak(response){
			console.log(response);
			
		});



	
	};


});