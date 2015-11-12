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
  //api: true,
  application: {
    href: process.env.STORMPATH_APPLICATION_HREF
  },
  secretKey: process.env.MY_SECRET,

  expand: {
    // Custom data is not coming in expanded even though this is set.
    customData: true,
  },
  web: {
    verifyEmail: {
      enabled: true
    },
    me: {
      enabled: true,
      uri: '/api/v1/me'
    },
    login: {
      uri: '/api/v1/auth/login',
    },
    register: {
      uri: '/api/v1/auth/registration',  // Use a different URL
      nextUri: '/',    // Where to send the user to, if auto login is enabled
      fieldOrder: ['givenName', 'surname', 'email', 'password', 'passwordConfirm'],
    },
    forgotPassword: {
      uri: '/api/v1/auth/forgot-password',
      nextUri: '/',
    },
  },
  postRegistrationHandler: function (account, req, res, next) {
    //console.log('server/main postRegistrationHandler account', account);
    next();
  },
  postLoginHandler: function (account, req, res, next) {
    //console.log('server/main postLoginHandler account', account);
    res.send(account).end();
    //next();
  },
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

