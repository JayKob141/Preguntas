require('dotenv').config();
var test = require('tape')
var preguntasMethods = require('../../models/methods-preguntas');

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

var recursiveInsertaRespuesta = function(respuesta){
	return OpcionPregunta.create( sequelizeRespuesta,{transaction: t});
}

test('Inserta una pregunta junto con sus respuestas utilizando transaciones', function(tapeTest) {

	var pregunta = { 
		pregunta: 'Pregunta de tape ' + getDateTime(), 
		userId: 4
	};
	var respuestas = [
		{respuesta: 'respuesta 1', correcta: false},	
		{respuesta: 'respuesta 2', correcta: false},	
		{respuesta: 'respuesta 3', correcta: true},	
	];

	preguntasMethods.insertaPreguntaConRespuestas(pregunta, respuestas)
	.then(function (result) {
	  // Transaction has been committed
	  // result is whatever the result of the promise chain returned to the transaction callback
	  tapeTest.end();
	}).catch(function (err) {
	  // Transaction has been rolled back
	  // err is whatever rejected the promise chain returned to the transaction callback
	  tapeTest.end(err);
	});

});
