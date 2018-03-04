var express = require('express');
var router = express.Router();
var models = require('../models');
var Pregunta = models.Pregunta;
var User = models.User;
var OpcionPregunta = models.OpcionPregunta;
var ModelMethods = require('../models/methods-preguntas');


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
	idUsuario = res.locals.reqUser.idUsuario;

	/* ALTA DE PREGUNTA, asi viene el req.body
	  { 
	  pregunta: 'pregunta prueba',
	  respuestas: [ 
		  { respuesta: 'respuesta 1', correcta: false },
		  { respuesta: 'respuesta 2', correcta: true } 
	  ]
	  }
	*/
	ModelMethods.insertaPreguntaConRespuestas( { pregunta: req.body.pregunta, userId: idUsuario }, req.body.respuestas )
	.then(function (result) {
	  // Transaction has been committed
	  // result is whatever the result of the promise chain returned to the transaction callback
	}).catch(function (err) {
	  // Transaction has been rolled back
	  // err is whatever rejected the promise chain returned to the transaction callback
	});


   res.json({redirigir: true, mensaje: "Se dio de alta la pregunta junto con sus opciones"});

});

module.exports = router;

