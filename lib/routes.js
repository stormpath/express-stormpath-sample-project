'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

/**
 * Create an Express Router, to contain our custom routes.
 */
var router = express.Router();

/**
 * Define the route for our homepage.
 */

router.get('/', function(req, res) {
  res.render('home');
});

/**
 * When someone visits /profile, render the profile form.
 */

router.get('/profile', stormpath.loginRequired, function(req, res) {
  res.render('profile');
});

/**
 * When someone posts the profile form, read the data and save it to the
 * custom data object on the account.
 */

router.post('/profile', stormpath.loginRequired, function(req, res, next) {
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
