'use strict';

var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var stormpath = require('express-stormpath');

/**
 * Create an Express Router, to contain our custom routes.
 */
var router = express.Router();

/**
 * If you have a single-page app on another domain, you will need to white-list
 * it's origin URL.  This allows the app to send the Authorization header to
 * your routes, then Stormpath will inspect the header and authenticate the request.
 */

var corsOptions = {
  origin: [
    'http://localhost:4000' // for example, if your SPA is served on port 4000
  ],
  allowedHeaders: 'Authorization'
};

router.use(cors(corsOptions));

/**
 * Define the route for our homepage.  The getUser middleware will add req.user
 * if the user is authenticated, otherwise that value will be null. This allows
 * you to make switches in your template, depending on the user state.
 */

router.get('/', stormpath.getUser, function(req, res) {
  res.render('home');
});

/**
 * When someone visits /profile, render the profile form.  This route requires
 * authentication, and the user will be sent to the login page if they are
 * not authenticated.
 */

router.get('/profile', stormpath.authenticationRequired, function(req, res) {
  res.render('profile');
});

/**
 * When someone posts the profile form, read the data and save it to the
 * custom data object on the account.  The body-parser library is used
 * for parsing the form data.
 */

router.post('/profile', bodyParser.urlencoded({extended: false}), stormpath.authenticationRequired, function(req, res, next) {
  for (var key in req.body) {
    req.user.customData[key] = req.body[key];
  }

  req.user.customData.save(function(err) {
    if (err) {
      return next(err);
    }
    res.render('profile');
  });
});

module.exports = router;
