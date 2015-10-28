'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var stormpath = require('express-stormpath');

var routes = require('./lib/routes');

/**
 * Create the Express application.
 */
var app = express();

/**
 * Application settings.
 */
app.set('view engine', 'jade');
app.set('views', './lib/views');

/**
 * Middleware initialization.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(stormpath.init(app, {
  website: true,
  expand: {
    customData: true
  }
}));

/**
 * Route initialization.
 */
app.use('/', routes);

/**
 * Start the web server.
 */
app.on('stormpath.ready',function () {
  app.listen(3000);
});

