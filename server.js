'use strict';

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
app.set('trust proxy',true);
app.set('view engine', 'jade');
app.set('views', './lib/views');
app.locals.siteName = 'Express-Stormpath Example Project';

/**
 * Stormpath initialization.
 */

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
  console.log('Stormpath Ready');
  app.listen(process.env.PORT || 3000);
});

