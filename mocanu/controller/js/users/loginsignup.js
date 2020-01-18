/**
 * Gestione della registrazione e del login
 */

logindiv = $(
    '<form id="loginform" method="POST"> ' +
    '<h2>Login</h2> ' +
    '<dl> ' +
    '<dt></dt> ' +
    '<dd><input type="text" name="username" placeholder="Username" required></dd>' +
    '<dd><input type="password" name="password" placeholder="Password" required></dd>' +
    '<dd><input type="button" id="submitlogin" value="Accedi"></dd> ' +
    '</dl> ' +
    '<p class="messagelogin">Sei nuovo su TWebShop? <a href="#">Crea un account!</a></p> ' +
    '</form>');

registerdiv = $();

jQuery(document).ready(function () {

    /* al click su messagelogin in login.php */
    jQuery('.messagelogin').click(function () {
        jQuery('#loginform').remove();
        jQuery('#registerform').show(500);
    });

    /* al click su messageregister in login.php */
    jQuery('.messageregister').click(function () { //al click su messagelogin in login.php
        jQuery('#registerform').remove();
        jQuery('#loginform').show(500);
    });

    /* Registrazione */
    jQuery('#submitreg').click(function () {
        jQuery.ajax({
            type: 'POST',
            url: 'model/users/signup.php',
            data: jQuery('#registerform').serializeArray(),
            dataType: 'json',
            success: function (result) {
                console.log(result);
                window.location.href = 'index.php';
                jQuery('#registerform').append("<div id = 'flash'>" + result.msg + "</div>");
            },
            error: function () {
                console.log('Errore: impossibile effettuare la richiesta per la registrazione.');
            }
        });
    });

    /* Login */
    jQuery('#submitlogin').click(function () {
        jQuery.ajax({
            type: 'POST',
            url: 'model/users/login.php',
            data: jQuery('#loginform').serializeArray(),
            dataType: 'json',
            success: function (result) {
                //TODO a che serve?
                var object = JSON.parse(result);
                window.location.href = object.url;
            },
            error: function () {
                console.log('Errore: impossibile effettuare il login.')
            }
        });

    });
});