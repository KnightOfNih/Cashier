var app = angular.module('Cashier', ['ngRoute', 'treeGrid']).value('Highcharts', Highcharts);
// configure our routes
app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        })

        // route for the about page
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        })

        // route for the contact page
        .when('/customers', {
            templateUrl: 'views/customers.html',
            controller: 'customerController'
        })

        // route for the contact page
        .when('/vendors', {
            templateUrl: 'views/vendors.html',
            controller: 'vendorController'
        })

        // route for the contact page
        .when('/products', {
            templateUrl: 'views/products.html',
            controller: 'productController'
        })
})

    .controller('dashboardController', function ($scope, $http, Highcharts) {

        $scope.loadEven = function($scope){
            $http.post("/load-company", {
                companyId : 0
            }).success(function(data){
                init();
            });
        };

        $scope.loadSeasonal = function(){
            $http.post("/load-company", {
                companyId : 1
            }).success(function(data){
                init();
            });
        };



        $scope.profit_tree = [{Year:'',Jan:'',Feb:'',Mar:'',Apr:'',May:'',Jun:'',Jul:'',Aug:'',Sep:'',Oct:'',Nov:'',Dec:''}];

        init();

        function init() {

            $http.post("/dashboard-init", {
            }).success(function (data, status) {

                $scope.current = data.finances.cashflow.current;
                $scope.ceiling = data.finances.cashflow.ceiling;
                $scope.floor = data.finances.cashflow.floor;
                $scope.companyId = data.companyId;

                console.log("Receivieng " + data.companyId);

                createChart(data);
                createProfitTable(data);

            }).error(function (data) {
                console.log('Error');
            }).finally(function (data) {
                console.log("Init finished.");
            });
    }

        function createChart(data){
            var seriesData = [];
            seriesData.push({
                name : 'Cash Flow',
                data : data.finances.cashflow.months,
                threshold: 0,
                negativeColor: 'red'
            }, {
                name : 'Profit',
                data : data.finances.profit.months
            },{
                name: '0',
                marker: {
                    enabled: false
                },
                data: [0,0,0,0,0,0,0,0,0,0,0,0]
            });

            var ecomChart = angular.element($('#ecommerce_chart1'));
            if (ecomChart.length) {
                ecomChart.highcharts({
                    credits: false,
                    colors: ['#37bc9b', '#70ca63', '#000000'],
                    chart: {
                        backgroundColor: 'transparent',
                        className: '',
                        type: 'line',
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift',
                        marginTop: 45,
                        marginRight: 1
                    },
                    title: {
                        text: null
                    },
                    xAxis: {
                        gridLineColor: '#EEE',
                        lineColor: '#EEE',
                        tickColor: '#EEE',
                        categories: ['Jan', 'Feb', 'Mar', 'Apr',
                            'May', 'Jun', 'Jul', 'Aug',
                            'Sep', 'Oct', 'Nov', 'Dec'
                        ]
                    },
                    yAxis: {
                        tickInterval: 10,
                        gridLineColor: '#EEE',
                        title: {
                            text: null
                        }
                    },
                    plotOptions: {
                        spline: {
                            lineWidth: 3
                        },
                        area: {
                            fillOpacity: 0.2
                        }
                    },
                    legend: {
                        enabled: true,
                        floating: false,
                        align: 'right',
                        verticalAlign: 'top',
                        x: -15
                    },
                    series: seriesData
                });
            }

        }

        function createProfitTable(data){

            console.log(data.finances.cashflow);
            var cash = makeMonths({}, data.finances.cashflow.months);
            cash.Year = 'Cash';
            var tree_data = makeTree({}, data.finances.profit);
            $scope.profit_tree = [cash, tree_data];

            function makeTree(td, level){
                td.Year = level.name;
                td = makeMonths(td, level.months);
                if(level.children){
                    level.children.forEach(function(child){
                        td.children = td.children || [];
                        td.children.push(makeTree({}, child))

                    })
                }
                return td;
            }

            function makeMonths(td, months){
                for(var i = 0; i < months.length; i++){
                    var val = months[i];
                    switch(i){
                        case 0: td.Jan = val;break;
                        case 1: td.Feb = val;break;
                        case 2: td.Mar = val;break;
                        case 3: td.Apr = val;break;
                        case 4: td.May = val;break;
                        case 5: td.Jun = val;break;
                        case 6: td.Jul = val;break;
                        case 7: td.Aug = val;break;
                        case 8: td.Sep = val;break;
                        case 9: td.Oct = val;break;
                        case 10:td.Nov = val;break;
                        case 11:td.Dec = val;break;
                    }
                }
                return td;
            }
        }


}).controller('customerController', function ($scope, $http) {

    $scope.init = function () {
        console.log('initing');
        $http.get("/customers-init", {
            customerId: 0
        }).success(function (data, status) {
            console.log(data);
        }).error(function (data) {
            console.log('Error');
        }).finally(function (data) {
            console.log("Init finished.");
        });
    }
}).controller('vendorController', function ($scope, $http) {
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
}).controller('productController', function ($scope, $http) {
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