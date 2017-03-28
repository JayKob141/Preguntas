var express = require('express');
var router = express.Router();
var models = require('../models');
var Pregunta = models.Pregunta;
var User = require('../models').User;


/* GET users listing. */
router.get('/', function(req, res, next) {
  Pregunta.findAll({
      attributes: ['pregunta'],
      include: [User]
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
