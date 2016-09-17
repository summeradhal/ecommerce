ecommerceApp.controller('paymentCtrl',function($scope,$http,$location,$cookies){
var apiPath="http://localhost:3000";

var testSecretKey="sk_test_7yh9oRYA9m9gd8d3gXceUMXy";
var testPublishKey="pk_test_TH0ryHnWgjHp39BcN7fHwQ2t";

$scope.payOrder = function(userOptions) {
        $scope.errorMessage = "";
        var handler = StripeCheckout.configure({
            key: 'pk_test_KKclL9QmUITzeaCs7SloYdIj',
            image: 'assets/img/dc_roasters_200x124_lt.png',
            locale: 'auto',
            token: function(token) {
                console.log("The token Id is: ");
                console.log(token.id);

                $http.post(apiUrl + '/stripe', {
                    amount: $scope.total * 100,
                    stripeToken: token.id,
                    token: $cookies.get('token')
                        //This will pass amount, stripeToken, and token to /payment
                }).then(function successCallback(response) {
                    console.log(response.data);
                    if (response.data.success) {
                        //Say thank you
                        $location.path('/receipt');
                    } else {
                        $scope.errorMessage = response.data.message;
                        //same on the checkout page
                    }
                }, function errorCallback(response) {});
            }
        });
        handler.open({
            name: 'DC Roasters',
            description: 'A Better Way To Grind',
            amount: $scope.total * 100
        });
    };
});