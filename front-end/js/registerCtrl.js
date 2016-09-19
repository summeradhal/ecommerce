ecommerceApp.controller('registerCtrl',function($scope,$http,$location,$cookies){
var apiPath="http://localhost:3000";

	$scope.register=function(){
		console.log($scope.username);
		$http.post(apiPath+'/register',{
			username:$scope.username,
			password:$scope.password,
			confirmPassword:$scope.confirmPassword,
			email:$scope.email

		}).then(function successCallback(response){
			console.log(response);
			if(response.data.message=="added"){
				
				$cookies.put('username',$scope.username);
				$location.path('/options')
				var expDate = new Date();
  					expDate.setDate(expDate.getTime() + (30 * 60000));
					// get a random token back from the API and store it inside cookies
					// make the cookie expire tomorrow
					$cookies.put('token', response.data.token, {'expires': expDate});
			}
					

		},function errorCallback(response){
			console.log(response);
		});
	};

});