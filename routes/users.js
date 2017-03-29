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
        // TODO: distinguir si es mi perfil cuando estoy logueado
        if( !(typeof req.user === "undefined") && user.idUsuario == req.user.id)
          messageItsMe = 'Its my profile!';
        res.render('userdetail', { user: user, itIsMe: messageItsMe  });
  }).catch(function(err){
        res.render('userdetail', { user: null });
  });
});

module.exports = router;
