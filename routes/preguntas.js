var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var preguntas = [
    {
      pregunta: '¿Pregunta 1?',
      imgurl: 'http://materializecss.com/images/sample-1.jpg',
      opciones: ['Opción 1','Opción 2','Opción 3']
    },
    {
      pregunta: '¿Pregunta 2?',
      imgurl: 'http://materializecss.com/images/office.jpg',
      opciones: ['Opción 1','Opción 2','Opción 3']
    },
    {
      pregunta: '¿Pregunta 3?',
      imgurl: 'http://materializecss.com/images/sample-1.jpg',
      opciones: ['Opción 1','Opción 2','Opción 3']
    },
  ];
  res.render('preguntas', { preguntas: preguntas });
});

module.exports = router;
