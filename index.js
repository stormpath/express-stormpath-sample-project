'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var stormpath = require('express-stormpath');

var routes = require('./lib/routes');

/**
 * Globals.
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
  apiKeyId: process.env.STORMPATH_API_KEY_ID,
  apiKeySecret: process.env.STORMPATH_API_KEY_SECRET,
  application: process.env.STORMPATH_APPLICATION_HREF,
  redirectUrl: '/profile',
  expandCustomData: true
}));

/**
 * Route initialization.
 */
app.use('/', routes);

/**
 * Start the web server.
 */
app.listen(3000);
