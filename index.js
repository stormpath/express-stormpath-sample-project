'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

/**
 * Globals.
 */
var app = express();

/**
 * Middleware initialization.
 */
app.use(stormpath.init(app, {
  apiKeyId: process.env.STORMPATH_API_KEY_ID,
  apiKeySecret: process.env.STORMPATH_API_KEY_SECRET,
  application: process.env.STORMPATH_APPLICATION_HREF
}));

/**
 * Start the web server.
 */
app.listen(3000);
