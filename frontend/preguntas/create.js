
//TODO: REFACTORIZAR para no utilizar esta variable global
var axios = require('axios');
var Respuestas = [];

$(function(){

    $('.modal').modal();
    console.log('Estoy en la seccion de crear preguntas')

    Vue.component('respuesta-form',{
        props: ['res','index'],
        template:`
        <div className="form-respuesta">
            <h4>Opción #{{index+1}}
            <i class="large material-icons" v-on:click="eliminar($event)">close</i>
            </h4>
            <p><div className="input-field">
                <input className="validate" placeholder="Pregunta" type="text" v-model="res.respuesta"/>
                </div>
            </p> 
            <p>
                <input type="checkbox" className="filled-in" v-bind:id="id" v-model="res.correcta"/>
                <label v-bind:for="id">¿Es una posible respuesta correcta?</label>
            </p>
        </div> 
        `,
        data:function(){
            return{
                id: "someid-"+this.index 
            }
        },
        methods:{
            eliminar: function(event){
                if(event)
                    event.preventDefault();
                var indice = this.index;
                console.log('Eliminando la pregunta del indice '+indice)
                Respuestas.splice(indice,1);
                console.log(Respuestas);
            }
        }
    });

    var app = new Vue({
        el: '#crear-pregunta-seccion',
        data: {
          message: 'Sección de crear preguntas',
          Opciones: Respuestas 
        }
    });

$('#boton-agrega-opcion').on('click',function(){
    console.log('Agregando una nueva respuesta a la pregunta');
    Respuestas.push(
        {
            respuesta:"",
            correcta: false 
        }
    );
});

$('#crearPregunta').on('click',function(){
    console.log('Creando una pregunta');
	 Respuestas.forEach(function(element){
		console.log(element.respuesta);
	 });
    $('#modal1').modal('open');

	  axios.post('create', {
		  pregunta: $("#preguntaInput").val(), 
		  respuestas: Respuestas} 
	  ).then(function (response) {
		 console.log(response);
	  }).catch(function (error) {
		 console.log(error);
	  });
});

})
