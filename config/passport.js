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
