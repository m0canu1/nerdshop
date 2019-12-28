/*
Stefano Martinelli - 812155
Gestione del Logout.
*/

jQuery(document).ready(function(){
  if(!window.location.href.startsWith('http://localhost/progetto/index.php')
  && window.location.href != 'http://localhost/progetto/') {
    jQuery('#logoutlogo').show();
  }
  jQuery('#logoutlogo').click(function(){
    jQuery.ajax({
      type: 'GET',
      url: '../../model/users/logoutuser.php',
      success: function(result) {
        var obj = JSON.parse(result);
        window.location.href = obj.url;
      },
      error: function(error) {
        console.log('Errore: impossibile effettuare la richiesta per la disconnessione.');
      }
    });
  });
});
