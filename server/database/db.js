'use strict';

var companies = [];

module.exports = {

    init : function(){

        this.loadDefault();
        this.loadSeasonal();

        return this;
    },
    getCompany : function(companyId){
        return companies[companyId];
    },
    getCustomer : function(companyId, customerId){
        return companies[companyId].customers[customerId];
    },
    getVendor : function(companyId, vendorId){
        return companies[companyId].vendors[vendorId];
    },
    getProduct : function(companyId, productId){
        return companies[companyId].products[productId];
    },
    loadDefault : function(){

        var customers = [],
            vendors = [],
            products = [];

        var milk = new Product('Milk');
        milk.sales.push(new Year('2012', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2013', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2014', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2015', [
            30,30,30,30,30,30,30,30,30,30,30,30
        ]));

        var jim = new Customer('Jim', 0, [milk]);

        customers.push(jim);

        milk = new Product('Milk');
        milk.sales.push(new Year('2012', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2013', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2014', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2015', [
            70,70,70,70,70,70,70,70,70,70,70,70
        ]));

        var susan = new Customer('Susan', 0, [milk]);

        customers.push(susan);

        // ** Init Vendors for Seasonal Company ** //

        milk = new Product('Milk');
        milk.sales.push(new Year('2012', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2013', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2014', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2015', [
            100,100,100,100,100,100,100,100,100,100,100,100
        ]));

        milk.priceList.push({
            month : 0,
            price : 1
        });

        var happyCow = new Vendor('Happy Cow', 0, [milk]);

        vendors.push(happyCow);

        milk = new Product('Milk');
        milk.sales.push(new Year('2012', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2013', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2014', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2015', [
            100,100,100,100,100,100,100,100,100,100,100,100
        ]));

        milk.priceList.push({
            month : 0,
            price : 2
        });

        companies[0] = (new Company('Default', customers, vendors, [milk]));

    },
    loadSeasonal : function(){

        // ** Init Customers for Seasonal Company ** //
        var customers = [],
            vendors = [],
            products = [];


        var milk = new Product('Milk');
        milk.sales.push(new Year('2012', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2013', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2014', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2015', [
            30,33,36,39,36,21,18,19.5,25.5,28.5,34.5,39
        ]));

        var jim = new Customer('Jim', 0, [milk]);

        customers.push(jim);

        milk = new Product('Milk');
        milk.sales.push(new Year('2012', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2013', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2014', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2015', [
            70,77,84,91,84,49,42,45.5,59.5,66.5,80.5,91
        ]));

        var susan = new Customer('Susan', 0, [milk]);

        customers.push(susan);

        // ** Init Vendors for Seasonal Company ** //

        milk = new Product('Milk');
        milk.sales.push(new Year('2012', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2013', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2014', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2015', [
            100,110,120,130,120,70,60,65,85,95,115,130
        ]));

        milk.priceList.push({
            month : 0,
            price : 1
        });

        var happyCow = new Vendor('Happy Cow', 0, [milk]);

        vendors.push(happyCow);

        milk = new Product('Milk');
        milk.sales.push(new Year('2012', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2013', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2014', [
            0,0,0,0,0,0,0,0,0,0,0,0
        ]), new Year('2015', [
            100,110,120,130,120,70,60,65,85,95,115,130
        ]));

        milk.priceList.push({
            month : 0,
            price : 2
        });

        companies[1] = (new Company('Seasonal', customers, vendors, [milk]));

    }
};

function unitToPrice(priceList, year){

    var sales = [];
    year.months.forEach(function(m, index){
        var price = 0;
        for(var i = priceList.length - 1; i >= 0; i--){
            if(index >= priceList[i].month){
                price = priceList[i].price;
                break;
            }
        }
        sales.push(price * m);
    });

    return sales;
}

var Company = function(name, customers, vendors, products){
    this.name = name;
    this.customers = customers;
    this.vendors = vendors;
    this.products = products;
    this.finances = {};

    var profit = new Account('Profit'),
        income = new Account('Income'),
        expenses = new Account('Expenses', [], -1);

    profit.children.push(income);
    profit.children.push(expenses);


    var sales = unitToPrice(this.products[0].priceList, this.customers[0].products[0].sales[3]);
    var jim = new Account('Jim', sales);

    sales = unitToPrice(this.products[0].priceList, this.customers[1].products[0].sales[3]);
    var susan = new Account('Susan', sales);

    income.children.push(jim);
    income.children.push(susan);

    sales = unitToPrice(this.vendors[0].priceList, this.vendors[0].products[0].sales[3]);
    var cogs = new Account('COGS', sales);

    var payroll = new Account('Payroll', [
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100
    ]);

    expenses.children.push(cogs);
    expenses.children.push(payroll);

    this.finances.profit = profit;
    profit.init();

    this.finances.cashflow = {};
    this.finances.cashflow.current = 0;
    this.finances.cashflow.floor = 0;
    this.finances.cashflow.ceiling = 0;
    this.finances.cashflow.months = [];

    for(var i = 0; i < this.finances.profit.months.length; i++){

        var prevMonthCashflow = this.finances.cashflow.months[i-1] || 0;
        // Running total
        var newMonthCashflow = prevMonthCashflow + this.finances.profit.months[i];
        this.finances.cashflow.months[i] = newMonthCashflow;
        // Floor
        if(newMonthCashflow <= this.finances.cashflow.floor){
            this.finances.cashflow.floor = newMonthCashflow;
        }

        // Ceiling
        if(newMonthCashflow >= this.finances.cashflow.ceiling){
            this.finances.cashflow.ceiling = newMonthCashflow;
        }
    }

};

function Account(name, months, modifier){
    this.name = name;
    this.months = months || [];
    this.children = [];
    this.modifier = modifier || 1;
}

Account.prototype.init = function() {
    var self = this;

    if(self.children.length > 0){
        self.children.forEach(function(child){
            var months = child.init();
            for(var i = 0; i <= 11; i++){
                var a = self.months[i] || 0;
                var b = months[i] || 0;
                self.months[i] = a + b;
            }
        })
    }

    for(var i = 0; i < self.months.length; i++){
        self.months[i] = self.months[i] * self.modifier;
    }

    return self.months;
};

var Vendor = function(name, terms, products){
    this.name = name;
    this.terms = terms;
    this.products = products;
    this.priceList = [{
        month : 0,
        price : 1
    }];
};

var Customer = function(name, terms, products){
    this.name = name;
    this.terms = terms;
    this.products = products;
};

var Product = function(name){
    this.name = name;
    this.sales = [];
    this.priceList = [];
    this.vendor = 'Happy Cow';
};


var Year = function(year, months){
    var self = this;
    this.year = year;
    this.months = months || [];
    this.total = 0;

    months.forEach(function(m){
        self.total = (self.total || 0) + m;
    });
};



