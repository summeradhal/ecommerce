ecommerceApp.controller('optionsCtrl',function($scope,$http,$location,$cookies){
var apiPath="http://localhost:3000";


$scope.addToCart = function(idOfThingClickedOn){
	console.log(idOfThingClickedOn);
    var oldCart = $cookies.get('cart');
    var newCart = oldCart + ',' + idOfThingClickedOn;
    $cookies.put('cart', newcart);


}

// $scope.getCart = function(){
//     var cart = $cookies.get('cart');
//     var cartItemsArray = cart.split(',');
//     for(var i = 0l i<cartItemsArray.length; i++){
//         //do stuff with each index
//         //i.e., get the cost, the name, etc. and load them up into another array
//     }
// }

// $locationProvider.html5Mode(true)



});