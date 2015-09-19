var app = angular.module('Cashier', ['ngAnimate']);

app.controller('indexController', function($scope, $http) {
    $scope.username = "Hello";

    $scope.init = function () {

        $http.get("/index-init", {
            companyId: 0
        }).success(function (data, status) {
            console.log(data);
            $scope.name = data.msg;
        }).error(function (data) {
            console.log('Error');
        }).finally(function (data) {
            console.log("Init finished.");
        });
    }
}).controller('dashboardController', function($scope, $http) {
    $scope.username = "Hello";

    $scope.init = function () {

        $http.get("/dashboard-init", {
            companyId: 1
        }).success(function (data, status) {
            console.log(data);
        }).error(function (data) {
            console.log('Error');
        }).finally(function (data) {
            console.log("Init finished.");
        });
    }
}).controller('customerController', function($scope, $http) {

    $scope.init = function () {
        console.log('initing');
        $http.get("/customers-init", {
            customerId : 0
        }).success(function (data, status) {
            console.log(data);
        }).error(function (data) {
            console.log('Error');
        }).finally(function (data) {
            console.log("Init finished.");
        });
    }
}).controller('vendorController', function($scope, $http) {
    $scope.username = "Hello";

    $scope.init = function () {
        console.log('initing');
        $http.get("/vendors-init", {
            vendorId: 1
        }).success(function (data, status) {
            console.log(data);
        }).error(function (data) {
            console.log(data);
        }).finally(function (data) {
            console.log("Init finished.");
        });
    }
}).controller('productController', function($scope, $http) {
    $scope.username = "Hello";

    $scope.init = function () {

        $http.get("/products-init", {
            productId: 1
        }).success(function (data, status) {
            console.log(data);
        }).error(function (data) {
            console.log('Error');
        }).finally(function (data) {
            console.log("Init finished.");
        });
    }
});