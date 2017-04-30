var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Registrate', authed: req.isAuthenticated(), user: req.user ,message: req.flash('loginMessage') });
});

//TODO: Failed to serialize user into session, NO REDIRECCIONA
router.post('/', passport.authenticate('local-signup', {
        successRedirect : '/preguntas',
        failureRedirect : 'signup',
        failureFlash : true
}));

module.exports = router;
