'use strict';

var express = require('express');


module.exports = function (db) {

    var router = express.Router();

    router.get('/', function (req, res) {



        res.render('index.html');
    });

    router.get('/test', function (req, res) {
        res.render('test.html');
    });

    router.get('/index', function (req, res) {
        res.render('index.html');
    });

    router.get('/index-init', function (req, res) {
        console.log("Init loading?");
        return res.json({msg: 'Loaded.'});
    });

    router.get('/dashboard', function (req, res) {
        res.render('dashboard.html');
    });

    router.get('/dashboard-init', function (req, res) {

        // Pull in the different sources of info
        var companyId = req.session.companyId || 1,
            company = db.getCompany(companyId);
        return res.json(company);
    });

    router.get('/customers', function (req, res) {
        res.render('customers.html');
    });

    router.get('/customers-init', function (req, res) {

        var companyId = req.session.companyId || 0,
            customerId = req.body.customerId || 0;

        var customer = db.getCustomer(companyId, customerId);

        return res.json(customer);
    });

    router.get('/vendors', function (req, res) {
        res.render('vendors.html');
    });

    router.get('/vendors-init', function (req, res) {

        var companyId = req.session.companyId || 0,
            vendorId = req.body.vendorId || 0;

        var vendor = db.getVendor(companyId, vendorId);

        return res.json(vendor);
    });

    router.get('/products', function (req, res) {
        res.render('products.html');
    });

    router.get('/products-init', function (req, res) {

        var companyId = req.session.companyId || 0,
            productId = req.body.productId || 0;

        var product = db.getVendor(companyId, productId);

        return res.json(product);
    });


    return router;
};