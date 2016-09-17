var ecommerceApp=angular.module('ecommerceApp',['ngCookies','ngRoute']);
ecommerceApp.controller('mainController',function($scope,$http,$location,$cookies){
	var apiPath="http://localhost:3000";

	
$scope.test="hello";


// $http.get(apiPath+'/getUserData?token='+$cookies.get('token'))
// 	.then(function successCallback(response){
// 		//response.data.xxx=whatever res.json was in express
// 		if(response.data.failure=='badToken'){
// 			$location.path='/login' //goodbye
// 		}else if(esponse.data.failure=='noToken'){
// 		$location.path='/login' //no token, token is bad expired or fake, goodbye
// 		}else{
// 			//the token is good. response.data will have their stuff in it

// 	}


// 	})function errorCallback(response){

// 		}
});

//Set up routes using routes module

ecommerceApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl:'views/main.html',
		controller:'mainController'
	})
	.when('/login',{
		templateUrl:'views/login.html',
		controller:'loginCtrl'
	})
	.when('/register',{
		templateUrl:'views/register.html',
		controller:'registerCtrl'
	})
	.when('/options',{
		templateUrl:'views/options.html',
		controller:'optionsCtrl'
	})
	.when('/payment',{
		templateUrl:'views/payment.html',
		controller:'paymentCtrl'
	})
	.otherwise({
		redirectTo:'/'
	})
})