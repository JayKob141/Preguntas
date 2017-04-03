var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Registrate', authed: req.isAuthenticated(), user: req.user ,message: req.flash('loginMessage') });
});

router.post('/', passport.authenticate('local-signup', {
        successRedirect : '/preguntas',
        failureRedirect : 'signup',
        failureFlash : true
}));

module.exports = router;
