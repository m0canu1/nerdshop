/*
Stefano Martinelli - 812155
Gestione della Registrazione e Login.
*/

jQuery(document).ready(function(){
  jQuery('.messagelogin').click(function() {
    jQuery('#loginform').hide(500);
    jQuery('#registerform').show(500);
  });

  jQuery('.messageregister').click(function() {
    jQuery('#registerform').hide(500);
    jQuery('#loginform').show(500);
  });

  jQuery('#submitreg').click(function(){
    jQuery.ajax({
      type: 'POST',
      url: 'model/users/registeruser.php',
      data: jQuery('#registerform').serializeArray(),
      dataType: 'text',
      success: function(result) {
        window.location.href = 'index.php';
      },
      error: function(error) {
        console.log('Errore: impossibile effettuare la richiesta per la registrazione.');
      }
    });
  });

  jQuery('#submitlogin').click(function(){
    jQuery.ajax({
      type: 'POST',
      url: 'model/users/loginuser.php',
      data: jQuery('#loginform').serializeArray(),
      dataType: 'text',
      success: function(result) {
        var obj = JSON.parse(result);
        window.location.href = obj.url;
      },
      error: function(error) {
        console.log('Errore: impossibile effettuare la richiesta per il login.');
      }
    });
  });

});
