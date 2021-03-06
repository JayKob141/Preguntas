var User = require('../models').User;
var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  passport.deserializeUser( function(id, done) {
     User.findOne({
        where: {
          idUsuario: id
        },
        raw: true
     }).then( function(user){
        console.log('deserializeUser: user = ' + user);
        done(null, user );
     }).catch(function(error){
        done(error,null);
     });
  });

  passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'nickname',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, nickname, password, done) {
        var newUser = User.build(
          {
          nickname: nickname,
          password: password,
          fecha_registro: new Date()
          }
        );
        newUser.save().then(function() {
            var u = new Object();
            u.id = newUser.idUsuario;
            u.nickname = newUser.nickname;
            return done(null, u);
        }).catch(function(error) {
            return done(error, null);
        });
    }));

  passport.use('local-login', new LocalStrategy({
        usernameField : 'nickname',
        passwordField : 'password',
        passReqToCallback : true
    },
      function(req, nickname, password, done) {
         User.findOne({
            where: {
              nickname: nickname
            },
            raw: true
         }).then( function(user){
           console.log('local-login: user = ' + user);
            if(user == null)
                return done(null, false ,req.flash('loginMessage', 'Usuario no existe') );
            else {
              // TODO: encriptar los passwords de la base de datos
              if (!( user.password == password))
                   return done(null, false, req.flash('loginMessage','Contraseña incorrecta') );
              var newUser = new Object();
              newUser.id = user.idUsuario;
              newUser.nickname = user.nickname;
              return done(null, newUser);
            }
         }).catch(function(err){
            done(err, null);
         });
    }
  ));

}
