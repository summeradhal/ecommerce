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
			if(Response.data.message=="added"){
				$cookies.put('token',response.data.token);
				$cookies.put('username',$scope.username);
				$location.path('/options')
			}
					

		},function errorCallback(response){
			console.log(response);
		});
	};

});