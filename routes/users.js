var express = require('express');
var router = express.Router();
var models = require('../models');
var Pregunta = models.Pregunta;
var User = models.User;
//var OpcionPregunta = models.OpcionPregunta;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:tagId', function(req, res, next) {
  User.findOne({
      where:{idUsuario: req.params.tagId},
      include: [Pregunta]
  }).then( function(user) {
        var messageItsMe = '';
        // por alguna razon res.locals.reqUser tiene el campo idUsuario en lugar del 'id' asignado en config/passport.js
        // pareciera que me devuelve un JSON con los campos iguales a los de la BD
        //console.log('ROUTE: /users/'+req.params.tagId);
        //console.log(res.locals.reqUser);
        //console.log(user.idUsuario);
        if( res.locals.reqUser && user.idUsuario == res.locals.reqUser.idUsuario)
          messageItsMe = 'Its my profile!';
        res.render('userdetail', { user: user, itIsMe: messageItsMe  });
  }).catch(function(err){
        res.render('userdetail', { user: null });
  });
});

module.exports = router;
