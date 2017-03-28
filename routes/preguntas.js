var express = require('express');
var router = express.Router();
var models = require('../models');
var Pregunta = models.Pregunta;
var User = models.User;
var OpcionPregunta = models.OpcionPregunta;


/* GET users listing. */
router.get('/', function(req, res, next) {
  Pregunta.findAll({
      attributes: ['pregunta'],
      include: [{model:User}, {model:OpcionPregunta}]
  }).then( function(preguntas) {
      //preguntas.forEach(function(item){
        //console.log(item.get({plain:true}));
      //});
      res.render('preguntas', { preguntas: preguntas });
  }).catch(function(err){
    res.render('preguntas', { preguntas: [] });
  });

});

module.exports = router;
