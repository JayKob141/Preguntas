var express = require('express');
var router = express.Router();
var models = require('../models');
var Pregunta = models.Pregunta;
var User = models.User;
var OpcionPregunta = models.OpcionPregunta;


router.get('/', function(req, res, next) {
  Pregunta.findAll({
      attributes: ['pregunta'],
      include: [{model:User}, {model:OpcionPregunta}]
  }).then( function(preguntas) {
      // preguntas.forEach(function(item){
      //   console.log(item.get({plain:true}));
      // });
      res.render('preguntas', { preguntas: preguntas });
  }).catch(function(err){
    // console.log(err)
    res.render('preguntas', { preguntas: [] });
  });

});


router.get('/create', function(req, res, next) {
    res.render('preguntas/create');
});

router.post('/create', function(req, res, next) {
	//TODO: Guardar la pregunta en la base de datos
	console.log('ALTA DE PREGUNTA');
	console.log(req.body);
	console.log('Usuario: ');
	console.log(res.locals.reqUser.idUsuario);

	/* ALTA DE PREGUNTA, asi viene el req.body
	  { 
	  pregunta: 'pregunta prueba',
	  respuestas: [ 
		  { respuesta: 'respuesta 1', correcta: false },
		  { respuesta: 'respuesta 2', correcta: true } 
	  ]
	  }
	*/

   res.json({mensaje: "Se dio de alta la pregunta junto con sus opciones"});

});

module.exports = router;

