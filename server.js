'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    routes = require('./server/routes/index'),
    session = require('express-session'),
    db = require('./server/database/db.js').init();


var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');

var app = express();


// ** Set to use JSON ** //
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
// ** Session Secret ** //
app.use(session({
    secret: 'kitty cat'
}));
app.use(express.static(path.join(__dirname, 'public')));


// ** Static files ** //
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '/public/views'));
app.use('/', express.static(path.join(__dirname, "/public")));
app.use('/', express.static(path.join(__dirname, "/public/assets")));

// ** Remote logging ** //
app.use(morgan('dev'));



app.use(routes(db));

app.listen(3000);

console.log("App listening on 3000");

module.exports = app;


