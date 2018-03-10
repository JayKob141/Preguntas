
$(function(){
   $('.modal').modal();
   $('.boton-opcion-pregunta').on('click', function(e){
      e.preventDefault(e);

      var texto = '';
      if( $(this).data('correcta') == '1')
         texto = 'Es correcta';
      else
         texto = 'Es incorrecta';

      $('#modalFeedbackOpcionPregunta #texto-feedback ').html(texto);

      $('#modalFeedbackOpcionPregunta').modal('open');
      return false;
   });
});
