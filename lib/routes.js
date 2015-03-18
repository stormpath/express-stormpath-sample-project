'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

/**
 * Globals.
 */
var router = express.Router();

/**
 * Middleware initialization.
 */
router.use(stormpath.loginRequired);

/**
 * Routes.
 */
router.get('/profile', function(req, res) {
  res.render('profile');
});

router.post('/profile', function(req, res, next) {
  for (var key in req.body) {
    req.user.customData[key] = req.body[key];
  }

  req.user.customData.save(function(err) {
    if (err) return next(err);
    res.render('profile');
  });
});

module.exports = router;
