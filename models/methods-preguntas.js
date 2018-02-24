
var models = require('./index');
var Pregunta = models.Pregunta;
var OpcionPregunta = models.OpcionPregunta;
var sequelize = models.sequelize;

//TODO: Auto-generar documentacion
	//var pregunta = { 
		//pregunta: 'Pregunta de tape ' + getDateTime(), 
		//userId: 4
	//};
	//var respuestas = [
		//{respuesta: 'respuesta 1', correcta: false},	
		//{respuesta: 'respuesta 2', correcta: false},	
		//{respuesta: 'respuesta 3', correcta: true},	
	//];
module.exports.insertaPreguntaConRespuestas = function(pregunta,respuestas){

	return sequelize.transaction(function (t) {

		// chain all your queries here. make sure you return them.
		return Pregunta.create( pregunta,{fields:['pregunta','userId'],transaction: t})
		.then(function(nuevaPregunta){
				var nuevaPregunta = nuevaPregunta.get({plain:true});
				console.log(nuevaPregunta);
			   console.log('La nueva pregunta tiene id = ' + nuevaPregunta.idPregunta);
				var promises = [];

				respuestas.forEach(function(r,index){
					var sequelizeRespuesta = {
							descripcion: r.respuesta,
							esCorrecta: r.correcta,
							preguntaId: nuevaPregunta.idPregunta
					}

					// se dio de alta la pregunta, ahora las respuestas una por una TODO: hay un metodo de sequelize que inserta multiples records, implementarlo
					var promise = OpcionPregunta.create( sequelizeRespuesta,{fields:['descripcion','esCorrecta','preguntaId'],transaction: t});
					promises.push(promise);

				});	

				return Promise.all(promises);
		});

	});
}
