var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Ingresar', authed: req.isAuthenticated(), user: req.user ,message: req.flash('loginMessage') });
});

router.post('/', passport.authenticate('local-login', {
        successRedirect : '/preguntas',
        failureRedirect : 'login',
        failureFlash : true
}));

module.exports = router;
