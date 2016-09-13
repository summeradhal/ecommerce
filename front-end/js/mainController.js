var ecommerceApp=angular.module('ecommerceApp',['ngCookies','ngRoute']);
ecommerceApp.controller('mainController',function($scope,$http,$location,$cookies){
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

		},function errorCallback(response){
			console.log(response);
		});
	};
});

//Set up routes using routes module

ecommerceApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl:'views/main.html',
		controller:'mainController'
	})
	.when('/login',{
		templateUrl:'views/login.html',
		controller:'mainController'
	})
	.when('/register',{
		templateUrl:'views/register.html',
		controller:'mainController'
	})
})