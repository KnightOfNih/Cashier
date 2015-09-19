var app = angular.module('CashCaster', ['ngAnimate']);
app.controller('cashController', function($scope, $http) {
    $scope.username = "Hello";

    $scope.init = function () {

        $http.get("/index-init", {
            companyId: 1
        }).success(function (data, status) {
            console.log(data);
            $scope.name = data.msg;
        }).error(function (data) {
            $scope.name = 'Error';
        }).finally(function (data) {
            console.log("Init finished.");
        });
    }
});