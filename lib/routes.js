'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

/**
 * Globals.
 */
var router = express.Router();

/**
 * Routes.
 */

router.get('/', function(req, res) {
  res.render('home');
});

router.get('/profile', stormpath.loginRequired, function(req, res) {
  res.render('profile');
});

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
